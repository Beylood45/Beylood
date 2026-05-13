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
      navArticles: 'Maqaallo', navNews: 'Wararka', navAbout: 'Naga', navContact: 'Nala soo xidhiidh',
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
      // Featured article: Preventing Tomato Diseases
      artBack: '← Dib ugu noqo maqaallada',
      catBack: '← Dib ugu noqo qaybaha',
      viewAll: 'Dhammaan eeg →',
      // Chat
      chatWelcome: 'Salaan! Anigu waxaan ahay Beylood AI. Su\'aal kasta oo ku saabsan beeraha — waydii i waydii.',
      chatPlaceholder: 'Halkan ku qor su\'aashaada…',
      chatHint: 'Tani waa AI — fadlan u tixraac khabiir beeraha haddii arrintu ay caafimaadka dhirta saameyn weyn ku leedahay.',
      chatChip1: 'Sidee baan u beerin karaa galleyda xilliga jiilaalka?',
      chatChip2: 'Maxaa daawo u ah cudurka caleenta yaanyada?',
      chatChip3: 'Sidee biyaha si hufan loogu isticmaalaa beerta?',
      chatErrGeneric: 'Cudur darro, khalad ayaa dhacay. Fadlan mar kale isku day.',
      chatErrRate: 'Waxaad gaadhay xadka fariimaha. Fadlan mar kale isku day daqiiqado kadib.',
      artPill: 'Cudurrada & Cayayaanka',
      artTitle: 'Ka Hortagga Cudurrada Yaanyada',
      artReadTime: '7 daqiiqo',
      artLead: 'Cudurrada yaanyada way badan yihiin, laakiin tallaabooyin fudud ayaa ku caawin kara inaad dhirtaada caafimaad ku haysato. Hoos ka eeg 10 talooyin oo lagu hubay.',
      artTip1Title: 'Dalagga wareeji.',
      artTip1: 'Cudurrada yaanyada badankood waxay ku nool yihiin ciidda. Sannad kasta yaanyada ku beer meel cusub si aad u yarayso cudurrada.',
      artTip2Title: 'Ka saar caleemaha cudurka leh.',
      artTip2: 'Haddii aad aragto caleemo cudur qaba, si degdeg ah uga jar oo qashinka ku tuur si cudurku uusan u faafin.',
      artTip3Title: 'Ha taaban dhirta marka ay qoyan tahay.',
      artTip3: 'Marka caleemaha yaanyadu qoyan yihiin ha ka shaqeyn beerta — cudurradu si fudud ayay u faafi karaan.',
      artTip4Title: 'Dooro noocyo cudur u adkeysan kara.',
      artTip4: 'Beer noocyo yaanyo ah oo iska caabin u leh cudurrada caanka ah.',
      artTip5Title: 'Nadiifi beerta dhammaadka xilliga.',
      artTip5: 'Ka saar dhammaan haraaga dhirta cudurka qaba oo qashin ku tuur. Ha ku darin compost-ka.',
      artTip6Title: 'Isticmaal dhir caafimaad qabta.',
      artTip6: 'Haddii aad dhirta sii haynayso xilli kale, hubi inay cudur la’aan yihiin.',
      artTip7Title: 'Samee hawo wanaagsan.',
      artTip7: 'Kala fogee dhirta si hawadu si fiican ugu wareegto — taas oo yaraynaysa cudurrada fangaska.',
      artTip8Title: 'Mulch saar ciidda.',
      artTip8: 'Isticmaal caws, compost, ama caleemo qalalan si looga hortago cudurrada ciidda kasoo boodaya caleemaha.',
      artTip9Title: 'Ka ilaali caleemaha qoyaan badan.',
      artTip9: 'Biyaha si toos ah ugu shub xididka adoo isticmaalaya drip irrigation, halkii aad dusha caleemaha uga waraabin lahayd.',
      artTip10Title: 'Nadiifi weelasha beerista.',
      artTip10: 'Haddii aad yaanyo ku beerayso dheri, ku nadiifi bleach 10% ah dhammaadka xilliga oo ciid cusub geli.',
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
      fBuilt: 'Aqoonta Beeraha',
      newsEy: 'WARARKA BEERAHA', newsTitle: 'Wararka Beeraha',
      newsSub: 'Wararka u dambeeyey ee ku saabsan beeraha, xoolaha, iyo agribusiness-ka.',
      newsBack: '← Dib ugu noqo wararka',
      n1Pill: 'Beeraha', n1ReadTime: '6 daqiiqo',
      n1Title: 'Xilliga Roobka: Sidee Beeralaydu u Diyaar Garoobaan',
      n2Title: 'Lacag-celinta Beeraha: Sida Loogu Faa\'iido Badnaan Karo',
      n2Pill: 'Ganacsiga', n2ReadTime: '5 daqiiqo',
      n3Title: 'Xoolaha & Beeraha: Iskaashi Cusub', n3Pill: 'Xoolaha', n3ReadTime: '4 daqiiqo',
      n4Title: 'Cimilada: Saadaasha Xilliga Dambe', n4Pill: 'Cimilada', n4ReadTime: '5 daqiiqo',
      n5Title: 'Tignoolajiyada Cusub oo Gaadhay Beeralayda', n5Pill: 'Tignoolajiyada', n5ReadTime: '6 daqiiqo',
      n6Title: 'Sida Loo Xoojiyo Carrada: Hagaha Buuxa', n6Pill: 'Carrada', n6ReadTime: '7 daqiiqo',
      vmEy: 'ARAGTI & HADAF', vmTitle: 'Aragtidayada & Hadafkayaga',
      visionTitle: 'Aragtida',
      visionText: 'Inaan noqono madasha aqoonta beeraha ee ugu weyn Geeska Afrika iyo dunida Carabiga — goob ay beeralaydu ka helaan macluumaadka ugu cusub, cilmi-baadhista, iyo xalka AI ee ku haboon dhulkooda.',
      missionTitle: 'Hadafka',
      missionText: 'In aan beeralayda Soomaalida, Geeska Afrika, iyo Carabiga soo gaadhsiiyo aqoonta beeraha ee casriga ah — isagoo isku daraya tignoolajiyada AI, wargeynta, iyo waxbarashada si shaqsiyeed loo gaadhi karo.',
      val1Title: 'Beeralayda Hormood', val1Text: 'Dhammaan go\'aannadayada iyo adeegyadayada waxaa ugu horreeya baahida beeralayda.',
      val2Title: 'Tignoolajiyada AI', val2Text: 'Isticmaalka AI casriga ah si loogu fududeeyo helitaanka aqoonta beeraha.',
      val3Title: 'Xog Saxan', val3Text: 'Waxaan bixinaa oo keliya xog la xaqiijiyay oo laga yaabo inay beeralayda ugu waxtari.'
    },

    en: {
      label: 'English',
      dir: 'ltr',
      navHome: 'Home', navCats: 'Categories', navAsk: 'ASK BEYLOOD',
      navArticles: 'Articles', navNews: 'News', navAbout: 'About', navContact: 'Contact',
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
      // Featured article: Preventing Tomato Diseases
      artBack: '← Back to articles',
      catBack: '← Back to categories',
      viewAll: 'View all →',
      // Chat
      chatWelcome: "Hello! I'm Beylood AI. Ask me anything about agriculture.",
      chatPlaceholder: 'Type your question here…',
      chatHint: 'This is an AI — please consult a local agronomist for serious crop-health issues.',
      chatChip1: 'How do I grow tomatoes in dry climates?',
      chatChip2: 'What is the best fertilizer for sorghum?',
      chatChip3: 'How do I detect crop diseases early?',
      chatErrGeneric: 'Something went wrong. Please try again.',
      chatErrRate: "You have reached the message limit. Please try again later.",
      artPill: 'Pests & Disease',
      artTitle: 'Preventing Diseases in Tomato Farms',
      artReadTime: '7 min read',
      artLead: 'Tomato diseases are common, but a few simple practices can keep your plants healthy. Here are 10 proven tips.',
      artTip1Title: 'Rotate your crops.',
      artTip1: 'Many tomato diseases live in the soil. Plant tomatoes in a different area each year to reduce disease problems.',
      artTip2Title: 'Remove infected leaves immediately.',
      artTip2: 'If you notice leaves with disease symptoms, remove them quickly and throw them in the trash to prevent the spread of infection.',
      artTip3Title: 'Avoid working with wet plants.',
      artTip3: 'Do not work in the garden when tomato leaves are wet because diseases can easily spread from one plant to another.',
      artTip4Title: 'Choose disease-resistant varieties.',
      artTip4: 'Select tomato varieties that are resistant to common diseases.',
      artTip5Title: 'Clean the farm after harvest.',
      artTip5: 'Remove and destroy all diseased plant debris at the end of the season. Do not place infected plants in compost piles.',
      artTip6Title: 'Use healthy plants for the next season.',
      artTip6: 'If you keep tomato plants for another season, ensure they are completely disease-free.',
      artTip7Title: 'Provide proper air circulation.',
      artTip7: 'Leave enough space between tomato plants to improve airflow and reduce fungal diseases.',
      artTip8Title: 'Apply mulch around plants.',
      artTip8: 'Use compost, straw, dry leaves, or hay around tomato plants to prevent soil-borne diseases from splashing onto leaves.',
      artTip9Title: 'Keep foliage dry.',
      artTip9: 'Water plants at the root zone using drip irrigation or soaker hoses instead of overhead watering.',
      artTip10Title: 'Disinfect planting containers.',
      artTip10: 'If growing tomatoes in pots, clean containers with a 10% bleach solution after each season and replace old soil with fresh potting mix.',
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
      fBuilt: 'Smart Agriculture Knowledge',
      newsEy: 'AGRICULTURE NEWS', newsTitle: 'Agriculture News',
      newsSub: 'Latest news on crops, livestock, and agribusiness.',
      newsBack: '← Back to news',
      n1Pill: 'Crops', n1ReadTime: '6 min read',
      n1Title: 'Rainy Season: How Farmers Are Preparing',
      n2Title: 'Farm Returns: How to Maximize Profits',
      n2Pill: 'Business', n2ReadTime: '5 min read',
      n3Title: 'Livestock & Farming: A New Partnership', n3Pill: 'Livestock', n3ReadTime: '4 min read',
      n4Title: 'Climate Forecast for the Coming Season', n4Pill: 'Climate', n4ReadTime: '5 min read',
      n5Title: 'New Technology Reaches Smallholder Farmers', n5Pill: 'Technology', n5ReadTime: '6 min read',
      n6Title: 'How to Strengthen Your Soil: A Complete Guide', n6Pill: 'Soil', n6ReadTime: '7 min read',
      vmEy: 'VISION & MISSION', vmTitle: 'Our Vision & Mission',
      visionTitle: 'Vision',
      visionText: 'To become the leading agricultural knowledge platform in the Horn of Africa and the Arab world — a place where farmers access the latest information, research, and AI-powered solutions tailored to their land.',
      missionTitle: 'Mission',
      missionText: 'To bring modern agricultural knowledge to Somali, Horn-of-Africa, and Arab farmers — combining AI technology, news, and education in a way that is personally accessible to every farmer.',
      val1Title: 'Farmers First', val1Text: 'Every decision and service we build starts with the needs of farmers.',
      val2Title: 'AI Technology', val2Text: 'Using modern AI to make agricultural knowledge easier to access for everyone.',
      val3Title: 'Verified Knowledge', val3Text: 'We only publish verified, science-based information that is genuinely useful for farmers.'
    },

    ar: {
      label: 'العربية',
      dir: 'rtl',
      navHome: 'الرئيسية', navCats: 'الفئات', navAsk: 'اسأل بيلود',
      navArticles: 'المقالات', navNews: 'الأخبار', navAbout: 'من نحن', navContact: 'اتصل بنا',
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
      // Featured article: Preventing Tomato Diseases
      artBack: '→ العودة إلى المقالات',
      catBack: '→ العودة إلى الفئات',
      viewAll: '← عرض الكل',
      // Chat
      chatWelcome: 'مرحباً! أنا بيلود AI. اسألني أي شيء عن الزراعة.',
      chatPlaceholder: 'اكتب سؤالك هنا…',
      chatHint: 'هذا ذكاء اصطناعي — استشر مهندساً زراعياً محلياً في الحالات الخطيرة.',
      chatChip1: 'كيف أزرع الذرة في المناطق الجافة؟',
      chatChip2: 'ما هو أفضل سماد للخضروات؟',
      chatChip3: 'كيف أعالج أمراض النباتات؟',
      chatErrGeneric: 'حدث خطأ. يرجى المحاولة مرة أخرى.',
      chatErrRate: 'لقد وصلت إلى حد الرسائل. يرجى المحاولة لاحقاً.',
      artPill: 'الآفات والأمراض',
      artTitle: 'الوقاية من أمراض الطماطم',
      artReadTime: '7 دقائق',
      artLead: 'أمراض الطماطم شائعة، لكن بضع ممارسات بسيطة تحافظ على نباتاتك صحية. إليك 10 نصائح مجربة.',
      artTip1Title: 'تدوير المحاصيل.',
      artTip1: 'تعيش العديد من أمراض الطماطم في التربة، لذلك يجب زراعة الطماطم في مكان مختلف كل عام.',
      artTip2Title: 'إزالة الأوراق المصابة فوراً.',
      artTip2: 'عند ملاحظة أي أوراق مصابة، قم بإزالتها والتخلص منها لمنع انتشار المرض.',
      artTip3Title: 'تجنب العمل عندما تكون النباتات مبللة.',
      artTip3: 'لا تعمل في الحديقة عندما تكون أوراق الطماطم رطبة لأن الأمراض تنتقل بسهولة بين النباتات.',
      artTip4Title: 'اختيار الأصناف المقاومة للأمراض.',
      artTip4: 'قم بزراعة أنواع طماطم مقاومة للأمراض الشائعة.',
      artTip5Title: 'تنظيف المزرعة بعد الحصاد.',
      artTip5: 'قم بإزالة بقايا النباتات المصابة وحرقها أو التخلص منها بعيداً عن السماد العضوي.',
      artTip6Title: 'استخدام نباتات سليمة.',
      artTip6: 'إذا كنت ستحتفظ بالنباتات للموسم القادم، تأكد من خلوها من الأمراض.',
      artTip7Title: 'توفير تهوية جيدة.',
      artTip7: 'اترك مسافات كافية بين النباتات لتحسين حركة الهواء وتقليل الأمراض الفطرية.',
      artTip8Title: 'استخدام التغطية الأرضية (Mulch).',
      artTip8: 'استخدم القش أو السماد العضوي أو الأوراق الجافة لمنع انتقال الأمراض من التربة إلى الأوراق.',
      artTip9Title: 'الحفاظ على جفاف الأوراق.',
      artTip9: 'قم بري النباتات عند الجذور بدلاً من رش الماء على الأوراق.',
      artTip10Title: 'تعقيم أوعية الزراعة.',
      artTip10: 'إذا كنت تزرع الطماطم في أوعية، قم بتنظيفها بمحلول مبيض 10% واستبدل التربة القديمة بتربة جديدة.',
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
      fBuilt: 'معرفة الزراعة الذكية',
      newsEy: 'أخبار الزراعة', newsTitle: 'أخبار الزراعة',
      newsSub: 'أحدث أخبار المحاصيل والثروة الحيوانية والأعمال الزراعية.',
      newsBack: '→ العودة إلى الأخبار',
      n1Pill: 'المحاصيل', n1ReadTime: '6 دقائق',
      n1Title: 'موسم الأمطار: كيف يستعد المزارعون',
      n2Title: 'عوائد المزرعة: كيف تزيد أرباحك',
      n2Pill: 'الأعمال', n2ReadTime: '5 دقائق',
      n3Title: 'الثروة الحيوانية والزراعة: شراكة جديدة', n3Pill: 'الثروة الحيوانية', n3ReadTime: '4 دقائق',
      n4Title: 'توقعات المناخ للموسم القادم', n4Pill: 'المناخ', n4ReadTime: '5 دقائق',
      n5Title: 'التكنولوجيا الجديدة تصل إلى المزارعين', n5Pill: 'التكنولوجيا', n5ReadTime: '6 دقائق',
      n6Title: 'كيف تقوّي تربتك: الدليل الشامل', n6Pill: 'التربة', n6ReadTime: '7 دقائق',
      vmEy: 'الرؤية والرسالة', vmTitle: 'رؤيتنا ورسالتنا',
      visionTitle: 'الرؤية',
      visionText: 'أن نصبح المنصة الرائدة لمعرفة الزراعة في القرن الأفريقي والعالم العربي — مكان يجد فيه المزارعون أحدث المعلومات والأبحاث وحلول الذكاء الاصطناعي المناسبة لأراضيهم.',
      missionTitle: 'الرسالة',
      missionText: 'إيصال المعرفة الزراعية الحديثة إلى المزارعين الصوماليين وأبناء القرن الأفريقي والعرب — من خلال دمج تقنية الذكاء الاصطناعي والأخبار والتعليم بطريقة يسهل الوصول إليها شخصياً.',
      val1Title: 'المزارع أولاً', val1Text: 'كل قرار وخدمة نبنيها تبدأ من احتياجات المزارع.',
      val2Title: 'تقنية الذكاء الاصطناعي', val2Text: 'نستخدم الذكاء الاصطناعي الحديث لتسهيل الوصول إلى المعرفة الزراعية للجميع.',
      val3Title: 'معرفة موثوقة', val3Text: 'نقدم فقط معلومات موثقة ومبنية على العلم تفيد المزارعين فعلاً.'
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

    // data-key-placeholder updates input placeholders (e.g. chat input)
    document.querySelectorAll('[data-key-placeholder]').forEach(el => {
      const k = el.getAttribute('data-key-placeholder');
      if (t[k] != null) el.setAttribute('placeholder', t[k]);
    });

    // data-lang shows/hides language-specific blocks (used on long articles)
    document.querySelectorAll('[data-lang]').forEach(el => {
      const elLang = el.getAttribute('data-lang');
      if (elLang === 'so' || elLang === 'en' || elLang === 'ar') {
        el.style.display = (elLang === code) ? '' : 'none';
      }
    });

    try { localStorage.setItem('beylood_lang', code); } catch (e) {}
  }

  /* ---------- Theme (light / dark) ---------- */
  function applyTheme(t) {
    if (t !== 'dark') t = 'light';
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('beylood_theme', t); } catch (e) {}
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    // Restore saved theme or fall back to light
    let savedTheme = 'light';
    try { savedTheme = localStorage.getItem('beylood_theme') || 'light'; } catch (e) {}
    applyTheme(savedTheme);

    // Theme toggle button — switches light ↔ dark
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(current);
      });
    }

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

    // Chat (only on the Ask Beylood page)
    initChat();
  });

  /* ---------- Ask Beylood chat ---------- */
  function initChat() {
    const form = document.getElementById('chatForm');
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSend');
    const messagesEl = document.getElementById('chatMessages');
    const suggestionsEl = document.getElementById('chatSuggestions');
    if (!form || !input || !messagesEl) return; // not on this page

    const history = []; // {role, content}
    let pending = false;

    function getLangDict() {
      const code = document.documentElement.lang || 'so';
      return dict[code] || dict.so;
    }

    function scrollToBottom() {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function bubble(role, text) {
      const wrap = document.createElement('div');
      wrap.className = 'bubble' + (role === 'user' ? ' bubble-right' : '');
      const avatar = document.createElement('span');
      avatar.className = 'avatar ' + (role === 'user' ? 'avatar-user' : 'avatar-bot');
      avatar.textContent = role === 'user' ? 'U' : 'B';
      const msg = document.createElement('span');
      msg.className = 'msg ' + (role === 'user' ? 'msg-user' : 'msg-bot');
      msg.textContent = text;
      if (role === 'user') {
        wrap.appendChild(msg);
        wrap.appendChild(avatar);
      } else {
        wrap.appendChild(avatar);
        wrap.appendChild(msg);
      }
      messagesEl.appendChild(wrap);
      scrollToBottom();
      return msg;
    }

    function typingIndicator() {
      const wrap = document.createElement('div');
      wrap.className = 'bubble typing';
      wrap.innerHTML =
        '<span class="avatar avatar-bot">B</span>' +
        '<span class="msg msg-bot"><span class="dot"></span><span class="dot"></span><span class="dot"></span></span>';
      messagesEl.appendChild(wrap);
      scrollToBottom();
      return wrap;
    }

    function setPending(on) {
      pending = on;
      input.disabled = on;
      sendBtn.disabled = on;
      sendBtn.classList.toggle('is-loading', on);
    }

    function autosize() {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 160) + 'px';
    }

    async function send(text) {
      const trimmed = (text || '').trim();
      if (!trimmed || pending) return;

      // Hide starter chips after the first user message.
      if (suggestionsEl) suggestionsEl.style.display = 'none';

      bubble('user', trimmed);
      history.push({ role: 'user', content: trimmed });
      input.value = '';
      autosize();

      setPending(true);
      const typing = typingIndicator();

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
        });

        typing.remove();

        if (res.status === 429) {
          const t = getLangDict();
          bubble('assistant', t.chatErrRate || 'You have reached the message limit. Please try again later.');
          history.pop(); // don't keep the user message in history if it didn't go through
          return;
        }

        if (!res.ok) {
          const t = getLangDict();
          bubble('assistant', t.chatErrGeneric || 'An error occurred. Please try again.');
          history.pop();
          return;
        }

        const data = await res.json().catch(() => ({}));
        const reply = (data && data.reply) || '';
        if (!reply) {
          const t = getLangDict();
          bubble('assistant', t.chatErrGeneric || 'An error occurred. Please try again.');
          history.pop();
          return;
        }

        bubble('assistant', reply);
        history.push({ role: 'assistant', content: reply });
      } catch (err) {
        typing.remove();
        const t = getLangDict();
        bubble('assistant', t.chatErrGeneric || 'An error occurred. Please try again.');
        history.pop();
      } finally {
        setPending(false);
        input.focus();
      }
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      send(input.value);
    });

    input.addEventListener('keydown', (e) => {
      // Enter sends, Shift+Enter inserts a newline.
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        send(input.value);
      }
    });

    input.addEventListener('input', autosize);

    // Starter chips: clicking one sends the message immediately.
    if (suggestionsEl) {
      suggestionsEl.addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (!chip) return;
        send(chip.textContent);
      });
    }
  }
})();
