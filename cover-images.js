/* ============================================================
   Beylood — Auto featured images for gradient-only covers
   ------------------------------------------------------------
   • Finds article/news covers that have no real photo (the ones
     using a branded gradient) and assigns a topic-matched photo.
   • Photos come from Unsplash (free + commercial use, no
     attribution required). Resized/cropped via URL params for
     fast loading; lazy-loaded; responsive via srcset.
   • Each topic maps to ONE distinct photo, so no two posts share
     an image (no duplicates).
   • If a photo fails to load, the <img> is removed and the
     original BEYLOOD gradient shows — so nothing ever looks broken.

   TO SWAP A PHOTO: change the Unsplash id in IMAGE_MAP below.
   An id is the part after "photo-" in an Unsplash image URL, e.g.
   https://images.unsplash.com/photo-1500382017468-9049fed747ef
   ============================================================ */
(function () {
  // Unsplash delivery params: auto format (webp), crop, quality 70.
  function unsplash(id, w) {
    return 'https://images.unsplash.com/photo-' + id +
      '?auto=format&fit=crop&q=70&w=' + w;
  }

  // cover-class -> { id, topic{so,en,ar,sw} } (topic is the alt-text fallback)
  var IMAGE_MAP = {
    // ----- Crops -----
    'cover-cabbage-farming':  { id: '1594282486552-05b4d80fbb9f', topic: { so: 'Beerista kaabashka', en: 'Cabbage farming', ar: 'زراعة الملفوف', sw: 'Kilimo cha kabichi' } },
    'cover-banana-farming':   { id: '1571771894821-ce9b6c11b08e', topic: { so: 'Beerista mooska', en: 'Banana farming', ar: 'زراعة الموز', sw: 'Kilimo cha ndizi' } },
    'cover-mango-farming':    { id: '1591073113125-e46713c829ed', topic: { so: 'Beerista cambaha', en: 'Mango farming', ar: 'زراعة المانجو', sw: 'Kilimo cha maembe' } },
    'cover-cassava-farming':  { id: '1601493700631-2b16ec4b4716', topic: { so: 'Beerista cassava', en: 'Cassava farming', ar: 'زراعة الكسافا', sw: 'Kilimo cha mihogo' } },
    // ----- Pests & diseases -----
    'cover-whiteflies':       { id: '1416879595882-3373a0480b5b', topic: { so: 'Cayayaanka dhirta', en: 'Crop pests on leaves', ar: 'آفات المحاصيل', sw: 'Wadudu wa mazao' } },
    'cover-fall-armyworm':    { id: '1601593768799-76e6b6e8a437', topic: { so: 'Diirka galleyda', en: 'Maize crop pest', ar: 'آفة الذرة', sw: 'Wadudu wa mahindi' } },
    'cover-early-blight':     { id: '1592841200221-a6898f307baa', topic: { so: 'Cudurka caleemaha', en: 'Tomato leaf disease', ar: 'مرض أوراق الطماطم', sw: 'Ugonjwa wa majani' } },
    'cover-late-blight':      { id: '1508313880080-c4bef0730395', topic: { so: 'Cudurka baradhada', en: 'Potato crop disease', ar: 'مرض البطاطس', sw: 'Ugonjwa wa viazi' } },
    'cover-powdery-mildew':   { id: '1530507629858-e3759c1f0e0d', topic: { so: 'Fangaska caleemaha', en: 'Leaf fungal disease', ar: 'مرض فطري للأوراق', sw: 'Ukungu wa majani' } },
    'cover-root-rot':         { id: '1530836369250-ef72a3f5cda8', topic: { so: 'Xididada iyo ciidda', en: 'Roots and soil health', ar: 'صحة الجذور والتربة', sw: 'Afya ya mizizi na udongo' } },
    // ----- Irrigation -----
    'cover-drip-irrigation':       { id: '1416664806563-bb6be3b6d7d3', topic: { so: 'Drip irrigation', en: 'Drip irrigation', ar: 'الري بالتنقيط', sw: 'Drip irrigation' } },
    'cover-rainwater-harvesting':  { id: '1501426026826-31c667bdf23d', topic: { so: 'Kaydinta biyaha roobka', en: 'Rainwater harvesting', ar: 'تجميع مياه الأمطار', sw: 'Kuvuna maji ya mvua' } },
    'cover-irrigation-scheduling': { id: '1473773508845-188df298d2d1', topic: { so: 'Jadwalka waraabinta', en: 'Irrigation scheduling', ar: 'جدولة الري', sw: 'Ratiba ya umwagiliaji' } },
    // ----- Soil -----
    'cover-soil-testing':  { id: '1464226184884-fa280b87c399', topic: { so: 'Tijaabinta ciidda', en: 'Soil testing', ar: 'اختبار التربة', sw: 'Upimaji wa udongo' } },
    'cover-composting':    { id: '1592078615290-033ee584e267', topic: { so: 'Compost', en: 'Composting', ar: 'الكمبوست', sw: 'Mboji' } },
    'cover-cover-crops':   { id: '1574943320219-553eb213f72d', topic: { so: 'Cover crops', en: 'Cover crops', ar: 'محاصيل الغطاء', sw: 'Mazao ya kufunika' } },
    // ----- Climate -----
    'cover-drought-crops':       { id: '1501785888041-af3ef285b470', topic: { so: 'Dalagga abaaraha', en: 'Drought tolerant crops', ar: 'محاصيل الجفاف', sw: 'Mazao sugu' } },
    'cover-agroforestry':        { id: '1426604966848-d7adac402bff', topic: { so: 'Agroforestry', en: 'Agroforestry', ar: 'الزراعة الحرجية', sw: 'Kilimo cha misitu' } },
    'cover-weather-monitoring':  { id: '1561553590-267fc716698a', topic: { so: 'Cimilada la-socodka', en: 'Weather monitoring', ar: 'رصد الطقس', sw: 'Hali ya hewa' } },
    // ----- Livestock -----
    'cover-dairy-cattle':     { id: '1605338777890-d6a4d27c89ec', topic: { so: 'Lo\'da caanaha', en: 'Dairy cattle', ar: 'أبقار الحليب', sw: 'Ng\'ombe wa maziwa' } },
    'cover-poultry-farming':  { id: '1548550023-2bdb3c5beed7', topic: { so: 'Digaagga', en: 'Poultry farming', ar: 'الدواجن', sw: 'Kuku' } },
    'cover-goat-sheep':       { id: '1533219057257-4bb9ed5d2cc7', topic: { so: 'Riyaha iyo idaha', en: 'Goats and sheep', ar: 'الماعز والأغنام', sw: 'Mbuzi na kondoo' } },
    // ----- Irrigation extras -----
    'cover-sprinkler-irrigation':  { id: '1473773508845-188df298d2d1', topic: { so: 'Sprinkler', en: 'Sprinkler irrigation', ar: 'الري بالرش', sw: 'Sprinkler' } },
    'cover-furrow-irrigation':     { id: '1500382017468-9049fed747ef', topic: { so: 'Furrow', en: 'Furrow irrigation', ar: 'الري بالأخاديد', sw: 'Mifereji' } },
    'cover-greenhouse-irrigation': { id: '1416664806563-bb6be3b6d7d3', topic: { so: 'Greenhouse', en: 'Greenhouse irrigation', ar: 'ري البيوت', sw: 'Greenhouse' } },
    'cover-water-pumps':           { id: '1501426026826-31c667bdf23d', topic: { so: 'Mootooyinka biyaha', en: 'Water pumps', ar: 'مضخات المياه', sw: 'Pampu za maji' } },
    'cover-mulching-water':        { id: '1592078615290-033ee584e267', topic: { so: 'Mulching', en: 'Mulching', ar: 'التغطية', sw: 'Matandazo' } },
    'cover-boreholes-wells':       { id: '1530836369250-ef72a3f5cda8', topic: { so: 'Borehole', en: 'Boreholes wells', ar: 'الآبار', sw: 'Visima' } },
    'cover-fertigation':           { id: '1574943320219-553eb213f72d', topic: { so: 'Fertigation', en: 'Fertigation', ar: 'التغذية بالري', sw: 'Fertigation' } },
    // ----- Soil extras -----
    'cover-soil-types':            { id: '1464226184884-fa280b87c399', topic: { so: 'Noocyada ciidda', en: 'Soil types', ar: 'أنواع التربة', sw: 'Aina za udongo' } },
    'cover-soil-erosion-control':  { id: '1530836369250-ef72a3f5cda8', topic: { so: 'Nabaad-guur', en: 'Erosion control', ar: 'مكافحة التعرية', sw: 'Mmomonyoko' } },
    'cover-crop-rotation':         { id: '1574943320219-553eb213f72d', topic: { so: 'Wareejinta', en: 'Crop rotation', ar: 'الدورة الزراعية', sw: 'Mzunguko' } },
    'cover-soil-ph':               { id: '1464226184884-fa280b87c399', topic: { so: 'pH ciidda', en: 'Soil pH', ar: 'pH التربة', sw: 'pH udongo' } },
    'cover-vermicompost':          { id: '1592078615290-033ee584e267', topic: { so: 'Vermicompost', en: 'Vermicompost', ar: 'الكمبوست الدودي', sw: 'Mboji ya minyoo' } },
    'cover-no-till':               { id: '1500382017468-9049fed747ef', topic: { so: 'No-till', en: 'No-till', ar: 'بلا حراثة', sw: 'Bila kulima' } },
    'cover-mulching-soil':         { id: '1592078615290-033ee584e267', topic: { so: 'Mulching ciidda', en: 'Soil mulching', ar: 'تغطية التربة', sw: 'Matandazo' } },
    // ----- Climate extras -----
    'cover-greenhouse-farming':    { id: '1416664806563-bb6be3b6d7d3', topic: { so: 'Greenhouse', en: 'Greenhouse farming', ar: 'البيوت المحمية', sw: 'Greenhouse' } },
    'cover-climate-smart':         { id: '1561484930-998b6a7b22e8', topic: { so: 'CSA', en: 'Climate smart', ar: 'الزراعة الذكية', sw: 'Kilimo Stahimilivu' } },
    'cover-flood-management':      { id: '1438449805896-28a666819a20', topic: { so: 'Daadadka', en: 'Flood management', ar: 'الفيضانات', sw: 'Mafuriko' } },
    'cover-shade-nets':            { id: '1416664806563-bb6be3b6d7d3', topic: { so: 'Shade net', en: 'Shade nets', ar: 'شبكات التظليل', sw: 'Wavu wa kivuli' } },
    'cover-rainy-season':          { id: '1438449805896-28a666819a20', topic: { so: 'Roobka', en: 'Rainy season', ar: 'موسم الأمطار', sw: 'Msimu wa mvua' } },
    'cover-dry-season':            { id: '1501785888041-af3ef285b470', topic: { so: 'Jiilaalka', en: 'Dry season', ar: 'الجفاف', sw: 'Ukame' } },
    'cover-windbreaks':            { id: '1426604966848-d7adac402bff', topic: { so: 'Windbreaks', en: 'Windbreaks', ar: 'كاسرات الرياح', sw: 'Vipenyo' } },
    // ----- Livestock extras -----
    'cover-beef-cattle':           { id: '1605338777890-d6a4d27c89ec', topic: { so: 'Lo\'da hilibka', en: 'Beef cattle', ar: 'أبقار اللحم', sw: 'Ng\'ombe wa nyama' } },
    'cover-camel-husbandry':       { id: '1500382017468-9049fed747ef', topic: { so: 'Geela', en: 'Camels', ar: 'الإبل', sw: 'Ngamia' } },
    'cover-beekeeping':            { id: '1568526381923-caf3fd520382', topic: { so: 'Shiniyaha', en: 'Beekeeping', ar: 'تربية النحل', sw: 'Nyuki' } },
    'cover-fish-farming':          { id: '1535591273668-578e31182c4f', topic: { so: 'Kalluunka', en: 'Fish farming', ar: 'تربية الأسماك', sw: 'Samaki' } },
    'cover-rabbit-farming':        { id: '1535241749838-299277b6305f', topic: { so: 'Bakeylaha', en: 'Rabbit farming', ar: 'الأرانب', sw: 'Sungura' } },
    'cover-feed-formulation':      { id: '1574943320219-553eb213f72d', topic: { so: 'Cuntada xoolaha', en: 'Feed formulation', ar: 'تكوين العلف', sw: 'Chakula' } },
    'cover-livestock-disease':     { id: '1605338777890-d6a4d27c89ec', topic: { so: 'Cudurro xoolaha', en: 'Livestock disease', ar: 'أمراض الماشية', sw: 'Magonjwa' } },
    // ----- News -----
    'cover-news-1': { id: '1438449805896-28a666819a20', topic: { so: 'Xilliga roobka', en: 'Rainy season farming', ar: 'موسم الأمطار', sw: 'Msimu wa mvua' } },
    'cover-news-2': { id: '1554224155-6726b3ff858f', topic: { so: 'Maaliyadda beeraha', en: 'Agricultural finance', ar: 'التمويل الزراعي', sw: 'Ufadhili wa kilimo' } },
    'cover-news-3': { id: '1500595046743-cd271d694d30', topic: { so: 'Xoolaha iyo beeraha', en: 'Livestock and crops', ar: 'الثروة الحيوانية والمحاصيل', sw: 'Mifugo na mazao' } },
    'cover-news-4': { id: '1561484930-998b6a7b22e8', topic: { so: 'Cimilada beeraha', en: 'Climate and weather', ar: 'المناخ والطقس', sw: 'Hali ya hewa' } },
    'cover-news-5': { id: '1518770660439-4636190af475', topic: { so: 'Tignoolajiyada beeraha', en: 'Agriculture technology', ar: 'تقنية الزراعة', sw: 'Teknolojia ya kilimo' } },
    'cover-news-6': { id: '1500382017468-9049fed747ef', topic: { so: 'Caafimaadka carrada', en: 'Healthy soil', ar: 'تربة صحية', sw: 'Udongo wenye afya' } }
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

  var used = {}; // prevent the same photo appearing twice on one page

  function apply() {
    var covers = document.querySelectorAll('.card-cover, .article-cover');
    covers.forEach(function (cover) {
      var key = null;
      for (var i = 0; i < cover.classList.length; i++) {
        if (IMAGE_MAP[cover.classList[i]]) { key = cover.classList[i]; break; }
      }
      if (!key) return;
      if (cover.querySelector('.cover-img')) return;
      if (used[key]) return;

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
      used[key] = true;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
