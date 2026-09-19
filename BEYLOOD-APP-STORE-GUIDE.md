# 📱 Beylood — Hage: Sida App-ka loogu Rakibo App Store (iOS) & Google Play (Android)

Website-kaagu **Beylood** hore ayuu u yahay **PWA buuxa oo "store-ready" ah** — waxaa dhammaystiran manifest, icons (192/512/maskable), screenshots, shortcuts, service worker offline ah, iyo theme. Micnaha: si toos ah ayaa app loogu samayn karaa labada store isaga oo aan dib loo qorin website cusub.

Dokumentigan wuxuu kuu sharxayaa tallaabo-tallaabo sida loo sameeyo.

---

## 1) Sida ay u shaqayso (fikradda guud)

App-kaagu wuxuu noqon doonaa **"wrapper"** — sanduuq yar oo native ah oo qaada website-kaaga oo ka dhiga app dhab ah:

- **Android (Google Play):** waxaa la isticmaalaa **TWA (Trusted Web Activity)** — app aan lahayn URL bar, oo isku dhafan website-kaaga.
- **iOS (App Store):** waxaa la isticmaalaa **WKWebView wrapper** (Apple ma ogola PWA saafi ah oo store gasha, sidaa darteed waa in la duubaa).

Qalabka ugu fudud oo labadan sameeya **BILAASH**: **PWABuilder.com** (Microsoft). Waxay qaadataa URL-kaaga (`https://beylood.com`) oo dhaliya labada package oo diyaar u ah gudbin.

---

## 2) Waxa aad u baahan tahay (kharashka & akoonnada)

| Shayga | Android (Google Play) | iOS (App Store) |
|---|---|---|
| Akoon developer | **Google Play Console — $25 (hal mar oo keliya)** | **Apple Developer — $99/sannad** |
| Kombiyuutar | Windows/Mac (mid kasta) | **Mac lama huraan** (Xcode) — ama macluul cloud Mac ah |
| Waqti ansixin (review) | Saacado – 2 maalmood | 1 – 3 maalmood |
| Qalab | PWABuilder (bilaash) | PWABuilder + Xcode (bilaash) |

> 💡 **Talo:** Bilow Android — wuu ka jaban yahay, kama baahna Mac, wuuna ka dhaqso badan yahay. iOS ka dib.

---

## 3) ANDROID — Google Play (tallaabo-tallaabo)

### Tallaabada 1 — Package-ka samee
1. Aad [**PWABuilder.com**](https://www.pwabuilder.com)
2. Geli URL-kaaga: `https://beylood.com`
3. Riix **Start** → wuxuu baari doonaa PWA-gaaga (waa inuu dhaliyaa buundo sare — 100% diyaar).
4. Riix **Package for stores → Android → Google Play**
5. Hubi **Package ID**: `com.beylood.app` (waa inuu la mid noqdaa kan `assetlinks.json`).
6. Riix **Download** → waxaad heli doontaa:
   - `.aab` (faylka Google Play loo gudbiyo)
   - `.apk` (tijaabo)
   - **`assetlinks.json`** (faylka saxda ah oo leh fingerprint-kaaga dhabta ah)
   - `signing key` (`.keystore`) — **ILAALI OO KAYDSO! Haddii aad lumiso ma cusboonaysiin kartid app-ka.**

### Tallaabada 2 — assetlinks.json ku rakib website-ka
1. Fur faylka `assetlinks.json` ee PWABuilder ku siiyay.
2. Beddel kan aan hore kuugu diyaariyay: `.well-known/assetlinks.json` (koobiyee waxa PWABuilder bixiyay — waxaa ku jira `sha256_cert_fingerprints` dhabta ah).
3. Push oo deploy — hubi inuu ka furmo: `https://beylood.com/.well-known/assetlinks.json`
   > Tan la'aanteed, app-ku wuxuu muujin doonaa URL bar (ma noqon doono "full-screen app").

### Tallaabada 3 — Google Play Console
1. Ku diiwaan gasho [**Google Play Console**](https://play.google.com/console) → bixi $25.
2. **Create app** → magaca "Beylood", luqadda, nooca "App", "Free".
3. Soo geli **`.aab`** faylka (Production → Create release).
4. Buuxi liiska store-ka (eeg qeybta 5 hoose).
5. Gudbi ansixinta → sug 1–2 maalmood.

---

## 4) iOS — Apple App Store (tallaabo-tallaabo)

> ⚠️ Waxaad u baahan tahay **Mac** (Xcode) iyo akoon **Apple Developer ($99/sannad)**.

### Tallaabada 1 — Package-ka samee
1. [**PWABuilder.com**](https://www.pwabuilder.com) → geli `https://beylood.com`
2. **Package for stores → iOS**
3. Download → waxaad heli doontaa **Xcode project** (folder).

### Tallaabada 2 — Xcode (Mac)
1. Fur project-ka Xcode.
2. Geli **Bundle ID**: `com.beylood.app`
3. Ku xir akoonkaaga Apple Developer (Signing & Capabilities).
4. **Product → Archive** → **Distribute App → App Store Connect**.

### Tallaabada 3 — App Store Connect
1. [**App Store Connect**](https://appstoreconnect.apple.com) → **+ New App**
2. Magaca, luqadda, Bundle ID `com.beylood.app`.
3. Buuxi liiska (qeybta 5) → soo geli screenshots iOS ah.
4. **Submit for Review** → sug 1–3 maalmood.

---

## 5) Waxyaabaha Liiska Store-ka loo baahan yahay

Diyaari kuwan (Soomaali + Ingiriisi wanaagsan):

- **Magaca app-ka:** Beylood — Aqoonta Beeraha
- **Sharraxaad gaaban** (80 xaraf): _"Aqoonta beeraha, warar, caawiye AI iyo qalab beereed — 4 luqadood."_
- **Sharraxaad dheer:** isticmaal tan manifest-ka + tus: maqaallo 100+, Waydii Beylood AI, Jadwalka Beeritaanka, Beertayda, Xisaabiyaha, Cimilada, akhris offline.
- **Icon 512×512** (waa ku jira: `assets/icon-512.png`)
- **Feature graphic 1024×500** (Android — waa in la sameeyaa)
- **Screenshots:**
  - Android: ugu yaraan 2 (waa ku jira `assets/screenshot-narrow.png`)
  - iOS: 6.7" iyo 5.5" (waa in la sameeyaa — ka qaad telefoon ama simulator)
- **Category:** Education / Agriculture
- **Privacy Policy URL:** `https://beylood.com/privacy.html` ✅ (waad haysataa)
- **Content rating:** Everyone / 4+

---

## 6) Talooyin muhiim ah

- 🔑 **Signing key (.keystore) ilaali meel badbaado leh** + koobi kaydi. Waa furaha app-kaaga; lumintiisu waxay ku qasbaysaa inaad app cusub samayso.
- 📧 Isticmaal isku email (`mohamedshafiemohamed@gmail.com`) akoonnada developer si aad maamul ugu fududaato.
- 🔄 Marka aad website-ka cusboonaysiiso, **app-ku si toos ah ayuu u cusboonaadaa** (maxaa yeelay wuxuu ka akhriyaa beylood.com) — uma baahnid inaad store dib ugu gudbiso wixi bedelaadda content ah! Kaliya haddii aad bedesho icon/magaca ayaad dib u gudbin.
- 🧪 Marka hore tijaabi `.apk`-ga telefoon Android ah ka hor intaadan Play u gudbin.

---

## 7) Xulasho kale (haddii aadan hadda rabin store-ka)

App-kaagu **hadda wuu shaqeeyaa** iyada oo aan store loo baahnayn:
- **Android/Chrome:** booqdaha wuxuu arki doonaa "Rakib App-ka" ama "Add to Home Screen".
- **iPhone/Safari:** Share → "Add to Home Screen".

Tani waa bilaash, dhaqso, oo hadda diyaar ah — laakiin kuma jirto store-yada raadinta.

---

## Kooban (Checklist)

- [x] PWA store-ready (manifest, icons, screenshots, offline) ✅
- [x] `.well-known/assetlinks.json` template la sameeyay ✅
- [ ] PWABuilder → Android package + assetlinks.json dhabta ah
- [ ] assetlinks.json dhabta ah deploy garee
- [ ] Google Play Console ($25) → gudbi `.aab`
- [ ] (Mac) PWABuilder → iOS → Xcode → App Store Connect ($99/sannad)
- [ ] Feature graphic + iOS screenshots samee
- [ ] Gudbi labada store → sug ansixinta

---

_Su'aal kasta oo farsamo ah, waan kaa caawin karaa — tusaale: manifest-ka wax ka bedel, icon cusub, ama diyaarinta screenshots-ka._
