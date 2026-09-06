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
      slug: 'sorghum-farming', cat: 'crops', url: 'article-sorghum-farming.html',
      title: { so: 'Beeritaanka Masago', en: 'Sorghum Farming', ar: 'زراعة الذرة الرفيعة', sw: 'Kilimo cha Mtama' },
      summary: {
        so: 'Masago (hadhuudh) waa hadhuudhka ugu adkaysi badan abaaraha. Wuxuu u baahan yahay kaliya 400–600mm biyo, 90–120 maalmood, wuxuuna ku baxaa dhul qallalan oo galley aysan ku bixi karin.',
        en: 'Sorghum is the most drought-tolerant cereal. It needs only 400–600mm of water, 90–120 days, and grows on dry land where maize cannot.',
        ar: 'الذرة الرفيعة أكثر الحبوب تحمّلاً للجفاف. تحتاج 400-600 ملم ماء فقط، 90-120 يوماً، وتنمو في الأراضي الجافة.',
        sw: 'Mtama ni nafaka inayostahimili ukame zaidi. Unahitaji maji 400-600mm tu, siku 90-120, na hukua katika ardhi kavu.'
      },
      answer: {
        so: '**Beeritaanka Masago Soomaaliya:**\n\n- Wakhtiga: Gu\' (Abriil–Juun) ama Deyr (Oktoobar–Nofambar)\n- Heerkul: 25–32°C (wuxuu u dulqaadaa ilaa 40°C)\n- Biyo: 400–600 mm oo keliya — galley ka yar\n- Masaafada: 60–75 cm safafka, 15–20 cm dhirta\n- Qoto iniinaha: 2–4 cm\n- Iniin: 8–12 kg/hektar\n- Gurashada: 90–120 maalmood\n\n**Halista ugu weyn:** *Striga* (cawska sixir) iyo *shimbiraha Quelea*. Striga wareeji digir; shimbiraha isticmaal cabsiiye iyo wada-guris. Masago waa "dalagga ammaanka" — wuu soo saaraa marka galley abaartu burburiso.',
        en: '**Sorghum farming in Somalia:**\n\n- Timing: Gu\' (April–June) or Deyr (October–November)\n- Temperature: 25–32°C (tolerates up to 40°C)\n- Water: only 400–600 mm — less than maize\n- Spacing: 60–75 cm rows, 15–20 cm plants\n- Seed depth: 2–4 cm\n- Seed rate: 8–12 kg/ha\n- Days to harvest: 90–120\n\n**Biggest threats:** *Striga* (witchweed) and *Quelea birds*. Rotate with legumes against Striga; use scarers and group harvesting against birds. Sorghum is the "insurance crop" — it yields when maize fails in drought.',
        ar: '**زراعة الذرة الرفيعة في الصومال:**\n\n- التوقيت: غو (أبريل–يونيو) أو ديير (أكتوبر–نوفمبر)\n- الحرارة: 25–32°م (تتحمّل حتى 40°م)\n- المياه: 400–600 ملم فقط — أقل من الذرة\n- المسافة: 60–75 سم بين الصفوف، 15–20 سم بين النباتات\n- عمق البذرة: 2–4 سم\n- معدل البذور: 8–12 كغ/هكتار\n- أيام الحصاد: 90–120\n\n**أكبر تهديد:** الستريجا وطيور الكويليا. ناوب مع البقوليات ضد الستريجا.',
        sw: '**Kilimo cha Mtama Somalia:**\n\n- Wakati: Gu (Aprili–Juni) au Deyr (Oktoba–Novemba)\n- Joto: 25–32°C (hustahimili hadi 40°C)\n- Maji: 400–600 mm tu — chini ya mahindi\n- Nafasi: 60–75 sm safu, 15–20 sm mimea\n- Kina cha mbegu: 2–4 sm\n- Kiwango: kg 8–12/hektari\n- Siku za mavuno: 90–120\n\n**Tishio kubwa:** Striga na ndege wa Quelea. Badilisha na mikunde dhidi ya Striga.'
      },
      keywords: ['masago','masaggada','hadhuudh','durra','sorghum','mtama','abaar','drought','hadhuudhka','suunka masago','baay','bakool','striga','quelea','shimbiro','cereal']
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
      slug: 'greenhouse-farming', cat: 'tech', url: 'article-greenhouse-farming.html',
      title: { so: 'Beerista Daboolan — Greenhouse', en: 'Greenhouse Farming', ar: 'الزراعة في البيوت المحمية', sw: 'Kilimo cha Greenhouse' },
      summary: {
        so: 'Greenhouse Soomaaliya: 3–5× wax-soosaar, 70% biyo yar. $1,500–$10,000 bilow, lacag-celin 8–12 bil.',
        en: 'Greenhouse Somalia: 3–5× output, 70% less water. $1,500–$10,000 start, payback 8–12 months.',
        ar: 'البيوت المحمية: 3-5× إنتاج، 70% أقل ماء.',
        sw: 'Greenhouse: mara 3-5 mavuno, 70% maji pungufu.'
      },
      answer: {
        so: '**Beerista Daboolan (Greenhouse) Soomaaliya:**\n\n- Noocyada: Tunnel plastic $1,500–$3,500 · Shade net $800–$2,000 · Polycarbonate $5,000–$10,000 · Hybrid $2,000–$4,000\n- Wax-soosaar: Yaanyo cherry 60 kg/m²/sannad ($2–$3/kg)\n- Biyo: 70% ka yar drip irrigation\n- Bilow: 8m × 24m = $3,500 maalgashi\n- Faa\'iido: $320–$620/bil saafi\n- Lacag-celin: 8–12 bil\n\n**Talo:** Bilow shade net hybrid (cheap, fudud). Iibso hotelyada Muqdisho/Hargeysa.',
        en: '**Greenhouse farming in Somalia:**\n\n- Types: Plastic tunnel $1,500–$3,500 · Shade net $800–$2,000 · Polycarbonate $5,000–$10,000 · Hybrid $2,000–$4,000\n- Output: Cherry tomatoes 60 kg/m²/year ($2–$3/kg)\n- Water: 70% less with drip\n- Starter: 8m × 24m = $3,500 capital\n- Profit: $320–$620/month net\n- Payback: 8–12 months\n\n**Tip:** Start with hybrid shade-net (cheap, easy). Sell to hotels in Mogadishu/Hargeisa.',
        ar: '**الزراعة في البيوت المحمية في الصومال:**\n\n- الأنواع: نفق بلاستيكي ($1,500-$3,500) · شبكة تظليل ($800-$2,000) · بولي كربونيت ($5,000-$10,000)\n- إنتاج: طماطم 60 كغ/م²\n- ري بالتنقيط 70% أقل ماء\n- استرداد 8-12 شهراً',
        sw: '**Kilimo cha greenhouse Somalia:**\n\n- Aina: Tunnel plastiki ($1,500-$3,500) · Wavu wa kivuli ($800-$2,000)\n- Mavuno: Nyanya cherry kg 60/m²\n- Maji 70% pungufu na drip\n- Marejesho miezi 8-12'
      },
      keywords: ['greenhouse','greenhouses','daboolan','beer daboolan','protected farming','tunnel','shade net','polycarbonate','yaanyo daboolan','tomato greenhouse','hybrid greenhouse']
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
    },
    {
      slug: "wheat-farming", cat: "crops", url: "article-wheat-farming.html",
      title: { so: "Beeritaanka Qamadiga", en: "Wheat Farming", ar: "زراعة القمح", sw: "Kilimo cha Ngano" },
      summary: { so: "Qamadigu waa mid ka mid ah saddexda dalag hadhuudh ee ugu waaweyn adduunka, wuxuuna quudiyaa in ka badan saddex-meelood meel dadka dunida. Soomaaliya, waxaa lag", en: "Wheat is one of the world's three largest cereal crops, feeding more than a third of the global population. In Somalia it can be grown in cooler highland areas ", ar: "القمح أحد أكبر ثلاثة محاصيل حبوب في العالم، ويُطعم أكثر من ثلث سكان الأرض. في الصومال يمكن زراعته في المرتفعات الأبرد مثل المناطق الشمالية والأراضي المروية. يشر", sw: "Ngano ni mojawapo ya mazao makuu matatu ya nafaka duniani, likilisha zaidi ya theluthi ya watu wa dunia. Nchini Somalia inaweza kulimwa katika maeneo ya baridi " },
      answer: { so: "Qamadigu waa mid ka mid ah saddexda dalag hadhuudh ee ugu waaweyn adduunka, wuxuuna quudiyaa in ka badan saddex-meelood meel dadka dunida. Soomaaliya, waxaa lagu beeri karaa gobollada dhaadheer ee qabow sida qaybaha waqooyi iyo dhulalka waraabka leh. Hagahani wuxuu kuu sharxayaa sida loo beero qamadi waxsoosaar leh oo tayo sare leh.", en: "Wheat is one of the world's three largest cereal crops, feeding more than a third of the global population. In Somalia it can be grown in cooler highland areas such as the northern regions and irrigated lands. This guide explains how to grow a high-yielding, quality wheat crop.", ar: "القمح أحد أكبر ثلاثة محاصيل حبوب في العالم، ويُطعم أكثر من ثلث سكان الأرض. في الصومال يمكن زراعته في المرتفعات الأبرد مثل المناطق الشمالية والأراضي المروية. يشرح هذا الدليل كيفية زراعة محصول قمح عالي الإنتاج والجودة.", sw: "Ngano ni mojawapo ya mazao makuu matatu ya nafaka duniani, likilisha zaidi ya theluthi ya watu wa dunia. Nchini Somalia inaweza kulimwa katika maeneo ya baridi ya nyanda za juu kama mikoa ya kaskazini na ardhi ya umwagiliaji. Mwongozo huu unaeleza jinsi ya kulima zao la ngano lenye mavuno na ubora." },
      keywords: ["wheat", "beeritaanka", "qamadiga", "hagaha", "buuxa"]
    },
    {
      slug: "millet-farming", cat: "crops", url: "article-millet-farming.html",
      title: { so: "Beeritaanka Dawaha (Pearl Millet)", en: "Pearl Millet Farming", ar: "زراعة الدخن", sw: "Kilimo cha Uwele" },
      summary: { so: "Dawuhu waa dalag hadhuudh oo aad u adkaysi badan abaaraha iyo kuleylka, taasoo ka dhigaysa mid ku habboon dhulalka qallalan ee Soomaaliya. Wuxuu ku bixi karaa d", en: "Pearl millet is an extremely drought- and heat-tolerant cereal, making it ideal for Somalia's drylands. It can yield on very dry land where wheat or maize canno", ar: "الدخن محصول حبوب شديد التحمّل للجفاف والحرارة، مما يجعله مثالياً للأراضي الجافة في الصومال. يمكنه الإنتاج في أراضٍ جافة جداً لا ينمو فيها القمح أو الذرة، ويُطعم", sw: "Uwele ni nafaka inayostahimili sana ukame na joto, na hivyo linafaa kwa ardhi kavu za Somalia. Linaweza kutoa mavuno kwenye ardhi kavu sana ambapo ngano au mahi" },
      answer: { so: "Dawuhu waa dalag hadhuudh oo aad u adkaysi badan abaaraha iyo kuleylka, taasoo ka dhigaysa mid ku habboon dhulalka qallalan ee Soomaaliya. Wuxuu ku bixi karaa dhul aad u qallalan oo aan qamadi ama galley lagu beeri karin, wuxuuna quudiyaa malaayiin qof oo Geeska Afrika iyo Aasiya ah.", en: "Pearl millet is an extremely drought- and heat-tolerant cereal, making it ideal for Somalia's drylands. It can yield on very dry land where wheat or maize cannot grow, and it feeds millions across the Horn of Africa and Asia.", ar: "الدخن محصول حبوب شديد التحمّل للجفاف والحرارة، مما يجعله مثالياً للأراضي الجافة في الصومال. يمكنه الإنتاج في أراضٍ جافة جداً لا ينمو فيها القمح أو الذرة، ويُطعم ملايين البشر في القرن الإفريقي وآسيا.", sw: "Uwele ni nafaka inayostahimili sana ukame na joto, na hivyo linafaa kwa ardhi kavu za Somalia. Linaweza kutoa mavuno kwenye ardhi kavu sana ambapo ngano au mahindi haviwezi kukua, na hulisha mamilioni ya watu katika Pembe ya Afrika na Asia." },
      keywords: ["millet", "pearl", "beeritaanka", "dawaha", "hagaha", "buuxa"]
    },
    {
      slug: "groundnut-farming", cat: "crops", url: "article-groundnut-farming.html",
      title: { so: "Beeritaanka Lawska (Groundnut)", en: "Groundnut Farming", ar: "زراعة الفول السوداني", sw: "Kilimo cha Karanga" },
      summary: { so: "Lawsku waa dalag digir ah oo qiimo dhaqaale sare leh, wuxuuna ku daraa nitrojiin ciidda taasoo xoojisa bacrinta. Wuxuu bixiyaa saliid, borotiin, iyo cunto xoolo", en: "Groundnut is a high-value legume cash crop that also fixes nitrogen in the soil, improving fertility. It provides oil, protein, and animal feed. In Somalia and ", ar: "الفول السوداني محصول بقولي نقدي عالي القيمة يثبّت النيتروجين في التربة أيضاً، محسّناً الخصوبة. يوفّر الزيت والبروتين وعلف الحيوان. في الصومال والمناطق الحارة، ا", sw: "Karanga ni zao la jamii ya mikunde lenye thamani kubwa la biashara ambalo pia hufunga naitrojeni kwenye udongo, likiboresha rutuba. Hutoa mafuta, protini, na ch" },
      answer: { so: "Lawsku waa dalag digir ah oo qiimo dhaqaale sare leh, wuxuuna ku daraa nitrojiin ciidda taasoo xoojisa bacrinta. Wuxuu bixiyaa saliid, borotiin, iyo cunto xoolo. Soomaaliya iyo dhulalka kulul, lawsku waa dalag lacag-soo-gelin fiican oo yaraysa saboolnimada beeraleyda.", en: "Groundnut is a high-value legume cash crop that also fixes nitrogen in the soil, improving fertility. It provides oil, protein, and animal feed. In Somalia and hot regions, groundnut is a good income crop that reduces farmer poverty.", ar: "الفول السوداني محصول بقولي نقدي عالي القيمة يثبّت النيتروجين في التربة أيضاً، محسّناً الخصوبة. يوفّر الزيت والبروتين وعلف الحيوان. في الصومال والمناطق الحارة، الفول السوداني محصول دخل جيد يقلل فقر المزارعين.", sw: "Karanga ni zao la jamii ya mikunde lenye thamani kubwa la biashara ambalo pia hufunga naitrojeni kwenye udongo, likiboresha rutuba. Hutoa mafuta, protini, na chakula cha wanyama. Nchini Somalia na maeneo ya joto, karanga ni zao zuri la kipato linalopunguza umaskini wa wakulima." },
      keywords: ["groundnut", "beeritaanka", "lawska", "hagaha", "buuxa"]
    },
    {
      slug: "sunflower-farming", cat: "crops", url: "article-sunflower-farming.html",
      title: { so: "Beeritaanka Gabbaldheerta (Sunflower)", en: "Sunflower Farming", ar: "زراعة عباد الشمس", sw: "Kilimo cha Alizeti" },
      summary: { so: "Gabbaldheertu waa dalag saliideed oo lacag-soo-gelin fiican u ah beeraleyda. Waxay ku bixi kartaa dhulal roob-dhexdhexaad ah, waxayna bixisaa saliid cunto caafi", en: "Sunflower is an oilseed crop that is a good income source for farmers. It can yield in medium-rainfall lands and produces healthy cooking oil and animal feed.", ar: "عباد الشمس محصول زيتي ومصدر دخل جيد للمزارعين. يمكنه الإنتاج في أراضٍ متوسطة الأمطار وينتج زيت طهي صحياً وعلفاً حيوانياً.", sw: "Alizeti ni zao la mbegu za mafuta na chanzo kizuri cha kipato kwa wakulima. Linaweza kutoa mavuno kwenye ardhi za mvua ya wastani na hutoa mafuta ya kupikia yen" },
      answer: { so: "Gabbaldheertu waa dalag saliideed oo lacag-soo-gelin fiican u ah beeraleyda. Waxay ku bixi kartaa dhulal roob-dhexdhexaad ah, waxayna bixisaa saliid cunto caafimaad leh iyo cunto xoolo.", en: "Sunflower is an oilseed crop that is a good income source for farmers. It can yield in medium-rainfall lands and produces healthy cooking oil and animal feed.", ar: "عباد الشمس محصول زيتي ومصدر دخل جيد للمزارعين. يمكنه الإنتاج في أراضٍ متوسطة الأمطار وينتج زيت طهي صحياً وعلفاً حيوانياً.", sw: "Alizeti ni zao la mbegu za mafuta na chanzo kizuri cha kipato kwa wakulima. Linaweza kutoa mavuno kwenye ardhi za mvua ya wastani na hutoa mafuta ya kupikia yenye afya na chakula cha wanyama." },
      keywords: ["sunflower", "beeritaanka", "gabbaldheerta", "hagaha", "buuxa"]
    },
    {
      slug: "sweet-potato-farming", cat: "crops", url: "article-sweet-potato-farming.html",
      title: { so: "Beeritaanka Baradhada Macaan (Sweet Potato)", en: "Sweet Potato Farming", ar: "زراعة البطاطا الحلوة", sw: "Kilimo cha Viazi Vitamu" },
      summary: { so: "Baradhada macaan waa dalag xidid oo dhaqso u koraya oo amni-cunto weyn u ah dhulalka qallalan. Waxay ku bixi kartaa ciid liidata, waana il fiitamiin A oo la dag", en: "Sweet potato is a fast-growing root crop and a major food-security crop for dry lands. It can yield on poor soil and is a source of vitamin A that fights child ", ar: "البطاطا الحلوة محصول جذري سريع النمو ومحصول أمن غذائي للأراضي الجافة. يمكنها الإنتاج في تربة فقيرة ومصدر لفيتامين A يكافح سوء تغذية الأطفال.", sw: "Viazi vitamu ni zao la mizizi linalokua haraka na zao la usalama wa chakula kwa ardhi kavu. Linaweza kutoa mavuno kwenye udongo duni na ni chanzo cha vitamini A" },
      answer: { so: "Baradhada macaan waa dalag xidid oo dhaqso u koraya oo amni-cunto weyn u ah dhulalka qallalan. Waxay ku bixi kartaa ciid liidata, waana il fiitamiin A oo la dagaallanta nafaqo-darrada carruurta.", en: "Sweet potato is a fast-growing root crop and a major food-security crop for dry lands. It can yield on poor soil and is a source of vitamin A that fights child malnutrition.", ar: "البطاطا الحلوة محصول جذري سريع النمو ومحصول أمن غذائي للأراضي الجافة. يمكنها الإنتاج في تربة فقيرة ومصدر لفيتامين A يكافح سوء تغذية الأطفال.", sw: "Viazi vitamu ni zao la mizizi linalokua haraka na zao la usalama wa chakula kwa ardhi kavu. Linaweza kutoa mavuno kwenye udongo duni na ni chanzo cha vitamini A kinachopambana na utapiamlo wa watoto." },
      keywords: ["sweet", "potato", "beeritaanka", "baradhada", "macaan", "hagaha", "buuxa"]
    },
    {
      slug: "green-gram-farming", cat: "crops", url: "article-green-gram-farming.html",
      title: { so: "Beeritaanka Digirta Cagaaran (Green Gram)", en: "Green Gram (Mung Bean) Farming", ar: "زراعة الماش (البقلة الخضراء)", sw: "Kilimo cha Choroko" },
      summary: { so: "Digirta cagaaran waa digir dhaqso u koraysa (60 ilaa 90 maalmood) oo abaar-adkaysi leh. Waxay ku daraa nitrojiin ciidda, waxayna ku habboon tahay wareejinta dal", en: "Green gram is a fast-maturing legume (60 to 90 days) with drought tolerance. It fixes nitrogen in the soil and is ideal for crop rotation and Somalia's dry land", ar: "الماش بقلة سريعة النضج (60 إلى 90 يوماً) تتحمّل الجفاف. يثبّت النيتروجين في التربة ومثالي للدورة الزراعية والأراضي الجافة.", sw: "Choroko ni jamii ya mikunde inayokomaa haraka (siku 60 hadi 90) yenye ustahimilivu wa ukame. Hufunga naitrojeni kwenye udongo na inafaa kwa mzunguko wa mazao na" },
      answer: { so: "Digirta cagaaran waa digir dhaqso u koraysa (60 ilaa 90 maalmood) oo abaar-adkaysi leh. Waxay ku daraa nitrojiin ciidda, waxayna ku habboon tahay wareejinta dalagga iyo dhulalka qallalan ee Soomaaliya.", en: "Green gram is a fast-maturing legume (60 to 90 days) with drought tolerance. It fixes nitrogen in the soil and is ideal for crop rotation and Somalia's dry lands.", ar: "الماش بقلة سريعة النضج (60 إلى 90 يوماً) تتحمّل الجفاف. يثبّت النيتروجين في التربة ومثالي للدورة الزراعية والأراضي الجافة.", sw: "Choroko ni jamii ya mikunde inayokomaa haraka (siku 60 hadi 90) yenye ustahimilivu wa ukame. Hufunga naitrojeni kwenye udongo na inafaa kwa mzunguko wa mazao na ardhi kavu za Somalia." },
      keywords: ["green", "gram", "mung", "bean", "beeritaanka", "digirta", "cagaaran", "hagaha", "buuxa"]
    },
    {
      slug: "sugarcane-farming", cat: "crops", url: "article-sugarcane-farming.html",
      title: { so: "Beeritaanka Qasabka Sonkorta (Sugarcane)", en: "Sugarcane Farming", ar: "زراعة قصب السكر", sw: "Kilimo cha Miwa" },
      summary: { so: "Qasabka sonkortu waa dalag biyo-badan oo lacag-soo-gelin sare leh oo laga sameeyo sonkor, casiir, iyo bur (molasses). Wuxuu u baahan yahay dhul waraabkiisu wana", en: "Sugarcane is a water-loving, high-value cash crop used to make sugar, juice, and molasses. It needs well-irrigated land and does well in Somalia's riverine regi", ar: "قصب السكر محصول نقدي محب للماء عالي القيمة يُصنع منه السكر والعصير والمولاس. يحتاج أرضاً جيدة الري وينجح في مناطق الأنهار في الصومال مثل شبيلي وجوبا.", sw: "Miwa ni zao la biashara lenye thamani kubwa lipendalo maji linalotumika kutengeneza sukari, juisi, na molasi. Linahitaji ardhi yenye umwagiliaji mzuri na hufany" },
      answer: { so: "Qasabka sonkortu waa dalag biyo-badan oo lacag-soo-gelin sare leh oo laga sameeyo sonkor, casiir, iyo bur (molasses). Wuxuu u baahan yahay dhul waraabkiisu wanaagsan yahay, wuxuuna ku fiican yahay gobollada webiyada u dhow ee Soomaaliya sida Shabeelle iyo Jubba.", en: "Sugarcane is a water-loving, high-value cash crop used to make sugar, juice, and molasses. It needs well-irrigated land and does well in Somalia's riverine regions such as Shabelle and Jubba.", ar: "قصب السكر محصول نقدي محب للماء عالي القيمة يُصنع منه السكر والعصير والمولاس. يحتاج أرضاً جيدة الري وينجح في مناطق الأنهار في الصومال مثل شبيلي وجوبا.", sw: "Miwa ni zao la biashara lenye thamani kubwa lipendalo maji linalotumika kutengeneza sukari, juisi, na molasi. Linahitaji ardhi yenye umwagiliaji mzuri na hufanya vizuri katika mikoa ya mito ya Somalia kama Shabelle na Jubba." },
      keywords: ["sugarcane", "beeritaanka", "qasabka", "sonkorta", "hagaha", "buuxa"]
    },
    {
      slug: "okra-farming", cat: "crops", url: "article-okra-farming.html",
      title: { so: "Beeritaanka Bamiyaha (Okra)", en: "Okra Farming", ar: "زراعة البامية", sw: "Kilimo cha Bamia" },
      summary: { so: "Bamiyuhu waa khudaar kulayl-jecel oo dhaqso u miro bixisa oo si joogto ah loo guro. Waa dalag lacag-soo-gelin fiican oo ku habboon xilliyada kulul ee Soomaaliya", en: "Okra is a heat-loving vegetable that produces quickly and is picked continuously. It is a good income crop suited to Somalia's hot seasons and has a steady mark", ar: "البامية خضار محب للحرارة ينتج بسرعة ويُقطف باستمرار. محصول دخل جيد يناسب مواسم الصومال الحارة وله سوق ثابت.", sw: "Bamia ni mboga ipendayo joto inayozaa haraka na kuvunwa mfululizo. Ni zao zuri la kipato linalofaa misimu ya joto ya Somalia na lina soko la kudumu." },
      answer: { so: "Bamiyuhu waa khudaar kulayl-jecel oo dhaqso u miro bixisa oo si joogto ah loo guro. Waa dalag lacag-soo-gelin fiican oo ku habboon xilliyada kulul ee Soomaaliya, wuxuuna leeyahay suuq joogto ah.", en: "Okra is a heat-loving vegetable that produces quickly and is picked continuously. It is a good income crop suited to Somalia's hot seasons and has a steady market.", ar: "البامية خضار محب للحرارة ينتج بسرعة ويُقطف باستمرار. محصول دخل جيد يناسب مواسم الصومال الحارة وله سوق ثابت.", sw: "Bamia ni mboga ipendayo joto inayozaa haraka na kuvunwa mfululizo. Ni zao zuri la kipato linalofaa misimu ya joto ya Somalia na lina soko la kudumu." },
      keywords: ["okra", "beeritaanka", "bamiyaha", "hagaha", "buuxa"]
    },
    {
      slug: "eggplant-farming", cat: "crops", url: "article-eggplant-farming.html",
      title: { so: "Beeritaanka Bidaariga (Eggplant)", en: "Eggplant (Aubergine) Farming", ar: "زراعة الباذنجان", sw: "Kilimo cha Biringanya" },
      summary: { so: "Bidaarigu waa khudaar dakhli-badan oo muddo-dheer miro bixisa haddii si fiican loo daryeelo. Waa dalag ku habboon xilliyada kulul ee Soomaaliya, wuxuuna leeyaha", en: "Eggplant is a high-income vegetable that fruits for a long time if well cared for. It suits Somalia's hot seasons and has a steady city market.", ar: "الباذنجان خضار عالي الدخل يثمر لفترة طويلة إذا اعتُني به جيداً. يناسب مواسم الصومال الحارة وله سوق ثابت في المدن.", sw: "Biringanya ni mboga yenye kipato kikubwa inayozaa kwa muda mrefu ikitunzwa vizuri. Inafaa misimu ya joto ya Somalia na ina soko la kudumu mijini." },
      answer: { so: "Bidaarigu waa khudaar dakhli-badan oo muddo-dheer miro bixisa haddii si fiican loo daryeelo. Waa dalag ku habboon xilliyada kulul ee Soomaaliya, wuxuuna leeyahay suuq joogto ah magaalooyinka.", en: "Eggplant is a high-income vegetable that fruits for a long time if well cared for. It suits Somalia's hot seasons and has a steady city market.", ar: "الباذنجان خضار عالي الدخل يثمر لفترة طويلة إذا اعتُني به جيداً. يناسب مواسم الصومال الحارة وله سوق ثابت في المدن.", sw: "Biringanya ni mboga yenye kipato kikubwa inayozaa kwa muda mrefu ikitunzwa vizuri. Inafaa misimu ya joto ya Somalia na ina soko la kudumu mijini." },
      keywords: ["eggplant", "aubergine", "beeritaanka", "bidaariga", "hagaha", "buuxa"]
    },
    {
      slug: "carrot-farming", cat: "crops", url: "article-carrot-farming.html",
      title: { so: "Beeritaanka Karootada (Carrot)", en: "Carrot Farming", ar: "زراعة الجزر", sw: "Kilimo cha Karoti" },
      summary: { so: "Karootadu waa khudaar xidid oo hodan ku ah fiitamiin A oo suuq wanaagsan leh magaalooyinka. Waxay u baahan tahay ciid debecsan oo bacaad ah si xididdadu si toos", en: "Carrot is a vitamin-A rich root vegetable with a good city market. It needs loose sandy soil so roots grow straight. It does well in the cooler seasons of highl", ar: "الجزر خضار جذري غني بفيتامين A وله سوق جيد في المدن. يحتاج تربة رملية فضفاضة لتنمو الجذور مستقيمة. ينجح في المواسم الباردة للمرتفعات.", sw: "Karoti ni mboga ya mizizi yenye vitamini A na soko zuri mijini. Inahitaji udongo laini wa kichanga ili mizizi ikue moja kwa moja. Hufanya vizuri misimu ya barid" },
      answer: { so: "Karootadu waa khudaar xidid oo hodan ku ah fiitamiin A oo suuq wanaagsan leh magaalooyinka. Waxay u baahan tahay ciid debecsan oo bacaad ah si xididdadu si toosan u koraan. Waxay ku fiican tahay xilliyada qabow ee gobollada dhaadheer.", en: "Carrot is a vitamin-A rich root vegetable with a good city market. It needs loose sandy soil so roots grow straight. It does well in the cooler seasons of highland areas.", ar: "الجزر خضار جذري غني بفيتامين A وله سوق جيد في المدن. يحتاج تربة رملية فضفاضة لتنمو الجذور مستقيمة. ينجح في المواسم الباردة للمرتفعات.", sw: "Karoti ni mboga ya mizizi yenye vitamini A na soko zuri mijini. Inahitaji udongo laini wa kichanga ili mizizi ikue moja kwa moja. Hufanya vizuri misimu ya baridi ya nyanda za juu." },
      keywords: ["carrot", "beeritaanka", "karootada", "hagaha", "buuxa"]
    },
    {
      slug: "garlic-farming", cat: "crops", url: "article-garlic-farming.html",
      title: { so: "Beeritaanka Toonta (Garlic)", en: "Garlic Farming", ar: "زراعة الثوم", sw: "Kilimo cha Kitunguu Saumu" },
      summary: { so: "Toontu waa dalag dahaadhi (spice) qiimo sare leh oo suuq joogto ah leh gudaha iyo dibaddaba. Waxay leedahay faa'iido caafimaad, waxayna u baahan tahay xilli qab", en: "Garlic is a high-value spice crop with a steady local and export market. It has health benefits and needs a cool growing period. It is a good income crop for sm", ar: "الثوم محصول توابل عالي القيمة له سوق محلي وتصديري ثابت. له فوائد صحية ويحتاج فترة نمو باردة. محصول دخل جيد للقطع الصغيرة.", sw: "Kitunguu saumu ni zao la viungo lenye thamani kubwa lenye soko la ndani na nje. Lina faida za afya na linahitaji kipindi cha baridi cha ukuaji. Ni zao zuri la k" },
      answer: { so: "Toontu waa dalag dahaadhi (spice) qiimo sare leh oo suuq joogto ah leh gudaha iyo dibaddaba. Waxay leedahay faa'iido caafimaad, waxayna u baahan tahay xilli qabow bilaha koritaanka. Waa dalag lacag-soo-gelin fiican beerta yar.", en: "Garlic is a high-value spice crop with a steady local and export market. It has health benefits and needs a cool growing period. It is a good income crop for small plots.", ar: "الثوم محصول توابل عالي القيمة له سوق محلي وتصديري ثابت. له فوائد صحية ويحتاج فترة نمو باردة. محصول دخل جيد للقطع الصغيرة.", sw: "Kitunguu saumu ni zao la viungo lenye thamani kubwa lenye soko la ndani na nje. Lina faida za afya na linahitaji kipindi cha baridi cha ukuaji. Ni zao zuri la kipato kwa mashamba madogo." },
      keywords: ["garlic", "beeritaanka", "toonta", "hagaha", "buuxa"]
    },
    {
      slug: "spinach-farming", cat: "crops", url: "article-spinach-farming.html",
      title: { so: "Beeritaanka Isbinaajka (Spinach)", en: "Spinach Farming", ar: "زراعة السبانخ", sw: "Kilimo cha Mchicha" },
      summary: { so: "Isbinaajku waa khudaar cagaaran oo dhaqso u koraysa (30 ilaa 45 maalmood) oo hodan ku ah baddin, fiitamiin A, iyo C. Waa dalag fiican beerta guriga iyo ganacsi ", en: "Spinach is a fast-growing leafy green (30 to 45 days) rich in iron and vitamins A and C. It is a good crop for home gardens and small business and brings quick ", ar: "السبانخ خضار ورقي سريع النمو (30 إلى 45 يوماً) غني بالحديد وفيتامينات A وC. محصول جيد لحدائق المنازل والأعمال الصغيرة ويجلب دخلاً سريعاً.", sw: "Mchicha ni mboga ya majani inayokua haraka (siku 30 hadi 45) yenye madini ya chuma na vitamini A na C. Ni zao zuri kwa bustani za nyumbani na biashara ndogo na " },
      answer: { so: "Isbinaajku waa khudaar cagaaran oo dhaqso u koraysa (30 ilaa 45 maalmood) oo hodan ku ah baddin, fiitamiin A, iyo C. Waa dalag fiican beerta guriga iyo ganacsi yar, wuxuuna dakhli dhaqso ah keenaa.", en: "Spinach is a fast-growing leafy green (30 to 45 days) rich in iron and vitamins A and C. It is a good crop for home gardens and small business and brings quick income.", ar: "السبانخ خضار ورقي سريع النمو (30 إلى 45 يوماً) غني بالحديد وفيتامينات A وC. محصول جيد لحدائق المنازل والأعمال الصغيرة ويجلب دخلاً سريعاً.", sw: "Mchicha ni mboga ya majani inayokua haraka (siku 30 hadi 45) yenye madini ya chuma na vitamini A na C. Ni zao zuri kwa bustani za nyumbani na biashara ndogo na huleta kipato cha haraka." },
      keywords: ["spinach", "beeritaanka", "isbinaajka", "hagaha", "buuxa"]
    },
    {
      slug: "citrus-farming", cat: "crops", url: "article-citrus-farming.html",
      title: { so: "Beeritaanka Liinta iyo Faraanjiga (Citrus)", en: "Citrus (Lemon and Orange) Farming", ar: "زراعة الحمضيات", sw: "Kilimo cha Michungwa na Ndimu" },
      summary: { so: "Geedaha liinta, faraanjiga, iyo bambeelmada waa geedo miro oo qiimo sare leh oo sannado badan waxsoosaar bixiya. Waxay hodan ku yihiin fiitamiin C, waxayna suuq", en: "Lemon, orange, and lime trees are high-value fruit trees that yield for many years. They are rich in vitamin C and have a good local and export market. They are", ar: "أشجار الليمون والبرتقال والليم أشجار فاكهة عالية القيمة تنتج لسنوات كثيرة. غنية بفيتامين C ولها سوق محلي وتصديري جيد. استثمار طويل الأمد جيد للمزارعين.", sw: "Miti ya ndimu, michungwa, na limau ni miti ya matunda yenye thamani kubwa inayozaa kwa miaka mingi. Ina vitamini C na soko zuri la ndani na nje. Ni uwekezaji mz" },
      answer: { so: "Geedaha liinta, faraanjiga, iyo bambeelmada waa geedo miro oo qiimo sare leh oo sannado badan waxsoosaar bixiya. Waxay hodan ku yihiin fiitamiin C, waxayna suuq wanaagsan ku leeyihiin gudaha iyo dibaddaba. Waa maalgashi mustaqbal fiican u leh beeraleyda.", en: "Lemon, orange, and lime trees are high-value fruit trees that yield for many years. They are rich in vitamin C and have a good local and export market. They are a good long-term investment for farmers.", ar: "أشجار الليمون والبرتقال والليم أشجار فاكهة عالية القيمة تنتج لسنوات كثيرة. غنية بفيتامين C ولها سوق محلي وتصديري جيد. استثمار طويل الأمد جيد للمزارعين.", sw: "Miti ya ndimu, michungwa, na limau ni miti ya matunda yenye thamani kubwa inayozaa kwa miaka mingi. Ina vitamini C na soko zuri la ndani na nje. Ni uwekezaji mzuri wa muda mrefu kwa wakulima." },
      keywords: ["citrus", "lemon", "orange", "beeritaanka", "liinta", "faraanjiga", "hagaha", "buuxa"]
    },
    {
      slug: "papaya-farming", cat: "crops", url: "article-papaya-farming.html",
      title: { so: "Beeritaanka Babaayga (Papaya)", en: "Papaya Farming", ar: "زراعة البابايا", sw: "Kilimo cha Papai" },
      summary: { so: "Babaaygu waa geed miro oo dhaqso u soo saara (8 ilaa 10 bilood) oo sannad dheer miro bixiya. Wuxuu hodan ku yahay fiitamiin A iyo C, wuxuuna leeyahay suuq wanaa", en: "Papaya is a fast-yielding fruit tree (8 to 10 months) that fruits for a long time. It is rich in vitamins A and C and has a good market. It suits Somalia's hot ", ar: "البابايا شجرة فاكهة سريعة الإنتاج (8 إلى 10 أشهر) تثمر لفترة طويلة. غنية بفيتامينات A وC ولها سوق جيد. تناسب مناخ الصومال الحار.", sw: "Papai ni mti wa matunda unaozaa haraka (miezi 8 hadi 10) unaozaa kwa muda mrefu. Una vitamini A na C na soko zuri. Unafaa hali ya hewa ya joto ya Somalia." },
      answer: { so: "Babaaygu waa geed miro oo dhaqso u soo saara (8 ilaa 10 bilood) oo sannad dheer miro bixiya. Wuxuu hodan ku yahay fiitamiin A iyo C, wuxuuna leeyahay suuq wanaagsan. Waa dalag ku habboon xilliyada kulul ee Soomaaliya.", en: "Papaya is a fast-yielding fruit tree (8 to 10 months) that fruits for a long time. It is rich in vitamins A and C and has a good market. It suits Somalia's hot climate.", ar: "البابايا شجرة فاكهة سريعة الإنتاج (8 إلى 10 أشهر) تثمر لفترة طويلة. غنية بفيتامينات A وC ولها سوق جيد. تناسب مناخ الصومال الحار.", sw: "Papai ni mti wa matunda unaozaa haraka (miezi 8 hadi 10) unaozaa kwa muda mrefu. Una vitamini A na C na soko zuri. Unafaa hali ya hewa ya joto ya Somalia." },
      keywords: ["papaya", "beeritaanka", "babaayga", "hagaha", "buuxa"]
    },
    {
      slug: "moringa-farming", cat: "crops", url: "article-moringa-farming.html",
      title: { so: "Beeritaanka Moringa (Geedka Mucjisada)", en: "Moringa Farming", ar: "زراعة المورينجا", sw: "Kilimo cha Mlonge" },
      summary: { so: "Moringa waa geed nafaqo aad u sarreeya oo abaar-adkaysi weyn leh oo si dhakhso ah u koraya. Caleemihiisu waxay ka kooban yihiin borotiin, baddin, kalsiyum, iyo ", en: "Moringa is a super-nutritious, highly drought-tolerant, fast-growing tree. Its leaves are packed with protein, iron, calcium, and many vitamins. It fights malnu", ar: "المورينجا شجرة فائقة التغذية شديدة تحمّل الجفاف سريعة النمو. أوراقها مليئة بالبروتين والحديد والكالسيوم وفيتامينات كثيرة. تكافح سوء التغذية ولها سوق عالمي متنام", sw: "Mlonge ni mti wenye lishe kubwa, unaostahimili sana ukame, unaokua haraka. Majani yake yamejaa protini, madini ya chuma, kalsiamu, na vitamini nyingi. Hupambana" },
      answer: { so: "Moringa waa geed nafaqo aad u sarreeya oo abaar-adkaysi weyn leh oo si dhakhso ah u koraya. Caleemihiisu waxay ka kooban yihiin borotiin, baddin, kalsiyum, iyo fiitamiin badan. Waa dalag la dagaallama nafaqo-darrada wuxuuna leeyahay suuq caalami sii korayo.", en: "Moringa is a super-nutritious, highly drought-tolerant, fast-growing tree. Its leaves are packed with protein, iron, calcium, and many vitamins. It fights malnutrition and has a growing global market.", ar: "المورينجا شجرة فائقة التغذية شديدة تحمّل الجفاف سريعة النمو. أوراقها مليئة بالبروتين والحديد والكالسيوم وفيتامينات كثيرة. تكافح سوء التغذية ولها سوق عالمي متنامٍ.", sw: "Mlonge ni mti wenye lishe kubwa, unaostahimili sana ukame, unaokua haraka. Majani yake yamejaa protini, madini ya chuma, kalsiamu, na vitamini nyingi. Hupambana na utapiamlo na una soko la dunia linaloongezeka." },
      keywords: ["moringa", "beeritaanka", "geedka", "mucjisada", "hagaha", "buuxa"]
    },
    {
      slug: "guava-farming", cat: "crops", url: "article-guava-farming.html",
      title: { so: "Beeritaanka Seytuunka (Guava)", en: "Guava Farming", ar: "زراعة الجوافة", sw: "Kilimo cha Mapera" },
      summary: { so: "Seytuunku (guava) waa geed miro oo adkaysi weyn leh oo dhaqso miro bixiya. Wuxuu hodan ku yahay fiitamiin C (ka badan liinta), wuxuuna u dulqaadan karaa cimilo ", en: "Guava is a very hardy fruit tree that fruits quickly. It is richer in vitamin C than lemon and tolerates varied climate and soil. It is a good income crop needi", ar: "الجوافة شجرة فاكهة شديدة التحمّل تثمر بسرعة. أغنى بفيتامين C من الليمون وتتحمّل مناخاً وتربة متنوعة. محصول دخل جيد يحتاج عناية قليلة.", sw: "Mapera ni mti wa matunda unaostahimili sana unaozaa haraka. Una vitamini C zaidi ya ndimu na hustahimili hali ya hewa na udongo mbalimbali. Ni zao zuri la kipat" },
      answer: { so: "Seytuunku (guava) waa geed miro oo adkaysi weyn leh oo dhaqso miro bixiya. Wuxuu hodan ku yahay fiitamiin C (ka badan liinta), wuxuuna u dulqaadan karaa cimilo iyo ciid kala duwan. Waa dalag lacag-soo-gelin fiican oo daryeel yar u baahan.", en: "Guava is a very hardy fruit tree that fruits quickly. It is richer in vitamin C than lemon and tolerates varied climate and soil. It is a good income crop needing little care.", ar: "الجوافة شجرة فاكهة شديدة التحمّل تثمر بسرعة. أغنى بفيتامين C من الليمون وتتحمّل مناخاً وتربة متنوعة. محصول دخل جيد يحتاج عناية قليلة.", sw: "Mapera ni mti wa matunda unaostahimili sana unaozaa haraka. Una vitamini C zaidi ya ndimu na hustahimili hali ya hewa na udongo mbalimbali. Ni zao zuri la kipato linalohitaji utunzaji kidogo." },
      keywords: ["guava", "beeritaanka", "seytuunka", "hagaha", "buuxa"]
    },
    {
      slug: "agronomy-basics", cat: "crops", url: "article-agronomy-basics.html",
      title: { so: "Aasaaska Agronomy — Cilmiga Beeritaanka Dalagga", en: "Fundamentals of Agronomy — The Science of Crop Production", ar: "أساسيات علم المحاصيل (الأغرونومي)", sw: "Misingi ya Agronomia — Sayansi ya Uzalishaji wa Mazao" },
      summary: { so: "Agronomy waa cilmiga maaraynta dalagyada iyo ciidda si loo helo waxsoosaar badan oo tayo leh iyadoo la ilaalinayo deegaanka. Wuxuu isku daraa sayniska dhirta, c", en: "Agronomy is the science of managing crops and soil to achieve high, quality yields while protecting the environment. It combines the science of plants, soil, cl", ar: "علم المحاصيل هو علم إدارة المحاصيل والتربة لتحقيق إنتاج عالٍ وجيد مع حماية البيئة. يجمع بين علم النبات والتربة والمناخ والإدارة ليصل المزارع لأعلى إنتاج. المعرف", sw: "Agronomia ni sayansi ya kusimamia mazao na udongo ili kupata mavuno mengi na bora huku ukilinda mazingira. Inachanganya sayansi ya mimea, udongo, hali ya hewa, " },
      answer: { so: "Agronomy waa cilmiga maaraynta dalagyada iyo ciidda si loo helo waxsoosaar badan oo tayo leh iyadoo la ilaalinayo deegaanka. Wuxuu isku daraa sayniska dhirta, ciidda, cimilada, iyo maaraynta si beeralaha ugu gaadho waxsoosaarka ugu sarreeya. Aqoonta agronomy-ga ayaa aasaas u ah beerid guulaysata.", en: "Agronomy is the science of managing crops and soil to achieve high, quality yields while protecting the environment. It combines the science of plants, soil, climate, and management so the farmer reaches maximum production. Agronomic knowledge is the foundation of successful farming.", ar: "علم المحاصيل هو علم إدارة المحاصيل والتربة لتحقيق إنتاج عالٍ وجيد مع حماية البيئة. يجمع بين علم النبات والتربة والمناخ والإدارة ليصل المزارع لأعلى إنتاج. المعرفة الأغرونومية أساس الزراعة الناجحة.", sw: "Agronomia ni sayansi ya kusimamia mazao na udongo ili kupata mavuno mengi na bora huku ukilinda mazingira. Inachanganya sayansi ya mimea, udongo, hali ya hewa, na usimamizi ili mkulima afikie uzalishaji wa juu. Maarifa ya agronomia ni msingi wa kilimo chenye mafanikio." },
      keywords: ["agronomy", "basics", "fundamentals", "science", "crop", "production", "aasaaska", "cilmiga", "beeritaanka", "dalagga"]
    },
    {
      slug: "tillage-systems", cat: "crops", url: "article-tillage-systems.html",
      title: { so: "Falaarta Dhulka iyo Nidaamyadeeda (Tillage)", en: "Tillage Systems — Preparing the Soil", ar: "نظم الحراثة وتجهيز التربة", sw: "Mifumo ya Kulima Udongo" },
      summary: { so: "Falaartu waa diyaarinta ciidda ka hor beerista si iniinuhu si fiican u soo baxaan oo xididdadu u koraan. Falaar wanaagsan ayaa hagaajisa hawada ciidda, biyo-nuu", en: "Tillage is preparing the soil before planting so seeds germinate well and roots grow. Good tillage improves soil aeration, water infiltration, and weed control.", ar: "الحراثة تجهيز التربة قبل الزراعة لتنبت البذور جيداً وتنمو الجذور. الحراثة الجيدة تحسّن تهوية التربة وتسرّب الماء ومكافحة الأعشاب. لكن الحراثة المفرطة تسبب التعر", sw: "Kulima ni kuandaa udongo kabla ya kupanda ili mbegu ziote vizuri na mizizi ikue. Kulima kuzuri huboresha hewa ya udongo, kupenya kwa maji, na kudhibiti magugu. " },
      answer: { so: "Falaartu waa diyaarinta ciidda ka hor beerista si iniinuhu si fiican u soo baxaan oo xididdadu u koraan. Falaar wanaagsan ayaa hagaajisa hawada ciidda, biyo-nuugista, iyo xakamaynta cawska. Laakiin falaar xad-dhaaf ah waxay dhalisaa nabaad-guur ciid, sidaa waa in si xikmad leh loo sameeyo.", en: "Tillage is preparing the soil before planting so seeds germinate well and roots grow. Good tillage improves soil aeration, water infiltration, and weed control. But excessive tillage causes erosion, so it must be done wisely.", ar: "الحراثة تجهيز التربة قبل الزراعة لتنبت البذور جيداً وتنمو الجذور. الحراثة الجيدة تحسّن تهوية التربة وتسرّب الماء ومكافحة الأعشاب. لكن الحراثة المفرطة تسبب التعرية، فيجب أن تُجرى بحكمة.", sw: "Kulima ni kuandaa udongo kabla ya kupanda ili mbegu ziote vizuri na mizizi ikue. Kulima kuzuri huboresha hewa ya udongo, kupenya kwa maji, na kudhibiti magugu. Lakini kulima kupita kiasi husababisha mmomonyoko, hivyo lazima kufanywe kwa busara." },
      keywords: ["tillage", "systems", "preparing", "soil", "falaarta", "dhulka", "nidaamyadeeda"]
    },
    {
      slug: "cropping-systems", cat: "crops", url: "article-cropping-systems.html",
      title: { so: "Nidaamyada Dalagga (Intercropping iyo Wareejin)", en: "Cropping Systems — Intercropping and Rotation", ar: "نظم المحاصيل (التحميل والدورة)", sw: "Mifumo ya Mazao — Kuchanganya na Mzunguko" },
      summary: { so: "Nidaamka dalaggu waa qorshaha ku saabsan dalagyada aad beeratid, sida aad isugu dartid, iyo sida aad ugu wareejisid dhulka muddo ka dib. Nidaam wanaagsan wuxuu ", en: "A cropping system is the plan for which crops you grow, how you combine them, and how you rotate the land over time. A good system raises total output, preserve", ar: "نظام المحاصيل هو خطة المحاصيل التي تزرعها وكيف تجمعها وكيف تناوب الأرض عبر الزمن. النظام الجيد يزيد الإنتاج الكلي ويحفظ خصوبة التربة ويقلل الأمراض والآفات. من أ", sw: "Mfumo wa mazao ni mpango wa mazao unayolima, jinsi unavyoyachanganya, na jinsi unavyozungusha ardhi kwa muda. Mfumo mzuri huongeza mavuno ya jumla, huhifadhi ru" },
      answer: { so: "Nidaamka dalaggu waa qorshaha ku saabsan dalagyada aad beeratid, sida aad isugu dartid, iyo sida aad ugu wareejisid dhulka muddo ka dib. Nidaam wanaagsan wuxuu kordhiyaa waxsoosaarka guud, ilaaliyaa bacrinta ciidda, oo yaraysaa cudurrada iyo cayayaanka. Waa qalabka ugu muhiimsan ee agronomy-ga.", en: "A cropping system is the plan for which crops you grow, how you combine them, and how you rotate the land over time. A good system raises total output, preserves soil fertility, and reduces diseases and pests. It is one of agronomy's most important tools.", ar: "نظام المحاصيل هو خطة المحاصيل التي تزرعها وكيف تجمعها وكيف تناوب الأرض عبر الزمن. النظام الجيد يزيد الإنتاج الكلي ويحفظ خصوبة التربة ويقلل الأمراض والآفات. من أهم أدوات علم المحاصيل.", sw: "Mfumo wa mazao ni mpango wa mazao unayolima, jinsi unavyoyachanganya, na jinsi unavyozungusha ardhi kwa muda. Mfumo mzuri huongeza mavuno ya jumla, huhifadhi rutuba ya udongo, na hupunguza magonjwa na wadudu. Ni mojawapo ya zana muhimu za agronomia." },
      keywords: ["cropping", "systems", "intercropping", "rotation", "nidaamyada", "dalagga", "wareejin"]
    },
    {
      slug: "hydroponics-farming", cat: "crops", url: "article-hydroponics-farming.html",
      title: { so: "Beerashada Hydroponics (Biyo-beerid)", en: "Hydroponics Farming", ar: "الزراعة المائية (الهيدروبونيك)", sw: "Kilimo cha Hydroponics" },
      summary: { so: "Hydroponics waa hab casri ah oo dhirta lagu koriyo ciid-la'aan, iyadoo la isticmaalayo biyo nafaqo lagu daray. Waxay isticmaashaa biyo 90 boqolkiiba ka yar beer", en: "Hydroponics is a modern method of growing plants without soil, using nutrient-enriched water. It uses 90 percent less water than conventional farming and suits ", ar: "الزراعة المائية طريقة حديثة لزراعة النبات دون تربة باستخدام ماء مُغنى بالمغذيات. تستخدم ماءً أقل بنسبة 90 بالمئة من الزراعة التقليدية وتناسب المناطق شحيحة الماء", sw: "Hydroponics ni njia ya kisasa ya kukuza mimea bila udongo, kwa kutumia maji yaliyoongezwa virutubisho. Hutumia maji asilimia 90 chini ya kilimo cha kawaida na i" },
      answer: { so: "Hydroponics waa hab casri ah oo dhirta lagu koriyo ciid-la'aan, iyadoo la isticmaalayo biyo nafaqo lagu daray. Waxay isticmaashaa biyo 90 boqolkiiba ka yar beerta caadiga ah, waxayna ku habboon tahay meelaha biyaha yar iyo ciidda liidata sida qaybo badan oo Soomaaliya.", en: "Hydroponics is a modern method of growing plants without soil, using nutrient-enriched water. It uses 90 percent less water than conventional farming and suits water-scarce, poor-soil areas like much of Somalia.", ar: "الزراعة المائية طريقة حديثة لزراعة النبات دون تربة باستخدام ماء مُغنى بالمغذيات. تستخدم ماءً أقل بنسبة 90 بالمئة من الزراعة التقليدية وتناسب المناطق شحيحة الماء فقيرة التربة كأجزاء كثيرة من الصومال.", sw: "Hydroponics ni njia ya kisasa ya kukuza mimea bila udongo, kwa kutumia maji yaliyoongezwa virutubisho. Hutumia maji asilimia 90 chini ya kilimo cha kawaida na inafaa maeneo yenye maji kidogo na udongo duni kama sehemu nyingi za Somalia." },
      keywords: ["hydroponics", "beerashada", "biyo", "beerid", "hagaha", "buuxa"]
    },
    {
      slug: "nursery-management", cat: "crops", url: "article-nursery-management.html",
      title: { so: "Maaraynta Beerta Dhalinta (Nursery)", en: "Nursery Management", ar: "إدارة المشتل", sw: "Usimamizi wa Kitalu" },
      summary: { so: "Beerta dhalintu (nursery) waa meel gaar ah oo lagu koriyo dhalmada yaryar ka hor inta aan la geli beerta weyn. Dhalmo xoog leh ayaa keenta dalag caafimaad qaba,", en: "A nursery is a special place to raise young seedlings before transplanting to the main field. Strong seedlings produce a healthy crop, so the nursery is the fou", ar: "المشتل مكان خاص لتربية الشتلات الصغيرة قبل نقلها للحقل الرئيسي. الشتلات القوية تنتج محصولاً سليماً، فالمشتل أساس نجاح الخضراوات وأشجار الفاكهة.", sw: "Kitalu ni mahali maalum pa kuotesha miche michanga kabla ya kupandikiza shambani. Miche imara hutoa zao lenye afya, hivyo kitalu ni msingi wa mafanikio ya mboga" },
      answer: { so: "Beerta dhalintu (nursery) waa meel gaar ah oo lagu koriyo dhalmada yaryar ka hor inta aan la geli beerta weyn. Dhalmo xoog leh ayaa keenta dalag caafimaad qaba, sidaa beerta dhalintu waa aasaaska guusha khudaarta iyo geedaha miraha.", en: "A nursery is a special place to raise young seedlings before transplanting to the main field. Strong seedlings produce a healthy crop, so the nursery is the foundation of success for vegetables and fruit trees.", ar: "المشتل مكان خاص لتربية الشتلات الصغيرة قبل نقلها للحقل الرئيسي. الشتلات القوية تنتج محصولاً سليماً، فالمشتل أساس نجاح الخضراوات وأشجار الفاكهة.", sw: "Kitalu ni mahali maalum pa kuotesha miche michanga kabla ya kupandikiza shambani. Miche imara hutoa zao lenye afya, hivyo kitalu ni msingi wa mafanikio ya mboga na miti ya matunda." },
      keywords: ["nursery", "management", "maaraynta", "beerta", "dhalinta", "hagaha", "buuxa"]
    },
    {
      slug: "grafting-budding", cat: "crops", url: "article-grafting-budding.html",
      title: { so: "Tallaalka Dhirta (Grafting iyo Budding)", en: "Grafting and Budding", ar: "التطعيم والتبرعم", sw: "Kubebesha na Kuchomeka Miti" },
      summary: { so: "Tallaalka dhirtu waa farsamo lagu midaysto qayb geed tayo sare leh (scion) iyo xidid geed xoog leh (rootstock). Wuxuu keenaa geedo dhaqso miro bixiya, cudur-adk", en: "Grafting joins a high-quality plant part (scion) with a strong root plant (rootstock). It produces trees that fruit faster, resist disease, and match the parent", ar: "التطعيم يدمج جزءاً نباتياً عالي الجودة (الطعم) مع نبات جذري قوي (الأصل). ينتج أشجاراً تثمر أسرع وتقاوم المرض وتطابق جودة الأصل. أساسي لأشجار الفاكهة كالحمضيات و", sw: "Kubebesha huunganisha sehemu ya mmea bora (scion) na mmea wa mizizi imara (rootstock). Hutoa miti inayozaa haraka, sugu kwa magonjwa, na yenye ubora sawa na mza" },
      answer: { so: "Tallaalka dhirtu waa farsamo lagu midaysto qayb geed tayo sare leh (scion) iyo xidid geed xoog leh (rootstock). Wuxuu keenaa geedo dhaqso miro bixiya, cudur-adkaysi leh, oo tayadoodu la mid tahay geedka waalidka. Waa farsamo muhiim u ah geedaha miraha sida liinta iyo cambaha.", en: "Grafting joins a high-quality plant part (scion) with a strong root plant (rootstock). It produces trees that fruit faster, resist disease, and match the parent's quality. It is essential for fruit trees like citrus and mango.", ar: "التطعيم يدمج جزءاً نباتياً عالي الجودة (الطعم) مع نبات جذري قوي (الأصل). ينتج أشجاراً تثمر أسرع وتقاوم المرض وتطابق جودة الأصل. أساسي لأشجار الفاكهة كالحمضيات والمانجو.", sw: "Kubebesha huunganisha sehemu ya mmea bora (scion) na mmea wa mizizi imara (rootstock). Hutoa miti inayozaa haraka, sugu kwa magonjwa, na yenye ubora sawa na mzazi. Ni muhimu kwa miti ya matunda kama michungwa na miembe." },
      keywords: ["grafting", "budding", "tallaalka", "dhirta", "hagaha", "buuxa"]
    },
    {
      slug: "agri-marketing", cat: "crops", url: "article-agri-marketing.html",
      title: { so: "Suuq-geynta Badeecada Beeraha", en: "Agricultural Marketing", ar: "تسويق المنتجات الزراعية", sw: "Masoko ya Mazao ya Kilimo" },
      summary: { so: "Suuq-geyntu waa qeybta ugu muhiimsan ee macaashka beerta — dalag wanaagsan haddaan si fiican loo iibin, faa'iido ma dhalinayo. Beeralaha guulaystaa waa kan gara", en: "Marketing is the most important part of farm profit — a good crop that is not sold well earns nothing. The successful farmer knows the market, the timing of sal", ar: "التسويق أهم جزء في ربح المزرعة — المحصول الجيد الذي لا يُباع جيداً لا يربح شيئاً. المزارع الناجح يعرف السوق وتوقيت البيع وكيف يحصل على سعر جيد.", sw: "Masoko ni sehemu muhimu zaidi ya faida ya shamba — zao zuri lisilouzwa vizuri halipati chochote. Mkulima anayefanikiwa anajua soko, wakati wa kuuza, na jinsi ya" },
      answer: { so: "Suuq-geyntu waa qeybta ugu muhiimsan ee macaashka beerta — dalag wanaagsan haddaan si fiican loo iibin, faa'iido ma dhalinayo. Beeralaha guulaystaa waa kan garanaya suuqa, xilliga iibinta, iyo sida uu qiimo fiican u helo.", en: "Marketing is the most important part of farm profit — a good crop that is not sold well earns nothing. The successful farmer knows the market, the timing of sales, and how to get a good price.", ar: "التسويق أهم جزء في ربح المزرعة — المحصول الجيد الذي لا يُباع جيداً لا يربح شيئاً. المزارع الناجح يعرف السوق وتوقيت البيع وكيف يحصل على سعر جيد.", sw: "Masoko ni sehemu muhimu zaidi ya faida ya shamba — zao zuri lisilouzwa vizuri halipati chochote. Mkulima anayefanikiwa anajua soko, wakati wa kuuza, na jinsi ya kupata bei nzuri." },
      keywords: ["agri", "marketing", "agricultural", "suuq", "geynta", "badeecada", "beeraha", "hagaha", "buuxa"]
    },
    {
      slug: "value-addition", cat: "crops", url: "article-value-addition.html",
      title: { so: "Qiimo-darka Badeecada Beeraha (Value Addition)", en: "Value Addition to Farm Produce", ar: "إضافة القيمة للمنتجات الزراعية", sw: "Kuongeza Thamani ya Mazao" },
      summary: { so: "Qiimo-darku waa in badeecada cayriin ah loo beddelo badeeco la habeeyay oo qiimo badan leh — sida galley loo beddelo daqiiq, ama caano loo beddelo buur. Wuxuu k", en: "Value addition is converting raw produce into processed products worth more — like turning maize into flour, or milk into cheese. It increases farmer income, re", ar: "إضافة القيمة تحويل المنتج الخام إلى منتجات مصنّعة أعلى قيمة — كتحويل الذرة إلى دقيق أو الحليب إلى جبن. تزيد دخل المزارع وتقلل الهدر وتخلق وظائف.", sw: "Kuongeza thamani ni kubadilisha mazao ghafi kuwa bidhaa zilizosindikwa zenye thamani zaidi — kama kubadilisha mahindi kuwa unga, au maziwa kuwa jibini. Huongeza" },
      answer: { so: "Qiimo-darku waa in badeecada cayriin ah loo beddelo badeeco la habeeyay oo qiimo badan leh — sida galley loo beddelo daqiiq, ama caano loo beddelo buur. Wuxuu kordhiyaa dakhliga beeralaha, yaraysa khasaaraha, oo furaa fursado shaqo.", en: "Value addition is converting raw produce into processed products worth more — like turning maize into flour, or milk into cheese. It increases farmer income, reduces waste, and creates jobs.", ar: "إضافة القيمة تحويل المنتج الخام إلى منتجات مصنّعة أعلى قيمة — كتحويل الذرة إلى دقيق أو الحليب إلى جبن. تزيد دخل المزارع وتقلل الهدر وتخلق وظائف.", sw: "Kuongeza thamani ni kubadilisha mazao ghafi kuwa bidhaa zilizosindikwa zenye thamani zaidi — kama kubadilisha mahindi kuwa unga, au maziwa kuwa jibini. Huongeza kipato cha mkulima, hupunguza upotevu, na hutengeneza ajira." },
      keywords: ["value", "addition", "farm", "produce", "qiimo", "darka", "badeecada", "beeraha", "hagaha", "buuxa"]
    },
    {
      slug: "farmer-cooperatives", cat: "crops", url: "article-farmer-cooperatives.html",
      title: { so: "Iskaashatooyinka Beeraleyda (Cooperatives)", en: "Farmer Cooperatives", ar: "التعاونيات الزراعية", sw: "Vyama vya Ushirika vya Wakulima" },
      summary: { so: "Iskaashatadu waa urur beeraleyda ah oo isu taga si ay wax u wada iibsadaan, u wada iibiyaan, oo ay xoog u yeeshaan. Beeralaha keligiis waa daciif suuqa, laakiin", en: "A cooperative is an organization of farmers who unite to buy together, sell together, and gain strength. A lone farmer is weak in the market, but united they ge", ar: "التعاونية منظمة من المزارعين يتّحدون للشراء معاً والبيع معاً واكتساب القوة. المزارع الوحيد ضعيف في السوق، لكن متّحدين يحصلون على أسعار أفضل وتمويل ومعرفة.", sw: "Ushirika ni shirika la wakulima wanaoungana kununua pamoja, kuuza pamoja, na kupata nguvu. Mkulima peke yake ni dhaifu sokoni, lakini wakiungana hupata bei bora" },
      answer: { so: "Iskaashatadu waa urur beeraleyda ah oo isu taga si ay wax u wada iibsadaan, u wada iibiyaan, oo ay xoog u yeeshaan. Beeralaha keligiis waa daciif suuqa, laakiin marka ay isku biiraan, waxay helaan qiimo fiican, maalgelin, iyo aqoon.", en: "A cooperative is an organization of farmers who unite to buy together, sell together, and gain strength. A lone farmer is weak in the market, but united they get better prices, financing, and knowledge.", ar: "التعاونية منظمة من المزارعين يتّحدون للشراء معاً والبيع معاً واكتساب القوة. المزارع الوحيد ضعيف في السوق، لكن متّحدين يحصلون على أسعار أفضل وتمويل ومعرفة.", sw: "Ushirika ni shirika la wakulima wanaoungana kununua pamoja, kuuza pamoja, na kupata nguvu. Mkulima peke yake ni dhaifu sokoni, lakini wakiungana hupata bei bora, ufadhili, na maarifa." },
      keywords: ["farmer", "cooperatives", "iskaashatooyinka", "beeraleyda", "hagaha", "buuxa"]
    },
    {
      slug: "egg-production", cat: "livestock", url: "article-egg-production.html",
      title: { so: "Wax-soosaarka Ukunta (Layers)", en: "Egg Production (Layers)", ar: "إنتاج البيض (الدجاج البياض)", sw: "Uzalishaji wa Mayai (Kuku wa Mayai)" },
      summary: { so: "Wax-soosaarka ukuntu waa ganacsi dakhli-joogto ah oo ku salaysan xannaanada digaagga ukunta (layers). Digaag caafimaad qaba oo si fiican loo quudiyo wuxuu bixiy", en: "Egg production is a steady-income business based on raising layer hens. A healthy, well-fed layer produces an egg almost daily, giving farmers a steady income.", ar: "إنتاج البيض تجارة ذات دخل ثابت تعتمد على تربية الدجاج البياض. الدجاجة البياضة السليمة جيدة التغذية تنتج بيضة يومياً تقريباً، مما يمنح المزارع دخلاً ثابتاً.", sw: "Uzalishaji wa mayai ni biashara ya kipato cha kudumu inayotegemea kufuga kuku wa mayai. Kuku mwenye afya anayelishwa vizuri hutaga yai kila siku takriban, akimp" },
      answer: { so: "Wax-soosaarka ukuntu waa ganacsi dakhli-joogto ah oo ku salaysan xannaanada digaagga ukunta (layers). Digaag caafimaad qaba oo si fiican loo quudiyo wuxuu bixiyaa ukun maalin kasta, taasoo dakhli joogto ah keenta beeraleyda.", en: "Egg production is a steady-income business based on raising layer hens. A healthy, well-fed layer produces an egg almost daily, giving farmers a steady income.", ar: "إنتاج البيض تجارة ذات دخل ثابت تعتمد على تربية الدجاج البياض. الدجاجة البياضة السليمة جيدة التغذية تنتج بيضة يومياً تقريباً، مما يمنح المزارع دخلاً ثابتاً.", sw: "Uzalishaji wa mayai ni biashara ya kipato cha kudumu inayotegemea kufuga kuku wa mayai. Kuku mwenye afya anayelishwa vizuri hutaga yai kila siku takriban, akimpa mkulima kipato cha kudumu." },
      keywords: ["egg", "production", "layers", "wax", "soosaarka", "ukunta", "hagaha", "buuxa"]
    },
    {
      slug: "dairy-goat-farming", cat: "livestock", url: "article-dairy-goat-farming.html",
      title: { so: "Xannaanada Riyaha Caanaha (Dairy Goats)", en: "Dairy Goat Farming", ar: "تربية ماعز الحليب", sw: "Ufugaji wa Mbuzi wa Maziwa" },
      summary: { so: "Riyaha caanuhu waa xoolo yaryar oo daryeel yar u baahan oo caano nafaqo badan leh bixiya. Waxay ku habboon yihiin qoysaska yaryar iyo dhulalka qallalan ee Sooma", en: "Dairy goats are small, low-maintenance animals that give nutritious milk. They suit small families and Somalia's dry lands, as they eat almost anything and tole", ar: "ماعز الحليب حيوانات صغيرة قليلة العناية تعطي حليباً مغذياً. تناسب الأسر الصغيرة والأراضي الجافة في الصومال، فهي تأكل أي شيء تقريباً وتتحمّل الجفاف. حليب الماعز ", sw: "Mbuzi wa maziwa ni wanyama wadogo wanaohitaji utunzaji mdogo wanaotoa maziwa yenye lishe. Wanafaa familia ndogo na ardhi kavu za Somalia, kwani hula karibu kila" },
      answer: { so: "Riyaha caanuhu waa xoolo yaryar oo daryeel yar u baahan oo caano nafaqo badan leh bixiya. Waxay ku habboon yihiin qoysaska yaryar iyo dhulalka qallalan ee Soomaaliya, maadaama ay wax kasta cunaan oo abaar-adkaysi leeyihiin. Caanaha riyuhu waa fudud yihiin in la dheefshiido.", en: "Dairy goats are small, low-maintenance animals that give nutritious milk. They suit small families and Somalia's dry lands, as they eat almost anything and tolerate drought. Goat milk is easy to digest.", ar: "ماعز الحليب حيوانات صغيرة قليلة العناية تعطي حليباً مغذياً. تناسب الأسر الصغيرة والأراضي الجافة في الصومال، فهي تأكل أي شيء تقريباً وتتحمّل الجفاف. حليب الماعز سهل الهضم.", sw: "Mbuzi wa maziwa ni wanyama wadogo wanaohitaji utunzaji mdogo wanaotoa maziwa yenye lishe. Wanafaa familia ndogo na ardhi kavu za Somalia, kwani hula karibu kila kitu na hustahimili ukame. Maziwa ya mbuzi ni rahisi kumeng'enywa." },
      keywords: ["dairy", "goat", "xannaanada", "riyaha", "caanaha", "goats", "hagaha", "buuxa"]
    },
    {
      slug: "animal-vaccination", cat: "livestock", url: "article-animal-vaccination.html",
      title: { so: "Tallaalka iyo Ka-hortagga Cudurrada Xoolaha", en: "Livestock Vaccination and Disease Prevention", ar: "تطعيم الماشية والوقاية من الأمراض", sw: "Chanjo ya Mifugo na Kinga ya Magonjwa" },
      summary: { so: "Tallaalku waa habka ugu jaban ee lagu ilaaliyo xoolaha cudurrada halista ah. Cudur kaliya ayaa dili kara xoolo badan oo khasaare weyn keeni kara. Ka-hortag ayaa", en: "Vaccination is the cheapest way to protect livestock from dangerous diseases. A single disease can kill many animals and cause huge losses. Prevention is cheape", ar: "التطعيم أرخص وسيلة لحماية الماشية من الأمراض الخطيرة. مرض واحد قد يقتل حيوانات كثيرة ويسبب خسائر كبيرة. الوقاية أرخص من العلاج وتحمي ثروة المزارع.", sw: "Chanjo ndiyo njia ya bei nafuu zaidi ya kulinda mifugo dhidi ya magonjwa hatari. Ugonjwa mmoja unaweza kuua wanyama wengi na kusababisha hasara kubwa. Kinga ni " },
      answer: { so: "Tallaalku waa habka ugu jaban ee lagu ilaaliyo xoolaha cudurrada halista ah. Cudur kaliya ayaa dili kara xoolo badan oo khasaare weyn keeni kara. Ka-hortag ayaa ka jaban daawaynta, waxayna ilaalisaa hantida beeraleyda.", en: "Vaccination is the cheapest way to protect livestock from dangerous diseases. A single disease can kill many animals and cause huge losses. Prevention is cheaper than treatment and protects the farmer's wealth.", ar: "التطعيم أرخص وسيلة لحماية الماشية من الأمراض الخطيرة. مرض واحد قد يقتل حيوانات كثيرة ويسبب خسائر كبيرة. الوقاية أرخص من العلاج وتحمي ثروة المزارع.", sw: "Chanjo ndiyo njia ya bei nafuu zaidi ya kulinda mifugo dhidi ya magonjwa hatari. Ugonjwa mmoja unaweza kuua wanyama wengi na kusababisha hasara kubwa. Kinga ni nafuu kuliko matibabu na hulinda mali ya mkulima." },
      keywords: ["animal", "vaccination", "livestock", "disease", "prevention", "tallaalka", "hortagga", "cudurrada", "xoolaha", "hagaha"]
    },
    {
      slug: "silage-making", cat: "livestock", url: "article-silage-making.html",
      title: { so: "Samaynta Silage (Cunto Xoolo Kaydsan)", en: "Silage Making (Preserved Fodder)", ar: "صناعة السيلاج (العلف المحفوظ)", sw: "Kutengeneza Sailaji (Malisho Yaliyohifadhiwa)" },
      summary: { so: "Silage waa caws cagaaran oo la kaydiyo iyadoo la halleeyo (fermentation) si xoolaha loogu quudiyo xilliga abaarta marka daaqu yaryahay. Waa hab uu beeralaha ku ", en: "Silage is green fodder preserved by fermentation to feed livestock in the dry season when pasture is scarce. It lets the farmer store feed from the good season ", ar: "السيلاج علف أخضر محفوظ بالتخمّر لإطعام الماشية في موسم الجفاف حين يقلّ المرعى. يتيح للمزارع تخزين العلف من موسم الوفرة لتبقى حيواناته حيّة عند الجفاف.", sw: "Sailaji ni malisho ya kijani yaliyohifadhiwa kwa uchachushaji ili kulisha mifugo wakati wa kiangazi malisho yanapopungua. Humwezesha mkulima kuhifadhi malisho y" },
      answer: { so: "Silage waa caws cagaaran oo la kaydiyo iyadoo la halleeyo (fermentation) si xoolaha loogu quudiyo xilliga abaarta marka daaqu yaryahay. Waa hab uu beeralaha ku kaydsan karo cuntada xilliga barwaaqada si xoolihiisu u sii nooshaadaan marka abaartu timaado.", en: "Silage is green fodder preserved by fermentation to feed livestock in the dry season when pasture is scarce. It lets the farmer store feed from the good season so animals survive when drought comes.", ar: "السيلاج علف أخضر محفوظ بالتخمّر لإطعام الماشية في موسم الجفاف حين يقلّ المرعى. يتيح للمزارع تخزين العلف من موسم الوفرة لتبقى حيواناته حيّة عند الجفاف.", sw: "Sailaji ni malisho ya kijani yaliyohifadhiwa kwa uchachushaji ili kulisha mifugo wakati wa kiangazi malisho yanapopungua. Humwezesha mkulima kuhifadhi malisho ya msimu wa neema ili wanyama waishi ukame ukija." },
      keywords: ["silage", "making", "preserved", "fodder", "samaynta", "cunto", "xoolo", "kaydsan", "hagaha", "buuxa"]
    },
    {
      slug: "pasture-management", cat: "livestock", url: "article-pasture-management.html",
      title: { so: "Maaraynta Daaqa iyo Dhirta Xoolaha", en: "Pasture and Rangeland Management", ar: "إدارة المراعي", sw: "Usimamizi wa Malisho" },
      summary: { so: "Maaraynta daaqu waa habka lagu ilaaliyo cawska iyo dhirta si xooluhu had iyo jeer u helaan cunto. Daaq xad-dhaaf ah (overgrazing) wuxuu burburiyaa dhulka oo kee", en: "Pasture management is the way to conserve grass and plants so livestock always have feed. Overgrazing destroys the land and causes desertification. Good managem", ar: "إدارة المراعي طريقة للحفاظ على العشب والنباتات لتجد الماشية غذاءً دائماً. الرعي الجائر يدمّر الأرض ويسبب التصحّر. الإدارة الجيدة تجعل المرعى مستداماً ومنتجاً.", sw: "Usimamizi wa malisho ni njia ya kuhifadhi nyasi na mimea ili mifugo iwe na chakula daima. Kuchunga kupita kiasi huharibu ardhi na kusababisha kuenea kwa jangwa." },
      answer: { so: "Maaraynta daaqu waa habka lagu ilaaliyo cawska iyo dhirta si xooluhu had iyo jeer u helaan cunto. Daaq xad-dhaaf ah (overgrazing) wuxuu burburiyaa dhulka oo keenaa saxaraynta. Maareyn wanaagsan ayaa ka dhigaysa daaqa mid waaraya oo waxsoosaar leh.", en: "Pasture management is the way to conserve grass and plants so livestock always have feed. Overgrazing destroys the land and causes desertification. Good management makes pasture sustainable and productive.", ar: "إدارة المراعي طريقة للحفاظ على العشب والنباتات لتجد الماشية غذاءً دائماً. الرعي الجائر يدمّر الأرض ويسبب التصحّر. الإدارة الجيدة تجعل المرعى مستداماً ومنتجاً.", sw: "Usimamizi wa malisho ni njia ya kuhifadhi nyasi na mimea ili mifugo iwe na chakula daima. Kuchunga kupita kiasi huharibu ardhi na kusababisha kuenea kwa jangwa. Usimamizi mzuri hufanya malisho yadumu na kuwa na tija." },
      keywords: ["pasture", "management", "rangeland", "maaraynta", "daaqa", "dhirta", "xoolaha", "hagaha", "buuxa"]
    },
    {
      slug: "plant-nutrients", cat: "soil", url: "article-plant-nutrients.html",
      title: { so: "Nafaqooyinka Dhirta iyo Calaamadaha Yaraantooda", en: "Plant Nutrients and Deficiency Signs", ar: "مغذيات النبات وأعراض النقص", sw: "Virutubisho vya Mimea na Dalili za Upungufu" },
      summary: { so: "Dhirtu waxay u baahan tahay 17 nafaqo oo lagama maarmaan ah si ay u koraan oo mira u bixiyaan. Saddexda ugu waaweyn waa nitrojiin (N), foosfooras (P), iyo potas", en: "Plants need 17 essential nutrients to grow and produce. The three biggest are nitrogen (N), phosphorus (P), and potassium (K). Knowing these nutrients and their", ar: "تحتاج النباتات 17 مغذياً أساسياً لتنمو وتنتج. الثلاثة الكبرى هي النيتروجين (N) والفوسفور (P) والبوتاسيوم (K). معرفة هذه المغذيات وأعراض نقصها تتيح للمزارع تصحيح", sw: "Mimea inahitaji virutubisho 17 muhimu ili kukua na kuzaa. Vitatu vikuu ni naitrojeni (N), fosforasi (P), na potasiamu (K). Kujua virutubisho hivi na dalili za u" },
      answer: { so: "Dhirtu waxay u baahan tahay 17 nafaqo oo lagama maarmaan ah si ay u koraan oo mira u bixiyaan. Saddexda ugu waaweyn waa nitrojiin (N), foosfooras (P), iyo potashiyam (K). Aqoonta nafaqadan iyo calaamadaha yaraantooda ayaa beeralaha u oggolaanaysa inuu saxo dhibaatooyinka dalagga.", en: "Plants need 17 essential nutrients to grow and produce. The three biggest are nitrogen (N), phosphorus (P), and potassium (K). Knowing these nutrients and their deficiency signs lets the farmer correct crop problems.", ar: "تحتاج النباتات 17 مغذياً أساسياً لتنمو وتنتج. الثلاثة الكبرى هي النيتروجين (N) والفوسفور (P) والبوتاسيوم (K). معرفة هذه المغذيات وأعراض نقصها تتيح للمزارع تصحيح مشاكل المحصول.", sw: "Mimea inahitaji virutubisho 17 muhimu ili kukua na kuzaa. Vitatu vikuu ni naitrojeni (N), fosforasi (P), na potasiamu (K). Kujua virutubisho hivi na dalili za upungufu humwezesha mkulima kurekebisha matatizo ya zao." },
      keywords: ["plant", "nutrients", "deficiency", "signs", "nafaqooyinka", "dhirta", "calaamadaha", "yaraantooda"]
    },
    {
      slug: "green-manure", cat: "soil", url: "article-green-manure.html",
      title: { so: "Digada Cagaaran (Green Manure)", en: "Green Manure — Living Soil Fertility", ar: "السماد الأخضر لخصوبة التربة", sw: "Samadi ya Kijani kwa Rutuba ya Udongo" },
      summary: { so: "Digada cagaarani waa dhir la beero ka dibna ciidda lagu daro iyagoo weli cagaar ah si loo xoojiyo bacrinta ciidda. Dhirtan, gaar ahaan digirta, waxay nitrojiin ", en: "Green manure is plants grown then turned into the soil while still green to boost soil fertility. These plants, especially legumes, add nitrogen, increase organ", ar: "السماد الأخضر نباتات تُزرع ثم تُقلب في التربة وهي خضراء لتعزيز خصوبة التربة. هذه النباتات، خاصة البقوليات، تضيف نيتروجيناً وتزيد المادة العضوية وتحسّن بنية التر", sw: "Samadi ya kijani ni mimea inayolimwa kisha kuchanganywa kwenye udongo ikiwa bado ya kijani kuongeza rutuba ya udongo. Mimea hii, hasa mikunde, huongeza naitroje" },
      answer: { so: "Digada cagaarani waa dhir la beero ka dibna ciidda lagu daro iyagoo weli cagaar ah si loo xoojiyo bacrinta ciidda. Dhirtan, gaar ahaan digirta, waxay nitrojiin ku dartaa ciidda, kordhisaa maaddada dabiiciga, oo hagaajisaa qaab-dhismeedka ciidda — dhammaan iyadoo aan bacrimin qaali ah loo baahnayn.", en: "Green manure is plants grown then turned into the soil while still green to boost soil fertility. These plants, especially legumes, add nitrogen, increase organic matter, and improve soil structure — all without needing costly fertilizer.", ar: "السماد الأخضر نباتات تُزرع ثم تُقلب في التربة وهي خضراء لتعزيز خصوبة التربة. هذه النباتات، خاصة البقوليات، تضيف نيتروجيناً وتزيد المادة العضوية وتحسّن بنية التربة — دون الحاجة لسماد غالٍ.", sw: "Samadi ya kijani ni mimea inayolimwa kisha kuchanganywa kwenye udongo ikiwa bado ya kijani kuongeza rutuba ya udongo. Mimea hii, hasa mikunde, huongeza naitrojeni, huongeza mabaki ya kikaboni, na huboresha muundo wa udongo — bila kuhitaji mbolea ghali." },
      keywords: ["green", "manure", "living", "soil", "fertility", "digada", "cagaaran"]
    },
    {
      slug: "seed-saving", cat: "soil", url: "article-seed-saving.html",
      title: { so: "Kaydinta iyo Xifdinta Iniinaha", en: "Seed Saving and Preservation", ar: "حفظ البذور والاحتفاظ بها", sw: "Kuhifadhi Mbegu" },
      summary: { so: "Kaydinta iniinuhu waa xirfad qadiimi ah oo beeralaha ka dhigta mid isku filan, taasoo yaraysa in sannad walba iniin la iibsado. Iniin si fiican loo doortay oo l", en: "Seed saving is an ancient skill that makes farmers self-reliant, reducing the need to buy seed every year. Well-selected, well-stored seed ensures a strong crop", ar: "حفظ البذور مهارة قديمة تجعل المزارع مكتفياً ذاتياً، فتقلل الحاجة لشراء البذور كل عام. البذور المنتقاة والمخزّنة جيداً تضمن محصولاً قوياً في الموسم القادم وتحفظ ", sw: "Kuhifadhi mbegu ni ujuzi wa kale unaomfanya mkulima ajitegemee, ukipunguza haja ya kununua mbegu kila mwaka. Mbegu iliyochaguliwa na kuhifadhiwa vizuri huhakiki" },
      answer: { so: "Kaydinta iniinuhu waa xirfad qadiimi ah oo beeralaha ka dhigta mid isku filan, taasoo yaraysa in sannad walba iniin la iibsado. Iniin si fiican loo doortay oo la kaydiyay waxay hubisaa dalag xoog leh xilliga xiga, waxayna ilaalisaa noocyada maxalliga ah ee la waayay.", en: "Seed saving is an ancient skill that makes farmers self-reliant, reducing the need to buy seed every year. Well-selected, well-stored seed ensures a strong crop next season and preserves rare local varieties.", ar: "حفظ البذور مهارة قديمة تجعل المزارع مكتفياً ذاتياً، فتقلل الحاجة لشراء البذور كل عام. البذور المنتقاة والمخزّنة جيداً تضمن محصولاً قوياً في الموسم القادم وتحفظ الأصناف المحلية النادرة.", sw: "Kuhifadhi mbegu ni ujuzi wa kale unaomfanya mkulima ajitegemee, ukipunguza haja ya kununua mbegu kila mwaka. Mbegu iliyochaguliwa na kuhifadhiwa vizuri huhakikisha zao imara msimu ujao na huhifadhi aina adimu za kienyeji." },
      keywords: ["seed", "saving", "preservation", "kaydinta", "xifdinta", "iniinaha", "hagaha", "buuxa"]
    },
    {
      slug: "solar-irrigation", cat: "irrigation", url: "article-solar-irrigation.html",
      title: { so: "Waraabinta Cadceedda (Solar Irrigation)", en: "Solar-Powered Irrigation", ar: "الري بالطاقة الشمسية", sw: "Umwagiliaji wa Nishati ya Jua" },
      summary: { so: "Waraabinta cadceeddu waxay isticmaashaa bamo ay tamar siiso qorraxdu, halkii ay ka ahaan lahayd naafto ama koronto. Soomaaliya oo qorrax badan leh, tani waxay k", en: "Solar irrigation uses pumps powered by the sun instead of diesel or grid electricity. In sunny Somalia, this makes irrigation cheap, eco-friendly, and reliable,", ar: "الري الشمسي يستخدم مضخّات تعمل بالشمس بدلاً من الديزل أو كهرباء الشبكة. في الصومال المشمس، هذا يجعل الري رخيصاً وصديقاً للبيئة وموثوقاً، خاصة في المناطق التي لا", sw: "Umwagiliaji wa jua hutumia pampu zinazoendeshwa na jua badala ya dizeli au umeme wa gridi. Katika Somalia yenye jua nyingi, hii hufanya umwagiliaji kuwa nafuu, " },
      answer: { so: "Waraabinta cadceeddu waxay isticmaashaa bamo ay tamar siiso qorraxdu, halkii ay ka ahaan lahayd naafto ama koronto. Soomaaliya oo qorrax badan leh, tani waxay ka dhigaysaa waraabinta mid jaban, deegaan-saaxiib ah, oo joogto ah — gaar ahaan meelaha aan korontadu gaadhin.", en: "Solar irrigation uses pumps powered by the sun instead of diesel or grid electricity. In sunny Somalia, this makes irrigation cheap, eco-friendly, and reliable, especially in areas the grid does not reach.", ar: "الري الشمسي يستخدم مضخّات تعمل بالشمس بدلاً من الديزل أو كهرباء الشبكة. في الصومال المشمس، هذا يجعل الري رخيصاً وصديقاً للبيئة وموثوقاً، خاصة في المناطق التي لا تصلها الشبكة.", sw: "Umwagiliaji wa jua hutumia pampu zinazoendeshwa na jua badala ya dizeli au umeme wa gridi. Katika Somalia yenye jua nyingi, hii hufanya umwagiliaji kuwa nafuu, rafiki wa mazingira, na wa kutegemewa, hasa maeneo ambayo gridi haifiki." },
      keywords: ["solar", "irrigation", "powered", "waraabinta", "cadceedda", "hagaha", "buuxa"]
    },
    {
      slug: "weed-management", cat: "pests", url: "article-weed-management.html",
      title: { so: "Maaraynta Cawska (Weed Management)", en: "Weed Management — Controlling Weeds", ar: "إدارة الأعشاب الضارة", sw: "Udhibiti wa Magugu" },
      summary: { so: "Cawsku waa dhir aan la rabin oo la tartanta dalagga biyaha, nafaqada, iftiinka, iyo booska. Cawsku wuxuu yarayn karaa waxsoosaarka 30 ilaa 50 boqolkiiba haddaan", en: "Weeds are unwanted plants that compete with the crop for water, nutrients, light, and space. Weeds can cut yields by 30 to 50 percent if not controlled. Weed ma", ar: "الأعشاب نباتات غير مرغوبة تنافس المحصول على الماء والمغذيات والضوء والمكان. يمكن أن تقلل الأعشاب الإنتاج 30 إلى 50 بالمئة إن لم تُكافح. إدارة الأعشاب من أهم مها", sw: "Magugu ni mimea isiyotakiwa inayoshindana na zao kwa maji, virutubisho, mwanga, na nafasi. Magugu yanaweza kupunguza mavuno kwa asilimia 30 hadi 50 yasipodhibit" },
      answer: { so: "Cawsku waa dhir aan la rabin oo la tartanta dalagga biyaha, nafaqada, iftiinka, iyo booska. Cawsku wuxuu yarayn karaa waxsoosaarka 30 ilaa 50 boqolkiiba haddaan la xakameyn. Maaraynta cawska waa mid ka mid ah shaqooyinka ugu muhiimsan ee beerta.", en: "Weeds are unwanted plants that compete with the crop for water, nutrients, light, and space. Weeds can cut yields by 30 to 50 percent if not controlled. Weed management is one of the most important tasks on the farm.", ar: "الأعشاب نباتات غير مرغوبة تنافس المحصول على الماء والمغذيات والضوء والمكان. يمكن أن تقلل الأعشاب الإنتاج 30 إلى 50 بالمئة إن لم تُكافح. إدارة الأعشاب من أهم مهام المزرعة.", sw: "Magugu ni mimea isiyotakiwa inayoshindana na zao kwa maji, virutubisho, mwanga, na nafasi. Magugu yanaweza kupunguza mavuno kwa asilimia 30 hadi 50 yasipodhibitiwa. Udhibiti wa magugu ni mojawapo ya kazi muhimu zaidi shambani." },
      keywords: ["weed", "management", "controlling", "weeds", "maaraynta", "cawska"]
    },
    {
      slug: "soil-ph-explained", cat: "soil", url: "article-soil-ph.html",
      title: { so: "Waa maxay pH-ga Ciidda", en: "What is Soil pH", ar: "ما هو حموضة التربة", sw: "pH ya Udongo ni Nini" },
      summary: { so: "pH-gu wuxuu cabbiraa sida ciiddu u dhanaan tahay ama u karsalowga tahay, oo u dhexeeya 0 ilaa 14. Dalagyada intooda badan waxay ku fiican yihiin pH 6.", en: "Soil pH measures how acidic or alkaline the soil is, on a scale of 0 to 14. Most crops do best at pH 6.0 to 7.0. Very low (acidic) or high (alkaline) ", ar: "يقيس حموضة التربة مدى حموضتها أو قلويتها على مقياس 0 إلى 14. معظم المحاصيل تنجح عند 6.0 إلى 7.0. الحموضة المنخفضة أو المرتفعة جداً تحبس المغذيات. تحلي", sw: "pH ya udongo hupima jinsi udongo ulivyo na asidi au alkali, kwenye kipimo cha 0 hadi 14. Mazao mengi hufanya vizuri kwa pH 6.0 hadi 7.0. pH ya chini a" },
      answer: { so: "pH-gu wuxuu cabbiraa sida ciiddu u dhanaan tahay ama u karsalowga tahay, oo u dhexeeya 0 ilaa 14. Dalagyada intooda badan waxay ku fiican yihiin pH 6.0 ilaa 7.0. pH aad u hooseeya (dhanaan) ama sarreeya wuxuu xannibaa nafaqada dhirtu qaadan karto. Baadhitaanka ciidda ayaa ku tusaya pH-ga si aad u saxdo (nuurada ku dar dhanaan, sulfur ku dar karsalow).\n\n_Ilo: Agronomy — JRF Notes_", en: "Soil pH measures how acidic or alkaline the soil is, on a scale of 0 to 14. Most crops do best at pH 6.0 to 7.0. Very low (acidic) or high (alkaline) pH locks up nutrients the plant can take. A soil test shows the pH so you can correct it (add lime for acidity, sulfur for alkalinity).\n\n_Source: Agronomy — JRF Notes_", ar: "يقيس حموضة التربة مدى حموضتها أو قلويتها على مقياس 0 إلى 14. معظم المحاصيل تنجح عند 6.0 إلى 7.0. الحموضة المنخفضة أو المرتفعة جداً تحبس المغذيات. تحليل التربة يبيّن الحموضة لتصحيحها (الجير للحموضة، الكبريت للقلوية).\n\n_المصدر: Agronomy — JRF Notes_", sw: "pH ya udongo hupima jinsi udongo ulivyo na asidi au alkali, kwenye kipimo cha 0 hadi 14. Mazao mengi hufanya vizuri kwa pH 6.0 hadi 7.0. pH ya chini au juu sana hufunga virutubisho. Kipimo cha udongo huonyesha pH ili kurekebisha (chokaa kwa asidi, salfa kwa alkali).\n\n_Chanzo: Agronomy — JRF Notes_" },
      keywords: ["ph", "soil ph", "dhanaan", "acidity", "alkaline", "nuurada", "lime", "carrada", "ciid"]
    },
    {
      slug: "npk-explained", cat: "soil", url: "article-plant-nutrients.html",
      title: { so: "Waa maxay NPK", en: "What is NPK", ar: "ما هو NPK", sw: "NPK ni Nini" },
      summary: { so: "NPK waa saddexda nafaqo ee ugu waaweyn dhirta: N (Nitrojiin) oo keena koritaan cagaaran, P (Foosfooras) oo xoojiya xididada iyo miraha, iyo K (Potashi", en: "NPK is the three biggest plant nutrients: N (Nitrogen) for green growth, P (Phosphorus) for roots and fruit, and K (Potassium) for disease resistance ", ar: "NPK هي أكبر ثلاث مغذيات: N (نيتروجين) للنمو الأخضر، P (فوسفور) للجذور والثمار، K (بوتاسيوم) لمقاومة الأمراض والجودة. لكل سماد ثلاثة أرقام (مثل 17-17-1", sw: "NPK ni virutubisho vitatu vikuu: N (Naitrojeni) kwa ukuaji wa kijani, P (Fosforasi) kwa mizizi na matunda, K (Potasiamu) kwa ustahimilivu wa magonjwa " },
      answer: { so: "NPK waa saddexda nafaqo ee ugu waaweyn dhirta: N (Nitrojiin) oo keena koritaan cagaaran, P (Foosfooras) oo xoojiya xididada iyo miraha, iyo K (Potashiyam) oo kordhiya cudur-adkaysiga iyo tayada. Bacrimin kastaa waxay leedahay saddex tiro (tusaale 17-17-17) oo muujiya boqolleyda N-P-K.\n\n_Ilo: Fundamentals of Agriculture_", en: "NPK is the three biggest plant nutrients: N (Nitrogen) for green growth, P (Phosphorus) for roots and fruit, and K (Potassium) for disease resistance and quality. Every fertilizer has three numbers (e.g. 17-17-17) showing the percent of N-P-K.\n\n_Source: Fundamentals of Agriculture_", ar: "NPK هي أكبر ثلاث مغذيات: N (نيتروجين) للنمو الأخضر، P (فوسفور) للجذور والثمار، K (بوتاسيوم) لمقاومة الأمراض والجودة. لكل سماد ثلاثة أرقام (مثل 17-17-17) تبيّن نسبة N-P-K.\n\n_المصدر: Fundamentals of Agriculture_", sw: "NPK ni virutubisho vitatu vikuu: N (Naitrojeni) kwa ukuaji wa kijani, P (Fosforasi) kwa mizizi na matunda, K (Potasiamu) kwa ustahimilivu wa magonjwa na ubora. Kila mbolea ina namba tatu (mf. 17-17-17) zinazoonyesha asilimia ya N-P-K.\n\n_Chanzo: Fundamentals of Agriculture_" },
      keywords: ["npk", "nitrojiin", "foosfooras", "potashiyam", "fertilizer", "bacrimin", "nutrients", "dap", "urea"]
    },
    {
      slug: "seed-treatment", cat: "crops", url: "article-seed-saving.html",
      title: { so: "Daawaynta Iniinaha ka hor Beerista", en: "Treating Seeds Before Planting", ar: "معالجة البذور قبل الزراعة", sw: "Kutibu Mbegu Kabla ya Kupanda" },
      summary: { so: "Daawaynta iniinuhu (seed treatment) waa dahaadhinta iniinaha daawo fangas ama cayayaan-dile ah ka hor beerista si looga hortago cudurrada ka dhalata i", en: "Seed treatment is coating seeds with a fungicide or insecticide before planting to prevent seed- and soil-borne diseases. It improves germination and ", ar: "معالجة البذور تغليفها بمبيد فطري أو حشري قبل الزراعة لمنع الأمراض المنقولة بالبذور والتربة. تحسّن الإنبات وتحمي الشتلات. ارتدِ كمامة وقفازات، ولا تأكل", sw: "Kutibu mbegu ni kupaka mbegu dawa ya kuvu au wadudu kabla ya kupanda kuzuia magonjwa ya mbegu na udongo. Huboresha kuota na kulinda miche. Vaa barakoa" },
      answer: { so: "Daawaynta iniinuhu (seed treatment) waa dahaadhinta iniinaha daawo fangas ama cayayaan-dile ah ka hor beerista si looga hortago cudurrada ka dhalata iniinta iyo ciidda. Waxay kordhisaa soo-baxa iniinta oo ilaalisaa dhalmada yar. Isticmaal koofiyad iyo galoofis marka aad daawaynayso, oo ha cunin iniin la daaweeyay.\n\n_Ilo: Principles of Tropical Agronomy_", en: "Seed treatment is coating seeds with a fungicide or insecticide before planting to prevent seed- and soil-borne diseases. It improves germination and protects young seedlings. Wear a mask and gloves when treating, and never eat treated seed.\n\n_Source: Principles of Tropical Agronomy_", ar: "معالجة البذور تغليفها بمبيد فطري أو حشري قبل الزراعة لمنع الأمراض المنقولة بالبذور والتربة. تحسّن الإنبات وتحمي الشتلات. ارتدِ كمامة وقفازات، ولا تأكل البذور المعالجة أبداً.\n\n_المصدر: Principles of Tropical Agronomy_", sw: "Kutibu mbegu ni kupaka mbegu dawa ya kuvu au wadudu kabla ya kupanda kuzuia magonjwa ya mbegu na udongo. Huboresha kuota na kulinda miche. Vaa barakoa na glavu, na usile mbegu zilizotibiwa.\n\n_Chanzo: Principles of Tropical Agronomy_" },
      keywords: ["seed treatment", "iniin daawayn", "seed dressing", "fungicide", "soo baxa", "germination"]
    },
    {
      slug: "damping-off", cat: "pests", url: "article-nursery-management.html",
      title: { so: "Cudurka Dhalmada (Damping-off)", en: "Seedling Damping-off Disease", ar: "مرض سقوط البادرات", sw: "Ugonjwa wa Miche Kufa" },
      summary: { so: "Damping-off waa cudur fangas ah oo dhalmada yar ka dila beerta dhalinta — jirridda ayaa jilicsanaysa oo dhirtu dhacdaa. Waxaa keena qoyaan xad-dhaaf a", en: "Damping-off is a fungal disease that kills young seedlings in the nursery — the stem softens and the plant falls over. It is caused by excess moisture", ar: "سقوط البادرات مرض فطري يقتل الشتلات الصغيرة في المشتل — يلين الساق ويسقط النبات. سببه الرطوبة الزائدة والازدحام. الوقاية: لا تفرط في الري، وفّر تهوية،", sw: "Damping-off ni ugonjwa wa kuvu unaoua miche michanga kitaluni — shina hulainika na mmea huanguka. Husababishwa na unyevu kupita kiasi na msongamano. Z" },
      answer: { so: "Damping-off waa cudur fangas ah oo dhalmada yar ka dila beerta dhalinta — jirridda ayaa jilicsanaysa oo dhirtu dhacdaa. Waxaa keena qoyaan xad-dhaaf ah iyo dhalmo cufan. Ka hortag: ha waraabin biyo badan, sii hawo-socod fiican, isticmaal ciid nadiif ah, oo daawee iniinaha.\n\n_Ilo: Introduction to Agronomy (Sheaffer & Moncada)_", en: "Damping-off is a fungal disease that kills young seedlings in the nursery — the stem softens and the plant falls over. It is caused by excess moisture and overcrowding. Prevent it: do not overwater, give good airflow, use clean soil, and treat seeds.\n\n_Source: Introduction to Agronomy (Sheaffer & Moncada)_", ar: "سقوط البادرات مرض فطري يقتل الشتلات الصغيرة في المشتل — يلين الساق ويسقط النبات. سببه الرطوبة الزائدة والازدحام. الوقاية: لا تفرط في الري، وفّر تهوية، استخدم تربة نظيفة، وعالج البذور.\n\n_المصدر: Introduction to Agronomy (Sheaffer & Moncada)_", sw: "Damping-off ni ugonjwa wa kuvu unaoua miche michanga kitaluni — shina hulainika na mmea huanguka. Husababishwa na unyevu kupita kiasi na msongamano. Zuia: usimwagilie kupita kiasi, toa hewa, tumia udongo safi, na tibu mbegu.\n\n_Chanzo: Introduction to Agronomy (Sheaffer & Moncada)_" },
      keywords: ["damping off", "dhalmo dhacda", "seedling disease", "nursery", "fangas", "qoyaan"]
    },
    {
      slug: "field-capacity", cat: "irrigation", url: "article-irrigation-scheduling.html",
      title: { so: "Awoodda Biyo-qabashada Ciidda", en: "Soil Field Capacity", ar: "السعة الحقلية للتربة", sw: "Uwezo wa Udongo Kushika Maji" },
      summary: { so: "Field capacity waa xaddiga biyaha ee ciiddu qaban karto ka dib marka biyaha xad-dhaafka ah ay hoos u dhaamiyaan. Waa xilliga ugu fiican ee xididdadu b", en: "Field capacity is the amount of water soil can hold after excess water has drained away. It is the ideal state for roots to absorb water. Watering bey", ar: "السعة الحقلية هي كمية الماء التي تحتفظ بها التربة بعد تصريف الماء الزائد. الحالة المثلى لامتصاص الجذور للماء. الري فوق السعة الحقلية يهدر الماء ويمنع ", sw: "Uwezo wa shamba (field capacity) ni kiasi cha maji ambacho udongo unaweza kushika baada ya maji ya ziada kutiririka. Ni hali bora kwa mizizi kunyonya " },
      answer: { so: "Field capacity waa xaddiga biyaha ee ciiddu qaban karto ka dib marka biyaha xad-dhaafka ah ay hoos u dhaamiyaan. Waa xilliga ugu fiican ee xididdadu biyaha ka nuugaan. Marka aad waraabiso ka badan field capacity, biyuhu way lumaan oo hawada xididku wuu xannibmaa. Cabbir qoyaanka ciidda faraha si aadan biyo u luminin.\n\n_Ilo: Principles of Tropical Agronomy_", en: "Field capacity is the amount of water soil can hold after excess water has drained away. It is the ideal state for roots to absorb water. Watering beyond field capacity wastes water and cuts off air to roots. Check soil moisture by hand so you do not overwater.\n\n_Source: Principles of Tropical Agronomy_", ar: "السعة الحقلية هي كمية الماء التي تحتفظ بها التربة بعد تصريف الماء الزائد. الحالة المثلى لامتصاص الجذور للماء. الري فوق السعة الحقلية يهدر الماء ويمنع الهواء عن الجذور. افحص رطوبة التربة باليد.\n\n_المصدر: Principles of Tropical Agronomy_", sw: "Uwezo wa shamba (field capacity) ni kiasi cha maji ambacho udongo unaweza kushika baada ya maji ya ziada kutiririka. Ni hali bora kwa mizizi kunyonya maji. Kumwagilia zaidi hupoteza maji na kuzuia hewa kwa mizizi. Angalia unyevu wa udongo kwa mkono.\n\n_Chanzo: Principles of Tropical Agronomy_" },
      keywords: ["field capacity", "qoyaan", "soil moisture", "waraab", "irrigation", "biyo"]
    },
    {
      slug: "thinning-crops", cat: "crops", url: "article-agronomy-basics.html",
      title: { so: "Ka-jarista Dhirta Badan (Thinning)", en: "Thinning Out Excess Plants", ar: "تخفيف النباتات الزائدة", sw: "Kupungukiza Mimea" },
      summary: { so: "Thinning waa ka-saarista dhirta yar-yar ee aad u cufan si dhirta hadhay ay u helaan meel, iftiin, nafaqo, iyo biyo ku filan. Dhir aad u badan oo isku ", en: "Thinning is removing crowded young plants so the remaining ones get enough space, light, nutrients, and water. Too many close plants compete and all s", ar: "التخفيف إزالة النباتات المزدحمة الصغيرة ليحصل الباقي على مساحة وضوء وغذاء وماء كافٍ. النباتات الكثيرة المتقاربة تتنافس وتبقى ضعيفة. أزل الضعيفة عند 10", sw: "Kupungukiza ni kuondoa mimea michanga iliyosongamana ili iliyobaki ipate nafasi, mwanga, virutubisho, na maji ya kutosha. Mimea mingi iliyokaribiana h" },
      answer: { so: "Thinning waa ka-saarista dhirta yar-yar ee aad u cufan si dhirta hadhay ay u helaan meel, iftiin, nafaqo, iyo biyo ku filan. Dhir aad u badan oo isku dhow way isku tartantaa oo dhammaantood daciifaan. Ka jar dhirta daciifka ah marka ay gaadhaan 10 ilaa 15 cm, oo ka tag masaafada la taliyay.\n\n_Ilo: Agronomy — JRF Notes_", en: "Thinning is removing crowded young plants so the remaining ones get enough space, light, nutrients, and water. Too many close plants compete and all stay weak. Remove the weak ones at 10 to 15 cm and keep the recommended spacing.\n\n_Source: Agronomy — JRF Notes_", ar: "التخفيف إزالة النباتات المزدحمة الصغيرة ليحصل الباقي على مساحة وضوء وغذاء وماء كافٍ. النباتات الكثيرة المتقاربة تتنافس وتبقى ضعيفة. أزل الضعيفة عند 10 إلى 15 سم واحتفظ بالمسافة الموصى بها.\n\n_المصدر: Agronomy — JRF Notes_", sw: "Kupungukiza ni kuondoa mimea michanga iliyosongamana ili iliyobaki ipate nafasi, mwanga, virutubisho, na maji ya kutosha. Mimea mingi iliyokaribiana hushindana na yote hubaki dhaifu. Ondoa dhaifu ikiwa sm 10 hadi 15.\n\n_Chanzo: Agronomy — JRF Notes_" },
      keywords: ["thinning", "ka jar", "spacing", "masaafo", "dhir badan", "crowding"]
    },
    {
      slug: "blossom-end-rot", cat: "pests", url: "article-tomato-farming.html",
      title: { so: "Qudhunka Cirifka Miraha (Calcium)", en: "Blossom-End Rot (Calcium)", ar: "تعفّن طرف الزهرة", sw: "Kuoza kwa Ncha ya Tunda" },
      summary: { so: "Qudhunka cirifka miruhu (yaanyada, basbaaska) waa bar madow oo qudhun ah oo ka soo baxda hoosta miraha. Ma aha cudur — waxaa keena yaraan calcium iyo ", en: "Blossom-end rot (in tomato, pepper) is a dark rotten patch on the bottom of the fruit. It is not a disease — it is caused by calcium shortage and irre", ar: "تعفّن طرف الزهرة (في الطماطم والفلفل) بقعة داكنة متعفنة أسفل الثمرة. ليس مرضاً — سببه نقص الكالسيوم والري غير المنتظم. الحل: اروِ بانتظام، أضف الكالسي", sw: "Kuoza kwa ncha ya tunda (nyanya, pilipili) ni doa jeusi lililooza chini ya tunda. Si ugonjwa — husababishwa na upungufu wa kalsiamu na kumwagilia kusi" },
      answer: { so: "Qudhunka cirifka miruhu (yaanyada, basbaaska) waa bar madow oo qudhun ah oo ka soo baxda hoosta miraha. Ma aha cudur — waxaa keena yaraan calcium iyo biyo-beddelasho. Xal: waraab si joogto ah (ha engegin ka dibna daadin), ku dar calcium ciidda, oo dahaadh (mulch) si qoyaanku u sii jiro.\n\n_Ilo: Introduction to Agronomy (Sheaffer & Moncada)_", en: "Blossom-end rot (in tomato, pepper) is a dark rotten patch on the bottom of the fruit. It is not a disease — it is caused by calcium shortage and irregular watering. Fix: water steadily (do not let dry then flood), add calcium to the soil, and mulch to keep moisture even.\n\n_Source: Introduction to Agronomy (Sheaffer & Moncada)_", ar: "تعفّن طرف الزهرة (في الطماطم والفلفل) بقعة داكنة متعفنة أسفل الثمرة. ليس مرضاً — سببه نقص الكالسيوم والري غير المنتظم. الحل: اروِ بانتظام، أضف الكالسيوم، وغطِّ التربة للحفاظ على رطوبة متساوية.\n\n_المصدر: Introduction to Agronomy (Sheaffer & Moncada)_", sw: "Kuoza kwa ncha ya tunda (nyanya, pilipili) ni doa jeusi lililooza chini ya tunda. Si ugonjwa — husababishwa na upungufu wa kalsiamu na kumwagilia kusiko sawa. Suluhu: mwagilia kwa utaratibu, ongeza kalsiamu, na funika udongo.\n\n_Chanzo: Introduction to Agronomy (Sheaffer & Moncada)_" },
      keywords: ["blossom end rot", "calcium", "yaanyo", "qudhun", "tomato", "basbaas", "kalsiyum"]
    },
    {
      slug: "crop-water-requirement", cat: "irrigation", url: "article-irrigation-scheduling.html",
      title: { so: "Baahida Biyaha ee Dalagga", en: "Crop Water Requirement", ar: "احتياج المحصول للماء", sw: "Mahitaji ya Maji ya Zao" },
      summary: { so: "Dalag kastaa wuxuu leeyahay baahi biyo oo gaar ah oo lagu cabbiro millimeters (mm) xilliga oo dhan: galley 500 ilaa 800, masago 400 ilaa 600, bariis 1", en: "Each crop has a specific water need measured in millimeters (mm) over the season: maize 500 to 800, sorghum 400 to 600, rice 1200 to 1500, vegetables ", ar: "لكل محصول احتياج مائي محدد يُقاس بالمليمتر خلال الموسم: الذرة 500-800، الذرة الرفيعة 400-600، الأرز 1200-1500، الخضار 400-600. يبلغ الاحتياج ذروته عند", sw: "Kila zao lina mahitaji maalum ya maji yanayopimwa kwa milimita (mm) msimu mzima: mahindi 500-800, mtama 400-600, mchele 1200-1500, mboga 400-600. Mahi" },
      answer: { so: "Dalag kastaa wuxuu leeyahay baahi biyo oo gaar ah oo lagu cabbiro millimeters (mm) xilliga oo dhan: galley 500 ilaa 800, masago 400 ilaa 600, bariis 1200 ilaa 1500, khudaar 400 ilaa 600. Baahidu way kordhaa xilliga ubaxa iyo miro-koritaanka. Isticmaal Xisaabiyaha Biyaha ee Beylood si aad u ogaatid inta beertaadu u baahan tahay.\n\n_Ilo: Principles of Tropical Agronomy_", en: "Each crop has a specific water need measured in millimeters (mm) over the season: maize 500 to 800, sorghum 400 to 600, rice 1200 to 1500, vegetables 400 to 600. The need peaks at flowering and fruiting. Use Beylood's Water Calculator to find how much your field needs.\n\n_Source: Principles of Tropical Agronomy_", ar: "لكل محصول احتياج مائي محدد يُقاس بالمليمتر خلال الموسم: الذرة 500-800، الذرة الرفيعة 400-600، الأرز 1200-1500، الخضار 400-600. يبلغ الاحتياج ذروته عند الإزهار والإثمار. استخدم حاسبة المياه.\n\n_المصدر: Principles of Tropical Agronomy_", sw: "Kila zao lina mahitaji maalum ya maji yanayopimwa kwa milimita (mm) msimu mzima: mahindi 500-800, mtama 400-600, mchele 1200-1500, mboga 400-600. Mahitaji hupanda wakati wa maua na kuzaa. Tumia Kikokotoo cha Maji cha Beylood.\n\n_Chanzo: Principles of Tropical Agronomy_" },
      keywords: ["water requirement", "baahida biyaha", "mm", "irrigation", "waraab", "crop water", "biyo"]
    },
    {
      slug: "salinity-management", cat: "soil", url: "article-soil-testing.html",
      title: { so: "Maaraynta Cusbada Ciidda (Salinity)", en: "Managing Soil Salinity", ar: "إدارة ملوحة التربة", sw: "Kusimamia Chumvi ya Udongo" },
      summary: { so: "Cusbadu (salinity) waxay dhib weyn ku tahay dhulalka waraabka ee qallalan sida qaybo Soomaaliya — waxay dhirta ka joojisaa biyo-qaadashada oo yaraysaa", en: "Salinity is a major problem on irrigated dry lands like parts of Somalia — it stops plants taking up water and cuts yields. Fix: use clean low-salt wa", ar: "الملوحة مشكلة كبيرة في الأراضي المروية الجافة كأجزاء من الصومال — تمنع النبات من امتصاص الماء وتقلل الإنتاج. الحل: ماء نظيف قليل الملح، صرف جيد، غسل ا", sw: "Chumvi ni tatizo kubwa katika ardhi ya umwagiliaji kavu kama sehemu za Somalia — huzuia mimea kunyonya maji na kupunguza mavuno. Suluhu: maji safi yen" },
      answer: { so: "Cusbadu (salinity) waxay dhib weyn ku tahay dhulalka waraabka ee qallalan sida qaybo Soomaaliya — waxay dhirta ka joojisaa biyo-qaadashada oo yaraysaa waxsoosaarka. Xal: isticmaal biyo nadiif ah oo cusbo yar, dhaami fiican (drainage), ku daadi biyo dheeraad ah si cusbada hoos ugu dhaqaaqdo, oo beero dalagyo cusbo-adkaysi leh sida timirta iyo masago.\n\n_Ilo: Principles of Tropical Agronomy_", en: "Salinity is a major problem on irrigated dry lands like parts of Somalia — it stops plants taking up water and cuts yields. Fix: use clean low-salt water, ensure good drainage, apply extra water to leach salts downward, and grow salt-tolerant crops like date palm and sorghum.\n\n_Source: Principles of Tropical Agronomy_", ar: "الملوحة مشكلة كبيرة في الأراضي المروية الجافة كأجزاء من الصومال — تمنع النبات من امتصاص الماء وتقلل الإنتاج. الحل: ماء نظيف قليل الملح، صرف جيد، غسل الأملاح لأسفل بماء إضافي، وزراعة محاصيل تتحمّل الملح كالنخيل والذرة الرفيعة.\n\n_المصدر: Principles of Tropical Agronomy_", sw: "Chumvi ni tatizo kubwa katika ardhi ya umwagiliaji kavu kama sehemu za Somalia — huzuia mimea kunyonya maji na kupunguza mavuno. Suluhu: maji safi yenye chumvi kidogo, mtiririko mzuri, kuosha chumvi chini kwa maji ya ziada, na kulima mazao sugu kama mtende na mtama.\n\n_Chanzo: Principles of Tropical Agronomy_" },
      keywords: ["salinity", "cusbo", "milix", "saline", "drainage", "dhaami", "date palm", "masago"]
    },
    {
      slug: "plant-spacing", cat: "crops", url: "article-agronomy-basics.html",
      title: { so: "Muhiimadda Masaafada Dhirta", en: "Importance of Plant Spacing", ar: "أهمية المسافة بين النباتات", sw: "Umuhimu wa Nafasi ya Mimea" },
      summary: { so: "Masaafada saxda ah ee dhirta dhexdeeda ayaa go'aamisa waxsoosaarka. Masaafo aad u yar (cufan): dhirtu way isku tartantaa, daciifaan, oo cudur badan qa", en: "Correct spacing between plants determines yield. Too little spacing (crowded): plants compete, stay weak, and catch more disease. Too much: wasted lan", ar: "المسافة الصحيحة بين النباتات تحدد الإنتاج. المسافة القليلة (مزدحم): تتنافس النباتات وتضعف وتمرض أكثر. الكثيرة: أرض مهدرة وإنتاج قليل. اتبع المسافة الم", sw: "Nafasi sahihi kati ya mimea huamua mavuno. Nafasi ndogo (msongamano): mimea hushindana, hubaki dhaifu, na kupata magonjwa zaidi. Kubwa mno: ardhi inap" },
      answer: { so: "Masaafada saxda ah ee dhirta dhexdeeda ayaa go'aamisa waxsoosaarka. Masaafo aad u yar (cufan): dhirtu way isku tartantaa, daciifaan, oo cudur badan qaaddaan. Masaafo aad u weyn: dhul lumay iyo waxsoosaar yar. Raac masaafada la taliyay dalag kasta (tusaale galley 75×25 cm) si aad u hesho waxsoosaarka ugu sarreeya.\n\n_Ilo: Agronomy — JRF Notes_", en: "Correct spacing between plants determines yield. Too little spacing (crowded): plants compete, stay weak, and catch more disease. Too much: wasted land and low output. Follow the recommended spacing for each crop (e.g. maize 75x25 cm) for the highest yield.\n\n_Source: Agronomy — JRF Notes_", ar: "المسافة الصحيحة بين النباتات تحدد الإنتاج. المسافة القليلة (مزدحم): تتنافس النباتات وتضعف وتمرض أكثر. الكثيرة: أرض مهدرة وإنتاج قليل. اتبع المسافة الموصى بها لكل محصول (مثل الذرة 75×25 سم).\n\n_المصدر: Agronomy — JRF Notes_", sw: "Nafasi sahihi kati ya mimea huamua mavuno. Nafasi ndogo (msongamano): mimea hushindana, hubaki dhaifu, na kupata magonjwa zaidi. Kubwa mno: ardhi inapotea na mavuno kidogo. Fuata nafasi inayopendekezwa (mf. mahindi 75x25 sm).\n\n_Chanzo: Agronomy — JRF Notes_" },
      keywords: ["spacing", "masaafo", "plant density", "population", "cufan", "dhir", "safaf"]
    },
    {
      slug: "harvest-maturity", cat: "crops", url: "article-post-harvest.html",
      title: { so: "Calaamadaha Bislaanshaha Gurashada", en: "Signs of Harvest Maturity", ar: "علامات نضج الحصاد", sw: "Dalili za Kukomaa kwa Mavuno" },
      summary: { so: "Guritaan waqti sax ah waa muhiim: goor hore = waxsoosaar aan bisliin; goor dambe = khasaare iyo tayo hoose. Calaamadaha guud: hadhuudhka miruhu adkaad", en: "Harvesting at the right time matters: too early = immature yield; too late = losses and low quality. General signs: grains harden and moisture drops (", ar: "الحصاد في الوقت الصحيح مهم: مبكراً = محصول غير ناضج؛ متأخراً = خسائر وجودة منخفضة. علامات عامة: تصلّب الحبوب وانخفاض الرطوبة (12-14%)، بلوغ الخضار الح", sw: "Kuvuna kwa wakati sahihi ni muhimu: mapema mno = mavuno yasiyokomaa; kuchelewa = hasara na ubora duni. Dalili za jumla: nafaka kuwa ngumu na unyevu ku" },
      answer: { so: "Guritaan waqti sax ah waa muhiim: goor hore = waxsoosaar aan bisliin; goor dambe = khasaare iyo tayo hoose. Calaamadaha guud: hadhuudhka miruhu adkaadaan oo qoyaanku hoos u dhaco (12 ilaa 14%), khudaarta midab iyo cabbir gaadha, miraha caleemuhu jaalaystaan. Bar kastaa dalag wuxuu leeyahay calaamado gaar ah.\n\n_Ilo: Fundamentals of Agriculture_", en: "Harvesting at the right time matters: too early = immature yield; too late = losses and low quality. General signs: grains harden and moisture drops (12 to 14%), vegetables reach size and color, fruit leaves yellow. Each crop has its own maturity signs.\n\n_Source: Fundamentals of Agriculture_", ar: "الحصاد في الوقت الصحيح مهم: مبكراً = محصول غير ناضج؛ متأخراً = خسائر وجودة منخفضة. علامات عامة: تصلّب الحبوب وانخفاض الرطوبة (12-14%)، بلوغ الخضار الحجم واللون، اصفرار أوراق الفاكهة.\n\n_المصدر: Fundamentals of Agriculture_", sw: "Kuvuna kwa wakati sahihi ni muhimu: mapema mno = mavuno yasiyokomaa; kuchelewa = hasara na ubora duni. Dalili za jumla: nafaka kuwa ngumu na unyevu kushuka (12-14%), mboga kufikia ukubwa na rangi, majani ya matunda kuwa njano.\n\n_Chanzo: Fundamentals of Agriculture_" },
      keywords: ["maturity", "bislaanshaha", "harvest", "gurasho", "ripeness", "moisture", "goosasho"]
    },
    {
      slug: "storage-pests", cat: "pests", url: "article-post-harvest.html",
      title: { so: "Cayayaanka Kaydka (Tukubaha)", en: "Storage Pests (Weevils)", ar: "آفات التخزين (السوس)", sw: "Wadudu wa Ghala" },
      summary: { so: "Tukubaha (weevils), aboorka, iyo jiirarku waxay burburin karaan hadhuudhka la kaydsan 20 ilaa 30% haddaan la ilaalin. Ka hortag: qalaji si fiican (qoy", en: "Weevils, grain borers, and rodents can destroy 20 to 30% of stored grain if not controlled. Prevent: dry well (low moisture), store in sealed (hermeti", ar: "السوس وحفار الحبوب والقوارض يمكن أن تدمّر 20-30% من الحبوب المخزّنة. الوقاية: جفّف جيداً، خزّن في أكياس محكمة، استخدم طاردات طبيعية كأوراق النيم أو ال", sw: "Vidukari, vitobozi vya nafaka, na panya wanaweza kuharibu 20-30% ya nafaka iliyohifadhiwa. Zuia: kausha vizuri, hifadhi kwenye magunia yaliyofungwa, t" },
      answer: { so: "Tukubaha (weevils), aboorka, iyo jiirarku waxay burburin karaan hadhuudhka la kaydsan 20 ilaa 30% haddaan la ilaalin. Ka hortag: qalaji si fiican (qoyaan hoose), kaydi joonyado xiran (hermetic) ama weelal cabbir leh, isticmaal dhir dabiici sida caleemo neem ama basbaas, oo nadiifi bakhaarka. Hubi kaydka si joogto ah.\n\n_Ilo: The Farmer's Handbook_", en: "Weevils, grain borers, and rodents can destroy 20 to 30% of stored grain if not controlled. Prevent: dry well (low moisture), store in sealed (hermetic) bags or airtight containers, use natural repellents like neem leaves or chili, and clean the store. Check stock regularly.\n\n_Source: The Farmer's Handbook_", ar: "السوس وحفار الحبوب والقوارض يمكن أن تدمّر 20-30% من الحبوب المخزّنة. الوقاية: جفّف جيداً، خزّن في أكياس محكمة، استخدم طاردات طبيعية كأوراق النيم أو الفلفل، ونظّف المخزن. افحص بانتظام.\n\n_المصدر: The Farmer's Handbook_", sw: "Vidukari, vitobozi vya nafaka, na panya wanaweza kuharibu 20-30% ya nafaka iliyohifadhiwa. Zuia: kausha vizuri, hifadhi kwenye magunia yaliyofungwa, tumia vizuia asili kama majani ya neem au pilipili, na safisha ghala.\n\n_Chanzo: The Farmer's Handbook_" },
      keywords: ["weevil", "tuku", "tukubaha", "storage pest", "kayd", "bakhaar", "hermetic", "aboor", "grain"]
    },
    {
      slug: "crop-rotation-why", cat: "soil", url: "article-crop-rotation.html",
      title: { so: "Sababta Wareejinta Dalagga", en: "Why Rotate Crops", ar: "لماذا نناوب المحاصيل", sw: "Kwa Nini Kuzungusha Mazao" },
      summary: { so: "Beerista dalag isku mid ah isku dhul sannad kasta waxay dhaqaajisaa cudurro iyo cayayaan, oo dhammaysaa nafaqo gaar ah. Wareejintu (tusaale galley kad", en: "Growing the same crop on the same land every year builds up diseases and pests, and drains specific nutrients. Rotation (e.g. maize then a legume) bre", ar: "زراعة نفس المحصول في نفس الأرض كل عام تراكم الأمراض والآفات وتستنزف مغذيات معينة. الدورة (مثل ذرة ثم بقولية) تكسر دورة المرض وتضيف نيتروجيناً وتحفظ ال", sw: "Kulima zao lile lile kila mwaka hujenga magonjwa na wadudu, na kumaliza virutubisho fulani. Mzunguko (mf. mahindi kisha mkunde) huvunja mzunguko wa ma" },
      answer: { so: "Beerista dalag isku mid ah isku dhul sannad kasta waxay dhaqaajisaa cudurro iyo cayayaan, oo dhammaysaa nafaqo gaar ah. Wareejintu (tusaale galley kadib digir) way jebisaa wareegga cudurrada, ku dartaa nitrojiin, oo ilaalisaa bacrinta. Had iyo jeer isku day inaad digir ku dartid wareegga.\n\n_Ilo: Introduction to Agronomy (Sheaffer & Moncada)_", en: "Growing the same crop on the same land every year builds up diseases and pests, and drains specific nutrients. Rotation (e.g. maize then a legume) breaks the disease cycle, adds nitrogen, and preserves fertility. Always try to include a legume in the rotation.\n\n_Source: Introduction to Agronomy (Sheaffer & Moncada)_", ar: "زراعة نفس المحصول في نفس الأرض كل عام تراكم الأمراض والآفات وتستنزف مغذيات معينة. الدورة (مثل ذرة ثم بقولية) تكسر دورة المرض وتضيف نيتروجيناً وتحفظ الخصوبة. ضمّن بقولية دائماً.\n\n_المصدر: Introduction to Agronomy (Sheaffer & Moncada)_", sw: "Kulima zao lile lile kila mwaka hujenga magonjwa na wadudu, na kumaliza virutubisho fulani. Mzunguko (mf. mahindi kisha mkunde) huvunja mzunguko wa magonjwa, huongeza naitrojeni, na kuhifadhi rutuba. Jumuisha mkunde daima.\n\n_Chanzo: Introduction to Agronomy (Sheaffer & Moncada)_" },
      keywords: ["rotation", "wareejin", "crop rotation", "legume", "digir", "nitrojiin", "cudur"]
    },
    {
      slug: "mulch-benefit", cat: "soil", url: "article-mulching-soil.html",
      title: { so: "Faa'iidada Dahaadhka Ciidda (Mulch)", en: "Benefits of Mulching", ar: "فوائد التغطية", sw: "Faida za Kufunika Udongo" },
      summary: { so: "Dahaadhku (mulch) waa lakab caleemo qallalan, caws, ama plastic ah oo ciidda lagu daboolo. Wuxuu: haystaa qoyaanka (yaraysa waraab), xannibaa cawska, ", en: "Mulch is a layer of dry leaves, grass, or plastic spread over the soil. It: keeps moisture (less irrigation), suppresses weeds, protects soil from har", ar: "التغطية طبقة من أوراق جافة أو عشب أو بلاستيك فوق التربة. تحافظ على الرطوبة، تكبح الأعشاب، تحمي التربة من الشمس والتعرية، وتضيف مادة عضوية عند تحلّلها.", sw: "Matandazo ni tabaka la majani makavu, nyasi, au plastiki juu ya udongo. Huhifadhi unyevu, hukandamiza magugu, hulinda udongo na jua kali na mmomonyoko" },
      answer: { so: "Dahaadhku (mulch) waa lakab caleemo qallalan, caws, ama plastic ah oo ciidda lagu daboolo. Wuxuu: haystaa qoyaanka (yaraysa waraab), xannibaa cawska, ka ilaaliyaa ciidda qorraxda kulul iyo nabaad-guurka, oo (kan dabiiciga) ku daraa maaddo dabiici marka uu qudhmo. Waa qalab muhiim u ah dhulalka qallalan.\n\n_Ilo: Principles of Tropical Agronomy_", en: "Mulch is a layer of dry leaves, grass, or plastic spread over the soil. It: keeps moisture (less irrigation), suppresses weeds, protects soil from harsh sun and erosion, and (organic mulch) adds organic matter as it decomposes. It is a key tool for dry lands.\n\n_Source: Principles of Tropical Agronomy_", ar: "التغطية طبقة من أوراق جافة أو عشب أو بلاستيك فوق التربة. تحافظ على الرطوبة، تكبح الأعشاب، تحمي التربة من الشمس والتعرية، وتضيف مادة عضوية عند تحلّلها. أداة مهمة للأراضي الجافة.\n\n_المصدر: Principles of Tropical Agronomy_", sw: "Matandazo ni tabaka la majani makavu, nyasi, au plastiki juu ya udongo. Huhifadhi unyevu, hukandamiza magugu, hulinda udongo na jua kali na mmomonyoko, na (ya asili) huongeza mabaki ya kikaboni. Ni chombo muhimu kwa ardhi kavu.\n\n_Chanzo: Principles of Tropical Agronomy_" },
      keywords: ["mulch", "dahaadh", "mulching", "qoyaan", "moisture", "caws", "dabool"]
    },
    {
      slug: "legume-nitrogen", cat: "soil", url: "article-green-manure.html",
      title: { so: "Sida Digirtu Nitrojiin ugu darto Ciidda", en: "How Legumes Add Nitrogen", ar: "كيف تضيف البقوليات النيتروجين", sw: "Jinsi Mikunde Inavyoongeza Naitrojeni" },
      summary: { so: "Dhirta digirta ah (digir, lawas, cowpea) waxay xididadooda la wadaagaan bakteeriya Rhizobium ah oo qabta nitrojiinka hawada oo ciidda ku dara si bilaa", en: "Legume plants (beans, groundnut, cowpea) share their roots with Rhizobium bacteria that fix nitrogen from the air into the soil for free. So legumes n", ar: "نباتات البقوليات (الفاصولياء، الفول السوداني، اللوبيا) تشارك جذورها بكتيريا Rhizobium التي تثبّت نيتروجين الهواء في التربة مجاناً. لذا تحتاج سماداً قل", sw: "Mimea ya mikunde (maharagwe, karanga, kunde) hushiriki mizizi yake na bakteria wa Rhizobium wanaofunga naitrojeni kutoka hewani kwenye udongo bure. Hi" },
      answer: { so: "Dhirta digirta ah (digir, lawas, cowpea) waxay xididadooda la wadaagaan bakteeriya Rhizobium ah oo qabta nitrojiinka hawada oo ciidda ku dara si bilaash ah. Sidaa darteed digirtu bacrimin yar bay u baahan tahay, waxayna hagaajisaa dalagga xiga. Ku dar digir wareegga dalagaaga si aad u yaraysid bacrimin la iibsado.\n\n_Ilo: Introduction to Agronomy (Sheaffer & Moncada)_", en: "Legume plants (beans, groundnut, cowpea) share their roots with Rhizobium bacteria that fix nitrogen from the air into the soil for free. So legumes need little fertilizer and improve the next crop. Include a legume in your rotation to reduce bought fertilizer.\n\n_Source: Introduction to Agronomy (Sheaffer & Moncada)_", ar: "نباتات البقوليات (الفاصولياء، الفول السوداني، اللوبيا) تشارك جذورها بكتيريا Rhizobium التي تثبّت نيتروجين الهواء في التربة مجاناً. لذا تحتاج سماداً قليلاً وتحسّن المحصول التالي. ضمّن بقولية في دورتك.\n\n_المصدر: Introduction to Agronomy (Sheaffer & Moncada)_", sw: "Mimea ya mikunde (maharagwe, karanga, kunde) hushiriki mizizi yake na bakteria wa Rhizobium wanaofunga naitrojeni kutoka hewani kwenye udongo bure. Hivyo mikunde inahitaji mbolea kidogo na huboresha zao linalofuata.\n\n_Chanzo: Introduction to Agronomy (Sheaffer & Moncada)_" },
      keywords: ["legume", "digir", "nitrogen fixation", "rhizobium", "nitrojiin", "cowpea", "lawas", "bacteria"]
    },
    {
      slug: "integrated-pest", cat: "pests", url: "article-ipm.html",
      title: { so: "Maaraynta Cayayaanka Isku-dhafan (IPM)", en: "Integrated Pest Management (IPM)", ar: "الإدارة المتكاملة للآفات", sw: "Udhibiti wa Wadudu wa Pamoja" },
      summary: { so: "IPM waa isku-darka dhammaan hababka xakameynta cayayaanka si loo yareeyo kiimikada: kormeer joogto ah, noocyo iska-caabin leh, dalag-wareejin, cadowga", en: "IPM combines all pest-control methods to minimize chemicals: regular scouting, resistant varieties, crop rotation, natural enemies (like ladybirds), t", ar: "الإدارة المتكاملة تجمع كل طرق المكافحة لتقليل الكيماويات: المراقبة، أصناف مقاومة، الدورة الزراعية، الأعداء الطبيعيون، المصائد، وزيت النيم. الكيماويات ", sw: "IPM huchanganya njia zote za kudhibiti wadudu kupunguza kemikali: ukaguzi, aina sugu, mzunguko wa mazao, maadui asili (kama ladybird), mitego, na mafu" },
      answer: { so: "IPM waa isku-darka dhammaan hababka xakameynta cayayaanka si loo yareeyo kiimikada: kormeer joogto ah, noocyo iska-caabin leh, dalag-wareejin, cadowga dabiiciga (sida ladybird), dabin, iyo neem oil. Kiimikada waxaa loo isticmaalaa marka ugu dambeysa oo kaliya. IPM waxay ilaalisaa deegaanka, caafimaadka, iyo lacagta.\n\n_Ilo: Agronomy — JRF Notes_", en: "IPM combines all pest-control methods to minimize chemicals: regular scouting, resistant varieties, crop rotation, natural enemies (like ladybirds), traps, and neem oil. Chemicals are a last resort only. IPM protects the environment, health, and money.\n\n_Source: Agronomy — JRF Notes_", ar: "الإدارة المتكاملة تجمع كل طرق المكافحة لتقليل الكيماويات: المراقبة، أصناف مقاومة، الدورة الزراعية، الأعداء الطبيعيون، المصائد، وزيت النيم. الكيماويات خياراً أخيراً فقط. تحمي البيئة والصحة والمال.\n\n_المصدر: Agronomy — JRF Notes_", sw: "IPM huchanganya njia zote za kudhibiti wadudu kupunguza kemikali: ukaguzi, aina sugu, mzunguko wa mazao, maadui asili (kama ladybird), mitego, na mafuta ya neem. Kemikali ni suluhu ya mwisho tu. Hulinda mazingira, afya, na fedha.\n\n_Chanzo: Agronomy — JRF Notes_" },
      keywords: ["ipm", "cayayaan", "pest management", "biological control", "neem", "ladybird", "dabin", "kiimiko"]
    }
  ];

  /* ---------------- GREETINGS & CANNED RESPONSES ---------------- */
  var GREETINGS = {
    patterns: [
      // Somali
      'soo dhawow','salaan','salam','iska warran','war iska','sidee tahay','sideed tahay','subax wanaagsan','galab wanaagsan','habeen wanaagsan','assalamu calaykum','assalamu','aslaamu',
      // English
      'hello','hi','hey','good morning','good afternoon','good evening','greetings','howdy',
      // Arabic
      'مرحبا','مرحباً','أهلا','أهلاً','السلام','صباح الخير','مساء الخير',
      // Swahili
      'habari','jambo','hujambo','sasa','mambo','shikamoo','sawubona'
    ],
    response: {
      so: '**Soo dhawow Beylood!** 🌱\n\nAnigu waxaan ahay caawiyahaaga AI ee beeraha, xoolaha, iyo cudurrada dalagga. Su\'aal kasta i waydii — waxaan ku siin doonaa jawaab xirfadeed oo aqoonta Beylood ka soo qaadan.\n\n**Tusaalooyin:**\n- Sidee loo beero galleyda xilliga Gu\' 2026?\n- Maxaa daawo u ah whiteflies-ka yaanyada?\n- Sidee loo sameeyo compost gurigayga?\n- Maxaa loo sameeyaa lo\'da caanaha si waxsoo-saarka u kordho?\n\nMaxaa ku caawin karaa maanta?',
      en: '**Welcome to Beylood!** 🌱\n\nI\'m your AI assistant for farming, livestock, and crop diseases. Ask me anything — I\'ll give you a professional answer drawn from the Beylood knowledge base.\n\n**Examples:**\n- How do I grow maize for the Gu 2026 season?\n- What treats whiteflies on tomatoes?\n- How do I make compost at home?\n- How can I boost milk production in dairy cows?\n\nHow can I help you today?',
      ar: '**أهلاً بك في Beylood!** 🌱\n\nأنا مساعدك الذكي للزراعة والثروة الحيوانية وأمراض المحاصيل. اسألني عن أي شيء — سأقدم لك إجابة احترافية من قاعدة معرفة Beylood.\n\n**أمثلة:**\n- كيف أزرع الذرة في موسم غو 2026؟\n- ما علاج الذبابة البيضاء على الطماطم؟\n- كيف أصنع كمبوست في المنزل؟\n\nكيف يمكنني مساعدتك اليوم؟',
      sw: '**Karibu Beylood!** 🌱\n\nMimi ni msaidizi wako wa AI kwa kilimo, mifugo, na magonjwa ya mazao. Niulize chochote — nitakupa jibu la kitaalamu kutoka kwenye msingi wa maarifa wa Beylood.\n\n**Mifano:**\n- Ninapandaje mahindi msimu wa Gu 2026?\n- Ni nini kinatibu inzi weupe kwenye nyanya?\n- Ninatengenezaje mboji nyumbani?\n\nNiwezeje kukusaidia leo?'
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

  /* ---------------- SYNONYMS (cross-language + variants) ----------------
     Each canonical concept maps to words a user might type in any language.
     The query is expanded with these so e.g. "maize" matches Somali "galley". */
  var SYNONYMS = {
    maize:      ['maize','corn','galley','galleyda','galleey','mahindi','ذرة'],
    sorghum:    ['sorghum','masago','masaggada','hadhuudh','durra','mtama','ذرة رفيعة'],
    rice:       ['rice','bariis','bariiska','mchele','أرز','paddy'],
    tomato:     ['tomato','tomaato','yaanyo','yaanyada','nyanya','طماطم'],
    irrigation: ['irrigation','waraab','waraabin','waraabinta','biyayn','biyaynta','drip','umwagiliaji','ري','tubo'],
    water:      ['water','biyo','biyaha','maji','ماء','مياه'],
    disease:    ['disease','diseases','cudur','cudurro','cudurrada','jirro','magonjwa','blight','مرض','أمراض'],
    pest:       ['pest','pests','cayayaan','cayayaanka','insect','wadudu','dudu','آفة','آفات'],
    compost:    ['compost','bacri','bacrin','bacrinta','digo','samad','manure','mboji','mbolea','سماد','كمبوست'],
    cattle:     ['cattle','cow','cows','lo','loo','lada','dairy','caano','milk','ng’ombe','ngombe','بقر','أبقار'],
    poultry:    ['poultry','chicken','hen','digaag','digaagga','kuku','دجاج'],
    goat:       ['goat','goats','sheep','ari','riyo','wan','ido','mbuzi','kondoo','ماعز','غنم'],
    drought:    ['drought','abaar','abaaro','abaaraha','ukame','dry','جفاف'],
    soil:       ['soil','carro','carrada','ciid','ciidda','udongo','تربة'],
    greenhouse: ['greenhouse','dahaaran','manyatta','chafu'],
    fertilizer: ['fertilizer','bacrin','npk','dap','urea','mbolea','سماد'],
    harvest:    ['harvest','gurasho','goosasho','goosashada','mavuno','حصاد']
  };
  var VARIANT_TO_CANON = (function () {
    var m = {};
    Object.keys(SYNONYMS).forEach(function (canon) {
      SYNONYMS[canon].forEach(function (v) { m[tokenize(v).join(' ')] = canon; m[v.toLowerCase()] = canon; });
    });
    return m;
  })();

  // Expand a token set with canonical concepts + all their variant words.
  function expandTokens(tokens) {
    var out = new Set(tokens);
    tokens.forEach(function (t) {
      var canon = VARIANT_TO_CANON[t];
      if (canon) { out.add(canon); SYNONYMS[canon].forEach(function (v) { tokenize(v).forEach(function (w) { out.add(w); }); }); }
    });
    return out;
  }

  // Fuzzy token comparison: exact = 1, prefix/substring (len>=4) = 0.6.
  function tokenSim(a, b) {
    if (a === b) return 1;
    if (a.length >= 4 && b.length >= 4 && (b.indexOf(a) === 0 || a.indexOf(b) === 0)) return 0.6;
    return 0;
  }
  function bestSim(token, set) {
    var best = 0;
    set.forEach(function (s) { var v = tokenSim(token, s); if (v > best) best = v; });
    return best;
  }

  /* ---------------- SCORE ARTICLE vs QUERY ---------------- */
  function scoreArticle(article, queryTokens, lang, contextSlug) {
    var score = 0;
    var qSet = expandTokens(queryTokens);

    // Title match (heaviest) — fuzzy
    var titleTokens = tokenize((article.title[lang] || article.title.en) + ' ' + (article.title.en));
    titleTokens.forEach(function (t) { score += 10 * bestSim(t, qSet); });

    // Keywords match (very strong — these are curated) — fuzzy
    article.keywords.forEach(function (k) {
      var kt = tokenize(k);
      kt.forEach(function (t) { score += 8 * bestSim(t, qSet); });
      // Whole-phrase match in original query string
      if (queryTokens.join(' ').indexOf(k.toLowerCase()) !== -1) score += 6;
    });

    // Summary match — fuzzy, lighter
    var sumTokens = tokenize((article.summary[lang] || article.summary.en));
    sumTokens.forEach(function (t) { score += 2 * bestSim(t, qSet); });

    // Category match
    if (qSet.has(article.cat)) score += 3;

    // Conversation context: gently boost the last topic so short follow-ups resolve.
    if (contextSlug && article.slug === contextSlug) score += 4;

    return score;
  }

  /* ---------------- FOLLOW-UP SUGGESTIONS (by category) ----------------
     Returned to the chat UI so the assistant offers natural next questions. */
  var FOLLOWUPS = {
    crops:      { so: ['Cudurro caan ku ah?', 'Intee biyo u baahan tahay?', 'Goormaa la goostaa?'], en: ['Common diseases?', 'How much water?', 'When to harvest?'], ar: ['الأمراض الشائعة؟', 'كم تحتاج ماء؟', 'متى الحصاد؟'], sw: ['Magonjwa ya kawaida?', 'Inahitaji maji kiasi gani?', 'Lini kuvuna?'] },
    irrigation: { so: ['Sidee biyaha loo kaydiyaa?', 'Drip mise furrow?', 'Intee mar la waraabiyaa?'], en: ['How to store water?', 'Drip or furrow?', 'How often to irrigate?'], ar: ['كيف نخزن الماء؟', 'تنقيط أم أخاديد؟', 'كم مرة نروي؟'], sw: ['Jinsi ya kuhifadhi maji?', 'Drip au mifereji?', 'Mara ngapi kumwagilia?'] },
    livestock:  { so: ['Cunto noocee ah?', 'Cudurrada caanka ah?', 'Sidee waxsoosaarka loo kordhiyaa?'], en: ['What feed?', 'Common diseases?', 'How to boost yield?'], ar: ['أي علف؟', 'الأمراض الشائعة؟', 'كيف نزيد الإنتاج؟'], sw: ['Chakula gani?', 'Magonjwa ya kawaida?', 'Jinsi ya kuongeza uzalishaji?'] },
    pests:      { so: ['Daawo dabiici ah?', 'Sidee looga hortagaa?', 'Calaamadaha cudurka?'], en: ['Organic treatment?', 'How to prevent?', 'Disease symptoms?'], ar: ['علاج عضوي؟', 'كيف نمنع؟', 'أعراض المرض؟'], sw: ['Tiba asili?', 'Jinsi ya kuzuia?', 'Dalili za ugonjwa?'] },
    soil:       { so: ['Sidee pH loo qiyaasaa?', 'Bacrin noocee ah?', 'Compost sidee loo sameeyaa?'], en: ['How to test pH?', 'Which fertilizer?', 'How to make compost?'], ar: ['كيف نختبر الحموضة؟', 'أي سماد؟', 'كيف نصنع الكمبوست؟'], sw: ['Jinsi ya kupima pH?', 'Mbolea gani?', 'Jinsi ya kutengeneza mboji?'] },
    climate:    { so: ['Dalagyada abaarta u adkaysta?', 'Sidee biyaha loo kaydshaa?', 'Saadaasha xilliga?'], en: ['Drought-tolerant crops?', 'How to conserve water?', 'Seasonal forecast?'], ar: ['محاصيل مقاومة للجفاف؟', 'كيف نحافظ على الماء؟', 'توقعات الموسم؟'], sw: ['Mazao yanayostahimili ukame?', 'Jinsi ya kuhifadhi maji?', 'Utabiri wa msimu?'] }
  };
  function getSuggestions(article, lang) {
    var bank = FOLLOWUPS[article.cat] || FOLLOWUPS.crops;
    return (bank[lang] || bank.so).slice(0, 3);
  }

  /* ---------------- MAIN SEARCH ---------------- */
  function search(query, lang, contextSlug) {
    lang = lang || detectLang(query);
    var tokens = tokenize(query);
    if (!tokens.length) return { lang: lang, type: 'empty', results: [] };

    // Greeting detection — word-boundary regex
    var lowQ = String(query).toLowerCase().trim();
    function patternMatches(p) {
      var esc = p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      var rx = new RegExp('(^|[^\\p{L}])' + esc + '($|[^\\p{L}])', 'iu');
      return rx.test(lowQ);
    }
    if (GREETINGS.patterns.some(patternMatches) && tokens.length <= 4) {
      return { lang: lang, type: 'greeting', response: GREETINGS.response[lang] || GREETINGS.response.so };
    }
    if (THANKS.patterns.some(patternMatches)) {
      return { lang: lang, type: 'thanks', response: THANKS.response[lang] || THANKS.response.so };
    }

    var scored = KNOWLEDGE.map(function (a) {
      return { article: a, score: scoreArticle(a, tokens, lang, contextSlug) };
    }).filter(function (x) { return x.score > 0.6; })
      .sort(function (a, b) { return b.score - a.score });

    if (!scored.length) {
      return { lang: lang, type: 'no_match', response: NO_MATCH[lang] || NO_MATCH.so };
    }

    var results = scored.slice(0, 3).map(function (x) { return x.article; });
    return {
      lang: lang,
      type: 'match',
      results: results,
      topSlug: results[0].slug,
      suggestions: getSuggestions(results[0], lang)
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

  return {
    KNOWLEDGE: KNOWLEDGE,
    search: search,
    format: format,
    detectLang: detectLang,
    getSuggestions: getSuggestions
  };
})();
