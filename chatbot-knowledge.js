/* ============================================================
   Beylood — Chatbot Knowledge Base
   ------------------------------------------------------------
   100% FREE: This file IS the chatbot's brain. No API calls.
   No external services. Pure HTML/CSS/JS + Firebase Firestore
   for chat history.

   Each article has 4-language content: title, summary, answer,
   plus keywords for matching.

   To add a new article: append an entry to KNOWLEDGE below.
   ============================================================ */

window.BeyloodKnowledge = (function () {
  'use strict';

  /* ---------------- ARTICLE KNOWLEDGE BASE ---------------- */
  var KNOWLEDGE = [
    /* ===== CROPS ===== */
    {
      slug: 'maize-farming', cat: 'crops', url: 'article-maize-farming.html',
      title: { so: 'Beerista Galleyda', en: 'Maize Farming', ar: 'زراعة الذرة', sw: 'Kilimo cha Mahindi' },
      summary: {
        so: 'Galley wuxuu u baahan yahay 500–800mm biyo, 21–32°C kulayl, iyo 90–120 maalmood ilaa goosashada. Beero bilowga roobka (Gu ama Deyr).',
        en: 'Maize needs 500–800mm of rain, 21–32°C, and 90–120 days to harvest. Plant at the start of the rainy season (Gu or Deyr).',
        ar: 'الذرة تحتاج 500-800 ملم أمطار، 21-32°م، و90-120 يوماً للحصاد. ازرع في بداية موسم الأمطار.',
        sw: 'Mahindi yanahitaji mvua 500-800mm, 21-32°C, na siku 90-120 hadi mavuno. Panda mwanzoni mwa msimu wa mvua.'
      },
      answer: {
        so: '**Beerista Galleyda Soomaaliya:**\n\n- Wakhtiga: Abriil–Maajo (Gu) ama Oktoobar–Nofambar (Deyr)\n- Heerkulka ugu fiican: 21–32°C\n- Biyo: 500–800 mm xilliga oo dhan\n- Masaafada: 75 cm safafka, 25 cm dhirta dhexdooda\n- Qoto iniinaha: 3–5 cm\n- Wakhtiga gurashada: 90–120 maalmood\n\n**Talooyin:** Ku dar compost 30 maalmood ka hor. Ka fogow beerista hadii heerkulku ka hooseeyo 15°C — iniinaha ma soo bixi doonaan.',
        en: '**Maize farming in Somalia:**\n\n- Timing: April–May (Gu) or October–November (Deyr)\n- Optimal temperature: 21–32°C\n- Water: 500–800 mm per season\n- Spacing: 75 cm between rows, 25 cm between plants\n- Seed depth: 3–5 cm\n- Days to harvest: 90–120\n\n**Tips:** Add compost 30 days before planting. Avoid planting if temperatures stay below 15°C — seeds will not germinate.',
        ar: '**زراعة الذرة في الصومال:**\n\n- التوقيت: أبريل-مايو (غو) أو أكتوبر-نوفمبر (ديير)\n- درجة الحرارة المثلى: 21-32°م\n- المياه: 500-800 ملم لكل موسم\n- المسافة: 75 سم بين الصفوف، 25 سم بين النباتات\n- عمق البذرة: 3-5 سم\n- أيام الحصاد: 90-120',
        sw: '**Kilimo cha Mahindi Somalia:**\n\n- Wakati: Aprili-Mei (Gu) au Oktoba-Novemba (Deyr)\n- Joto bora: 21-32°C\n- Maji: 500-800 mm kwa msimu\n- Nafasi: 75 sm kati ya safu, 25 sm kati ya mimea\n- Kina cha mbegu: 3-5 sm\n- Siku za mavuno: 90-120'
      },
      keywords: ['galley','galleyda','maize','corn','iniin','xilliga gu','xilliga deyr','planting','dalag','seeds','beerista','goosashada','harvest']
    },
    {
      slug: 'rice-farming', cat: 'crops', url: 'article-rice-farming.html',
      title: { so: 'Beerista Bariiska', en: 'Rice Farming', ar: 'زراعة الأرز', sw: 'Kilimo cha Mchele' },
      summary: {
        so: 'Bariis wuxuu si fiican u baxaa gobolka Lower Shabelle. 110–140 maalmood, biyo joogto ah, dhul fidsan.',
        en: 'Rice thrives in Lower Shabelle. 110–140 days, continuous water, flat land.',
        ar: 'الأرز ينمو جيداً في شبيلي السفلى. 110-140 يوماً، مياه مستمرة، أرض مستوية.',
        sw: 'Mchele unastawi Lower Shabelle. Siku 110-140, maji ya kuendelea, ardhi tambarare.'
      },
      answer: {
        so: '**Beerista Bariiska:**\n\n- Goob: Lower Shabelle, Middle Shabelle (paddy fields)\n- Wakhtiga: 110–140 maalmood\n- Biyo: Joogto ah, 1200–1500 mm/xilli\n- Heerkul: 25–30°C\n- Noocyada: NERICA, Basmati 370\n- Dakhli: $800–$1,500 / hektaar\n\n**Talo:** Iska ilaali dhul fidsan oo aan biyo lumis lahayn. Beerada bariis waa adag laakiin faa\'iidada way badan tahay.',
        en: '**Rice farming:**\n\n- Location: Lower Shabelle, Middle Shabelle (paddy fields)\n- Timing: 110–140 days\n- Water: Continuous, 1200–1500 mm/season\n- Temperature: 25–30°C\n- Varieties: NERICA, Basmati 370\n- Income: $800–$1,500 / hectare',
        ar: '**زراعة الأرز:**\n\n- الموقع: شبيلي السفلى والوسطى\n- المدة: 110-140 يوماً\n- المياه: مستمرة، 1200-1500 ملم/موسم\n- الحرارة: 25-30°م',
        sw: '**Kilimo cha mchele:**\n\n- Eneo: Lower Shabelle, Middle Shabelle\n- Wakati: siku 110-140\n- Maji: ya kuendelea, 1200-1500 mm/msimu\n- Joto: 25-30°C'
      },
      keywords: ['bariis','bariiska','rice','mchele','shabelle','paddy','nerica','dooga','xilliga']
    },
    {
      slug: 'tomato-farming', cat: 'crops', url: 'article-tomato-farming.html',
      title: { so: 'Beerista Yaanyada', en: 'Tomato Farming', ar: 'زراعة الطماطم', sw: 'Kilimo cha Nyanya' },
      summary: {
        so: 'Yaanyo 70–90 maalmood. Drip irrigation, masaafo 50×50 cm, varieties Roma VF iyo Anna F1.',
        en: 'Tomatoes 70–90 days. Drip irrigation, 50×50 cm spacing, Roma VF or Anna F1 varieties.',
        ar: 'الطماطم 70-90 يوماً. ري بالتنقيط، مسافة 50×50 سم، أصناف Roma VF أو Anna F1.',
        sw: 'Nyanya siku 70-90. Umwagiliaji wa drip, nafasi 50×50 sm, aina Roma VF au Anna F1.'
      },
      answer: {
        so: '**Beerita Yaanyada:**\n\n- Iniinaha: Roma VF, Anna F1, Cal-J\n- Wakhtiga: 70–90 maalmood\n- Masaafo: 50×50 cm\n- Biyo: Drip irrigation (40–60% biyo yar)\n- Heerkul: 21–27°C\n- Bacrin: N-P-K balanced + compost\n\n**Iska ilaali:** Whiteflies (kuwii cudurka TYLCV faafiya). Beero geedo qoyaha (basbaas) si aad u qariso.',
        en: '**Tomato cultivation:**\n\n- Varieties: Roma VF, Anna F1, Cal-J\n- Duration: 70–90 days\n- Spacing: 50×50 cm\n- Water: Drip irrigation (40–60% less water)\n- Temperature: 21–27°C\n- Fertilizer: Balanced N-P-K + compost\n\n**Watch out for:** Whiteflies (carry TYLCV virus). Plant chili nearby as a deterrent.',
        ar: '**زراعة الطماطم:**\n\n- الأصناف: Roma VF, Anna F1, Cal-J\n- المدة: 70-90 يوماً\n- المسافة: 50×50 سم\n- المياه: ري بالتنقيط',
        sw: '**Kilimo cha nyanya:**\n\n- Aina: Roma VF, Anna F1, Cal-J\n- Muda: siku 70-90\n- Nafasi: 50×50 sm'
      },
      keywords: ['yaanyo','yaanyada','tomato','tomatoes','nyanya','roma','solanum','cudur','whitefly','tylcv']
    },
    {
      slug: 'home-garden', cat: 'crops', url: 'article-home-garden.html',
      title: { so: 'Beerista Khudaarta Guriga', en: 'Home Vegetable Garden', ar: 'حديقة الخضروات المنزلية', sw: 'Bustani ya Mboga Nyumbani' },
      summary: {
        so: 'Beer-guri: 5–10 sanduuq, biyo baaldi maalintii, cadceed 4–6 saac. Salad, basbaas, yaanyo balcoonka ku korta.',
        en: 'Home garden: 5–10 containers, a bucket of water daily, 4–6 hours sun. Lettuce, peppers, tomatoes grow on a balcony.',
        ar: 'حديقة منزلية: 5-10 حاويات، دلو ماء يومياً، 4-6 ساعات شمس.',
        sw: 'Bustani ya nyumbani: vyombo 5-10, ndoo ya maji kwa siku, masaa 4-6 ya jua.'
      },
      answer: {
        so: '**Beer-guri 30 maalmood:**\n\n- Maalin 1–3: Iibso 5 sanduuq + ciid + abuur (salad, basbaas, geedo udgoon)\n- Maalin 4–7: Buuxi sanduuqyada, abuur 1 cm gudaha\n- Maalin 8–14: Biyo siisii subax/galab, eeg cayayaan\n- Maalin 15–25: Caleemaha way koraan\n- Maalin 26–30: Goosashada bilow!\n\n**Goob:** Balcoon koonfur ama bari u jeeda — 4–6 saacadood cadceed maalintii.',
        en: '**30-day home garden:**\n\n- Days 1–3: Buy 5 containers + soil + seeds (lettuce, peppers, herbs)\n- Days 4–7: Fill containers, plant 1 cm deep\n- Days 8–14: Water morning/evening, watch for pests\n- Days 15–25: Plants grow\n- Days 26–30: Start harvesting!\n\n**Location:** South or east-facing balcony — 4–6 hours of sunlight.',
        ar: '**حديقة منزلية في 30 يوماً:**\n\n- الأيام 1-3: اشترِ 5 حاويات + تربة + بذور\n- الأيام 4-7: املأ الحاويات، ازرع على عمق 1 سم\n- الأيام 26-30: ابدأ الحصاد!',
        sw: '**Bustani ya nyumbani siku 30:**\n\n- Siku 1-3: Nunua vyombo 5 + udongo + mbegu\n- Siku 26-30: Anza kuvuna!'
      },
      keywords: ['beer guri','khudaar','home garden','balcony','sanduuq','salad','basbaas guri','urban farming','reer','beero balcoon']
    },
    {
      slug: 'vertical-farming', cat: 'tech', url: 'article-vertical-farming.html',
      title: { so: 'Beerista Taalka', en: 'Vertical Farming', ar: 'الزراعة العمودية', sw: 'Kilimo Wima' },
      summary: {
        so: 'Vertical farming: 90% biyo yar, container 20ft = $15K–$25K bilow, dakhli $1,500–$2,500/bil.',
        en: 'Vertical farming: 90% less water, 20ft container = $15K–$25K starter, $1,500–$2,500/month income.',
        ar: 'الزراعة العمودية: 90% أقل ماء، حاوية 20 قدم = 15-25 ألف دولار بداية.',
        sw: 'Kilimo wima: 90% maji pungufu, kontena 20ft = $15K-$25K mwanzo.'
      },
      answer: {
        so: '**Vertical Farming Magaalo:**\n\n- Maalgashi bilow: $15,000–$25,000 (20ft container hydroponic)\n- Wax-soo-saar: 500–800 kg caleemo bilkii\n- Dakhli: $1,500–$2,500/bil\n- Lacag-celin: 12–18 bil\n- Khurushaad bilkii: $400–$600 (koronta, biyo, abuur)\n\n**Nidaamyada:** Hydroponics, Aeroponics, Aquaponics. Magaalooyinka sida Muqdisho iyo Hargeysa, tani waa fursad cusub oo dakhli leh.',
        en: '**Urban Vertical Farming:**\n\n- Starter capital: $15,000–$25,000 (20ft hydroponic container)\n- Output: 500–800 kg greens/month\n- Revenue: $1,500–$2,500/month\n- Payback: 12–18 months\n- Monthly running costs: $400–$600',
        ar: '**الزراعة العمودية الحضرية:**\n\n- رأس مال: 15-25 ألف دولار\n- الإنتاج: 500-800 كغ/شهر',
        sw: '**Kilimo wima cha mji:**\n\n- Mtaji: $15,000-$25,000\n- Mauzo: kg 500-800/mwezi'
      },
      keywords: ['vertical','taalka','hydroponic','aeroponic','aquaponic','magaalo','urban','container','technology']
    },
    {
      slug: 'organic-farming', cat: 'tech', url: 'article-organic-farming.html',
      title: { so: 'Beerista Dabiici', en: 'Organic Farming', ar: 'الزراعة العضوية', sw: 'Kilimo Asili' },
      summary: {
        so: 'Beero dabiici ah: compost, neem oil, biological pest control. Qiimo sare suuqa $1–$2/kg yaanyo dabiici.',
        en: 'Organic: compost, neem oil, biological pest control. Premium $1–$2/kg organic tomatoes.',
        ar: 'الزراعة العضوية: كمبوست، زيت النيم، مكافحة بيولوجية.',
        sw: 'Kilimo asili: mboji, mafuta ya neem, udhibiti wa kibiolojia.'
      },
      answer: {
        so: '**Beerista Dabiici (Organic):**\n\n- Bacrin: Compost, vermicompost, digo geel/lo\n- Cayayaan: Neem oil, saabuun-biyo, ladybugs\n- Cudurada: Milk spray 1:9, biofungicides\n- Wareeg: Sannad walba — galley → digir → yaanyo\n- Qiimo: Premium 30–50% ka badan beerada caadiga ah\n\n**Hubinta:** Iska ilaali kiimikooyinka ammaan-darrada ah. Bilowga, iibso 0.1 hektaar oo ku tijaabi.',
        en: '**Organic farming:**\n\n- Fertilizer: Compost, vermicompost, livestock manure\n- Pests: Neem oil, soapy water, ladybugs\n- Diseases: Milk spray 1:9, biofungicides\n- Rotation: Yearly — maize → legumes → tomatoes\n- Price: Premium 30–50% above conventional',
        ar: '**الزراعة العضوية:**\n\n- السماد: كمبوست، فيرميكمبوست\n- الآفات: زيت النيم\n- السعر: أعلى 30-50%',
        sw: '**Kilimo asili:**\n\n- Mbolea: Mboji, vermicompost\n- Wadudu: Mafuta ya neem\n- Bei: juu 30-50%'
      },
      keywords: ['organic','dabiici','compost','neem','natural','asili','la\'aan kiimiko','beer dabiici']
    },

    /* ===== IRRIGATION ===== */
    {
      slug: 'drip-irrigation', cat: 'irrigation', url: 'article-drip-irrigation.html',
      title: { so: 'Drip Irrigation', en: 'Drip Irrigation', ar: 'الري بالتنقيط', sw: 'Drip Irrigation' },
      summary: {
        so: 'Drip irrigation: 40–60% biyo keydi, kit $200–$500 dunyad. Ku haboon yaanyo, basbaas, qaraha.',
        en: 'Drip irrigation: save 40–60% water, kit $200–$500/acre. Great for tomatoes, peppers, watermelon.',
        ar: 'الري بالتنقيط: توفير 40-60% من الماء، طقم 200-500$ للفدان.',
        sw: 'Drip irrigation: hifadhi 40-60% ya maji, kifaa $200-$500/eka.'
      },
      answer: {
        so: '**Drip Irrigation:**\n\n- Faa\'iidooyinka: 40–60% biyo keydi, yarayn cudur, fudud daryeel\n- Qiimo: $200–$500/dunyad (basic kit)\n- Qaybaha: Tank biyo + filter + manifold + drip lines + emitters\n- Maintenance: Nadiifin filter usbuuc walba, eeg emitters dhibsamayaal\n- Dalagga: Yaanyo, basbaas, qaraha, banaan\n\n**Talo:** Bilow tijaabin 0.1 hektaar kahor inaad scale gareyso.',
        en: '**Drip Irrigation:**\n\n- Benefits: 40–60% water savings, less disease, easier maintenance\n- Cost: $200–$500/acre (basic kit)\n- Parts: Water tank + filter + manifold + drip lines + emitters\n- Maintenance: Weekly filter cleaning, check emitters for clogs\n- Best crops: Tomato, pepper, watermelon, cucumber',
        ar: '**الري بالتنقيط:**\n\n- توفير 40-60% من الماء\n- تكلفة 200-500 دولار للفدان',
        sw: '**Drip irrigation:**\n\n- Hifadhi maji 40-60%\n- Gharama $200-$500/eka'
      },
      keywords: ['drip','waraab','irrigation','biyo','umwagiliaji','keyd biyo','water saving']
    },
    {
      slug: 'rainwater-harvesting', cat: 'irrigation', url: 'article-rainwater-harvesting.html',
      title: { so: 'Biyo-keydinta Roobka', en: 'Rainwater Harvesting', ar: 'حصاد مياه الأمطار', sw: 'Kuvuna Maji ya Mvua' },
      summary: {
        so: 'Biyo roobka uruurin: berked, godad zai, tank plastig. 1mm roob × 100 m² guri = 100L biyo.',
        en: 'Rainwater harvesting: cisterns, zai pits, plastic tanks. 1mm rain × 100 m² roof = 100L water.',
        ar: 'حصاد مياه الأمطار: خزانات، حفر زاي.',
        sw: 'Kuvuna maji ya mvua: visima, mashimo zai.'
      },
      answer: {
        so: '**Biyo-keydinta Roobka:**\n\n- Tank plastig: $200–$800 (1,000L–5,000L)\n- Berked dabaqyo: $1,000–$3,000\n- Zai pits: $0 (godad gacanta lagu qodo)\n- Saqaf 100m² + 1mm roob = 100L biyo\n- Filter: 3-stage (caws, ciid, charcoal)\n\n**Talo:** Saqaf shidaal-shidaal ah ka guuri si biyaha aysan u xumayn.',
        en: '**Rainwater harvesting:**\n\n- Plastic tank: $200–$800 (1,000L–5,000L)\n- Concrete cistern: $1,000–$3,000\n- Zai pits: $0 (hand-dug)\n- 100m² roof + 1mm rain = 100L water\n- Filter: 3-stage (mesh, sand, charcoal)',
        ar: '**حصاد مياه الأمطار:**\n\n- خزان بلاستيك: 200-800 دولار',
        sw: '**Kuvuna maji ya mvua:**\n\n- Tanki la plastiki: $200-$800'
      },
      keywords: ['roob','biyo roob','rainwater','tank','berked','zai','jiilaal','keyd biyo','harvest']
    },

    /* ===== SOIL ===== */
    {
      slug: 'composting', cat: 'soil', url: 'article-composting.html',
      title: { so: 'Compost — Bacrin Dabiici', en: 'Composting', ar: 'الكمبوست', sw: 'Mboji' },
      summary: {
        so: 'Compost: 3 bilood, ratio 30:1 cagaar:engegan, $0 kharash. Kor u qaada wax-soo-saarka 20–40%.',
        en: 'Compost: 3 months, 30:1 green:brown ratio, $0 cost. Boosts yields 20–40%.',
        ar: 'الكمبوست: 3 أشهر، نسبة 30:1، مجاناً.',
        sw: 'Mboji: miezi 3, uwiano 30:1, bure.'
      },
      answer: {
        so: '**Sida Loo Sameeyo Compost:**\n\n1. Dooro goob hadho leh, 2m × 2m\n2. Lakab #1 (10cm): Caleemo qalalan, caws engegan (cawanjaal)\n3. Lakab #2 (10cm): Qashinka jikada, geedo cagaar ah (nitrogen)\n4. Lakab #3 (5cm): Digo geel/lo (oo bisil)\n5. Ku celi sida lakabyo\n6. Biyo siisii usbuuc walba — qoyan laakiin maaha qoyaan dhameystiran\n7. Rog 30 maalmood ka dib\n8. Diyaar 3 bilood ka dib — madow, dhadhanka madhdhaxda\n\n**Talo:** Iska ilaali hilib, caano, ama saliid — way ureeyaan oo waxay keenaan jiir.',
        en: '**How to make compost:**\n\n1. Pick a shaded spot, 2m × 2m\n2. Layer 1 (10cm): Dry leaves, straw (brown carbon)\n3. Layer 2 (10cm): Kitchen scraps, green plants (nitrogen)\n4. Layer 3 (5cm): Aged livestock manure\n5. Repeat layers\n6. Water weekly — moist but not soaked\n7. Turn after 30 days\n8. Ready in 3 months — dark, earthy smell\n\n**Avoid:** Meat, dairy, oil — they smell bad and attract rats.',
        ar: '**كيفية صنع الكمبوست:**\n\n1. اختر مكاناً مظللاً\n2. طبقات: أوراق جافة، بقايا مطبخ، سماد حيواني\n3. اقلب بعد 30 يوماً\n4. جاهز خلال 3 أشهر',
        sw: '**Jinsi ya kutengeneza mboji:**\n\n1. Chagua sehemu yenye kivuli\n2. Tabaka: majani makavu, taka ya jikoni, mbolea\n3. Geuza baada ya siku 30\n4. Tayari kwa miezi 3'
      },
      keywords: ['compost','kombost','bacrin','manure','digo','mboji','soil','ciid','organic fertilizer']
    },
    {
      slug: 'soil-testing', cat: 'soil', url: 'article-soil-testing.html',
      title: { so: 'Baadhitaanka Ciidda', en: 'Soil Testing', ar: 'اختبار التربة', sw: 'Mtihani wa Udongo' },
      summary: {
        so: 'Baadhitaan ciid: pH, N-P-K. Kit gacanta $15, lab test $25–$50. Sannad walba.',
        en: 'Soil test: pH, N-P-K. Hand kit $15, lab test $25–$50. Once a year.',
        ar: 'اختبار التربة: pH، N-P-K.',
        sw: 'Mtihani wa udongo: pH, N-P-K.'
      },
      answer: {
        so: '**Baadhitaan Ciid:**\n\n- pH ideal: 6.0–7.0 (khudrad), 5.5–7.0 (galley)\n- Hadii pH < 6: ku dar lime\n- Hadii pH > 7: ku dar sulfur ama compost asid\n- N (Nitrogen): cagaarka caleemaha\n- P (Phosphorus): xididada\n- K (Potassium): mira\n\n**Habka fudud:** Soo qaad samples 5 goobood (10–20 cm hoos), isku dar, qalalji, oo lab u dir.',
        en: '**Soil testing:**\n\n- Ideal pH: 6.0–7.0 (vegetables), 5.5–7.0 (maize)\n- pH < 6: add lime\n- pH > 7: add sulfur or acidic compost\n- N: leaf greenness\n- P: roots\n- K: fruits',
        ar: '**اختبار التربة:**\n\n- pH مثالي: 6.0-7.0',
        sw: '**Mtihani wa udongo:**\n\n- pH bora: 6.0-7.0'
      },
      keywords: ['baadh ciid','soil test','ph','nitrogen','tijaab','mtihani udongo']
    },

    /* ===== PESTS & DISEASES ===== */
    {
      slug: 'fall-armyworm', cat: 'pests', url: 'pest-fall-armyworm.html',
      title: { so: 'Diirka Galleyda (Fall Armyworm)', en: 'Fall Armyworm', ar: 'دودة الذرة الخريفية', sw: 'Viwavi Mahindi' },
      summary: {
        so: 'Fall Armyworm cuna galleyda 12 saac gudaheed. Eeg subax hore. Biological control + early action.',
        en: 'Fall Armyworm devours maize in 12 hours. Scout at dawn. Biological control + early action.',
        ar: 'دودة الذرة الخريفية تأكل الذرة في 12 ساعة.',
        sw: 'Viwavi wa mahindi hula mahindi katika masaa 12.'
      },
      answer: {
        so: '**Fall Armyworm Xakamayn:**\n\n- Eeg subax hore: gudaha caleemaha cusub\n- Calaamado: godad caleemaha, saxaro madow\n- Daawayn dabiici: neem oil 30 ml/L\n- Daawayn biological: Beauveria bassiana\n- Hubi maamulada: Wasaaradda Beeraha — +252 615 555 444\n- Sannadkii hore: 10–15 dhir/100 dhir = halal-mid; in ka badan 15 = degdeg ah!\n\n**Iska ilaali:** Daawooyinka aan la oggolayn (toxic). Beero shanqarsho ama basbaas hareeraha si aad u qariso.',
        en: '**Fall Armyworm control:**\n\n- Scout at dawn: inside new leaves\n- Signs: leaf holes, dark frass\n- Natural treatment: neem oil 30 ml/L\n- Biological: Beauveria bassiana\n- Authorities: Ministry of Agriculture — +252 615 555 444\n- Threshold: 10–15 per 100 plants = manageable; >15 = urgent!',
        ar: '**مكافحة دودة الذرة:**\n\n- التفقد فجراً\n- زيت النيم 30 مل/لتر',
        sw: '**Udhibiti wa viwavi:**\n\n- Kagua alfajiri\n- Mafuta ya neem 30 ml/L'
      },
      keywords: ['fall armyworm','faw','diirka','galley cudur','maize pest','spodoptera','viwavi','armyworm']
    },
    {
      slug: 'whiteflies', cat: 'pests', url: 'pest-whiteflies.html',
      title: { so: 'Duqsiyaha Cadcad (Whiteflies)', en: 'Whiteflies', ar: 'الذبابة البيضاء', sw: 'Inzi Weupe' },
      summary: {
        so: 'Whiteflies yaanyada — virus TYLCV faafiya. Sticky traps + neem oil + ladybugs.',
        en: 'Whiteflies on tomatoes — spread TYLCV virus. Sticky traps + neem oil + ladybugs.',
        ar: 'الذبابة البيضاء على الطماطم — تنشر فيروس TYLCV.',
        sw: 'Inzi weupe kwenye nyanya — husambaza virusi TYLCV.'
      },
      answer: {
        so: '**Xakameynta Whiteflies:**\n\n- Sticky traps jaalle ah: ku rid beerta\n- Neem oil 30 ml/L: spray usbuuc walba\n- Insecticidal soap: hadii halis sare ah\n- Beero basal cas hareeraha (repellent)\n- Iska saar caleemaha aadka u xun\n\n**TYLCV virus:** Hadii caleemaha ay isku duubaan, koray sare ka socda, jar oo qashin ku tuur (maaha compost).',
        en: '**Whitefly control:**\n\n- Yellow sticky traps in field\n- Neem oil 30 ml/L: spray weekly\n- Insecticidal soap for heavy infestation\n- Plant red onions around perimeter (repellent)\n- Remove badly affected leaves',
        ar: '**مكافحة الذبابة البيضاء:**\n\n- مصائد لاصقة صفراء\n- زيت النيم',
        sw: '**Udhibiti wa inzi weupe:**\n\n- Mitego ya manjano\n- Mafuta ya neem'
      },
      keywords: ['whitefly','whiteflies','duqsi cad','inzi weupe','tylcv','yaanyo cudur','tomato virus']
    },
    {
      slug: 'early-blight', cat: 'pests', url: 'disease-early-blight.html',
      title: { so: 'Early Blight', en: 'Early Blight', ar: 'اللفحة المبكرة', sw: 'Baka Mapema' },
      summary: {
        so: 'Early blight yaanyo/baradho — calaamad fookag madow caleemaha. Mancozeb, rotation, sanitation.',
        en: 'Early blight on tomato/potato — target spots on leaves. Mancozeb, rotation, sanitation.',
        ar: 'اللفحة المبكرة على الطماطم/البطاطس.',
        sw: 'Baka mapema kwenye nyanya/viazi.'
      },
      answer: {
        so: '**Early Blight (Alternaria solani):**\n\n- Calaamado: Dhibco madow oo lehyaan godad caleemaha hoose\n- Daawayn: Mancozeb (2 g/L) 7–10 maalmood walba\n- Hortagis: Wareeg dalag (2 sano), masaafo wanaagsan, drip aan caleemaha qoyin\n- Iska saar: Caleemaha cudurka qaba — qashin\n\n**Talo:** Roma VF iyo Anna F1 way iska caabbiyaan — doorso noocaas.',
        en: '**Early Blight (Alternaria solani):**\n\n- Signs: Target-pattern dark spots on lower leaves\n- Treatment: Mancozeb (2 g/L) every 7–10 days\n- Prevention: Crop rotation (2 years), good spacing, drip not overhead\n- Remove infected leaves to trash (not compost)',
        ar: '**اللفحة المبكرة:**\n\n- علاج: Mancozeb كل 7-10 أيام',
        sw: '**Baka mapema:**\n\n- Tibabu: Mancozeb kila siku 7-10'
      },
      keywords: ['early blight','cudur yaanyo','tomato disease','mancozeb','alternaria','baradho cudur','potato']
    },

    /* ===== LIVESTOCK ===== */
    {
      slug: 'dairy-cattle', cat: 'livestock', url: 'article-dairy-cattle.html',
      title: { so: 'Lo\'da Caanaha', en: 'Dairy Cattle', ar: 'أبقار الحليب', sw: 'Ng\'ombe wa Maziwa' },
      summary: {
        so: 'Lo\' caanaha: 15–25L caano/maalin, Sahiwal ama Friesian crossbreed, daaqsin + sahay.',
        en: 'Dairy cows: 15–25L milk/day, Sahiwal or Friesian crossbreed, grazing + supplements.',
        ar: 'أبقار الحليب: 15-25 لتر يومياً.',
        sw: 'Ng\'ombe wa maziwa: 15-25L kwa siku.'
      },
      answer: {
        so: '**Lo\'da Caanaha — Sahiwal/Friesian:**\n\n- Wax-soo-saar: 15–25L caano/maalin\n- Cunto: Caws 30 kg + 3–5 kg consenterate maalintii\n- Biyo: 50–80L maalintii\n- Lacag-dhalka: Sannadkii hal jeer\n- Caafimaad: Tallaal sannad walba, daawooyinka cayayaanka 4 jeer\n\n**Dakhli:** Caano 1L = $0.40–$0.60 suuqa. Lo\' wanaagsan = $50/bishii faa\'iido.',
        en: '**Dairy cattle — Sahiwal/Friesian:**\n\n- Production: 15–25L milk/day\n- Feed: 30 kg grass + 3–5 kg concentrate daily\n- Water: 50–80L per day\n- Calving: Once per year\n- Health: Annual vaccinations, parasite treatment 4x/year\n\n**Income:** $0.40–$0.60/L. Good cow = $50/month profit.',
        ar: '**أبقار الحليب:**\n\n- إنتاج: 15-25 لتر',
        sw: '**Ng\'ombe wa maziwa:**\n\n- Maziwa: lita 15-25'
      },
      keywords: ['lo','caano','dairy','milk','cattle','ng\'ombe','sahiwal','friesian','xoolo']
    },
    {
      slug: 'poultry-farming', cat: 'livestock', url: 'article-poultry-farming.html',
      title: { so: 'Beerista Digaagga', en: 'Poultry Farming', ar: 'تربية الدواجن', sw: 'Ufugaji wa Kuku' },
      summary: {
        so: 'Digaag: Layer ukunta 250–300/sannad. Broiler 1.8kg 6 toddobaad. Bilow $300–$500.',
        en: 'Poultry: Layers 250–300 eggs/year. Broiler 1.8kg at 6 weeks. Start $300–$500.',
        ar: 'الدواجن: بياض 250-300 بيضة/سنة.',
        sw: 'Kuku: mayai 250-300/mwaka.'
      },
      answer: {
        so: '**Beerista Digaagga:**\n\n- Layers: 250–300 ukun/sannad/digaag, $0.10/ukun\n- Broilers: 1.8 kg 6 toddobaad, $3–$5/digaag\n- Bilow: 100 digaag = $300–$500 (cooyada, cunto, daawooyinka)\n- Hooyga: 1 m² per 8 digaag, hawo iyo nadiifin muhiim\n- Cuntada: Layers mash 120g/maalin, broilers starter→grower→finisher\n\n**Halis:** Newcastle disease — tallaal asal ah!',
        en: '**Poultry farming:**\n\n- Layers: 250–300 eggs/year/bird, $0.10/egg\n- Broilers: 1.8 kg in 6 weeks, $3–$5/bird\n- Startup: 100 birds = $300–$500 (chicks, feed, meds)\n- Housing: 1 m² per 8 birds\n- Feed: Layers mash 120g/day\n\n**Risk:** Newcastle disease — vaccinate at day one!',
        ar: '**تربية الدواجن:**\n\n- بياض: 250-300 بيضة سنوياً',
        sw: '**Ufugaji wa kuku:**\n\n- Mayai: 250-300 kwa mwaka'
      },
      keywords: ['digaag','poultry','chicken','kuku','layer','broiler','ukun','egg','newcastle']
    },
    {
      slug: 'goats-sheep', cat: 'livestock', url: 'article-goats-sheep.html',
      title: { so: 'Riyo iyo Ido', en: 'Goats and Sheep', ar: 'الماعز والأغنام', sw: 'Mbuzi na Kondoo' },
      summary: {
        so: 'Riyo & ido: Khaliij export, $80–$150/lo, breeds Black Head Persian (ido), Galla (riyo).',
        en: 'Goats & sheep: Gulf export, $80–$150/head, Black Head Persian (sheep), Galla (goats).',
        ar: 'الماعز والأغنام: تصدير الخليج.',
        sw: 'Mbuzi na kondoo: mauzo Ghuba.'
      },
      answer: {
        so: '**Riyo iyo Ido:**\n\n- Suuqa Khaliij: 5 milyan halaad/sannad ($300M dakhli Soomaaliya)\n- Qiimaha: $80–$150/halaad ($30/halaad gudaha)\n- Daaqsin: 0.5 hektaar/halaad\n- Biyo: 4–6L/halaad/maalin\n- Lacag-dhalka: 2 jeer sannad (riyo 2 ilmo), (ido 1 ilmo)\n\n**Bilow:** 20 halaad + xayawaan-dhakhtar = $2,000.',
        en: '**Goats and sheep:**\n\n- Gulf market: 5M head/year ($300M Somalia income)\n- Price: $80–$150/head export ($30/head local)\n- Grazing: 0.5 hectare/head\n- Water: 4–6L/head/day\n- Birth rate: 2/year (goats can have twins)',
        ar: '**الماعز والأغنام:**\n\n- السعر: 80-150 دولار',
        sw: '**Mbuzi na kondoo:**\n\n- Bei: $80-$150'
      },
      keywords: ['riyo','ido','goat','sheep','mbuzi','kondoo','khaliij','export','xoolo yar yar']
    },

    /* ===== CLIMATE ===== */
    {
      slug: 'drought-tolerant', cat: 'climate', url: 'article-drought-tolerant-crops.html',
      title: { so: 'Dalagga Abaaraha u Adkaysi Leh', en: 'Drought-Tolerant Crops', ar: 'محاصيل مقاومة للجفاف', sw: 'Mazao ya Ukame' },
      summary: {
        so: 'Abaar: masaggu (90 maalmood), cowpea (60), pearl millet (90), sorghum (100). 200mm biyo kahor.',
        en: 'Drought: sorghum (100d), cowpea (60d), pearl millet (90d), masaggu (90d). 200mm minimum.',
        ar: 'الجفاف: الذرة الرفيعة، اللوبيا، الدخن.',
        sw: 'Ukame: mtama, kunde, mtama mdogo.'
      },
      answer: {
        so: '**Dalagga Abaaraha:**\n\n- Masaggu (sorghum): 100 maalmood, 200–400mm, dakhli sare\n- Cowpea (digir): 60 maalmood, 200mm, nitrogen ku darayaa ciidda\n- Pearl millet: 90 maalmood, 150–300mm, abaar adkaysi leh\n- Cassava: 9 bilood, 500mm, dakhli mustaqbal\n\n**Talo:** Iskaaday masaggu (madow) + cowpea — masaggu cidladaha sare wuxuu nasaha cowpea-da hoose, isla mark dalaga la sii daadinayaa.',
        en: '**Drought-tolerant crops:**\n\n- Sorghum: 100 days, 200–400mm, good income\n- Cowpea: 60 days, 200mm, fixes nitrogen\n- Pearl millet: 90 days, 150–300mm, ultra-drought tolerant\n- Cassava: 9 months, 500mm, food security\n\n**Tip:** Intercrop sorghum + cowpea — sorghum canopy shades cowpea below.',
        ar: '**محاصيل الجفاف:**\n\n- الذرة الرفيعة: 100 يوم\n- اللوبيا: 60 يوم',
        sw: '**Mazao ya ukame:**\n\n- Mtama: siku 100\n- Kunde: siku 60'
      },
      keywords: ['abaar','drought','sorghum','masaggu','millet','cowpea','digir','ukame','cassava']
    },

    /* ===== NEWS ===== */
    {
      slug: 'news-11', cat: 'news', url: 'news-11.html',
      title: { so: 'Digniinta Ayaxa Juun 2026', en: 'June 2026 Locust Alert', ar: 'تحذير الجراد يونيو 2026', sw: 'Tahadhari ya Nzige Juni 2026' },
      summary: {
        so: 'FAO + DLCO-EA digniin: ayax cusub Sanaag, Bari, Puntland. Hotline degdeg +252 615 555 444.',
        en: 'FAO + DLCO-EA alert: new locust in Sanaag, Bari, Puntland. Emergency hotline +252 615 555 444.',
        ar: 'تحذير الجراد يونيو 2026: صوماليلاند، بونتلاند.',
        sw: 'Tahadhari ya nzige Juni 2026: Somaliland, Puntland.'
      },
      answer: {
        so: '**Digniinta Ayaxa Juun 2026:**\n\n- Heer: Caution Sanaag/Bari, halis dhexdhexaad Puntland\n- Hotline: +252 615 555 444 (DLCO Mogadishu)\n- SMS: "AYAX [degmo]" → 4477\n- Tijaabi maalin walba subax hore\n- Hadii kooxo aragto: degdeg u soo sheeg\n\n**Difaac:** Sanqadho dhawaaq, jar dalagga hadii uu 80% bislay, isticmaal Metarhizium fungus oo DLCO ka helo.',
        en: '**June 2026 Locust Alert:**\n\n- Level: Caution Sanaag/Bari, moderate Puntland\n- Hotline: +252 615 555 444 (DLCO Mogadishu)\n- SMS: "LOCUST [district]" → 4477\n- Scout at dawn daily\n- Report sightings immediately\n\n**Defense:** Loud noise, harvest early if 80% mature, use Metarhizium fungus from DLCO.',
        ar: '**تحذير الجراد:**\n\n- خط طوارئ: +252 615 555 444',
        sw: '**Tahadhari ya nzige:**\n\n- Simu ya dharura: +252 615 555 444'
      },
      keywords: ['ayax','locust','digniin','alert','dlco','fao','tahadhari','nzige']
    },
    {
      slug: 'news-10', cat: 'news', url: 'news-10.html',
      title: { so: 'Saadaalka Deyr 2026', en: 'Deyr 2026 Forecast', ar: 'توقعات الديري 2026', sw: 'Utabiri wa Deyr 2026' },
      summary: {
        so: 'Deyr Oct–Dec roob caadi. Koonfur 250–350mm (+5%), Bartamaha 180–250mm, Waqooyi 100–180mm (-10%).',
        en: 'Deyr Oct–Dec near-normal rains. South 250–350mm (+5%), Central 180–250mm, North 100–180mm (-10%).',
        ar: 'الديري أكتوبر-ديسمبر: أمطار قريبة من الطبيعية.',
        sw: 'Deyr Oktoba-Desemba: mvua za karibu kawaida.'
      },
      answer: {
        so: '**Saadaalka Deyr 2026 (FAO/SWALIM):**\n\n- Koonfur: 250–350mm (+5% caadi sare)\n- Bartamaha: 180–250mm (caadi)\n- Waqooyi: 100–180mm (-10% hoos caadi)\n- Heerkul: 0.5°C ka sare caadi\n- Bilow beerista 5–10 Oktoobar\n\n**Talo:** Dalagga xilli-gaaban dooro: masaggu, digir, salaaqada (90–110 maalmood). Diyaari biyo-keyd bilkii Diseembar.',
        en: '**Deyr 2026 forecast (FAO/SWALIM):**\n\n- South: 250–350mm (+5% above normal)\n- Central: 180–250mm (normal)\n- North: 100–180mm (-10% below normal)\n- Temperature: 0.5°C above average\n- Start planting 5–10 October\n\n**Tip:** Choose short-cycle crops (90–110 days). Prepare water storage for December dry spell.',
        ar: '**توقعات الديري 2026:**\n\n- الجنوب: 250-350 ملم',
        sw: '**Utabiri wa Deyr 2026:**\n\n- Kusini: 250-350 mm'
      },
      keywords: ['deyr','saadaal','roob','swalim','fao','forecast','utabiri','cimilo','xilliga']
    }
  ];

  /* ---------------- GREETINGS & CANNED RESPONSES ---------------- */
  var GREETINGS = {
    patterns: ['salaan','iska warran','sidee','hello','hi','hey','marhaba','salam','habari','jambo','sawubona'],
    response: {
      so: 'Salaan! Anigu waxaan ahay **Beylood AI** — caawiye beero, xoolo, iyo cudurro dalagga. Maxaa ku caawin karaa maanta? Tusaale: "Sidee loo beero galleyda?" ama "Maxaa daawo u ah whiteflies-ka?"',
      en: 'Hello! I am **Beylood AI** — an assistant for farming, livestock, and crop diseases. What can I help you with? Try: "How to grow maize?" or "What treats whiteflies?"',
      ar: 'مرحباً! أنا **Beylood AI** — مساعد للزراعة والثروة الحيوانية وأمراض المحاصيل. كيف أساعدك؟',
      sw: 'Habari! Mimi ni **Beylood AI** — msaidizi wa kilimo na mifugo. Nikusaidie nini?'
    }
  };

  var THANKS = {
    patterns: ['mahadsanid','thank you','thanks','shukran','asante','kalfaal'],
    response: {
      so: 'Adigaa mahadsan! Hadii aad rabto su\'aalo kale, weligaa weydiiso.',
      en: 'You\'re welcome! Ask me any other questions any time.',
      ar: 'العفو! اسألني أي وقت.',
      sw: 'Karibu sana! Niulize wakati wowote.'
    }
  };

  var NO_MATCH = {
    so: 'Su\'aashaada uma helin maqaal qaas ah. Iisku day eraayo kale, tusaale: **galley**, **biyo-waraab**, **yaanyo**, **cudur**, **lo\'**, **digaag**, **abaar**, **compost**. Ama eeg [qaybaha buuxa](categories.html).',
    en: 'I couldn\'t find a specific article for that. Try keywords like: **maize**, **irrigation**, **tomato**, **disease**, **cattle**, **poultry**, **drought**, **compost**. Or browse [all categories](categories.html).',
    ar: 'لم أجد مقالاً محدداً. جرب: **الذرة**، **الري**، **الطماطم**، **الأمراض**.',
    sw: 'Sikupata makala mahususi. Jaribu: **mahindi**, **umwagiliaji**, **nyanya**, **magonjwa**.'
  };

  /* ---------------- STOP WORDS (4 languages) ---------------- */
  var STOP = new Set([
    // Somali
    'iyo','ama','laakiin','marka','waxay','waxa','waxaa','sidee','maxaa','sida','oo','ay','iyada','isaga','ka','ku','si','aan','la','u','aad','kale','tahay','yahay','waa','ma','ah','hadda','marwalba','dhammaan','yar','badan','tii','dii',
    // English
    'the','a','an','is','are','was','were','be','been','being','have','has','had','do','does','did','will','would','could','should','can','may','might','must','of','to','in','on','at','by','for','with','about','against','between','through','during','before','after','above','below','from','up','down','out','off','over','under','again','further','then','once','and','but','or','not','so','if','as','i','you','he','she','it','we','they','what','which','who','my','your','his','her','its','our','their','this','that','these','those','am','what','how','why','when','where','too','very','just','only','also',
    // Arabic
    'في','من','إلى','على','عن','مع','هل','ما','ماذا','كيف','أين','متى','لماذا','هذا','هذه','ذلك','تلك','كان','يكون','هي','هو','هم','نحن','أنت','أنتم','أنا','الذي','التي','الذين','كل','بعض','أكثر','أقل','نعم','لا',
    // Swahili
    'na','wa','ya','la','za','kwa','katika','kuhusu','kuwa','ni','si','sio','wewe','mimi','sisi','wao','yeye','huyu','huyo','hii','hiyo','hizo','vipi','nini','wapi','lini','kwanini','sana','tu','pia','lakini','au'
  ]);

  /* ---------------- LANGUAGE DETECTION ---------------- */
  function detectLang(text) {
    var t = text || '';
    if (/[؀-ۿ]/.test(t)) return 'ar';
    if (/\b(habari|jambo|nini|mzuri|asante|karibu)\b/i.test(t)) return 'sw';
    if (/\b(the|how|what|where|when|why|please|tomato|maize|rice|disease)\b/i.test(t)) return 'en';
    return 'so'; // default
  }

  /* ---------------- TOKENIZE ---------------- */
  function tokenize(text) {
    return String(text || '')
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[^\p{L}\p{N}\s']/gu, ' ')
      .split(/\s+/)
      .filter(function (w) { return w.length > 1 && !STOP.has(w); });
  }

  /* ---------------- SCORE ARTICLE vs QUERY ---------------- */
  function scoreArticle(article, queryTokens, lang) {
    var score = 0;
    var qSet = new Set(queryTokens);

    // Title match (heaviest)
    var titleTokens = tokenize((article.title[lang] || article.title.en) + ' ' + (article.title.en));
    titleTokens.forEach(function (t) { if (qSet.has(t)) score += 10; });

    // Keywords match (very strong — these are curated)
    article.keywords.forEach(function (k) {
      var kt = tokenize(k);
      kt.forEach(function (t) { if (qSet.has(t)) score += 8; });
      // Phrase match in original query string
      if (queryTokens.join(' ').includes(k.toLowerCase())) score += 6;
    });

    // Summary match
    var sumTokens = tokenize((article.summary[lang] || article.summary.en));
    sumTokens.forEach(function (t) { if (qSet.has(t)) score += 2; });

    // Category match
    if (qSet.has(article.cat)) score += 3;

    return score;
  }

  /* ---------------- MAIN SEARCH ---------------- */
  function search(query, lang) {
    lang = lang || detectLang(query);
    var tokens = tokenize(query);
    if (!tokens.length) return { lang: lang, type: 'empty', results: [] };

    // Greeting detection
    var lowQ = String(query).toLowerCase();
    if (GREETINGS.patterns.some(function (p) { return lowQ.includes(p); }) && tokens.length <= 3) {
      return { lang: lang, type: 'greeting', response: GREETINGS.response[lang] || GREETINGS.response.so };
    }
    if (THANKS.patterns.some(function (p) { return lowQ.includes(p); })) {
      return { lang: lang, type: 'thanks', response: THANKS.response[lang] || THANKS.response.so };
    }

    // Score every article
    var scored = KNOWLEDGE.map(function (a) {
      return { article: a, score: scoreArticle(a, tokens, lang) };
    }).filter(function (x) { return x.score > 0 })
      .sort(function (a, b) { return b.score - a.score });

    if (!scored.length) {
      return { lang: lang, type: 'no_match', response: NO_MATCH[lang] || NO_MATCH.so };
    }

    return {
      lang: lang,
      type: 'match',
      results: scored.slice(0, 3).map(function (x) { return x.article; })
    };
  }

  /* ---------------- FORMAT RESPONSE ---------------- */
  function format(results, lang) {
    if (!results || !results.length) return '';
    var top = results[0];
    var related = results.slice(1);

    var out = '**' + (top.title[lang] || top.title.en) + '**\n\n';
    out += (top.answer[lang] || top.answer.en) + '\n\n';
    out += '📖 ' + ({so:'Eeg maqaalka buuxa', en:'Read full article', ar:'اقرأ المقال كاملاً', sw:'Soma makala kamili'}[lang] || 'Read full article')
        + ': [' + (top.title[lang] || top.title.en) + '](' + top.url + ')';

    if (related.length) {
      out += '\n\n**' + ({so:'Sidoo kale eeg', en:'See also', ar:'انظر أيضاً', sw:'Tazama pia'}[lang] || 'See also') + ':**\n';
      related.forEach(function (a) {
        out += '- [' + (a.title[lang] || a.title.en) + '](' + a.url + ')\n';
      });
    }
    return out;
  }

  /* ---------------- PUBLIC API ---------------- */
  return {
    KNOWLEDGE: KNOWLEDGE,
    search: search,
    format: format,
    detectLang: detectLang
  };
})();
