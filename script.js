/* ============================================
   Beylood — interactivity
   - Trilingual switcher (Somali / English / Arabic)
   - Sticky header shadow on scroll
   - Mobile menu toggle
   - Year stamp
   ============================================ */

(function () {
  'use strict';

  /* ---------- Translations ---------- */
  const dict = {
    so: {
      label: 'Soomaali',
      dir: 'ltr',
      navHome: 'Bogga Hore', navCats: 'Qaybaha', navAsk: 'WAYDII BEYLOOD',
      navArticles: 'Maqaallo', navAbout: 'Naga', navContact: 'Nala soo xidhiidh',
      askBtn: 'WAYDII BEYLOOD',
      heroEy: 'Madal Beeraha Soomaalida',
      heroTitle: 'Aqoonta Beeraha — laguma kala maarmo, waxaad la wadaagi kartaa.',
      heroSub: "Beylood waa madal trilingual ah oo siisa beeralayda iyo agribusiness-ka aqoon, war, cilmi-baadhis, iyo caawiye AI ah.",
      ctaPrimary: 'Waydii Beylood AI',
      ctaSecondary: 'Daawo waxbarashada',
      stArticles: 'Maqaallo', stResearch: 'Cilmi-baadhis',
      stUsers: 'Isticmaalayaal', stCountries: 'Wadamo',
      catEy: 'QAYBAHA AQOONTA', catTitle: 'Qaybaha aqoonta',
      catSub: 'Dooro qaybta ku habboon waxa aad u baahan tahay',
      catCrops: 'Dalagga',
      catCropsDesc: 'Galleyda, masagga, bariiska, khudradda iyo wax kasta oo la beero.',
      catIrr: 'Waraabinta',
      catIrrDesc: 'Sida loo isticmaalo biyaha si hufan, biyo-mareenka iyo qoyaanka.',
      catLive: 'Xoolaha',
      catLiveDesc: 'Daryeelka xoolaha, cuntada, iyo cudurrada caadiga ah.',
      catCli: 'Cimilada',
      catCliDesc: 'Saadaasha hawada iyo isbeddelka cimilada beerta.',
      catSoil: 'Carrada',
      catSoilDesc: 'Daawaynta, shidaalka iyo nashqada carrada.',
      catPest: 'Cudurrada & Cayayaanka',
      catPestDesc: 'Aqoonsiga iyo daawaynta cudurrada dalagga.',
      askEy: 'AI CASRI AH',
      askTitle: 'Waydii Beylood — wax kasta oo ku saabsan beeraha, oo ku qoran luuqaddaada',
      askSub: "Su'aalo ku qor Soomaali, Ingiriis ama Carabi — waxaad helaysaa jawaab dhaqso ah, oo ku saleysan xog cilmi ah.",
      askCta: 'Hadda bilow',
      cb1: "Salaan! Su'aal ayaad qabtaa beeraha?",
      cb2: 'Sidee galleyda loo beeraa?',
      feEy: 'MAQAALLO LA DOORTAY', feTitle: 'Maqaallo la doortay',
      aPill1: 'Dalagga', aTitle1: 'Sida loo beero galleyda xilliga jiilaalka',
      aPill2: 'Waraabinta', aTitle2: 'Habab cusub oo lagu kaydiyo biyaha beerta',
      aPill3: 'Cudurrada', aTitle3: 'Calaamadaha hore ee cudurka caleenta yaanyada',
      readTime6: '6 daqiiqo', readTime4: '4 daqiiqo', readTime5: '5 daqiiqo',
      abEy: 'NAGA', abTitle: 'Aasaasaha Beylood',
      abBio: "Mohamed Shafie Mohamed waa aasaasaha Beylood. Waxaa ka go'an inuu beeralayda Soomaalida soo gaadhsiiyo aqoonta beeraha ee casriga ah, isagoo isku daraya tignoolajiyada AI iyo aqoonta dhaqanka.",
      abMission: 'Hadafkayagu waa madasha ugu weyn ee aqoonta beeraha ee Soomaalida, Geeska Afrika iyo Carabiga.',
      fEy: 'Aasaasaha', fRole: 'Aasaasaha & CEO ee Beylood',
      ctEy: 'NALA SOO XIDHIIDH', ctTitle: 'Nala soo xidhiidh',
      ctSub: "Su'aalo, taageero ama wadashaqayn — waxaa noo qori kara halkan.",
      fTag: 'Aqoonta Beeraha',
      fAbout: 'Madal casri ah oo ku saabsan beeraha — wargeyn, waxbarid, iyo caawimaad AI ah.',
      fExplore: 'Sahmin', fCompany: 'Shirkadda',
      fRights: 'Dhammaan xuquuqdu way xifdiyey.',
      fBuilt: 'Aqoonta Beeraha'
    },

    en: {
      label: 'English',
      dir: 'ltr',
      navHome: 'Home', navCats: 'Categories', navAsk: 'ASK BEYLOOD',
      navArticles: 'Articles', navAbout: 'About', navContact: 'Contact',
      askBtn: 'ASK BEYLOOD',
      heroEy: 'Agriculture Platform for the Horn of Africa',
      heroTitle: 'Agricultural knowledge — built for farmers, ready for the world.',
      heroSub: 'Beylood is a trilingual platform delivering education, news, research, and AI-powered assistance to farmers and agribusinesses.',
      ctaPrimary: 'Ask Beylood AI',
      ctaSecondary: 'Browse education',
      stArticles: 'Articles', stResearch: 'Research papers',
      stUsers: 'Registered users', stCountries: 'Countries',
      catEy: 'KNOWLEDGE CATEGORIES', catTitle: 'Knowledge categories',
      catSub: 'Pick the area that matches what you need',
      catCrops: 'Crops',
      catCropsDesc: 'Sorghum, maize, sesame, vegetables and everything you grow.',
      catIrr: 'Irrigation',
      catIrrDesc: 'How to use water efficiently, drip systems and soil moisture.',
      catLive: 'Livestock',
      catLiveDesc: 'Animal care, feed, and common livestock diseases.',
      catCli: 'Climate',
      catCliDesc: 'Weather forecasts and climate change for your fields.',
      catSoil: 'Soil',
      catSoilDesc: 'Treatment, fertilization, and soil structure.',
      catPest: 'Pests & Disease',
      catPestDesc: 'Identify and treat crop diseases and pests.',
      askEy: 'MODERN AI',
      askTitle: 'Ask Beylood — anything about agriculture, in your language',
      askSub: 'Type questions in Somali, English or Arabic — get fast, science-based answers.',
      askCta: 'Start now',
      cb1: 'Hello! Got a question about farming?',
      cb2: 'How do I grow maize?',
      feEy: 'FEATURED ARTICLES', feTitle: 'Featured articles',
      aPill1: 'Crops', aTitle1: 'How to grow maize in the dry season',
      aPill2: 'Irrigation', aTitle2: 'New techniques for saving farm water',
      aPill3: 'Disease', aTitle3: 'Early signs of tomato leaf disease',
      readTime6: '6 min read', readTime4: '4 min read', readTime5: '5 min read',
      abEy: 'ABOUT', abTitle: 'Founder of Beylood',
      abBio: 'Mohamed Shafie Mohamed is the founder of Beylood. He is committed to bringing modern agricultural knowledge to Somali farmers, blending AI technology with local wisdom.',
      abMission: 'Our mission is to be the leading agricultural knowledge platform for Somali, Horn-of-Africa and Arab farmers.',
      fEy: 'Founder', fRole: 'Founder & CEO of Beylood',
      ctEy: 'CONTACT', ctTitle: 'Contact us',
      ctSub: "Questions, support or partnership — we'd love to hear from you.",
      fTag: 'Smart Agriculture Knowledge',
      fAbout: 'A modern agricultural platform — news, education, and AI-powered guidance.',
      fExplore: 'Explore', fCompany: 'Company',
      fRights: 'All rights reserved.',
      fBuilt: 'Smart Agriculture Knowledge'
    },

    ar: {
      label: 'العربية',
      dir: 'rtl',
      navHome: 'الرئيسية', navCats: 'الفئات', navAsk: 'اسأل بيلود',
      navArticles: 'المقالات', navAbout: 'من نحن', navContact: 'اتصل بنا',
      askBtn: 'اسأل بيلود',
      heroEy: 'منصة زراعية للقرن الأفريقي',
      heroTitle: 'المعرفة الزراعية — مصممة للمزارع، جاهزة للعالم.',
      heroSub: 'بيلود منصة ثلاثية اللغة تقدم التعليم والأخبار والأبحاث والمساعدة الذكية للمزارعين وشركات الأعمال الزراعية.',
      ctaPrimary: 'اسأل بيلود الذكي',
      ctaSecondary: 'تصفح التعليم',
      stArticles: 'مقالة', stResearch: 'بحث علمي',
      stUsers: 'مستخدم مسجل', stCountries: 'دولة',
      catEy: 'فئات المعرفة', catTitle: 'فئات المعرفة',
      catSub: 'اختر المجال الذي يناسب احتياجك',
      catCrops: 'المحاصيل',
      catCropsDesc: 'الذرة الرفيعة، الذرة، السمسم، الخضروات وكل ما تزرع.',
      catIrr: 'الري',
      catIrrDesc: 'كيف تستخدم الماء بكفاءة، الري بالتنقيط ورطوبة التربة.',
      catLive: 'الثروة الحيوانية',
      catLiveDesc: 'رعاية الحيوانات والأعلاف والأمراض الشائعة.',
      catCli: 'المناخ',
      catCliDesc: 'توقعات الطقس وتغير المناخ لحقولك.',
      catSoil: 'التربة',
      catSoilDesc: 'المعالجة والتسميد وبنية التربة.',
      catPest: 'الآفات والأمراض',
      catPestDesc: 'تشخيص ومعالجة أمراض المحاصيل والآفات.',
      askEy: 'ذكاء اصطناعي حديث',
      askTitle: 'اسأل بيلود — أي شيء عن الزراعة، بلغتك',
      askSub: 'اكتب أسئلتك بالصومالية أو الإنجليزية أو العربية — احصل على إجابات سريعة ومبنية على العلم.',
      askCta: 'ابدأ الآن',
      cb1: 'مرحباً! هل لديك سؤال عن الزراعة؟',
      cb2: 'كيف أزرع الذرة؟',
      feEy: 'مقالات مختارة', feTitle: 'مقالات مختارة',
      aPill1: 'المحاصيل', aTitle1: 'كيفية زراعة الذرة في موسم الجفاف',
      aPill2: 'الري', aTitle2: 'تقنيات جديدة لتوفير مياه الزراعة',
      aPill3: 'الأمراض', aTitle3: 'العلامات المبكرة لمرض أوراق الطماطم',
      readTime6: '6 دقائق', readTime4: '4 دقائق', readTime5: '5 دقائق',
      abEy: 'من نحن', abTitle: 'مؤسس بيلود',
      abBio: 'محمد شافعي محمد هو مؤسس بيلود. يلتزم بنقل المعرفة الزراعية الحديثة إلى المزارعين الصوماليين، مع الجمع بين الذكاء الاصطناعي والحكمة المحلية.',
      abMission: 'مهمتنا أن نكون المنصة الرائدة لمعرفة الزراعة للمزارعين الصوماليين والقرن الأفريقي والعرب.',
      fEy: 'المؤسس', fRole: 'مؤسس ومدير تنفيذي لبيلود',
      ctEy: 'اتصل بنا', ctTitle: 'اتصل بنا',
      ctSub: 'أسئلة أو دعم أو شراكة — نسعد بسماعك.',
      fTag: 'معرفة الزراعة الذكية',
      fAbout: 'منصة زراعية حديثة — أخبار، تعليم، ومساعد ذكاء اصطناعي.',
      fExplore: 'استكشف', fCompany: 'الشركة',
      fRights: 'جميع الحقوق محفوظة.',
      fBuilt: 'معرفة الزراعة الذكية'
    }
  };

  const order = ['so', 'en', 'ar'];
  let current = 0;

  function applyLang(code) {
    const t = dict[code];
    if (!t) return;

    document.documentElement.lang = code;
    document.documentElement.dir = t.dir;

    const label = document.getElementById('langLabel');
    if (label) label.textContent = t.label;

    document.querySelectorAll('[data-key]').forEach(el => {
      const k = el.getAttribute('data-key');
      if (t[k] != null) el.textContent = t[k];
    });

    try { localStorage.setItem('beylood_lang', code); } catch (e) {}
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    // Restore saved language or fall back to Somali
    let saved = 'so';
    try { saved = localStorage.getItem('beylood_lang') || 'so'; } catch (e) {}
    current = Math.max(0, order.indexOf(saved));
    applyLang(order[current]);

    // Language toggle button — cycles through SO → EN → AR
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        current = (current + 1) % order.length;
        applyLang(order[current]);
      });
    }

    // Mobile menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.querySelector('.nav-links');
    if (menuBtn && navLinks) {
      menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('is-open');
      });
      navLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => navLinks.classList.remove('is-open'));
      });
    }

    // Sticky header shadow
    const header = document.getElementById('siteHeader');
    if (header) {
      const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // Year stamp
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();
