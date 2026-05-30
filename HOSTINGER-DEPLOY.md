# Beylood — Hostinger Deployment Guide

> Hostinger is now the only production host for this site.
> Vercel is no longer used.

## Upload to `public_html`

Upload every file in this folder **except** the items in the "Do NOT upload" list below.

The easiest path is:

1. In File Manager on Hostinger, open `public_html`.
2. Make sure `public_html` is empty (delete the default `index.php`).
3. Zip this whole folder locally **excluding** the items below, then upload the zip and use Hostinger's "Extract" action.
4. After extraction, confirm `index.html` is in the root of `public_html`.

## What gets uploaded

```
public_html/
├── .htaccess                  ← Apache/LiteSpeed config (REQUIRED)
├── index.html                 ← Homepage
├── 404.html                   ← Custom 404 page (referenced by .htaccess)
├── about.html
├── ask.html
├── articles.html
├── categories.html
├── contact.html
├── dashboard.html
├── admin.html
├── news.html
├── signin.html
├── signup.html
├── article-*.html             ← 40+ article pages
├── category-*.html            ← 6 category pages
├── pest-*.html / disease-*.html
├── news-*.html                ← news detail pages
├── style.css
├── script.js
├── analytics.js               ← GA4 loader
├── analytics-config.js        ← GA4 Measurement ID
├── auth.js                    ← Firebase Auth client
├── firebase-init.js           ← Firebase config
├── cover-images.js            ← Unsplash cover photos
├── admin.js / admin.css       ← Admin dashboard
├── dashboard.js               ← User dashboard
├── sitemap.xml
├── robots.txt
└── assets/                    ← logo, icon, images
```

## Do NOT upload these

These files are not used in production and should be excluded from your upload:

```
.git/                          ← Git history (private)
.github/                       ← GitHub actions
.claude/                       ← Editor / agent files
.vercel/                       ← Old Vercel build cache
node_modules/                  ← npm dependencies (not needed)
package.json                   ← Dev-only
package-lock.json              ← Dev-only
vercel.json                    ← Deprecated, no longer used
firestore.rules                ← Goes in Firebase Console, not on the web server
HOSTINGER-DEPLOY.md            ← This guide
README.md                      ← Optional internal notes
gen_articles.py                ← Build script
content_*.py                   ← Build scripts
.env / .env.local              ← Secrets — never upload
```

## After uploading

### 1. Force HTTPS

In Hostinger panel → SSL → enable **Force HTTPS**. The `.htaccess` already
includes an HTTPS-redirect rule for browsers that miss the panel setting.

### 2. Configure your domain

Point your domain DNS at Hostinger (your nameservers should already be set
during hosting setup). Make sure both `beylood.com` and `www.beylood.com`
land on the site.

### 3. Test the key pages

* `https://beylood.com/` → homepage
* `https://beylood.com/categories.html` → 6 category cards
* `https://beylood.com/category-soil.html` → 10 soil articles
* `https://beylood.com/articles.html` → all articles
* `https://beylood.com/sitemap.xml` → XML index
* `https://beylood.com/robots.txt` → robots file
* `https://beylood.com/aanjirin.html` → custom 404 page

### 4. Firebase

Firebase is unchanged by the move:

* **Authorized domains** in Firebase Console → Authentication → Settings:
  add `beylood.com` and `www.beylood.com` (remove the old Vercel domains
  if you wish).
* **Firestore Rules** (in Firebase Console) — already updated to support
  the admin dashboard.
* **OAuth client** (Google sign-in) — add your new origin
  `https://beylood.com` in Google Cloud → APIs → Credentials → OAuth client
  → Authorized JavaScript origins.

### 5. Google Analytics

The site already has GA4 (`G-YX4ZHPHQDB`). The first visits after
deployment will appear in `analytics.google.com → Realtime` within a
minute.

### 6. Google Search Console

* Add `beylood.com` as a property.
* Submit `https://beylood.com/sitemap.xml`.

## Updating the site later

* Edit a file locally.
* Upload the modified file via Hostinger File Manager (or FTP) to the
  same path under `public_html`.
* Browsers cache CSS/JS for 30 days — if you change `style.css` or a JS
  file and want users to see it immediately, bump a query string in the
  `<script>` / `<link>` tag (e.g. `style.css?v=2`).
