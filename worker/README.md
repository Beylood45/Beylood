# Beylood AI — Cloudflare Worker Deployment Guide

This worker is the secure proxy between **beylood.com** and **Anthropic Claude API**. It hides your API key, restricts CORS to your domain, applies rate limits, and enforces the Somali-agriculture system prompt.

You deploy it **once**, get a URL like `https://beylood-ai.YOUR-SUBDOMAIN.workers.dev`, then paste that URL into `ask.js`.

---

## Step 1 — Get an Anthropic API key

1. Go to https://console.anthropic.com/
2. Sign up (free $5 credit to start). Confirm email.
3. Settings → API Keys → **Create Key** → name it `beylood-ai`.
4. Copy the key (starts with `sk-ant-...`). **Save it somewhere safe — you only see it once.**

> Cost reality check: Claude Haiku is ~$0.25 per 1M input tokens, $1.25 per 1M output. A typical 200-word question + 300-word answer uses ~700 tokens total = roughly **$0.0008 per chat**. $5 credit covers ~6,000 chats.

## Step 2 — Sign up for Cloudflare (free)

1. Go to https://dash.cloudflare.com/sign-up — use your `mohamedshafiemohamed@gmail.com`.
2. Verify your email.
3. Don't add a domain or zone yet — Workers don't need one.

## Step 3 — Install Wrangler (Cloudflare's CLI)

In **PowerShell** on your computer:

```powershell
# Make sure you have Node.js 18+. Check with:
node --version
# If missing, install from https://nodejs.org/  (LTS version)

# Install Wrangler globally:
npm install -g wrangler

# Verify:
wrangler --version
```

## Step 4 — Deploy the worker

```powershell
# Go into the worker folder
cd "C:\Users\HP\OneDrive\Desktop\MY WEBSITE\BEYLOOD\worker"

# Log into Cloudflare (opens browser)
wrangler login

# Set your API key as a secret (will prompt you to paste it)
wrangler secret put ANTHROPIC_API_KEY
# Paste your sk-ant-... key, press Enter

# Deploy
wrangler deploy
```

You'll see output like:
```
Published beylood-ai
  https://beylood-ai.YOUR-SUBDOMAIN.workers.dev
```

**Copy that URL.** That's your endpoint.

## Step 5 — Wire it into ask.js

Open `ask.js` in your editor. Find line ~22:

```js
var AI_ENDPOINT = 'https://beylood-ai.YOUR-SUBDOMAIN.workers.dev/chat';
```

Replace `YOUR-SUBDOMAIN` with your actual Cloudflare subdomain. The full URL should look like:

```js
var AI_ENDPOINT = 'https://beylood-ai.shafie.workers.dev/chat';
```

(Note: leave `/chat` at the end — Worker accepts any path right now but `/chat` makes URLs readable.)

## Step 6 — Push and test

```powershell
cd "C:\Users\HP\OneDrive\Desktop\MY WEBSITE\BEYLOOD"
git add -A
git commit -m "feat: Launch Beylood AI live chat"
git push
```

Wait 2 minutes for Hostinger to deploy. Then go to https://beylood.com/ask.html and ask a question like:

> Sidee loo beero galleyda xilliga Gu' 2026?

You should get a real Somali response within 3–6 seconds.

---

## Operational notes

- **API costs are tiny** but watch your Anthropic dashboard the first week. Set a budget alert at $20 just in case.
- **Rate limit** is 10 requests per minute per IP. Adjust in `ai-worker.js` if needed.
- **System prompt** is in `ai-worker.js` lines ~28–55. Edit and re-`wrangler deploy` to change behavior.
- **Logs**: `wrangler tail` to see live request logs while debugging.
- **Update the worker**: edit `ai-worker.js`, run `wrangler deploy`. No git push needed for worker changes.

## Going further (optional)

- **Persistent rate limit**: switch from in-memory `rateMap` to Cloudflare KV.
- **Streaming**: use Server-Sent Events from Anthropic for word-by-word display.
- **Caching**: store frequent Q→A pairs in KV for instant replies + lower cost.
- **Analytics**: log to Cloudflare Workers Analytics or Plausible.

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `Origin not allowed` | You're testing on `localhost` or non-beylood domain | Add it to `ALLOWED_ORIGINS` in `ai-worker.js`, re-deploy |
| `401/403 from Anthropic` | Key wrong/expired | `wrangler secret put ANTHROPIC_API_KEY` again |
| Empty replies | Model output cut by `MAX_TOKENS` | Bump `MAX_TOKENS` to 1200 |
| "Too many requests" too fast | Heavy user testing | Adjust `RATE_LIMIT.maxReq` |

---

**Mahadsanid — la xidhiidh hadii aad caawimaad u baahato.**
