/* ============================================================
   Beylood — Auto featured images (single local file per slug)
   ------------------------------------------------------------
   For every cover-class below, drop ONE image at the listed
   path:
       assets/images/<folder>/<slug>.jpg
   See IMAGE-CHECKLIST.md for the full filename list.

   If a file is missing, the BEYLOOD branded gradient shows
   underneath — nothing ever looks broken.
   ============================================================ */
(function () {
  var IMAGE_MAP = {
    'cover-precision-agriculture': { src: 'assets/images/articles/precision-agriculture.jpg', topic: { so: "Precision Ag", en: "Precision Agriculture", ar: "الزراعة الدقيقة", sw: "Precision Ag" } },
    'cover-organic-farming': { src: 'assets/images/articles/organic-farming.jpg', topic: { so: "Beerista Dabiici", en: "Organic", ar: "الزراعة العضوية", sw: "Kilimo Asili" } },
    'cover-food-security': { src: 'assets/images/articles/food-security.jpg', topic: { so: "Amniga Cuntada", en: "Food Security", ar: "الأمن الغذائي", sw: "Usalama wa Chakula" } },
    'cover-news-7': { src: 'assets/images/news/news-7-gu-forecast.jpg', topic: { so: "Saadaal roob", en: "Rain forecast", ar: "توقع الأمطار", sw: "Utabiri wa mvua" } },
    'cover-news-8': { src: 'assets/images/news/news-8-hajj-export.jpg', topic: { so: "Xajka", en: "Hajj export", ar: "تصدير الحج", sw: "Mauzo Hajj" } },
    'cover-news-9': { src: 'assets/images/news/news-9-ai-drones.jpg', topic: { so: "AI iyo drones", en: "AI and drones", ar: "AI والطائرات", sw: "AI na drones" } },
    'cover-news-10': { src: 'assets/images/news/news-10-deyr-forecast.jpg', topic: { so: "Saadaal Deyr", en: "Deyr forecast", ar: "توقعات الديري", sw: "Utabiri Deyr" } },
    'cover-news-11': { src: 'assets/images/news/news-11-locust-alert.jpg', topic: { so: "Digniin Ayax", en: "Locust Alert", ar: "تحذير الجراد", sw: "Tahadhari ya Nzige" } },
    'cover-vertical-farming': { src: 'assets/images/articles/vertical-farming.jpg', topic: { so: "Beerista Taalka", en: "Vertical Farming", ar: "الزراعة العمودية", sw: "Kilimo Wima" } },
    'cover-home-garden': { src: 'assets/images/articles/home-garden.jpg', topic: { so: "Beer-Guri", en: "Home Garden", ar: "حديقة منزلية", sw: "Bustani ya Nyumbani" } },
    'cover-cabbage-farming': { src: 'assets/images/articles/cabbage-farming.jpg', topic: { so: "Kaabashka", en: "Cabbage", ar: "الملفوف", sw: "Kabichi" } },
    'cover-banana-farming': { src: 'assets/images/articles/banana-farming.jpg', topic: { so: "Mooska", en: "Bananas", ar: "الموز", sw: "Ndizi" } },
    'cover-mango-farming': { src: 'assets/images/articles/mango-farming.jpg', topic: { so: "Cambaha", en: "Mango", ar: "المانجو", sw: "Maembe" } },
    'cover-cassava-farming': { src: 'assets/images/articles/cassava-farming.jpg', topic: { so: "Cassava", en: "Cassava", ar: "الكسافا", sw: "Mihogo" } },
    'cover-watermelon-farming': { src: 'assets/images/articles/watermelon-farming.jpg', topic: { so: "Qaraha", en: "Watermelon", ar: "البطيخ", sw: "Tikiti" } },
    'cover-chili-farming': { src: 'assets/images/articles/chili-farming.jpg', topic: { so: "Basbaaska", en: "Chili", ar: "الفلفل", sw: "Pilipili" } },
    'cover-rice-farming': { src: 'assets/images/articles/rice-farming.jpg', topic: { so: "Bariiska", en: "Rice", ar: "الأرز", sw: "Mchele" } },
    'cover-onion-farming': { src: 'assets/images/articles/onion-farming.jpg', topic: { so: "Basasha", en: "Onions", ar: "البصل", sw: "Vitunguu" } },
    'cover-maize-farming': { src: 'assets/images/articles/maize-farming.jpg', topic: { so: "Galleyda", en: "Maize", ar: "الذرة", sw: "Mahindi" } },
    'cover-tomato-farming': { src: 'assets/images/articles/tomato-farming.jpg', topic: { so: "Yaanyada", en: "Tomato", ar: "الطماطم", sw: "Nyanya" } },
    'cover-tomato': { src: 'assets/images/articles/tomato-farming.jpg', topic: { so: "Yaanyada", en: "Tomato", ar: "الطماطم", sw: "Nyanya" } },
    'cover-farm-lessons': { src: 'assets/images/articles/farm-lessons.jpg', topic: { so: "Beerista", en: "Farming", ar: "الزراعة", sw: "Kilimo" } },
    'cover-1': { src: 'assets/images/articles/maize-farming.jpg', topic: { so: "Galleyda", en: "Maize", ar: "الذرة", sw: "Mahindi" } },
    'cover-2': { src: 'assets/images/articles/rice-farming.jpg', topic: { so: "Bariiska", en: "Rice", ar: "الأرز", sw: "Mchele" } },
    'cover-aphids': { src: 'assets/images/covers/aphids.jpg', topic: { so: "Aphids", en: "Aphids", ar: "حشرات", sw: "Vidukari" } },
    'cover-whiteflies': { src: 'assets/images/covers/whiteflies.jpg', topic: { so: "Cayayaanka", en: "Whiteflies", ar: "ذبابة", sw: "Inzi" } },
    'cover-fall-armyworm': { src: 'assets/images/covers/fall-armyworm.jpg', topic: { so: "Diirka", en: "Armyworm", ar: "دودة الذرة", sw: "Viwavi" } },
    'cover-early-blight': { src: 'assets/images/covers/early-blight.jpg', topic: { so: "Caleemo cudur", en: "Early blight", ar: "لفحة مبكرة", sw: "Baka mapema" } },
    'cover-late-blight': { src: 'assets/images/covers/late-blight.jpg', topic: { so: "Baradho cudur", en: "Late blight", ar: "لفحة متأخرة", sw: "Baka" } },
    'cover-powdery-mildew': { src: 'assets/images/covers/powdery-mildew.jpg', topic: { so: "Fangaska", en: "Mildew", ar: "بياض دقيقي", sw: "Ukungu" } },
    'cover-root-rot': { src: 'assets/images/covers/root-rot.jpg', topic: { so: "Xididada", en: "Root rot", ar: "تعفن الجذور", sw: "Mizizi" } },
    'cover-drip-irrigation': { src: 'assets/images/covers/drip-irrigation.jpg', topic: { so: "Drip", en: "Drip", ar: "الري بالتنقيط", sw: "Drip" } },
    'cover-rainwater-harvesting': { src: 'assets/images/covers/rainwater-harvesting.jpg', topic: { so: "Biyaha roobka", en: "Rainwater", ar: "مياه الأمطار", sw: "Mvua" } },
    'cover-irrigation-scheduling': { src: 'assets/images/covers/irrigation-scheduling.jpg', topic: { so: "Jadwal waraab", en: "Scheduling", ar: "جدولة الري", sw: "Ratiba" } },
    'cover-sprinkler-irrigation': { src: 'assets/images/covers/sprinkler-irrigation.jpg', topic: { so: "Sprinkler", en: "Sprinkler", ar: "الرش", sw: "Sprinkler" } },
    'cover-furrow-irrigation': { src: 'assets/images/covers/furrow-irrigation.jpg', topic: { so: "Saraar", en: "Furrows", ar: "الأخاديد", sw: "Mifereji" } },
    'cover-greenhouse-irrigation': { src: 'assets/images/covers/greenhouse-irrigation.jpg', topic: { so: "Greenhouse", en: "Greenhouse", ar: "بيوت محمية", sw: "Greenhouse" } },
    'cover-water-pumps': { src: 'assets/images/covers/water-pumps.jpg', topic: { so: "Mootooyin", en: "Water pumps", ar: "مضخات", sw: "Pampu" } },
    'cover-mulching-water': { src: 'assets/images/covers/mulching-water.jpg', topic: { so: "Mulching", en: "Mulching", ar: "التغطية", sw: "Matandazo" } },
    'cover-boreholes-wells': { src: 'assets/images/covers/boreholes-wells.jpg', topic: { so: "Ceelaal", en: "Wells", ar: "الآبار", sw: "Visima" } },
    'cover-fertigation': { src: 'assets/images/covers/fertigation.jpg', topic: { so: "Fertigation", en: "Fertigation", ar: "تغذية بالري", sw: "Fertigation" } },
    'cover-soil-testing': { src: 'assets/images/covers/soil-testing.jpg', topic: { so: "Tijaab ciid", en: "Soil test", ar: "اختبار التربة", sw: "Mtihani" } },
    'cover-composting': { src: 'assets/images/covers/composting.jpg', topic: { so: "Compost", en: "Composting", ar: "كمبوست", sw: "Mboji" } },
    'cover-cover-crops': { src: 'assets/images/covers/cover-crops.jpg', topic: { so: "Cover crops", en: "Cover crops", ar: "محاصيل الغطاء", sw: "Mazao kufunika" } },
    'cover-soil-types': { src: 'assets/images/covers/soil-types.jpg', topic: { so: "Noocyada", en: "Soil types", ar: "أنواع التربة", sw: "Aina" } },
    'cover-soil-erosion-control': { src: 'assets/images/covers/soil-erosion-control.jpg', topic: { so: "Nabaad-guur", en: "Erosion", ar: "تعرية", sw: "Mmomonyoko" } },
    'cover-crop-rotation': { src: 'assets/images/covers/crop-rotation.jpg', topic: { so: "Wareeg", en: "Crop rotation", ar: "دورة المحاصيل", sw: "Mzunguko" } },
    'cover-soil-ph': { src: 'assets/images/covers/soil-ph.jpg', topic: { so: "pH ciidda", en: "Soil pH", ar: "pH التربة", sw: "pH" } },
    'cover-vermicompost': { src: 'assets/images/covers/vermicompost.jpg', topic: { so: "Vermicompost", en: "Worm compost", ar: "كمبوست الدود", sw: "Mboji minyoo" } },
    'cover-no-till': { src: 'assets/images/covers/no-till.jpg', topic: { so: "No-till", en: "No-till", ar: "بلا حراثة", sw: "Bila kulima" } },
    'cover-mulching-soil': { src: 'assets/images/covers/mulching-soil.jpg', topic: { so: "Mulching", en: "Mulching", ar: "تغطية", sw: "Matandazo" } },
    'cover-drought-crops': { src: 'assets/images/covers/drought-crops.jpg', topic: { so: "Abaaro", en: "Drought", ar: "الجفاف", sw: "Ukame" } },
    'cover-agroforestry': { src: 'assets/images/covers/agroforestry.jpg', topic: { so: "Agroforestry", en: "Agroforestry", ar: "حرجية", sw: "Misitu" } },
    'cover-weather-monitoring': { src: 'assets/images/covers/weather-monitoring.jpg', topic: { so: "Cimilo", en: "Weather", ar: "رصد الطقس", sw: "Hali ya hewa" } },
    'cover-greenhouse-farming': { src: 'assets/images/covers/greenhouse-farming.jpg', topic: { so: "Greenhouse", en: "Greenhouse", ar: "بيوت محمية", sw: "Greenhouse" } },
    'cover-climate-smart': { src: 'assets/images/covers/climate-smart.jpg', topic: { so: "CSA", en: "Climate-smart", ar: "الزراعة الذكية", sw: "Stahimilivu" } },
    'cover-flood-management': { src: 'assets/images/covers/flood-management.jpg', topic: { so: "Daadad", en: "Floods", ar: "الفيضانات", sw: "Mafuriko" } },
    'cover-shade-nets': { src: 'assets/images/covers/shade-nets.jpg', topic: { so: "Shade net", en: "Shade net", ar: "التظليل", sw: "Kivuli" } },
    'cover-rainy-season': { src: 'assets/images/covers/rainy-season.jpg', topic: { so: "Roobka", en: "Rainy season", ar: "موسم الأمطار", sw: "Mvua" } },
    'cover-dry-season': { src: 'assets/images/covers/dry-season.jpg', topic: { so: "Jiilaal", en: "Dry season", ar: "الجفاف", sw: "Ukame" } },
    'cover-windbreaks': { src: 'assets/images/covers/windbreaks.jpg', topic: { so: "Windbreaks", en: "Windbreaks", ar: "كاسرات", sw: "Vipenyo" } },
    'cover-dairy-cattle': { src: 'assets/images/covers/dairy-cattle.jpg', topic: { so: "Lo'da caano", en: "Dairy", ar: "أبقار الحليب", sw: "Ng'ombe maziwa" } },
    'cover-poultry-farming': { src: 'assets/images/covers/poultry-farming.jpg', topic: { so: "Digaag", en: "Poultry", ar: "دواجن", sw: "Kuku" } },
    'cover-goat-sheep': { src: 'assets/images/covers/goat-sheep.jpg', topic: { so: "Riyo & ido", en: "Goats sheep", ar: "ماعز وأغنام", sw: "Mbuzi" } },
    'cover-beef-cattle': { src: 'assets/images/covers/beef-cattle.jpg', topic: { so: "Lo'da hilib", en: "Beef", ar: "أبقار اللحم", sw: "Ng'ombe nyama" } },
    'cover-camel-husbandry': { src: 'assets/images/covers/camel-husbandry.jpg', topic: { so: "Geela", en: "Camels", ar: "الإبل", sw: "Ngamia" } },
    'cover-beekeeping': { src: 'assets/images/covers/beekeeping.jpg', topic: { so: "Shiniyaha", en: "Bees", ar: "النحل", sw: "Nyuki" } },
    'cover-fish-farming': { src: 'assets/images/covers/fish-farming.jpg', topic: { so: "Kalluunka", en: "Fish", ar: "الأسماك", sw: "Samaki" } },
    'cover-rabbit-farming': { src: 'assets/images/covers/rabbit-farming.jpg', topic: { so: "Bakeylaha", en: "Rabbits", ar: "الأرانب", sw: "Sungura" } },
    'cover-feed-formulation': { src: 'assets/images/covers/feed-formulation.jpg', topic: { so: "Cunto xoolaha", en: "Animal feed", ar: "علف", sw: "Chakula" } },
    'cover-livestock-disease': { src: 'assets/images/covers/livestock-disease.jpg', topic: { so: "Caafimaad", en: "Vet care", ar: "صحة الماشية", sw: "Afya" } },
    'cover-news-1': { src: 'assets/images/news/news-1-rainy-season.jpg', topic: { so: "Roob", en: "Rain news", ar: "الأمطار", sw: "Mvua" } },
    'cover-news-2': { src: 'assets/images/news/news-2-finance.jpg', topic: { so: "Maaliyad", en: "Finance", ar: "تمويل", sw: "Fedha" } },
    'cover-news-3': { src: 'assets/images/news/news-3-livestock.jpg', topic: { so: "Xoolo", en: "Livestock", ar: "ماشية", sw: "Mifugo" } },
    'cover-news-4': { src: 'assets/images/news/news-4-climate.jpg', topic: { so: "Cimilo", en: "Climate", ar: "المناخ", sw: "Hali ya hewa" } },
    'cover-news-5': { src: 'assets/images/news/news-5-technology.jpg', topic: { so: "Tignoolaji", en: "Tech", ar: "تقنية", sw: "Teknolojia" } },
    'cover-news-6': { src: 'assets/images/news/news-6-soil.jpg', topic: { so: "Ciid caafimaad", en: "Soil", ar: "التربة", sw: "Udongo" } }
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
    return text.replace(/\s+[\u2014-]\s+.*(buuxa|complete guide|\u0627\u0644\u0634\u0627\u0645\u0644|kamili).*$/i, '').trim() + ' \u2014 Beylood';
  }

  // Category → visual variant (color + emoji). Inferred from slug.
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

      // Always inject a designed fallback overlay first (visible until image loads)
      injectFallback(cover, entry, cat);

      // Try to load the real image. If it loads, hide the fallback. If it 404s, fallback stays.
      if (entry && entry.src) {
        var img = document.createElement('img');
        img.className = 'cover-img';
        img.loading = 'lazy';
        img.decoding = 'async';
        img.src = entry.src;
        img.alt = buildAlt(cover, entry.topic);
        img.addEventListener('load', function () {
          img.classList.add('is-loaded');
          var fb = cover.querySelector('.cover-fallback');
          if (fb) fb.classList.add('is-behind');
        });
        img.addEventListener('error', function () { img.remove(); }); // fallback stays
        cover.insertBefore(img, cover.firstChild);
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
})();
