# Beylood — Hage Deploy & Tijaabo (Go-Live Checklist)

Taariikh: 2026 · Hosting: **Hostinger** · Domain: **beylood.com**

Hagahani wuxuu ku hagayaa sida aad website-ka cusub ee Beylood ugu geyso internetka, kadibna aad u hubiso in wax walba — gaar ahaan **PWA (App-ka)** iyo **chatbot-ka** — ay si sax ah u shaqeeyaan.

> **Muhiim:** PWA-gu (service worker, install, offline) **waxuu KALIYA ku shaqeeyaa HTTPS live** (beylood.com). Kuma shaqeeyo marka aad `file://` furto kombuyuutarka. Sidaa darteed waa in la geeyaa Hostinger ka hor tijaabada.

---

## 0. Natiijada hubinta ka-hor-deployment (waa la dhammeeyay ✓)

- ✓ Dhammaan faylasha PWA way jiraan (manifest, sw.js, pwa.js, offline.html, icons, screenshots).
- ✓ Dhammaan fonts-ka & faylasha la precache-gareeyay way jiraan.
- ✓ manifest + pwa.js waxay saaran yihiin **97-da bog**.
- ✓ manifest.json = JSON sax ah · sw.js & pwa.js = syntax OK.
- ✓ Maqaalka cusub (Masago) iyo chatbot-ka la casriyeeyay way diyaar yihiin.

---

## 1. Faylasha la geynayo Hostinger

Geli **dhammaan** faylasha galka `BEYLOOD` una geli galka `public_html` ee Hostinger.

**Faylasha CUSUB ee la geynayo (hubi inaad geyso):**

```
manifest.json
sw.js
pwa.js
offline.html
article-sorghum-farming.html
.htaccess                (la cusboonaysiiyay)
assets/icon-192.png
assets/icon-512.png
assets/icon-maskable-512.png
assets/screenshot-wide.png
assets/screenshot-narrow.png
```

Waxaad sidoo kale geyneysaa faylasha la beddelay: `chatbot-knowledge.js`, `ask.js`, `ask.css`, `articles.html`, `category-crops.html`, `sitemap.xml`, `cover-images.js`, `style.css`, iyo dhammaan `*.html` (manifest+pwa lagu daray).

Habka ugu fudud: **geli/replace dhammaan faylasha** (upload all, overwrite).

**HA GEYNIN (lama baahna Hostinger):**

```
node_modules/         (haddii ay jirto)
.git/  .claude/        (folder-rada qarsoon)
package.json  package-lock.json
api/                   (Vercel function — Hostinger ma wado; chatbot-ku wuxuu isticmaalaa chatbot-knowledge.js)
BEYLOOD-DEPLOY-GUIDE.md  (kan — .htaccess horeba wuu xannibayaa .md)
```

---

## 2. Sida loo geeyo (2 waddo)

**A) Hostinger File Manager (fudud):**
1. hPanel → **File Manager** → gal `public_html`.
2. Upload → dooro faylasha (ama ZIP oo aad halkaas ku furto).
3. Marka la weydiiyo "overwrite" → **Yes**.

**B) FTP (FileZilla):**
1. Isku xidh iyadoo la adeegsanayo FTP-ga Hostinger (Host, Username, Password ka hPanel).
2. Ku tuur faylasha `public_html`.

---

## 3. Ka dib deployment — bilowga

1. Fur `https://beylood.com` browser cusub (ama Incognito).
2. **Hard refresh:** `Ctrl + Shift + R` (Windows) / `Cmd + Shift + R` (Mac) — si cache-ka hore looga saaro.
3. Sug 10–20 ilbiriqsi si service worker-ku u rakibmo.

---

## 4. Tijaabada PWA (Chrome DevTools)

Fur DevTools: `F12` → tab **Application**.

- [ ] **Manifest** (dhinaca bidix): hubi magaca "Beylood", icons, screenshots, shortcuts — wax cas (error) ha jirin.
- [ ] **Service Workers**: waa inaad aragto `sw.js` oo **activated and running**.
- [ ] **Cache Storage**: waa inaad aragto `beylood-shell-v2...`, `beylood-static...`, iwm.

### Lighthouse (score 95+)
1. DevTools → tab **Lighthouse**.
2. Dooro **Progressive Web App** (+ Performance).
3. **Analyze page load** → sug natiijada.
4. Hubi: "Installable" ✓ · "PWA Optimized" ✓. Bartilmaameedku waa **95+**.

---

## 5. Tijaabada Install (App-ka)

**Android/Chrome:** fur beylood.com → waa inaad aragto banner **"Rakib App-ka"** (ama menu → Install app). Guji → app-ku wuxuu u soo baxaa sida app dhab ah oo splash screen leh.

**Desktop Chrome/Edge:** astaanta ⊕ ee URL bar → **Install**.

**iPhone/Safari:** Share → **Add to Home Screen** (iOS ma laha auto-banner — tani waa caadi).

- [ ] App-ku wuu rakibmaa oo icon-ku wuu muuqdaa.
- [ ] Marka la furo, splash screen (logo + spinner) ayaa soo baxa.
- [ ] Shortcuts (riix-hay icon-ka): "Waydii AI", "Maqaallo", "Wararka".

---

## 6. Tijaabada Offline

1. DevTools → **Network** tab → beddel **"No throttling"** → **Offline**. (ama dami WiFi-ga)
2. Dib u cusboonaysii bogga → waa inuu furmaa (ma aha cilad dinosaur ah).
3. Bog aadan hore u booqan → waa inuu tusaa **offline.html** oo branded ah.

**Kaydinta offline:**
- [ ] Fur maqaal (tusaale Masago) → guji **"Kaydi offline"**.
- [ ] Noqo Offline → dib u fur maqaalka → wuu furmaa.
- [ ] `offline.html` wuxuu tusaa liiska maqaallada la kaydiyay.

---

## 7. Tijaabada Chatbot (ask.html)

Fur `beylood.com/ask.html` oo tijaabi:

- [ ] `masago` → jawaab Masago (qoraalku erey-erey ayuu u soo baxaa — typewriter).
- [ ] `how do I grow sorghum` (Ingiriis) → jawaab sax ah.
- [ ] `galley` iyo `maize planting` → labaduba galley.
- [ ] Talooyinka xiga (follow-up chips) ka muuqdaan jawaabta hoosteeda.
- [ ] Badhanka luqadda (SO→EN→AR→SW) wuu shaqeeyaa.

---

## 8. Tijaabada Update Detection

Si aad u hubiso "New version available":
1. `sw.js` → beddel `VERSION` (tusaale `v2-...` → `v3-...`).
2. Geli Hostinger.
3. Fur website-ka mar labaad → waa inuu soo baxaa toast **"Nooc cusub ayaa diyaar ah → Cusboonaysii"**.

---

## 9. Hubinta guud (lama jabin)

- [ ] Login/Signup (Firebase) weli wuu shaqeeyaa.
- [ ] Admin page weli wuu shaqeeyaa.
- [ ] Analytics (GA4) weli diiwaan gelinaya.
- [ ] Midabada & naqshadda isma beddelin.
- [ ] Luqadaha 4 (SO/EN/AR/SW) dhammaan bogagga wey shaqeeyaan.

---

## 10. Mustaqbalka (ikhtiyaari)

- **Push Notifications:** hadda waa DEMMAN. Si aad u shidato: samee VAPID keys, geli `VAPID_PUBLIC_KEY` gudaha `pwa.js`, kana dhig `PUSH_ENABLED = true`, samee backend yar oo dira notifications.
- **AI dhab ah (Claude):** `api/chat.js` waa diyaar — u baahan Vercel/Cloudflare backend + API key.

---

### Xasuusin
Marka aad wax kasta beddesho oo aad geyso, had iyo jeer **kor u qaad `VERSION` gudaha `sw.js`** si isticmaaleyaashu u helaan nooca cusub isla markiiba.
