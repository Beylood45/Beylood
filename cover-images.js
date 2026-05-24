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
    // ----- News -----
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
    // Strip a trailing " — Hagaha Buuxa"/"— The Complete Guide" tail for cleaner alt
    text = text.replace(/\s+[—-]\s+.*(buuxa|complete guide|الشامل|kamili).*$/i, '').trim();
    return text + ' — Beylood';
  }

  var used = {}; // prevent the same photo appearing twice on one page

  function apply() {
    var covers = document.querySelectorAll('.card-cover, .article-cover');
    covers.forEach(function (cover) {
      // Find which mapped cover class this element uses
      var key = null;
      for (var i = 0; i < cover.classList.length; i++) {
        if (IMAGE_MAP[cover.classList[i]]) { key = cover.classList[i]; break; }
      }
      if (!key) return;                          // not a gradient-only cover we manage
      if (cover.querySelector('.cover-img')) return; // already has an image
      if (used[key]) return;                     // dedupe: this photo already used on the page

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
