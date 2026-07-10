/* ============================================================
   Beylood — Auto featured images
   ------------------------------------------------------------
   ALL images live in ONE folder: assets/images/<slug>.jpg
   No subfolders. Drop a JPG named after the slug and it appears.
   If missing, the BEYLOOD branded gradient shows underneath.
   ============================================================ */
(function () {
  var BASE = 'assets/images/';

  // slug → { file: filename without folder, topic: {so,en,ar,sw} }
  var IMAGE_MAP = {
    // ---------- Crops & farming ----------
    'cover-home-garden':              { file: 'home-garden.jpg',              topic: { so: "Beer-Guri",        en: "Home Garden",       ar: "حديقة منزلية",       sw: "Bustani ya Nyumbani" } },
    'cover-greenhouse-farming':       { file: 'greenhouse-farming.jpg',       topic: { so: "Greenhouse",       en: "Greenhouse",        ar: "البيوت المحمية",     sw: "Greenhouse" } },
    'cover-vertical-farming':         { file: 'vertical-farming.jpg',         topic: { so: "Beerista Taalka",  en: "Vertical Farming",  ar: "الزراعة العمودية",   sw: "Kilimo Wima" } },
    'cover-organic-farming':          { file: 'organic-farming.jpg',          topic: { so: "Beerista Dabiici", en: "Organic Farming",   ar: "الزراعة العضوية",    sw: "Kilimo Asili" } },
    'cover-food-security':            { file: 'food-security.jpg',            topic: { so: "Amniga Cuntada",   en: "Food Security",     ar: "الأمن الغذائي",     sw: "Usalama wa Chakula" } },
    'cover-precision-agriculture':    { file: 'precision-agriculture.jpg',    topic: { so: "Precision Ag",     en: "Precision Ag",      ar: "الزراعة الدقيقة",   sw: "Precision Ag" } },
    'cover-cabbage-farming':          { file: 'cabbage-farming.jpg',          topic: { so: "Kaabashka",        en: "Cabbage",           ar: "الملفوف",            sw: "Kabichi" } },
    'cover-banana-farming':           { file: 'banana-farming.jpg',           topic: { so: "Mooska",           en: "Bananas",           ar: "الموز",              sw: "Ndizi" } },
    'cover-mango-farming':            { file: 'mango-farming.jpg',            topic: { so: "Cambaha",          en: "Mango",             ar: "المانجو",            sw: "Maembe" } },
    'cover-cassava-farming':          { file: 'cassava-farming.jpg',          topic: { so: "Cassava",          en: "Cassava",           ar: "الكسافا",            sw: "Mihogo" } },
    'cover-watermelon-farming':       { file: 'watermelon-farming.jpg',       topic: { so: "Qaraha",           en: "Watermelon",        ar: "البطيخ",             sw: "Tikiti" } },
    'cover-chili-farming':            { file: 'chili-farming.jpg',            topic: { so: "Basbaaska",        en: "Chili",             ar: "الفلفل",             sw: "Pilipili" } },
    'cover-rice-farming':             { file: 'rice-farming.jpg',             topic: { so: "Bariiska",         en: "Rice",              ar: "الأرز",              sw: "Mchele" } },
    'cover-onion-farming':            { file: 'onion-farming.jpg',            topic: { so: "Basasha",          en: "Onions",            ar: "البصل",              sw: "Vitunguu" } },
    'cover-maize-farming':            { file: 'maize-farming.jpg',            topic: { so: "Galleyda",         en: "Maize",             ar: "الذرة",              sw: "Mahindi" } },
    'cover-sorghum-farming':          { file: 'sorghum-farming.jpg',          topic: { so: "Masago",           en: "Sorghum",           ar: "الذرة الرفيعة",      sw: "Mtama" } },
    'cover-sesame-farming':           { file: 'sesame-farming.jpg',           topic: { so: "Simsim",           en: "Sesame",            ar: "السمسم",             sw: "Ufuta" } },
    'cover-cowpea-farming':           { file: 'cowpea-farming.jpg',           topic: { so: "Digir",            en: "Cowpea",            ar: "اللوبيا",            sw: "Kunde" } },
    'cover-date-farming':             { file: 'date-farming.jpg',             topic: { so: "Timir",            en: "Dates",             ar: "التمر",              sw: "Tende" } },
    'cover-potato-farming':           { file: 'potato-farming.jpg',           topic: { so: "Baradho",          en: "Potato",            ar: "البطاطس",            sw: "Viazi" } },
    'cover-ipm':                      { file: 'ipm.jpg',                      topic: { so: "IPM",              en: "IPM",               ar: "IPM",                sw: "IPM" } },
    'cover-post-harvest':             { file: 'post-harvest.jpg',             topic: { so: "Kayd",             en: "Post-Harvest",      ar: "ما بعد الحصاد",      sw: "Baada ya Mavuno" } },
    'cover-gap-guide':                { file: 'gap-guide.jpg',                topic: { so: "GAP",              en: "GAP Guide",         ar: "دليل GAP",           sw: "Mwongozo GAP" } },
    'cover-gap-worker-safety':        { file: 'gap-worker-safety.jpg',        topic: { so: "Badbaado",         en: "Worker Safety",     ar: "سلامة العمال",       sw: "Usalama" } },
    'cover-gap-agrochemicals':        { file: 'gap-agrochemicals.jpg',        topic: { so: "Kiimiko",          en: "Agrochemicals",     ar: "الكيماويات",         sw: "Kemikali" } },
    'cover-gap-water':                { file: 'gap-water.jpg',                topic: { so: "Biyaha",           en: "Water",             ar: "المياه",             sw: "Maji" } },
    'cover-gap-fertilizer':           { file: 'gap-fertilizer.jpg',           topic: { so: "Bacrin",           en: "Fertilizer",        ar: "التسميد",            sw: "Mbolea" } },
    'cover-gap-land':                 { file: 'gap-land.jpg',                 topic: { so: "Dhulka",           en: "Land & Soil",       ar: "الأرض والتربة",      sw: "Ardhi" } },
    'cover-gap-records':              { file: 'gap-records.jpg',              topic: { so: "Diiwaan",          en: "Records",           ar: "السجلات",            sw: "Kumbukumbu" } },
    'cover-tomato-farming':           { file: 'tomato-farming.jpg',           topic: { so: "Yaanyada",         en: "Tomato",            ar: "الطماطم",            sw: "Nyanya" } },
    'cover-tomato':                   { file: 'tomato-farming.jpg',           topic: { so: "Yaanyada",         en: "Tomato",            ar: "الطماطم",            sw: "Nyanya" } },
    'cover-preventing-tomato-diseases':{ file: 'preventing-tomato-diseases.jpg', topic: { so: "Cudur ka hortag", en: "Tomato disease prevention", ar: "وقاية الطماطم", sw: "Kuzuia magonjwa" } },
    'cover-farm-lessons':             { file: 'farm-lessons.jpg',             topic: { so: "Beerista",         en: "Farming",           ar: "الزراعة",            sw: "Kilimo" } },
    'cover-10-lessons-farmers':       { file: '10-lessons-farmers.jpg',       topic: { so: "10 Cashar",        en: "10 Lessons",        ar: "10 دروس",            sw: "Masomo 10" } },
    'cover-1':                        { file: 'maize-farming.jpg',            topic: { so: "Galleyda",         en: "Maize",             ar: "الذرة",              sw: "Mahindi" } },
    'cover-2':                        { file: 'rice-farming.jpg',             topic: { so: "Bariiska",         en: "Rice",              ar: "الأرز",              sw: "Mchele" } },

    // ---------- Pests ----------
    'cover-aphids':                   { file: 'aphids.jpg',                   topic: { so: "Aphids",           en: "Aphids",            ar: "حشرات المن",         sw: "Vidukari" } },
    'cover-whiteflies':               { file: 'whiteflies.jpg',               topic: { so: "Duqsiyaha Caddaan",en: "Whiteflies",        ar: "الذبابة البيضاء",    sw: "Inzi weupe" } },
    'cover-fall-armyworm':            { file: 'fall-armyworm.jpg',            topic: { so: "Diirka Galleyda",  en: "Fall Armyworm",     ar: "دودة الذرة",         sw: "Viwavi" } },

    // ---------- Diseases ----------
    'cover-early-blight':             { file: 'early-blight.jpg',             topic: { so: "Caleemo Cudur",    en: "Early Blight",      ar: "اللفحة المبكرة",    sw: "Baka Mapema" } },
    'cover-late-blight':              { file: 'late-blight.jpg',              topic: { so: "Baradho Cudur",    en: "Late Blight",       ar: "اللفحة المتأخرة",   sw: "Baka" } },
    'cover-powdery-mildew':           { file: 'powdery-mildew.jpg',           topic: { so: "Fangaska Cad",     en: "Powdery Mildew",    ar: "البياض الدقيقي",     sw: "Ukungu" } },
    'cover-root-rot':                 { file: 'root-rot.jpg',                 topic: { so: "Xididada Qudhuntay",en: "Root Rot",         ar: "تعفن الجذور",        sw: "Mizizi kuoza" } },

    // ---------- Irrigation ----------
    'cover-drip-irrigation':          { file: 'drip-irrigation.jpg',          topic: { so: "Drip",             en: "Drip Irrigation",   ar: "الري بالتنقيط",     sw: "Drip" } },
    'cover-rainwater-harvesting':     { file: 'rainwater-harvesting.jpg',     topic: { so: "Biyaha Roobka",    en: "Rainwater",         ar: "مياه الأمطار",       sw: "Maji ya mvua" } },
    'cover-irrigation-scheduling':    { file: 'irrigation-scheduling.jpg',    topic: { so: "Jadwal Waraab",    en: "Irrigation Sched",  ar: "جدولة الري",         sw: "Ratiba" } },
    'cover-sprinkler-irrigation':     { file: 'sprinkler-irrigation.jpg',     topic: { so: "Sprinkler",        en: "Sprinkler",         ar: "الرش",               sw: "Sprinkler" } },
    'cover-furrow-irrigation':        { file: 'furrow-irrigation.jpg',        topic: { so: "Saraar",           en: "Furrows",           ar: "الأخاديد",           sw: "Mifereji" } },
    'cover-greenhouse-irrigation':    { file: 'greenhouse-irrigation.jpg',    topic: { so: "Greenhouse",       en: "Greenhouse",        ar: "بيوت محمية",         sw: "Greenhouse" } },
    'cover-water-pumps':              { file: 'water-pumps.jpg',              topic: { so: "Mootooyin Biyo",   en: "Water Pumps",       ar: "مضخات",              sw: "Pampu" } },
    'cover-mulching-water':           { file: 'mulching-water.jpg',           topic: { so: "Mulching",         en: "Mulching",          ar: "التغطية",            sw: "Matandazo" } },
    'cover-boreholes-wells':          { file: 'boreholes-wells.jpg',          topic: { so: "Ceelaal",          en: "Wells",             ar: "الآبار",             sw: "Visima" } },
    'cover-fertigation':              { file: 'fertigation.jpg',              topic: { so: "Fertigation",      en: "Fertigation",       ar: "تغذية بالري",        sw: "Fertigation" } },

    // ---------- Soil ----------
    'cover-soil-testing':             { file: 'soil-testing.jpg',             topic: { so: "Tijaab Ciid",      en: "Soil Test",         ar: "اختبار التربة",      sw: "Mtihani wa udongo" } },
    'cover-composting':               { file: 'composting.jpg',               topic: { so: "Compost",          en: "Composting",        ar: "كمبوست",             sw: "Mboji" } },
    'cover-cover-crops':              { file: 'cover-crops.jpg',              topic: { so: "Cover Crops",      en: "Cover Crops",       ar: "محاصيل الغطاء",      sw: "Mazao kufunika" } },
    'cover-soil-types':               { file: 'soil-types.jpg',               topic: { so: "Noocyada Ciidda",  en: "Soil Types",        ar: "أنواع التربة",       sw: "Aina za udongo" } },
    'cover-soil-erosion-control':     { file: 'soil-erosion-control.jpg',     topic: { so: "Nabaadguur",       en: "Erosion Control",   ar: "تعرية التربة",       sw: "Mmomonyoko" } },
    'cover-crop-rotation':            { file: 'crop-rotation.jpg',            topic: { so: "Wareeg Dalag",     en: "Crop Rotation",     ar: "دورة المحاصيل",      sw: "Mzunguko" } },
    'cover-soil-ph':                  { file: 'soil-ph.jpg',                  topic: { so: "pH Ciidda",        en: "Soil pH",           ar: "pH التربة",          sw: "pH" } },
    'cover-vermicompost':             { file: 'vermicompost.jpg',             topic: { so: "Vermicompost",     en: "Worm Compost",      ar: "كمبوست الدود",       sw: "Mboji ya minyoo" } },
    'cover-no-till':                  { file: 'no-till.jpg',                  topic: { so: "No-till",          en: "No-till",           ar: "بلا حراثة",          sw: "Bila kulima" } },
    'cover-mulching-soil':            { file: 'mulching-soil.jpg',            topic: { so: "Mulching Ciid",    en: "Soil Mulching",     ar: "تغطية التربة",       sw: "Matandazo" } },

    // ---------- Climate ----------
    'cover-drought-crops':            { file: 'drought-crops.jpg',            topic: { so: "Dalagga Abaaraha", en: "Drought Crops",     ar: "محاصيل الجفاف",      sw: "Mazao ya ukame" } },
    'cover-agroforestry':             { file: 'agroforestry.jpg',             topic: { so: "Agroforestry",     en: "Agroforestry",      ar: "زراعة حرجية",        sw: "Misitu na kilimo" } },
    'cover-weather-monitoring':       { file: 'weather-monitoring.jpg',       topic: { so: "Cimilada",         en: "Weather",           ar: "رصد الطقس",          sw: "Hali ya hewa" } },
    'cover-greenhouse-farming':       { file: 'greenhouse-farming.jpg',       topic: { so: "Greenhouse",       en: "Greenhouse",        ar: "بيوت محمية",         sw: "Greenhouse" } },
    'cover-climate-smart':            { file: 'climate-smart.jpg',            topic: { so: "Climate-Smart",    en: "Climate-Smart",     ar: "الزراعة الذكية",     sw: "Stahimilivu" } },
    'cover-flood-management':         { file: 'flood-management.jpg',         topic: { so: "Daadad",           en: "Floods",            ar: "الفيضانات",          sw: "Mafuriko" } },
    'cover-shade-nets':               { file: 'shade-nets.jpg',               topic: { so: "Shade Net",        en: "Shade Net",         ar: "شبكة التظليل",       sw: "Kivuli" } },
    'cover-rainy-season':             { file: 'rainy-season.jpg',             topic: { so: "Xilliga Roobka",   en: "Rainy Season",      ar: "موسم الأمطار",       sw: "Msimu wa mvua" } },
    'cover-dry-season':               { file: 'dry-season.jpg',               topic: { so: "Jiilaalka",        en: "Dry Season",        ar: "موسم الجفاف",        sw: "Ukame" } },
    'cover-windbreaks':               { file: 'windbreaks.jpg',               topic: { so: "Windbreaks",       en: "Windbreaks",        ar: "كاسرات الرياح",      sw: "Vipenyo upepo" } },

    // ---------- Livestock ----------
    'cover-dairy-cattle':             { file: 'dairy-cattle.jpg',             topic: { so: "Lo'da Caanaha",    en: "Dairy Cattle",      ar: "أبقار الحليب",       sw: "Ng'ombe wa maziwa" } },
    'cover-poultry-farming':          { file: 'poultry-farming.jpg',          topic: { so: "Digaagga",         en: "Poultry",           ar: "الدواجن",            sw: "Kuku" } },
    'cover-goat-sheep':               { file: 'goat-sheep.jpg',               topic: { so: "Riyo & Ido",       en: "Goats & Sheep",     ar: "الماعز والأغنام",    sw: "Mbuzi na kondoo" } },
    'cover-goats-sheep':              { file: 'goats-sheep.jpg',              topic: { so: "Riyo & Ido",       en: "Goats & Sheep",     ar: "الماعز والأغنام",    sw: "Mbuzi na kondoo" } },
    'cover-beef-cattle':              { file: 'beef-cattle.jpg',              topic: { so: "Lo'da Hilibka",    en: "Beef Cattle",       ar: "أبقار اللحم",        sw: "Ng'ombe wa nyama" } },
    'cover-camel-husbandry':          { file: 'camel-husbandry.jpg',          topic: { so: "Geela",            en: "Camels",            ar: "الإبل",              sw: "Ngamia" } },
    'cover-beekeeping':               { file: 'beekeeping.jpg',               topic: { so: "Shiniyaha",        en: "Beekeeping",        ar: "تربية النحل",        sw: "Ufugaji wa nyuki" } },
    'cover-fish-farming':             { file: 'fish-farming.jpg',             topic: { so: "Kalluunka",        en: "Fish Farming",      ar: "تربية الأسماك",      sw: "Ufugaji wa samaki" } },
    'cover-rabbit-farming':           { file: 'rabbit-farming.jpg',           topic: { so: "Bakeylaha",        en: "Rabbit Farming",    ar: "تربية الأرانب",      sw: "Ufugaji wa sungura" } },
    'cover-feed-formulation':         { file: 'feed-formulation.jpg',         topic: { so: "Cuntada Xoolaha",  en: "Animal Feed",       ar: "علف الحيوانات",      sw: "Chakula cha mifugo" } },
    'cover-livestock-disease':        { file: 'livestock-disease.jpg',        topic: { so: "Caafimaad Xoolo",  en: "Vet Care",          ar: "صحة الماشية",        sw: "Afya ya mifugo" } },

    // ---------- News ----------
    'cover-news-1':                   { file: 'news-1.jpg',  topic: { so: "Roob",        en: "Rain News",     ar: "الأمطار",       sw: "Mvua" } },
    'cover-news-2':                   { file: 'news-2.jpg',  topic: { so: "Maaliyad",    en: "Finance",       ar: "تمويل",          sw: "Fedha" } },
    'cover-news-3':                   { file: 'news-3.jpg',  topic: { so: "Xoolaha",     en: "Livestock",     ar: "الماشية",        sw: "Mifugo" } },
    'cover-news-4':                   { file: 'news-4.jpg',  topic: { so: "Cimilada",    en: "Climate",       ar: "المناخ",         sw: "Hali ya hewa" } },
    'cover-news-5':                   { file: 'news-5.jpg',  topic: { so: "Tignoolaji",  en: "Technology",    ar: "التقنية",        sw: "Teknolojia" } },
    'cover-news-6':                   { file: 'news-6.jpg',  topic: { so: "Ciidda",      en: "Soil",          ar: "التربة",         sw: "Udongo" } },
    'cover-news-7':                   { file: 'news-7.jpg',  topic: { so: "Saadaal Gu'", en: "Gu Forecast",   ar: "توقعات الجو",   sw: "Utabiri" } },
    'cover-news-8':                   { file: 'news-8.jpg',  topic: { so: "Xajka",       en: "Hajj Export",   ar: "تصدير الحج",     sw: "Mauzo Hajj" } },
    'cover-news-9':                   { file: 'news-9.jpg',  topic: { so: "AI & Drones", en: "AI & Drones",   ar: "AI والطائرات",  sw: "AI na drones" } },
    'cover-news-10':                  { file: 'news-10.jpg', topic: { so: "Saadaal Deyr",en: "Deyr Forecast", ar: "توقعات الديري", sw: "Utabiri Deyr" } },
    'cover-news-11':                  { file: 'news-11.jpg', topic: { so: "Digniin Ayax",en: "Locust Alert",  ar: "تحذير الجراد",  sw: "Tahadhari ya Nzige" } },
    'cover-news-12':                  { file: 'news-12.jpg', topic: { so: "Dhoofin",     en: "Export",        ar: "التصدير",       sw: "Usafirishaji" } }
  };

  function curLang() { return document.documentElement.lang || 'so'; }

  function buildAlt(coverEl, topic) {
    var scope = coverEl.closest('.card-article') || coverEl.closest('.article-container') || document;
    var titleEl = scope.querySelector('h3, .article-title');
    var text = '';
    if (titleEl) {
      var vis = titleEl.querySelector('[data-lang]:not([hidden])');
      text = ((vis ? vis.textContent : titleEl.textContent) || '').trim();
    }
    if (!text) text = topic[curLang()] || topic.en;
    return text.replace(/\s+[—-]\s+.*(buuxa|complete guide|الشامل|kamili).*$/i, '').trim() + ' — Beylood';
  }

  function categoryFor(key) {
    if (/dairy|poultry|goat|sheep|cattle|beef|camel|fish|rabbit|bee|feed|livestock/.test(key)) return { v: 'livestock', ico: '🐄', tag: 'Xoolaha' };
    if (/irrigation|drip|sprinkler|furrow|borehole|water|rainwater|fertigation|greenhouse-irrig/.test(key)) return { v: 'irrigation', ico: '💧', tag: 'Waraabka' };
    if (/climate|weather|rainy|dry|drought|flood|windbreak|shade|agroforestry/.test(key)) return { v: 'climate', ico: '☁️', tag: 'Cimilada' };
    if (/soil|compost|cover-crop|no-till|mulching-soil|vermicompost|soil-test/.test(key)) return { v: 'soil', ico: '🌱', tag: 'Carrada' };
    if (/pest|disease|aphid|whitefly|blight|mildew|rot|armyworm|preventing/.test(key)) return { v: 'pests', ico: '🐛', tag: 'Cudurrada' };
    if (/news/.test(key)) return { v: 'news', ico: '📰', tag: 'Wararka' };
    if (/precision|organic|food-security|vertical-farming|crop-rotation/.test(key)) return { v: 'tech', ico: '🔬', tag: 'Tignoolajiyo' };
    return { v: 'crops', ico: '🌾', tag: 'Dalagga' };
  }

  function injectFallback(cover, entry, cat) {
    if (cover.querySelector('.cover-fallback')) return;
    var fb = document.createElement('div');
    fb.className = 'cover-fallback cover-fallback-' + cat.v;
    var topic = (entry && entry.topic && (entry.topic[curLang()] || entry.topic.en)) || cat.tag;
    fb.innerHTML =
      '<span class="cover-fb-ico" aria-hidden="true">' + cat.ico + '</span>' +
      '<span class="cover-fb-topic">' + topic.replace(/[<>]/g, '') + '</span>' +
      '<span class="cover-fb-brand">BEYLOOD</span>';
    cover.appendChild(fb);
  }

  function apply() {
    document.querySelectorAll('.card-cover, .article-cover').forEach(function (cover) {
      var key = null;
      for (var i = 0; i < cover.classList.length; i++) {
        if (IMAGE_MAP[cover.classList[i]]) { key = cover.classList[i]; break; }
        if (/^cover-/.test(cover.classList[i])) { key = key || cover.classList[i]; }
      }
      if (!key || cover.querySelector('img.cover-img')) return;
      var entry = IMAGE_MAP[key];
      var cat = categoryFor(key);

      // Always inject branded fallback first
      injectFallback(cover, entry, cat);

      // Try to load the real image
      if (entry && entry.file) {
        var img = document.createElement('img');
        img.className = 'cover-img';
        img.loading = 'lazy';
        img.decoding = 'async';
        img.src = BASE + entry.file;
        img.alt = buildAlt(cover, entry.topic);
        img.addEventListener('load', function () {
          img.classList.add('is-loaded');
          var fb = cover.querySelector('.cover-fallback');
          if (fb) fb.classList.add('is-behind');
        });
        img.addEventListener('error', function () { img.remove(); });
        cover.insertBefore(img, cover.firstChild);
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
})();
