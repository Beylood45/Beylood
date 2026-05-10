// =============================================================================
// Beylood — ASK BEYLOOD chat API (Vercel serverless function)
//
// SAFETY REMINDER: Set a monthly spending limit at
//   console.anthropic.com → Plans & Billing → Spending Limit
// A starter limit of $50/month is reasonable for a new platform.
//
// Pricing reference (verify current rates at anthropic.com/pricing):
//   Claude Sonnet input:  ~$3 per 1M tokens
//   Claude Sonnet output: ~$15 per 1M tokens
//   A typical chat exchange: ~500-1500 tokens total.
// =============================================================================

import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// You can swap the model below to whatever current Sonnet is best for you.
// As of writing, claude-sonnet-4-5-20250929 is a stable Sonnet 4.5 release.
const MODEL = 'claude-sonnet-4-5-20250929';

const SYSTEM_PROMPT = `You are ASK BEYLOOD, the official AI assistant of Beylood — a trilingual agricultural knowledge platform serving Somalia, the Horn of Africa, and the Arab world.

Your role:
- Answer agricultural questions clearly and accurately
- Reply in the user's language (Somali, English, or Arabic)
- Tailor advice to arid and semi-arid climates when relevant
- Recommend local crops where appropriate: sorghum, maize, sesame, beans, vegetables, livestock fodder
- Provide practical, actionable steps a smallholder farmer can follow
- Always remind users to consult local agronomists for serious cases
- If you do not know something, say so honestly

Tone: Warm, professional, knowledgeable, supportive.
Avoid: medical advice, political opinions, off-topic discussions.`;

// ---------------------------------------------------------------------------
// Simple in-memory rate limit. Resets when the function instance restarts.
// For production with multiple regions/instances, swap to @upstash/ratelimit.
// ---------------------------------------------------------------------------
const MINUTE_LIMIT = 10;
const DAY_LIMIT = 100;
const minuteHits = new Map(); // ip -> { count, resetAt }
const dayHits = new Map();    // ip -> { count, resetAt }

function getClientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd.length > 0) {
    return fwd.split(',')[0].trim();
  }
  return req.headers['x-real-ip'] || 'unknown';
}

function bump(map, ip, windowMs, limit) {
  const now = Date.now();
  const entry = map.get(ip);
  if (!entry || entry.resetAt < now) {
    map.set(ip, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }
  if (entry.count >= limit) {
    return { ok: false, retryAfterMs: entry.resetAt - now };
  }
  entry.count += 1;
  return { ok: true, remaining: limit - entry.count };
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY is not set');
    return res.status(500).json({ error: 'Server is not configured. Please contact the site owner.' });
  }

  const ip = getClientIp(req);
  const minute = bump(minuteHits, ip, 60_000, MINUTE_LIMIT);
  if (!minute.ok) {
    return res.status(429).json({ error: 'You have reached the message limit. Please try again later.' });
  }
  const day = bump(dayHits, ip, 24 * 60 * 60_000, DAY_LIMIT);
  if (!day.ok) {
    return res.status(429).json({ error: 'You have reached the daily message limit. Please try again tomorrow.' });
  }

  // Parse body — Vercel parses JSON automatically when content-type is set.
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (_) { body = {}; }
  }
  const messages = Array.isArray(body?.messages) ? body.messages : null;
  if (!messages || messages.length === 0) {
    return res.status(400).json({ error: 'Missing messages' });
  }

  // Validate shape: each item must have role ("user" | "assistant") and string content.
  const cleaned = [];
  for (const m of messages) {
    if (!m || typeof m !== 'object') continue;
    const role = m.role === 'assistant' ? 'assistant' : 'user';
    const content = typeof m.content === 'string' ? m.content : '';
    if (!content) continue;
    cleaned.push({ role, content: content.slice(0, 4000) }); // cap user message length
  }
  if (cleaned.length === 0) {
    return res.status(400).json({ error: 'No valid messages' });
  }
  // Cap conversation history so prompts stay bounded.
  const history = cleaned.slice(-20);

  try {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1024,
      // System prompt with prompt caching — saves cost across the conversation.
      system: [
        {
          type: 'text',
          text: SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: history,
    });

    const reply =
      Array.isArray(response.content) && response.content[0]?.type === 'text'
        ? response.content[0].text
        : '';

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Anthropic API error:', error?.message || error);
    return res.status(500).json({ error: 'An error occurred. Please try again.' });
  }
}
