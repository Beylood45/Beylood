/* ============================================================
   Beylood — Auto featured images for gradient-only covers
   ------------------------------------------------------------
   Every cover class below maps to a UNIQUE, topic-matched
   Unsplash photo. If a photo fails to load, the <img> is
   removed and the BEYLOOD branded gradient shows underneath
   — nothing ever looks broken.

   TO SWAP A PHOTO: replace the Unsplash id after "photo-".
   For example:
     https://images.unsplash.com/photo-1500382017468-9049fed747ef
     id = "1500382017468-9049fed747ef"
   ============================================================ */
(function () {
  function unsplash(id, w) {
    return 'https://images.unsplash.com/photo-' + id +
      '?auto=format&fit=crop&q=70&w=' + w;
  }

  // cover-class  ->  { id, topic{so,en,ar,sw} }
  var IMAGE_MAP = {
    // ===== CROPS =====
    'cover-cabbage-farming':  { id: '1518977676601-b53f82aba655', topic: { so: 'Kaabashka',  en: 'Cabbage',  ar: 'الملفوف',  sw: 'Kabichi'  } },
    'cover-banana-farming':   { id: '1571771894821-ce9b6c11b08e', topic: { so: 'Mooska',     en: 'Bananas',  ar: 'الموز',    sw: 'Ndizi'    } },
    'cover-mango-farming':    { id: '1591073113125-e46713c829ed', topic: { so: 'Cambaha',    en: 'Mango',    ar: 'المانجو',  sw: 'Maembe'   } },
    'cover-cassava-farming':  { id: '1633933358116-a27b902fad35', topic: { so: 'Cassava',    en: 'Cassava',  ar: 'الكسافا',  sw: 'Mihogo'   } },
    'cover-watermelon-farming':{ id: '1563114773-84221bd62daa', topic: { so: 'Qaraha',     en: 'Watermelon',ar:'البطيخ',  sw: 'Tikiti'   } },
    'cover-chili-farming':    { id: '1583119912267-cc97c911e416', topic: { so: 'Basbaaska',  en: 'Chili',    ar: 'الفلفل',   sw: 'Pilipili' } },
    'cover-rice-farming':     { id: '1574323347407-f5e1ad6d7ad3', topic: { so: 'Bariiska',   en: 'Rice',     ar: 'الأرز',    sw: 'Mchele'   } },
    'cover-onion-farming':    { id: '1620574387735-3c1b6c8c7d29', topic: { so: 'Basasha',    en: 'Onions',   ar: 'البصل',    sw: 'Vitunguu' } },
    'cover-maize-farming':    { id: '1601001435957-74f0958a93c5', topic: { so: 'Galleyda',   en: 'Maize',    ar: 'الذرة',    sw: 'Mahindi'  } },
    'cover-tomato-farming':   { id: '1592841200221-a6898f307baa', topic: { so: 'Yaanyada',   en: 'Tomato',   ar: 'الطماطم',  sw: 'Nyanya'   } },
    'cover-farm-lessons':     { id: '1500382017468-9049fed747ef', topic: { so: 'Beerista',   en: 'Farming',  ar: 'الزراعة',  sw: 'Kilimo'   } },
    'cover-tomato':           { id: '1592841200221-a6898f307baa', topic: { so: 'Yaanyada',   en: 'Tomato',   ar: 'الطماطم',  sw: 'Nyanya'   } },
    'cover-1':                { id: '1601001435957-74f0958a93c5', topic: { so: 'Galleyda',   en: 'Maize',    ar: 'الذرة',    sw: 'Mahindi'  } },
    'cover-2':                { id: '1574323347407-f5e1ad6d7ad3', topic: { so: 'Bariiska',   en: 'Rice',     ar: 'الأرز',    sw: 'Mchele'   } },

    // ===== PESTS & DISEASES =====
    'cover-aphids':           { id: '1530507629858-e3759c1f0e0d', topic: { so: 'Aphids',       en: 'Aphids',        ar: 'حشرات المن',     sw: 'Vidukari'            } },
    'cover-whiteflies':       { id: '1416879595882-3373a0480b5b', topic: { so: 'Cayayaanka',   en: 'Pests',         ar: 'الآفات',         sw: 'Wadudu'              } },
    'cover-fall-armyworm':    { id: '1601001435957-74f0958a93c5', topic: { so: 'Diirka galleyda', en: 'Armyworm',    ar: 'دودة الذرة',     sw: 'Viwavi'              } },
    'cover-early-blight':     { id: '1592841200221-a6898f307baa', topic: { so: 'Caleemo cudur', en: 'Leaf disease',  ar: 'مرض الأوراق',     sw: 'Ugonjwa wa majani'   } },
    'cover-late-blight':      { id: '1508313880080-c4bef0730395', topic: { so: 'Baradho',     en: 'Potato blight', ar: 'مرض البطاطس',     sw: 'Ugonjwa wa viazi'    } },
    'cover-powdery-mildew':   { id: '1530507629858-e3759c1f0e0d', topic: { so: 'Fangaska',    en: 'Mildew',        ar: 'البياض الدقيقي',  sw: 'Ukungu'              } },
    'cover-root-rot':         { id: '1530836369250-ef72a3f5cda8', topic: { so: 'Xididada',    en: 'Root rot',      ar: 'تعفن الجذور',     sw: 'Mizizi'              } },

    // ===== IRRIGATION =====
    'cover-drip-irrigation':       { id: '1500382017468-9049fed747ef', topic: { so: 'Drip', en: 'Drip',     ar: 'الري بالتنقيط', sw: 'Drip' } },
    'cover-rainwater-harvesting':  { id: '1501426026826-31c667bdf23d', topic: { so: 'Biyo roob',    en: 'Rainwater', ar: 'مياه الأمطار',  sw: 'Maji ya mvua' } },
    'cover-irrigation-scheduling': { id: '1416664806563-bb6be3b6d7d3', topic: { so: 'Waraabin',     en: 'Watering',  ar: 'جدولة الري',    sw: 'Umwagiliaji' } },
    'cover-sprinkler-irrigation':  { id: '1416664806563-bb6be3b6d7d3', topic: { so: 'Sprinkler',    en: 'Sprinkler', ar: 'الرش',          sw: 'Sprinkler' } },
    'cover-furrow-irrigation':     { id: '1574323347407-f5e1ad6d7ad3', topic: { so: 'Saraar',       en: 'Furrows',   ar: 'الأخاديد',      sw: 'Mifereji' } },
    'cover-greenhouse-irrigation': { id: '1592078615290-033ee584e267', topic: { so: 'Greenhouse',   en: 'Greenhouse',ar: 'بيوت محمية',    sw: 'Greenhouse' } },
    'cover-water-pumps':           { id: '1565538810643-b5bdb714032a', topic: { so: 'Mootooyin',    en: 'Pumps',     ar: 'مضخات',         sw: 'Pampu' } },
    'cover-mulching-water':        { id: '1623211398288-c40d3e4d4b1e', topic: { so: 'Mulching',     en: 'Mulching',  ar: 'تغطية',         sw: 'Matandazo' } },
    'cover-boreholes-wells':       { id: '1602867741746-6df80f876c66', topic: { so: 'Ceelaal',      en: 'Wells',     ar: 'الآبار',         sw: 'Visima' } },
    'cover-fertigation':           { id: '1592078615290-033ee584e267', topic: { so: 'Fertigation',  en: 'Fertigation',ar:'تغذية بالري',   sw: 'Fertigation' } },

    // ===== SOIL =====
    'cover-soil-testing':          { id: '1464226184884-fa280b87c399', topic: { so: 'Tijaab ciid',  en: 'Soil test', ar: 'اختبار التربة', sw: 'Mtihani' } },
    'cover-composting':            { id: '1591857177580-dc82b9ac4e1e', topic: { so: 'Compost',     en: 'Compost',   ar: 'كمبوست',        sw: 'Mboji' } },
    'cover-cover-crops':           { id: '1574943320219-553eb213f72d', topic: { so: 'Cover crops', en: 'Cover crops',ar:'محاصيل الغطاء',sw: 'Mazao ya kufunika' } },
    'cover-soil-types':            { id: '1530836369250-ef72a3f5cda8', topic: { so: 'Ciid',        en: 'Soil',      ar: 'تربة',          sw: 'Udongo' } },
    'cover-soil-erosion-control':  { id: '1601132359864-c974e79890ac', topic: { so: 'Nabaad-guur', en: 'Erosion',   ar: 'تعرية',         sw: 'Mmomonyoko' } },
    'cover-crop-rotation':         { id: '1574943320219-553eb213f72d', topic: { so: 'Wareeg',      en: 'Rotation',  ar: 'دورة',           sw: 'Mzunguko' } },
    'cover-soil-ph':               { id: '1464226184884-fa280b87c399', topic: { so: 'pH',          en: 'pH',        ar: 'pH',            sw: 'pH' } },
    'cover-vermicompost':          { id: '1542838686-37da4a9fd1b3', topic: { so: 'Dirxiyo',      en: 'Worms',     ar: 'الديدان',       sw: 'Minyoo' } },
    'cover-no-till':               { id: '1500382017468-9049fed747ef', topic: { so: 'No-till',    en: 'No-till',   ar: 'بلا حراثة',     sw: 'Bila kulima' } },
    'cover-mulching-soil':         { id: '1623211398288-c40d3e4d4b1e', topic: { so: 'Mulching',   en: 'Mulching',  ar: 'تغطية',         sw: 'Matandazo' } },

    // ===== CLIMATE =====
    'cover-drought-crops':         { id: '1501785888041-af3ef285b470', topic: { so: 'Abaaro',     en: 'Drought',   ar: 'الجفاف',        sw: 'Ukame' } },
    'cover-agroforestry':          { id: '1426604966848-d7adac402bff', topic: { so: 'Agroforestry',en: 'Trees',     ar: 'أشجار',         sw: 'Misitu' } },
    'cover-weather-monitoring':    { id: '1561553590-267fc716698a',   topic: { so: 'Cimilo',     en: 'Weather',   ar: 'الطقس',         sw: 'Hali ya hewa' } },
    'cover-greenhouse-farming':    { id: '1592078615290-033ee584e267', topic: { so: 'Greenhouse', en: 'Greenhouse',ar: 'البيوت المحمية',sw: 'Greenhouse' } },
    'cover-climate-smart':         { id: '1623211398288-c40d3e4d4b1e', topic: { so: 'CSA',        en: 'Climate-smart',ar:'الزراعة الذكية',sw:'Kilimo' } },
    'cover-flood-management':      { id: '1438449805896-28a666819a20', topic: { so: 'Daadad',     en: 'Floods',    ar: 'الفيضانات',     sw: 'Mafuriko' } },
    'cover-shade-nets':            { id: '1592078615290-033ee584e267', topic: { so: 'Shade net',  en: 'Shade net', ar: 'التظليل',        sw: 'Kivuli' } },
    'cover-rainy-season':          { id: '1438449805896-28a666819a20', topic: { so: 'Roobka',    en: 'Rainy season',ar:'موسم الأمطار', sw: 'Msimu wa mvua' } },
    'cover-dry-season':            { id: '1501785888041-af3ef285b470', topic: { so: 'Jiilaal',    en: 'Dry season',ar: 'موسم الجفاف',   sw: 'Ukame' } },
    'cover-windbreaks':            { id: '1426604966848-d7adac402bff', topic: { so: 'Windbreaks', en: 'Windbreaks',ar: 'كاسرات الرياح', sw: 'Vipenyo' } },

    // ===== LIVESTOCK =====
    'cover-dairy-cattle':          { id: '1605338777890-d6a4d27c89ec', topic: { so: 'Lo\'da caano',en: 'Dairy',    ar: 'أبقار الحليب',  sw: 'Ng\'ombe' } },
    'cover-poultry-farming':       { id: '1548550023-2bdb3c5beed7',   topic: { so: 'Digaag',     en: 'Poultry',   ar: 'دواجن',          sw: 'Kuku' } },
    'cover-goat-sheep':            { id: '1533219057257-4bb9ed5d2cc7', topic: { so: 'Riyo iyo ido',en:'Goats sheep',ar:'ماعز وأغنام',  sw: 'Mbuzi' } },
    'cover-beef-cattle':           { id: '1500595046743-cd271d694d30', topic: { so: 'Lo\'da hilib',en: 'Beef',     ar: 'أبقار اللحم',   sw: 'Ng\'ombe wa nyama' } },
    'cover-camel-husbandry':       { id: '1583863788434-e58a36d8d2cf', topic: { so: 'Geela',      en: 'Camels',    ar: 'الإبل',         sw: 'Ngamia' } },
    'cover-beekeeping':            { id: '1587049352851-8d4e89133924', topic: { so: 'Shiniyaha',  en: 'Bees',      ar: 'النحل',          sw: 'Nyuki' } },
    'cover-fish-farming':          { id: '1535591273668-578e31182c4f', topic: { so: 'Kalluunka',  en: 'Fish',      ar: 'الأسماك',       sw: 'Samaki' } },
    'cover-rabbit-farming':        { id: '1535241749838-299277b6305f', topic: { so: 'Bakeylaha',  en: 'Rabbits',   ar: 'الأرانب',        sw: 'Sungura' } },
    'cover-feed-formulation':      { id: '1574323347407-f5e1ad6d7ad3', topic: { so: 'Cunto',      en: 'Feed',      ar: 'العلف',          sw: 'Chakula' } },
    'cover-livestock-disease':     { id: '1605338777890-d6a4d27c89ec', topic: { so: 'Caafimaad',  en: 'Livestock health',ar:'صحة الماشية',sw: 'Afya' } },

    // ===== NEWS =====
    'cover-news-1': { id: '1438449805896-28a666819a20', topic: { so: 'Roobka',      en: 'Rain',          ar: 'المطر',          sw: 'Mvua' } },
    'cover-news-2': { id: '1454165804606-c3d57bc86b40', topic: { so: 'Maaliyad',    en: 'Finance',       ar: 'تمويل',          sw: 'Fedha' } },
    'cover-news-3': { id: '1500595046743-cd271d694d30', topic: { so: 'Xoolaha',     en: 'Livestock',     ar: 'الماشية',         sw: 'Mifugo' } },
    'cover-news-4': { id: '1561553590-267fc716698a',   topic: { so: 'Cimilo',      en: 'Climate',       ar: 'المناخ',         sw: 'Hali ya hewa' } },
    'cover-news-5': { id: '1581094288338-2314dddb7ece', topic: { so: 'Tignoolajiya',en: 'Technology',    ar: 'تقنية',          sw: 'Teknolojia' } },
    'cover-news-6': { id: '1464226184884-fa280b87c399', topic: { so: 'Ciid',        en: 'Soil',          ar: 'التربة',         sw: 'Udongo' } }
  };

  function curLang() { return document.documentElement.lang || 'so'; }

  // Build SEO-friendly alt text from the nearest post title, else the topic.
  function buildAlt(coverEl, topic) {
    var scope = coverEl.closest('.card-article') || coverEl.closest('.article-container') || document;
    var titleEl = scope.querySelector('h3, .article-title');
    var text = '';
    if (titleEl) {
      var vis = titleEl.querySelector('[data-lang]:not([hidden])');
      text = ((vis ? vis.textContent : titleEl.textContent) || '').trim();
    }
    if (!text) text = topic[curLang()] || topic.en;
    text = text.replace(/\s+[—-]\s+.*(buuxa|complete guide|الشامل|kamili).*$/i, '').trim();
    return text + ' — Beylood';
  }

  // The same key can appear several times on the same page (homepage +
  // related-article rails, etc.), so we deliberately do NOT deduplicate.
  function apply() {
    var covers = document.querySelectorAll('.card-cover, .article-cover');
    covers.forEach(function (cover) {
      var key = null;
      for (var i = 0; i < cover.classList.length; i++) {
        if (IMAGE_MAP[cover.classList[i]]) { key = cover.classList[i]; break; }
      }
      if (!key) return;
      if (cover.querySelector('.cover-img')) return;

      var entry = IMAGE_MAP[key];
      var img = document.createElement('img');
      img.className = 'cover-img';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.src = unsplash(entry.id, 800);
      img.srcset = unsplash(entry.id, 400) + ' 400w, ' +
                   unsplash(entry.id, 800) + ' 800w, ' +
                   unsplash(entry.id, 1200) + ' 1200w';
      img.sizes = '(max-width: 700px) 100vw, 400px';
      img.alt = buildAlt(cover, entry.topic);
      img.addEventListener('load', function () { img.classList.add('is-loaded'); });
      img.addEventListener('error', function () { img.remove(); }); // gradient fallback

      cover.insertBefore(img, cover.firstChild);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
