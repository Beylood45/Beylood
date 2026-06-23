# Beylood AI Chatbot — Free Deployment Guide

**100% free implementation.** No paid APIs (Anthropic, OpenAI, Gemini) are used. The chatbot searches the local Beylood knowledge base (`chatbot-knowledge.js`) and saves chat history to Firebase Firestore — which you already have on the free tier.

> **The `worker/` folder is no longer required.** The Cloudflare Worker proxy was used by an earlier version that called the Anthropic API. You can ignore (or delete) `worker/ai-worker.js`, `worker/articles-data.js`, `worker/wrangler.toml`, and `worker/README.md` — they are NOT active in the current build.

---

## Architecture (free version)

```
┌──────────────────────┐
│  beylood.com         │
│  /ask.html           │
│                      │
│  Browser loads:      │
│   • chatbot-         │
│     knowledge.js     │  ← 40+ Beylood articles (4 langs each)
│   • ask.js           │  ← Search engine + UI logic
│                      │
└─────────┬────────────┘
          │
          │ Firebase SDK (optional, for signed-in users)
          ▼
┌────────────────────────┐
│ Firebase Firestore     │
│ (free tier)            │
│ • /users/{uid}/chats/  │  ← Chat history per user
│ • /stats/aiStats       │  ← Admin dashboard counters
└────────────────────────┘
```

Everything runs in the user's browser. No server. No API. No keys.

---

## What was implemented

### Search engine (in `chatbot-knowledge.js`)

- **40+ Beylood articles** with title, summary, and full answer in **Somali, English, Arabic, Swahili**
- **Keyword index** for each article (mixes all four languages)
- **Stop-word filter** in all four languages so common words don't pollute scoring
- **Scoring algorithm**:
  - Title match → +10
  - Keyword match → +8 (phrase) / +6 (token)
  - Summary match → +2
  - Category match → +3
- **Greeting / thanks / no-match** canned responses per language
- **Language auto-detection** from the user's question text

### Chat UI (`ask.js` + `ask.html` + `ask.css`)

- Anonymous chat works immediately
- Suggested question chips
- Copy-to-clipboard per bot reply
- Mobile responsive + dark mode
- XSS-safe markdown rendering (textContent + whitelist)
- Past conversations panel (signed-in users)
- "New chat" button

### Firestore integration (`ask.js`)

- Saves chat title + messages to `/users/{uid}/chats/{chatId}/messages`
- Bumps `/stats/aiStats` for the admin dashboard
- Bumps `/stats/aiDaily-YYYY-MM-DD` for daily counters
- Rules already updated in `firestore.rules` to allow these writes safely

### Admin dashboard (`admin.html` + `admin.js`)

- New "AI Chat Statistics" section
- Total chats, total messages, today's chats, avg messages/chat
- "Most Common Topics" — clusters chat titles into 20 buckets

---

## Deployment — 4 steps, ~10 minutes total

### Step 1 — Publish Firestore rules (2 min)

1. Open Firebase Console → your project → **Firestore** → **Rules**
2. Copy the contents of `firestore.rules` and paste over the editor
3. Click **Publish**

This allows signed-in users to save their chats and lets admins read everyone's chats for the stats dashboard.

### Step 2 — Push to GitHub (2 min)

```powershell
cd "C:\Users\HP\OneDrive\Desktop\MY WEBSITE\BEYLOOD"
git add -A
git commit -m "feat: Launch 100% free Beylood AI chatbot"
git push
```

### Step 3 — Wait for Hostinger auto-deploy (2 min)

Hostinger's Git auto-deploy pulls the changes. No other configuration needed.

### Step 4 — Test (4 min)

Open `https://beylood.com/ask.html` in an incognito window.

**Test 1 — Greeting (Somali):**
> "Salaan"

Expected: Friendly greeting + suggested questions.

**Test 2 — Article search (Somali):**
> "Sidee loo beero galleyda?"

Expected: A full answer drawn from the Maize Farming article, with a link to the article + 2 related articles.

**Test 3 — Multilingual (English):**
> "How to control whiteflies?"

Expected: An English answer from the Whiteflies article.

**Test 4 — Arabic:**
> "كيف أحمي الطماطم من الأمراض؟"

Expected: Arabic answer.

**Test 5 — No match:**
> "Heavy metal music"

Expected: A polite fallback in the user's language pointing them to common topics.

**Test 6 — Signed-in history:**

1. Sign in via the navbar
2. Send 2-3 chats
3. Refresh the page
4. Click **Wadahadalladii hore** → see all saved chats
5. Click a past chat → it reloads the messages

**Test 7 — Admin stats:**

Visit `https://beylood.com/admin.html` (must be an admin).  
Scroll to the **AI Chat Statistics** section — counters should reflect the test chats.

---

## Cost

| Service | Free tier | Beylood usage | Verdict |
|---|---|---|---|
| Hostinger | Already paid | n/a | $0 extra |
| Firebase Auth | Free | < 50k MAU | $0 |
| Firestore reads | 50k/day free | ~1-5 reads/chat | $0 |
| Firestore writes | 20k/day free | ~3 writes/chat | $0 |
| Browser compute | Free | Search runs locally | $0 |
| **Total** | | | **$0/month** |

You can serve **thousands of chats per day** without paying a cent.

---

## How to add new articles to the chatbot's knowledge

Edit `chatbot-knowledge.js` and append a new object to the `KNOWLEDGE` array. Template:

```js
{
  slug: 'my-new-article',
  cat: 'crops',                          // crops, irrigation, soil, climate, pests, livestock, tech, news
  url: 'article-my-new-article.html',
  title:   { so: '...', en: '...', ar: '...', sw: '...' },
  summary: { so: '...', en: '...', ar: '...', sw: '...' },   // 2–3 sentences each
  answer:  { so: '...', en: '...', ar: '...', sw: '...' },   // Full paragraph or bullet list
  keywords: ['keyword1','keyword2','beero sample','...']
}
```

Then push to git — Hostinger auto-deploys. No worker re-deployment, no API key rotation.

---

## How to add Firestore-backed knowledge (optional future upgrade)

If you ever want the knowledge base to live in Firestore (so admins can edit articles without a code push), here's the migration plan:

1. Create an `articles` collection in Firestore — one doc per article.
2. Add to `firestore.rules`: `match /articles/{slug} { allow read: if true; allow write: if isAdmin(); }`
3. In `ask.js`, replace `window.BeyloodKnowledge.KNOWLEDGE` with a one-time `getDocs(collection(db,'articles'))` fetch on page load. Cache in `localStorage`.
4. Build an admin UI to add/edit articles (you already have `admin.html`).

But for now, the JS-file approach is cheaper, faster, and simpler.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| "BeyloodKnowledge not loaded" in console | Script order wrong | Make sure `chatbot-knowledge.js` loads BEFORE `ask.js` in `ask.html` |
| Bot replies but doesn't save | Not signed in | Sign in via navbar; chats save only for authenticated users |
| Permission denied on Firestore | Rules not published | Re-paste rules in Firebase Console → Publish |
| Admin shows 0 stats | No chats yet | Have a signed-in user send chats; stats update |
| Wrong language replies | Detection fallback | Click the language switcher in the navbar; or include English keywords in your question |

---

**Mahadsanid. Nasiib wanaag!**
