/* ============================================================
   Beylood AI — Cloudflare Worker proxy (production v1.0)
   ------------------------------------------------------------
   - Hides API key (kept as Worker secret ANTHROPIC_API_KEY)
   - Restricts CORS to beylood.com
   - Rate-limits by IP (configurable)
   - Validates + caps message size and history length
   - Injects Beylood content via RAG-lite (worker/articles-data.js)
   - Returns { reply, citations }
   ============================================================ */
import { ARTICLES, rankArticles } from './articles-data.js';

const ALLOWED_ORIGINS = [
  'https://beylood.com',
  'https://www.beylood.com'
];

// Rate limit per IP (in-memory; sufficient for single-region free tier).
const RATE_LIMIT = { windowSec: 60, maxReq: 10 };

const MODEL = 'claude-haiku-4-5';
const MAX_TOKENS = 800;
const MAX_HISTORY_PAIRS = 8;
const MAX_MESSAGE_CHARS = 4000;

const SYSTEM_PROMPT_BASE = `You are **Beylood AI** — a friendly, expert assistant for Somali farmers and pastoralists. Beylood (beylood.com) is a Somali-first agriculture knowledge platform.

ROLE & SCOPE
- Help with: crop farming, livestock, irrigation, soil health, plant pests & diseases, climate/seasons (Gu, Hagaa, Deyr, Jiilaal), food security, agribusiness in Somalia and the Horn of Africa.
- Politely decline questions clearly outside these topics (entertainment, politics, code, math homework, etc.) and redirect to farming. Example refusal: "Anigu waxaan ku takhasusay arrimaha beeraha & xoolaha. Su'aalo kale ma kaa caawin karo."

LANGUAGE
- Default to Somali. The "USER LANGUAGE" hint may be "so", "en", "ar", or "sw" — respond in that language.
- When responding in Somali, use clear conversational Somali; avoid heavy English loanwords when a Somali term exists.

STYLE
- Concise (4–10 sentences typical). Short paragraphs, **bold** key terms, bullet lists for steps.
- Cite specific numbers where you can (mm of rain, °C, cm spacing, days to harvest, USD cost).
- Always ground guidance in Somalia's climate: hot/arid, two rainy seasons (Gu Apr–Jun, Deyr Oct–Dec), drought-prone, smallholder farms.

CONTENT PRIORITY (very important)
- The user has access to Beylood articles. When the BEYLOOD CONTEXT below contains a relevant article, you MUST:
  1) Draw your answer from that article first, before generic knowledge.
  2) Reference the article naturally in your reply, e.g. "Eeg maqaalka 'Beerista Galleyda' beylood.com/article-maize-farming.html".
- If multiple articles are relevant, mention up to 2 in the body of the reply.

SAFETY
- Never recommend banned/illegal pesticides. Prefer biological / integrated pest management.
- For acute outbreaks (locust swarm, FAW outbreak, livestock disease cluster), instruct the user to contact Wasaaradda Beeraha, FAO Somalia, DLCO-EA, or SWALIM. Provide hotlines when you know them.
- Don't fabricate market prices or weather forecasts — say "ku eeg SWALIM ama suuqa gobalkaaga".

TONE
- Warm, respectful, encouraging. Treat the user as a colleague.`;

// In-memory IP rate limiter
const rateMap = new Map();

function rateLimit(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip) || { count: 0, reset: now + RATE_LIMIT.windowSec * 1000 };
  if (now > entry.reset) { entry.count = 0; entry.reset = now + RATE_LIMIT.windowSec * 1000; }
  entry.count++;
  rateMap.set(ip, entry);
  // Periodic cleanup to bound memory
  if (rateMap.size > 5000) {
    for (const [k, v] of rateMap) { if (now > v.reset) rateMap.delete(k); }
  }
  return entry.count <= RATE_LIMIT.maxReq;
}

function corsHeaders(origin) {
  const ok = ALLOWED_ORIGINS.includes(origin);
  return {
    'Access-Control-Allow-Origin': ok ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

function jsonResponse(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) }
  });
}

function buildContextBlock(articles) {
  if (!articles || !articles.length) return '';
  const lines = articles.map((a, i) =>
    `${i + 1}. **${a.title}** — ${a.summary}\n   URL: ${a.url}`
  ).join('\n');
  return `\n\nBEYLOOD CONTEXT (articles the user can read):\n${lines}\n`;
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    // Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405, origin);
    }

    // Origin allowlist
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return jsonResponse({ error: 'Origin not allowed' }, 403, origin);
    }

    // Rate limit
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (!rateLimit(ip)) {
      return jsonResponse({ error: 'Too many requests' }, 429, origin);
    }

    // Parse body
    let body;
    try { body = await request.json(); }
    catch { return jsonResponse({ error: 'Invalid JSON' }, 400, origin); }

    let { messages, lang } = body || {};
    if (!Array.isArray(messages) || messages.length === 0) {
      return jsonResponse({ error: 'messages required' }, 400, origin);
    }
    if (!['so', 'en', 'ar', 'sw'].includes(lang)) lang = 'so';

    // Sanitise + cap
    messages = messages
      .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .map(m => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS) }))
      .slice(-MAX_HISTORY_PAIRS * 2);

    // Ensure last is user
    if (messages.length === 0 || messages[messages.length - 1].role !== 'user') {
      return jsonResponse({ error: 'last message must be user' }, 400, origin);
    }

    // RAG-lite — find Beylood articles relevant to the latest user question
    const lastUser = messages[messages.length - 1].content;
    const relevant = rankArticles(lastUser, 4);
    const contextBlock = buildContextBlock(relevant);
    const system = SYSTEM_PROMPT_BASE + `\n\nUSER LANGUAGE: ${lang}` + contextBlock;

    // Call Anthropic
    let resp;
    try {
      resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system,
          messages
        })
      });
    } catch (err) {
      console.error('Anthropic fetch failed', err);
      return jsonResponse({ error: 'Upstream fetch failed' }, 502, origin);
    }

    if (!resp.ok) {
      const text = await resp.text().catch(() => '');
      console.error('Anthropic error', resp.status, text);
      return jsonResponse({ error: 'Upstream error', status: resp.status }, 502, origin);
    }

    const data = await resp.json();
    const reply = (data && data.content && data.content[0] && data.content[0].text) || '';

    // Return citations separately so the frontend can render them prettily
    const citations = relevant.map(a => ({ title: a.title, url: a.url, category: a.cat }));

    return jsonResponse({
      reply,
      citations,
      usage: data.usage || null
    }, 200, origin);
  }
};
