# 🖥️ Beylood — Hagaha Microsoft Store (Windows PC)

App-ka rasmiga ah ee **Beylood** wuxuu ku shaqeeyaa Windows 10 iyo Windows 11. Waxaa loo sameynayaa **PWABuilder** iyo website-kaaga `https://beylood.com`. Website-ka cusub looma baahna: app-ku wuxuu isticmaalaa isla bogagga, login-ka iyo Firebase-ka. Mar kasta oo aad website-ka cusboonaysiiso, app-kuna wuu cusboonaysiimaa.

| Shayga | Kharashka |
|---|---|
| Akoon developer shakhsi ah (Microsoft Store) | **Bilaash** (Sebtembar 2025 ilaa hadda) |
| PWABuilder | Bilaash |
| Kombiyuutar | Windows PC kasta |
| Waqtiga ansixinta | Badanaa dhowr maalmood |

> ✅ Website-ka waxaa horey loogu diyaariyay app-ka:
> - **`manifest.json`**: `orientation: any` (daaqadda PC-ga), `dir: auto` (Carabi RTL) iyo `edge_side_panel`.
> - **`pwa.js`**: badhanka "Ka hel Microsoft Store" ayaa diyaar ah, wuxuuna isaga u soo bixi doonaa isticmaalayaasha Windows marka aad geliso Store ID-ga (Tallaabada 6).

---

## Tallaabada 1: Is-diiwaangeli (bilaash)

1. Fur **https://storedeveloper.microsoft.com**, kadib riix **Get started / Sign up**.
2. Ku gal **akoon Microsoft shakhsi ah** (Outlook/Hotmail/Live). Kaarka bangiga looma baahna.
3. Dooro **Individual developer**.
4. Xaqiiji aqoonsigaaga: **sawirka kaarka aqoonsiga (baasaboor ama ID)** iyo **selfie**. Tan adiga ayaa samaynaya. Anigu ma geli karo aqoonsi ama password.
5. Magaca daabacaha (Publisher display name): `Beylood`. Haddii uu qabsaday, dooro `Beylood Agriculture`.

## Tallaabada 2: Magaca app-ka u xiro (Partner Center)

1. **Partner Center → Apps and games → + New product → MSIX or PWA app**.
2. Magaca: **`Beylood`**. Haddii la qaatay, isticmaal **`Beylood — Aqoonta Beeraha`**.
3. Fur **Product management → Product identity** oo koobiyee 3-dan qiime (waxaad u baahan doontaa Tallaabada 3):
   - **Package ID**, tusaale: `12345Beylood.Beylood`
   - **Publisher ID**, tusaale: `CN=XXXXXXXX-XXXX-...`
   - **Publisher display name**, tusaale: `Beylood`

## Tallaabada 3: Package-ka ka samee PWABuilder

> Marka hore **push** samee si isbeddellada `manifest.json` iyo `pwa.js` ay website-ka live-ka ah u galaan.

1. Fur **https://www.pwabuilder.com**, geli `https://beylood.com`, kadib riix **Start**.
2. Hubi in **Manifest**, **Service Worker** iyo **Security (HTTPS)** ay cagaar yihiin.
3. Riix **Package For Stores → Windows → Generate Package**.
4. Buuxi:
   - **Package ID / Publisher ID / Publisher display name**: kuwa Tallaabada 2 (si sax ah u koobiyee).
   - **App name**: `Beylood`
   - **App version**: `1.0.0`, iyo **Classic package version**: `0.9.0` (waa inuu ka yaraadaa).
   - **Language**: `so` (haddii aan la aqbalin, `en-us`).
5. **Download**. Zip-ka waxaa ku jira:
   - `Beylood.msixbundle`
   - `Beylood.classic.appxbundle`
   - Faylasha tijaabada (`install.ps1`)
6. **Tijaabi PC-gaaga:** zip-ka fur oo raac `readme`-ga (install.ps1). Hubi in login-ka, Beertayda, AI-ga iyo afarta luqadood ay shaqaynayaan.

## Tallaabada 4: Sawirrada shaashadda (screenshots)

Store-ku wuxuu u baahan yahay **ugu yaraan 1 sawir**. Waxaa lagula talinayaa 4 ilaa 6 sawir oo **PNG** ah, cabbirkooduna yahay **1366×768 ama ka weyn** (1920×1080 ayaa ugu fiican).

1. App-ka la rakibay (ama Edge) fur shaashad buuxda adigoo riixaya **F11**.
2. Riix **Win + Shift + S** oo qabo shaashadda oo dhan, kadib ku kaydi PNG ahaan.
3. Bogagga lagula talinayo:
   - Bogga hore
   - Beertayda
   - Waydii AI
   - Cimilada
   - Xisaabiyeyaasha
   - Maqaal (tusaale yaanyada)
4. ⚠️ Sawirrada ha ku darin xog shakhsi ah (email-kaaga, magacaaga).

> Faylasha `assets/screenshot-wide.png` (1280×720) iyo `assets/screenshot-narrow.png` waa sawirro tusaale ah oo yaryar. Store-ka ha u isticmaalin. Waxaad ku beddeli kartaa sawirradaada cusub (magacyada ha beddelin).

## Tallaabada 5: Buuxi submission-ka (Partner Center)

1. **Pricing and availability**: **Free**, oo dooro dhammaan suuqyada (ama kuwa aad rabto).
2. **Properties**:
   - Category: **Education**, subcategory haddii la bixiyo.
   - Privacy policy URL: `https://beylood.com/privacy.html`
   - Website: `https://beylood.com`
   - Support contact: `https://beylood.com/contact.html`
3. **Age ratings (IARC questionnaire)**: si daacad ah uga jawaab. Jawaabaha la filayo:
   - App-ku waa **waxbarasho**. Rabshad, khamaar, iyo wax galmo ah ma leh.
   - **Isticmaalayaashu way is-diiwaangelin karaan** (akoon), waxayna isticmaali karaan **caawiye AI ah**.
   - Isticmaalayaashu **iskama wada xiriiraan** gudaha app-ka, waxna dadweynaha uma daabacaan. Marketplace-ku wali waa "Dhawaan".
   - Goobta (location): kaliya haddii isticmaaluhu u oggolaado bogga Cimilada.
4. **Packages**: soo geli **labadaba**, `Beylood.msixbundle` iyo `Beylood.classic.appxbundle`.
5. **Store listings**: ku dar luqadaha **English**, **Arabic**, **Swahili**, iyo **Somali** haddii la bixiyo. Ku koobiyee qoraalka qaybta hoose, kuna dar sawirrada.
6. **Submit to the Store**, kadib sug ansixinta. Email ayaa laguu soo diri doonaa.

## Tallaabada 6: Kadib ansixinta (adiga ama aniga)

1. Partner Center-ka ka koobiyee **Store ID**-ga (tusaale `9NXXXXXXXXXX`).
2. Fur `pwa.js` oo geli ID-ga:
   ```js
   var MS_STORE_ID = '9NXXXXXXXXXX';
   ```
   Badhanka **"Ka hel Microsoft Store"** wuxuu u soo bixi doonaa isticmaalayaasha Windows daaqadda rakibka.
3. `manifest.json` ku dar:
   ```json
   "related_applications": [{ "platform": "windows", "url": "https://apps.microsoft.com/detail/9NXXXXXXXXXX", "id": "9NXXXXXXXXXX" }]
   ```
4. Push samee. Haddii aad doonto, ii soo dir ID-ga, anigaa geliya.

**Cusboonaysiinta app-ka:** isbeddellada website-ka si toos ah ayay app-ka u galaan. Package cusub (version `1.0.1`) waxaa loo baahan yahay oo kaliya marka aad beddesho magaca, astaanta (icon) ama manifest-ka.

---

# 📝 Qoraalka Store-ka (koobi oo dhig)

## English

**Product name:** Beylood

**Short description:** Farming knowledge for the Horn of Africa: expert guides, an AI farm assistant, weather, calculators, and offline reading in 4 languages.

**Description:**
Beylood is a free agriculture knowledge platform built for farmers, herders and students in Somalia and the Horn of Africa.

• 100+ practical guides on crops, irrigation, soil, livestock, pests and diseases, reviewed for accuracy
• Beylood AI assistant: ask farming questions in Somali, English, Arabic or Swahili
• Beertayda (My Farm): plan your fields, crops and seasons
• Farm calculators: seed, fertilizer, water and profit
• Weather and a seasonal crop calendar for Gu' and Deyr
• Agriculture news with links to official sources (FAO, SWALIM, FSNAU)
• Save articles and read them offline
• Available in 4 languages: Somali, English, Arabic and Swahili

**Features (one per line):**
4 languages: Somali, English, Arabic, Swahili
AI farm assistant
100+ farming guides
Farm calculators
Weather and crop calendar
Offline reading

**Keywords:** agriculture, farming, Somalia, livestock, irrigation, crops, Somali, beeraha

## Af-Soomaali

**Short description:** Aqoonta beeraha ee Geeska Afrika: hagayaal xirfadeed, caawiye AI, cimilada, xisaabiyeyaal iyo akhris offline ah oo ku jira 4 luqadood.

**Description:**
Beylood waa madal aqoonta beeraha oo bilaash ah, loogu talagalay beeralayda, xoolo-dhaqatada iyo ardayda Soomaaliya iyo Geeska Afrika.

• In ka badan 100 hage oo ku saabsan dalagyada, waraabinta, ciidda, xoolaha, cayayaanka iyo cudurrada, oo xogtooda la hubiyay
• Caawiyaha Beylood AI: su'aalaha beeraha ku weydii Af-Soomaali, Ingiriisi, Carabi ama Sawaaxili
• Beertayda: qorshee beertaada, dalagyada iyo xilliyada
• Xisaabiyeyaal: abuurka, bacriminta, biyaha iyo faa'iidada
• Cimilada iyo jadwalka dalagyada ee Gu' iyo Deyr
• Wararka beeraha oo leh xiriirro ilo rasmi ah (FAO, SWALIM, FSNAU)
• Maqaallada kaydi oo offline ku akhri

## العربية

**الوصف القصير:** المعرفة الزراعية للقرن الأفريقي: أدلة متخصصة، ومساعد زراعي بالذكاء الاصطناعي، والطقس، وحاسبات، وقراءة دون اتصال بأربع لغات.

**الوصف:**
بيلود منصة معرفة زراعية مجانية للمزارعين ومربي الماشية والطلاب في الصومال والقرن الأفريقي.

• أكثر من 100 دليل عملي عن المحاصيل والري والتربة والماشية والآفات والأمراض، مع مراجعة دقتها
• مساعد بيلود الذكي: اسأل بالصومالية أو الإنجليزية أو العربية أو السواحيلية
• مزرعتي (Beertayda): خطّط لحقولك ومحاصيلك ومواسمك
• حاسبات للبذور والأسمدة والمياه والأرباح
• الطقس وتقويم المحاصيل لموسمي الغو والدير
• أخبار زراعية مع روابط لمصادر رسمية
• احفظ المقالات واقرأها دون اتصال

## Kiswahili

**Maelezo mafupi:** Maarifa ya kilimo kwa Pembe ya Afrika: miongozo ya kitaalamu, msaidizi wa AI wa kilimo, hali ya hewa, vikokotoo, na kusoma nje ya mtandao kwa lugha 4.

**Maelezo:**
Beylood ni jukwaa la bure la maarifa ya kilimo kwa wakulima, wafugaji na wanafunzi nchini Somalia na Pembe ya Afrika.

• Zaidi ya miongozo 100 ya vitendo kuhusu mazao, umwagiliaji, udongo, mifugo, wadudu na magonjwa, iliyokaguliwa kwa usahihi
• Msaidizi wa AI wa Beylood: uliza kwa Kisomali, Kiingereza, Kiarabu au Kiswahili
• Beertayda (Shamba Langu): panga mashamba, mazao na misimu yako
• Vikokotoo vya mbegu, mbolea, maji na faida
• Hali ya hewa na kalenda ya mazao ya misimu ya Gu' na Deyr
• Habari za kilimo zenye viungo vya vyanzo rasmi
• Hifadhi makala na usome nje ya mtandao

---

### Dhibaatooyinka caadiga ah
- **"Package identity mismatch"**: Package ID ama Publisher ID si sax ah looma koobiyeyn. PWABuilder dib ugu samee adigoo isticmaalaya qiimayaasha Partner Center.
- **Magaca waa la qabsaday**: isticmaal `Beylood — Aqoonta Beeraha`.
- **Login-ka Google/Firebase ee app-ka**: haddii popup-ku aanu furmin, Firebase Console → Authentication → **Authorized domains** ku hubi in `beylood.com` uu ku jiro. App-ku isla domain-ka ayuu isticmaalaa.
