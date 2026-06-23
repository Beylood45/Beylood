/* ============================================================
   Beylood — Article index for RAG-lite
   ------------------------------------------------------------
   The worker uses simple keyword matching to find relevant
   Beylood articles for each user query, then injects them into
   the system prompt so the model cites Beylood content first.

   To add a new article, append an entry below. Keywords should
   include Somali AND English terms.
   ============================================================ */
export const ARTICLES = [
  // ---- Crops ----
  { slug: 'maize-farming', cat: 'crops',
    title: 'Beerista Galleyda', url: 'https://beylood.com/article-maize-farming.html',
    summary: 'Galley xilliga Gu iyo Deyr — 90–120 maalmood, 500–800mm biyo, 75cm × 25cm masaafo.',
    keywords: ['galley','maize','corn','gu','deyr','dalag','iniinaha','seeds'] },
  { slug: 'rice-farming', cat: 'crops',
    title: 'Beerista Bariiska', url: 'https://beylood.com/article-rice-farming.html',
    summary: 'Bariis Lower Shabelle — paddy fields, biyo joogto ah, 110–140 maalmood.',
    keywords: ['bariis','rice','shabelle','paddy','dooga'] },
  { slug: 'tomato-farming', cat: 'crops',
    title: 'Beerista Yaanyada', url: 'https://beylood.com/article-tomato-farming.html',
    summary: 'Yaanyo — 70–90 maalmood, drip irrigation, Roma VF + Anna F1.',
    keywords: ['yaanyo','tomato','tomatoes','solanum'] },
  { slug: 'onion-farming', cat: 'crops',
    title: 'Beerista Basasha', url: 'https://beylood.com/article-onion-farming.html',
    summary: 'Basal cas iyo cad — 100–130 maalmood, ciid bacrin leh, qoyaan dhexdhexaad ah.',
    keywords: ['basal','basasha','onion','red onion'] },
  { slug: 'watermelon-farming', cat: 'crops',
    title: 'Beerista Qaraha', url: 'https://beylood.com/article-watermelon-farming.html',
    summary: 'Qare — 80–110 maalmood, cadceed buuxa, masaafo 1.5m × 1m.',
    keywords: ['qare','watermelon','qaraha'] },
  { slug: 'chili-farming', cat: 'crops',
    title: 'Beerista Basbaaska', url: 'https://beylood.com/article-chili-farming.html',
    summary: 'Basbaas yare iyo cas — 75–90 maalmood, cadceed kulul, suuq sare.',
    keywords: ['basbaas','chili','pepper','chilli'] },
  { slug: 'banana-farming', cat: 'crops',
    title: 'Beerista Mooska', url: 'https://beylood.com/article-banana-farming.html',
    summary: 'Moos — 9–12 bilood, biyo joogto ah, ciid qoto dheer.',
    keywords: ['moos','banana','mooska'] },
  { slug: 'mango-farming', cat: 'crops',
    title: 'Beerista Cambaha', url: 'https://beylood.com/article-mango-farming.html',
    summary: 'Cambo — geed 3–5 sano, qiimo sare, varieties Kent + Tommy Atkins.',
    keywords: ['cambo','mango','cambaha'] },
  { slug: 'cassava-farming', cat: 'crops',
    title: 'Beerista Cassava', url: 'https://beylood.com/article-cassava-farming.html',
    summary: 'Cassava — 9–12 bilood, abaaro u adkaysi leh, dalagga ammaanka cuntada.',
    keywords: ['cassava','muhogo','mihogo'] },
  { slug: 'cabbage-farming', cat: 'crops',
    title: 'Beerista Kaabashka', url: 'https://beylood.com/article-cabbage-farming.html',
    summary: 'Kaabash — 70–100 maalmood, qabow ayuu jecel yahay, transplant ka dib 4 toddobaad.',
    keywords: ['kaabash','cabbage','kabichi'] },
  { slug: 'home-garden', cat: 'crops',
    title: 'Beerista Khudaarta Guriga', url: 'https://beylood.com/article-home-garden.html',
    summary: 'Beer-guri 5 sanduuq — salad, basbaas, yaanyo, geedo udgoon balcoonka ku korta.',
    keywords: ['beer guri','home garden','khudaar','balcony','urban','reer'] },
  { slug: 'vertical-farming', cat: 'tech',
    title: 'Beerista Taalka — Vertical Farming', url: 'https://beylood.com/article-vertical-farming.html',
    summary: 'Vertical farming magaalo — 90% biyo yar, container 20ft = $15K–$25K bilow.',
    keywords: ['vertical','taalka','hydroponic','aeroponic','aquaponic','magaalo'] },
  { slug: 'precision-agriculture', cat: 'tech',
    title: 'Precision Agriculture', url: 'https://beylood.com/article-precision-agriculture.html',
    summary: 'GPS, drones, soil sensors — beer-tig casri ah oo dakhliga kor u qaada.',
    keywords: ['precision','drone','gps','sensor','tignoolaji'] },
  { slug: 'organic-farming', cat: 'tech',
    title: 'Beerista Dabiici', url: 'https://beylood.com/article-organic-farming.html',
    summary: 'Beero dabiici ah — compost, neem, no synthetic chemicals.',
    keywords: ['organic','dabiici','compost','neem'] },
  { slug: 'food-security', cat: 'tech',
    title: 'Amniga Cuntada Soomaaliya', url: 'https://beylood.com/article-food-security.html',
    summary: 'Amniga cuntada — saamiga FAO, IPC phases, ka dhig dabacsanaan.',
    keywords: ['amniga','food security','ipc','fao'] },
  { slug: '10-lessons-farmers', cat: 'crops',
    title: '10 Cashar oo Loo Gudbinayo Beeralayda Cusub', url: 'https://beylood.com/article-10-lessons-farmers.html',
    summary: '10 cashar muhim ah oo loogu talagalay beeralayda cusub Soomaaliya.',
    keywords: ['cashar','lessons','bilow','beginner','new farmer'] },
  { slug: 'preventing-tomato-diseases', cat: 'pests',
    title: 'Hortaagga Cudurada Yaanyada', url: 'https://beylood.com/article-preventing-tomato-diseases.html',
    summary: 'Yaanyo cudur ka hortagis — 5 tallaabo, rotation, spacing, drip.',
    keywords: ['yaanyo cudur','tomato disease','prevention'] },
  { slug: 'agroforestry', cat: 'climate',
    title: 'Agroforestry — Beero iyo Geedo', url: 'https://beylood.com/article-agroforestry.html',
    summary: 'Geedo + dalag isku darsan — hadhdho, biyo, dakhli labalaab.',
    keywords: ['agroforestry','geed','tree','hadhdho','windbreak'] },

  // ---- Irrigation ----
  { slug: 'drip-irrigation', cat: 'irrigation',
    title: 'Drip Irrigation', url: 'https://beylood.com/article-drip-irrigation.html',
    summary: 'Drip — 40–60% biyaha keydi, kit yar $200–$500/dunyad.',
    keywords: ['drip','waraab','irrigation','biyo'] },
  { slug: 'rainwater-harvesting', cat: 'irrigation',
    title: 'Biyo-keydinta Roobka', url: 'https://beylood.com/article-rainwater-harvesting.html',
    summary: 'Biyo roobka uruurin — berked, godad zai, tank plastig.',
    keywords: ['rainwater','roob','berked','biyo keyd'] },
  { slug: 'irrigation-scheduling', cat: 'irrigation',
    title: 'Jadwalka Waraabka', url: 'https://beylood.com/article-irrigation-scheduling.html',
    summary: 'Jadwalka waraab — pH meter, sensor, kalendarka biyaha bisha.',
    keywords: ['jadwal','schedule','timing','sensor'] },

  // ---- Soil ----
  { slug: 'composting', cat: 'soil',
    title: 'Compost — Bacrin Dabiici', url: 'https://beylood.com/article-composting.html',
    summary: 'Compost samee — 3 bilood, 30:1 C:N ratio, $0 kharash.',
    keywords: ['compost','bacrin','kombost','manure','digo'] },
  { slug: 'cover-crops', cat: 'soil',
    title: 'Cover Crops', url: 'https://beylood.com/article-cover-crops.html',
    summary: 'Dalag dabool — clover, cowpea, ciid bacrin u kordhi.',
    keywords: ['cover crops','dabool','clover','cowpea'] },
  { slug: 'soil-testing', cat: 'soil',
    title: 'Baadhitaan Ciid', url: 'https://beylood.com/article-soil-testing.html',
    summary: 'pH, N-P-K test — kit $15, sannadkii laba jeer.',
    keywords: ['soil test','ph','nitrogen','baadh ciid'] },

  // ---- Climate ----
  { slug: 'drought-tolerant-crops', cat: 'climate',
    title: 'Dalagga Abaaraha Adkaysi u Leh', url: 'https://beylood.com/article-drought-tolerant-crops.html',
    summary: 'Masaggu, sorghum, pearl millet, cowpea — dalagga abaaraha.',
    keywords: ['abaar','drought','sorghum','masaggu','cowpea'] },
  { slug: 'weather-monitoring', cat: 'climate',
    title: 'Daawashada Cimilada', url: 'https://beylood.com/article-weather-monitoring.html',
    summary: 'SWALIM, FAO, ICPAC — sida loo isticmaalo saadaalka cimilada.',
    keywords: ['cimilo','weather','swalim','fao','saadaal'] },

  // ---- Livestock ----
  { slug: 'dairy-cattle', cat: 'livestock',
    title: 'Lo\'da Caanaha', url: 'https://beylood.com/article-dairy-cattle.html',
    summary: 'Lo\'da caanaha — 15–25L/maalin, daryeel, raashin, suuq.',
    keywords: ['lo','caano','dairy','milk','cattle'] },
  { slug: 'beef-cattle', cat: 'livestock',
    title: 'Lo\'da Hilibka', url: 'https://beylood.com/article-beef-cattle.html',
    summary: 'Lo\' hilib — Boran, Sahiwal, daaqsin + qabato.',
    keywords: ['hilib','beef','lo','cattle','boran'] },
  { slug: 'goats-sheep', cat: 'livestock',
    title: 'Riyo iyo Ido', url: 'https://beylood.com/article-goats-sheep.html',
    summary: 'Riyo & ido — Khaliij export, $80–$150/lo, breeds dhalaylaha.',
    keywords: ['riyo','ido','goat','sheep','small ruminant'] },
  { slug: 'poultry-farming', cat: 'livestock',
    title: 'Digaagga', url: 'https://beylood.com/article-poultry-farming.html',
    summary: 'Digaag layer & broiler — 6 toddobaad ilaa cooyada, $5–$8 dakhli/qof.',
    keywords: ['digaag','poultry','chicken','layer','broiler'] },
  { slug: 'camel-husbandry', cat: 'livestock',
    title: 'Geela', url: 'https://beylood.com/article-camel-husbandry.html',
    summary: 'Geel — caano, hilib, sumcad dhaqameedka Soomaaliyeed.',
    keywords: ['geel','camel'] },

  // ---- Pests ----
  { slug: 'fall-armyworm', cat: 'pests',
    title: 'Fall Armyworm', url: 'https://beylood.com/pest-fall-armyworm.html',
    summary: 'Fall Armyworm galleyda — biological + monitoring + early action.',
    keywords: ['armyworm','faw','galley pest','diirka'] },
  { slug: 'whiteflies', cat: 'pests',
    title: 'Whiteflies', url: 'https://beylood.com/pest-whiteflies.html',
    summary: 'Whiteflies yaanyada — TYLCV virus, sticky traps, neem oil.',
    keywords: ['whitefly','whiteflies','duqsi cad','tylcv'] },
  { slug: 'aphids', cat: 'pests',
    title: 'Aphids', url: 'https://beylood.com/pest-aphids.html',
    summary: 'Aphids — soapy water spray, ladybugs, neem.',
    keywords: ['aphid','aphids','cayayaan','sangabe'] },

  // ---- Diseases ----
  { slug: 'early-blight', cat: 'pests',
    title: 'Early Blight', url: 'https://beylood.com/disease-early-blight.html',
    summary: 'Early blight yaanyo/baradho — mancozeb, rotation, sanitation.',
    keywords: ['early blight','cudur','mancozeb','caleemo'] },
  { slug: 'late-blight', cat: 'pests',
    title: 'Late Blight', url: 'https://beylood.com/disease-late-blight.html',
    summary: 'Late blight — copper, resistant varieties, drip not overhead.',
    keywords: ['late blight','baradho','potato'] },
  { slug: 'powdery-mildew', cat: 'pests',
    title: 'Powdery Mildew', url: 'https://beylood.com/disease-powdery-mildew.html',
    summary: 'Powdery mildew — milk spray 1:9, sulfur, baking soda.',
    keywords: ['powdery','mildew','fangaska','caleemo cad'] },
  { slug: 'root-rot', cat: 'pests',
    title: 'Root Rot', url: 'https://beylood.com/disease-root-rot.html',
    summary: 'Root rot — drainage, biofungicides, lol oo ka fogow biyo-jiifsi.',
    keywords: ['root rot','xidid','qudhmin','fungus'] },

  // ---- News (current) ----
  { slug: 'news-11', cat: 'news',
    title: 'Digniinta Ayaxa Juun 2026', url: 'https://beylood.com/news-11.html',
    summary: 'FAO + DLCO-EA: ayax cusub Sanaag/Bari — hotline +252 615 555 444.',
    keywords: ['ayax','locust','digniin','alert','dlco','fao'] },
  { slug: 'news-10', cat: 'news',
    title: 'Saadaalka Deyr 2026', url: 'https://beylood.com/news-10.html',
    summary: 'Deyr Okt–Dec roob caadi — Koonfur +5%, Waqooyi -10%.',
    keywords: ['deyr','saadaal','roob','swalim','forecast'] }
];

// Lightweight scorer: how many keywords from `query` match this article
export function rankArticles(query, max) {
  max = max || 4;
  const q = String(query || '').toLowerCase();
  if (!q) return [];
  const scored = ARTICLES.map(a => {
    let score = 0;
    a.keywords.forEach(k => { if (q.includes(k.toLowerCase())) score += 2; });
    if (q.includes(a.title.toLowerCase().slice(0, 12))) score += 3;
    if (q.includes(a.slug.replace(/-/g, ' '))) score += 2;
    return { article: a, score };
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score);
  return scored.slice(0, max).map(x => x.article);
}
