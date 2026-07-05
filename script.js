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
      navArticles: 'Maqaallo', navNews: 'Wararka', navWeather: 'Cimilada', navCalc: 'Xisaabiyaha Beeraha', navAbout: 'Nagu saabsan', navContact: 'Nala soo xidhiidh',
      askBtn: 'WAYDII BEYLOOD',
      heroEy: 'Madal Beereed',
      heroTitle: 'Laga bilaabo Soomaaliya ilaa dunida — horumarinta beeraha iyada oo loo marayo aqoon iyo hal-abuur.',
      heroSub: "Taageeridda beeraleyda iyadoo la siinayo aqoon beeraha oo lagu kalsoon yahay, hagitaanno ilaalinta dalagga, wararka beeraha, iyo xalal casri ah oo horseeda mustaqbal waara.",
      ctaPrimary: 'Waydii Beylood AI',
      ctaSecondary: 'Daawo waxbarashada',
      stArticles: 'Maqaallo', stResearch: 'Qaybo',
      stUsers: 'Luqadood', stCountries: 'Caawiye AI',
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
      abEy: 'Nagu saabsan', abTitle: 'Aasaasaha Beylood',
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
      visionText: 'In aan noqono madasha beeraha dijitaalka ah ee ugu hormarsan Soomaaliya, kadibna gaarta dunida inteeda kale isagoo beeraleyda ku xiraya aqoon, hal-abuur, iyo xalal waara oo beerashada casriga ah.',
      missionTitle: 'Hadafka',
      missionText: 'Beylood waxaa ka go’an taageeridda beeraleyda iyadoo la siinayo aqoon beeraha oo lagu kalsoon yahay, hagitaanno ilaalinta dalagga, wararka beeraha, iyo waxbarasho casri ah oo ku baxda English, Somali, iyo Arabic si loo kordhiyo wax-soosaarka iyo beeraha waara.',
      val1Title: 'Beeralayda Hormood', val1Text: 'Dhammaan go\'aannadayada iyo adeegyadayada waxaa ugu horreeya baahida beeralayda.',
      val2Title: 'Tignoolajiyada AI', val2Text: 'Isticmaalka AI casriga ah si loogu fududeeyo helitaanka aqoonta beeraha.',
      val3Title: 'Xog Saxan', val3Text: 'Waxaan bixinaa oo keliya xog la xaqiijiyay oo laga yaabo inay beeralayda ugu waxtari.',
      srEy: 'RAADI', srTitle: 'Raadi wax kasta oo Beylood ku jira',
      srSub: 'Dalagga, hagayaal, adeegyo, wararka iyo alaab — hal goob.',
      srLabel: 'Raadi shabakadda Beylood',
      srPlaceholder: 'Raadi dalagga, alaab, adeegyo, wararka, ama macluumaad...',
      srFAll: 'Dhammaan', srFCrop: 'Dalagga', srFGuide: 'Hagayaal',
      srFService: 'Adeegyo', srFNews: 'Wararka', srFProduct: 'Alaab',
      srNoResults: 'Wax natiijo ah lagama helin',
      srTypeMore: 'Bilaa qor si aad u raadiso…',
      srOpen: 'Fur',
      srTagCrop: 'Dalagga', srTagGuide: 'Hage', srTagService: 'Adeeg',
      srTagNews: 'War', srTagProduct: 'Alaab',
      signInBtn: 'SOO GAL', signUpBtn: 'ISDIWAANGELI',
      signInTitle: 'Soo dhowow Beylood',
      signInSub: 'Gal akoonkaaga si aad u hesho aqoonta iyo adeegyada.',
      signInGoogle: 'Ku gal Google', signInOr: 'Ama isticmaal iimaylkaaga',
      signInEmail: 'Iimaylka', signInEmailPh: 'aniga@tusaale.com',
      signInPass: 'Furaha (Password)',
      signInRemember: 'Igu xasuuso', signInForgot: 'Ma illowday furaha?',
      signInNoAcc: 'Akoon ma haysid?', signUpLink: 'Isdiwaangeli halkan',
      signUpTitle: 'Abuur Akoon Cusub',
      signUpSub: 'Bilow rihla aqooneed oo beero la xidhiidha — bilaash.',
      signUpGoogle: 'Iska diwaangeli Google',
      signUpOr: 'Ama abuur akoon iimaylka',
      signUpName: 'Magaca Buuxa', signUpNamePh: 'Magaca buuxa',
      signUpPassPh: 'Ugu yaraan 8 xaraf',
      signUpPass2: 'Xaqiiji Furaha', signUpPass2Ph: 'Mar kale geli furaha',
      signUpBtnFull: 'Abuur Akoon',
      signUpHasAcc: 'Mar hore ma akoon haysataa?', signInLink: 'Soo gal halkan'
    },

    en: {
      label: 'English',
      dir: 'ltr',
      navHome: 'Home', navCats: 'Categories', navAsk: 'ASK BEYLOOD',
      navArticles: 'Articles', navNews: 'News', navWeather: 'Weather', navCalc: 'Farm Calculators', navAbout: 'About', navContact: 'Contact',
      askBtn: 'ASK BEYLOOD',
      heroEy: 'Agricultural Platform',
      heroTitle: 'From Somalia to the World — Growing Agriculture Through Knowledge and Innovation.',
      heroSub: 'Empowering farmers with trusted agricultural knowledge, crop protection guidance, farming news, and modern agricultural solutions for a sustainable future.',
      ctaPrimary: 'Ask Beylood AI',
      ctaSecondary: 'Browse education',
      stArticles: 'Articles', stResearch: 'Categories',
      stUsers: 'Languages', stCountries: 'AI Assistant',
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
      visionText: 'To become Somalia’s leading digital agriculture platform and expand to the world by connecting farmers with knowledge, innovation, and sustainable farming solutions.',
      missionTitle: 'Mission',
      missionText: 'Beylood is committed to supporting farmers by providing reliable agricultural knowledge, crop protection resources, farming news, and modern educational content in English, Somali, and Arabic to improve productivity and sustainable agriculture.',
      val1Title: 'Farmers First', val1Text: 'Every decision and service we build starts with the needs of farmers.',
      val2Title: 'AI Technology', val2Text: 'Using modern AI to make agricultural knowledge easier to access for everyone.',
      val3Title: 'Verified Knowledge', val3Text: 'We only publish verified, science-based information that is genuinely useful for farmers.',
      srEy: 'SEARCH', srTitle: 'Search everything on Beylood',
      srSub: 'Crops, guides, services, news and products — all in one place.',
      srLabel: 'Search the Beylood website',
      srPlaceholder: 'Search crops, products, services, news, or information...',
      srFAll: 'All', srFCrop: 'Crops', srFGuide: 'Guides',
      srFService: 'Services', srFNews: 'News', srFProduct: 'Products',
      srNoResults: 'No results found',
      srTypeMore: 'Start typing to search…',
      srOpen: 'Open',
      srTagCrop: 'Crop', srTagGuide: 'Guide', srTagService: 'Service',
      srTagNews: 'News', srTagProduct: 'Product',
      signInBtn: 'SIGN IN', signUpBtn: 'SIGN UP',
      signInTitle: 'Welcome to Beylood',
      signInSub: 'Sign in to access knowledge and services.',
      signInGoogle: 'Continue with Google', signInOr: 'Or use your email',
      signInEmail: 'Email', signInEmailPh: 'you@example.com',
      signInPass: 'Password',
      signInRemember: 'Remember me', signInForgot: 'Forgot password?',
      signInNoAcc: "Don't have an account?", signUpLink: 'Sign up here',
      signUpTitle: 'Create a New Account',
      signUpSub: 'Start your agricultural knowledge journey — free.',
      signUpGoogle: 'Sign up with Google',
      signUpOr: 'Or create an email account',
      signUpName: 'Full Name', signUpNamePh: 'Your full name',
      signUpPassPh: 'At least 8 characters',
      signUpPass2: 'Confirm Password', signUpPass2Ph: 'Re-enter password',
      signUpBtnFull: 'Create Account',
      signUpHasAcc: 'Already have an account?', signInLink: 'Sign in here'
    },

    ar: {
      label: 'العربية',
      dir: 'rtl',
      navHome: 'الرئيسية', navCats: 'الفئات', navAsk: 'اسأل بيلود',
      navArticles: 'المقالات', navNews: 'الأخبار', navWeather: 'الطقس', navCalc: 'حاسبات المزرعة', navAbout: 'من نحن', navContact: 'اتصل بنا',
      askBtn: 'اسأل بيلود',
      heroEy: 'منصة زراعية',
      heroTitle: 'من الصومال إلى العالم — تطوير الزراعة من خلال المعرفة والابتكار.',
      heroSub: 'تمكين المزارعين من خلال المعرفة الزراعية الموثوقة، وإرشادات حماية المحاصيل، والأخبار الزراعية، والحلول الحديثة من أجل مستقبل زراعي مستدام.',
      ctaPrimary: 'اسأل بيلود الذكي',
      ctaSecondary: 'تصفح التعليم',
      stArticles: 'مقالات', stResearch: 'فئات',
      stUsers: 'لغات', stCountries: 'مساعد ذكي',
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
      visionText: 'أن تصبح منصة Beylood الرائدة في الزراعة الرقمية في الصومال، ثم التوسع إلى العالم من خلال ربط المزارعين بالمعرفة والابتكار والحلول الزراعية المستدامة.',
      missionTitle: 'الرسالة',
      missionText: 'تلتزم Beylood بدعم المزارعين من خلال توفير معرفة زراعية موثوقة، وموارد لحماية المحاصيل، وأخبار زراعية، ومحتوى تعليمي حديث باللغات الإنجليزية والصومالية والعربية لتحسين الإنتاجية وتعزيز الزراعة المستدامة.',
      val1Title: 'المزارع أولاً', val1Text: 'كل قرار وخدمة نبنيها تبدأ من احتياجات المزارع.',
      val2Title: 'تقنية الذكاء الاصطناعي', val2Text: 'نستخدم الذكاء الاصطناعي الحديث لتسهيل الوصول إلى المعرفة الزراعية للجميع.',
      val3Title: 'معرفة موثوقة', val3Text: 'نقدم فقط معلومات موثقة ومبنية على العلم تفيد المزارعين فعلاً.',
      srEy: 'بحث', srTitle: 'ابحث في كل شيء على بَيلود',
      srSub: 'المحاصيل، الأدلة، الخدمات، الأخبار والمنتجات — في مكان واحد.',
      srLabel: 'البحث في موقع بَيلود',
      srPlaceholder: 'ابحث عن المحاصيل أو المنتجات أو الخدمات أو الأخبار أو المعلومات...',
      srFAll: 'الكل', srFCrop: 'المحاصيل', srFGuide: 'الأدلة',
      srFService: 'الخدمات', srFNews: 'الأخبار', srFProduct: 'المنتجات',
      srNoResults: 'لا توجد نتائج',
      srTypeMore: 'ابدأ الكتابة للبحث…',
      srOpen: 'فتح',
      srTagCrop: 'محصول', srTagGuide: 'دليل', srTagService: 'خدمة',
      srTagNews: 'خبر', srTagProduct: 'منتج',
      signInBtn: 'تسجيل الدخول', signUpBtn: 'إنشاء حساب',
      signInTitle: 'مرحباً بك في بَيلود',
      signInSub: 'سجّل الدخول للوصول إلى المعرفة والخدمات.',
      signInGoogle: 'متابعة عبر Google', signInOr: 'أو استخدم بريدك الإلكتروني',
      signInEmail: 'البريد الإلكتروني', signInEmailPh: 'you@example.com',
      signInPass: 'كلمة المرور',
      signInRemember: 'تذكّرني', signInForgot: 'هل نسيت كلمة المرور؟',
      signInNoAcc: 'ليس لديك حساب؟', signUpLink: 'سجّل هنا',
      signUpTitle: 'إنشاء حساب جديد',
      signUpSub: 'ابدأ رحلتك المعرفية في الزراعة — مجاناً.',
      signUpGoogle: 'سجّل عبر Google',
      signUpOr: 'أو أنشئ حساب بريد إلكتروني',
      signUpName: 'الاسم الكامل', signUpNamePh: 'اسمك الكامل',
      signUpPassPh: '8 خانات على الأقل',
      signUpPass2: 'تأكيد كلمة المرور', signUpPass2Ph: 'أعد إدخال كلمة المرور',
      signUpBtnFull: 'إنشاء الحساب',
      signUpHasAcc: 'هل لديك حساب بالفعل؟', signInLink: 'سجّل الدخول هنا'
    },

    sw: {
      label: 'Kiswahili',
      dir: 'ltr',
      navHome: 'Mwanzo', navCats: 'Vikundi', navAsk: 'ULIZA BEYLOOD',
      navArticles: 'Makala', navNews: 'Habari', navWeather: 'Hali ya Hewa', navCalc: 'Vikokotoo vya Shamba', navAbout: 'Kuhusu', navContact: 'Wasiliana',
      askBtn: 'ULIZA BEYLOOD',
      heroEy: 'Jukwaa la Kilimo',
      heroTitle: 'Kutoka Somalia hadi Ulimwenguni - Kukuza Kilimo Kupitia Maarifa na Ubunifu.',
      heroSub: 'Beylood ni jukwaa la lugha nne linalotoa elimu, habari, utafiti, na usaidizi wa AI kwa wakulima na biashara za kilimo.',
      ctaPrimary: 'Uliza Beylood AI',
      ctaSecondary: 'Tazama elimu',
      stArticles: 'Makala', stResearch: 'Vikundi',
      stUsers: 'Lugha', stCountries: 'Msaidizi AI',
      catEy: 'VIKUNDI VYA MAARIFA', catTitle: 'Vikundi vya maarifa',
      catSub: 'Chagua eneo linalokufaa',
      catCrops: 'Mazao',
      catCropsDesc: 'Mahindi, mtama, ufuta, mboga na kila kitu unachokuza.',
      catIrr: 'Umwagiliaji',
      catIrrDesc: 'Jinsi ya kutumia maji kwa ufanisi, mfumo wa drip na unyevu wa udongo.',
      catLive: 'Mifugo',
      catLiveDesc: 'Utunzaji wa wanyama, chakula, na magonjwa ya kawaida.',
      catCli: 'Hali ya hewa',
      catCliDesc: 'Utabiri wa hali ya hewa na mabadiliko ya tabianchi.',
      catSoil: 'Udongo',
      catSoilDesc: 'Matibabu, mbolea, na muundo wa udongo.',
      catPest: 'Wadudu na Magonjwa',
      catPestDesc: 'Tambua na tibu magonjwa na wadudu wa mazao.',
      askEy: 'AI YA KISASA',
      askTitle: 'Uliza Beylood — chochote kuhusu kilimo, kwa lugha yako',
      askSub: 'Andika maswali kwa Kisomali, Kiingereza, Kiarabu au Kiswahili — pata majibu ya haraka yenye msingi wa sayansi.',
      askCta: 'Anza sasa',
      cb1: 'Habari! Una swali kuhusu kilimo?',
      cb2: 'Ninapanda vipi mahindi?',
      feEy: 'MAKALA TEULE', feTitle: 'Makala teule',
      aPill1: 'Mazao', aTitle1: 'Jinsi ya kupanda mahindi msimu wa kiangazi',
      aPill2: 'Umwagiliaji', aTitle2: 'Mbinu mpya za kuokoa maji ya shamba',
      aPill3: 'Magonjwa', aTitle3: 'Dalili za mwanzo za ugonjwa wa majani ya nyanya',
      readTime6: 'dakika 6', readTime4: 'dakika 4', readTime5: 'dakika 5',
      artBack: '← Rudi kwenye makala',
      catBack: '← Rudi kwenye vikundi',
      viewAll: 'Tazama zote →',
      chatWelcome: 'Habari! Mimi ni Beylood AI. Niulize chochote kuhusu kilimo.',
      chatPlaceholder: 'Andika swali lako hapa…',
      chatHint: 'Hii ni AI — tafadhali shauriana na mtaalamu wa kilimo kwa masuala makubwa.',
      chatChip1: 'Ninapanda vipi nyanya katika maeneo ya ukame?',
      chatChip2: 'Ni mbolea gani bora kwa mtama?',
      chatChip3: 'Nigundue vipi magonjwa ya mazao mapema?',
      chatErrGeneric: 'Hitilafu imetokea. Tafadhali jaribu tena.',
      chatErrRate: 'Umefikia kikomo cha ujumbe. Tafadhali jaribu tena baadaye.',
      artPill: 'Wadudu na Magonjwa',
      artTitle: 'Kuzuia Magonjwa ya Nyanya',
      artReadTime: 'dakika 7',
      artLead: 'Magonjwa ya nyanya ni ya kawaida, lakini hatua chache rahisi zitaweka mimea yako salama. Hapa kuna vidokezo 10 vilivyojaribiwa.',
      artTip1Title: 'Zungusha mazao yako.',
      artTip1: 'Magonjwa mengi ya nyanya yanaishi kwenye udongo. Panda nyanya katika eneo tofauti kila mwaka.',
      artTip2Title: 'Ondoa majani yaliyo na maradhi mara moja.',
      artTip2: 'Ukiona majani yenye dalili za magonjwa, yaondoe haraka na uyaweke kwenye taka.',
      artTip3Title: 'Epuka kufanya kazi na mimea iliyo mvua.',
      artTip3: 'Usifanye kazi shambani wakati majani ya nyanya ni mvua kwa sababu magonjwa yanaenea kwa urahisi.',
      artTip4Title: 'Chagua aina sugu kwa magonjwa.',
      artTip4: 'Chagua aina za nyanya zinazostahimili magonjwa ya kawaida.',
      artTip5Title: 'Safisha shamba baada ya mavuno.',
      artTip5: 'Ondoa mabaki yote ya mimea yenye magonjwa. Usiweke mimea iliyoambukizwa kwenye mbolea.',
      artTip6Title: 'Tumia mimea yenye afya kwa msimu ujao.',
      artTip6: 'Ukihifadhi mimea kwa msimu mwingine, hakikisha haina magonjwa kabisa.',
      artTip7Title: 'Toa hewa nzuri.',
      artTip7: 'Acha nafasi ya kutosha kati ya mimea kuboresha mzunguko wa hewa.',
      artTip8Title: 'Tumia mulch karibu na mimea.',
      artTip8: 'Tumia mbolea, majani makavu au nyasi kuzuia magonjwa ya udongo.',
      artTip9Title: 'Hifadhi majani yakiwa makavu.',
      artTip9: 'Mwagilia mimea katika mizizi kwa kutumia drip irrigation.',
      artTip10Title: 'Safisha vyombo vya kupanda.',
      artTip10: 'Ukikuza nyanya katika sufuria, safisha vyombo kwa myeyusho wa bleach 10%.',
      abEy: 'KUHUSU', abTitle: 'Mwanzilishi wa Beylood',
      abBio: 'Mohamed Shafie Mohamed ni mwanzilishi wa Beylood. Amejitolea kuleta maarifa ya kisasa ya kilimo kwa wakulima wa Kisomali, akichanganya teknolojia ya AI na hekima ya jamii.',
      abMission: 'Dhamira yetu ni kuwa jukwaa kuu la maarifa ya kilimo kwa wakulima wa Kisomali, Pembe ya Afrika na Waarabu.',
      fEy: 'Mwanzilishi', fRole: 'Mwanzilishi na Mkurugenzi Mkuu wa Beylood',
      ctEy: 'WASILIANA', ctTitle: 'Wasiliana nasi',
      ctSub: 'Maswali, msaada au ushirikiano — tungependa kukusikia.',
      fTag: 'Maarifa ya Kilimo',
      fAbout: 'Jukwaa la kisasa la kilimo — habari, elimu na mwongozo wa AI.',
      fExplore: 'Chunguza', fCompany: 'Kampuni',
      fRights: 'Haki zote zimehifadhiwa.',
      fBuilt: 'Maarifa ya Kilimo Smart',
      newsEy: 'HABARI ZA KILIMO', newsTitle: 'Habari za Kilimo',
      newsSub: 'Habari za hivi karibuni kuhusu mazao, mifugo, na biashara ya kilimo.',
      newsBack: '← Rudi kwenye habari',
      n1Pill: 'Mazao', n1ReadTime: 'dakika 6',
      n1Title: 'Msimu wa Mvua: Jinsi Wakulima Wanavyojiandaa',
      n1Lead: 'Msimu wa mvua ni fursa kubwa kwa wakulima wa Kisomali. Maandalizi ya mapema ndio ufunguo wa mafanikio.',
      n2Title: 'Mapato ya Shamba: Jinsi ya Kuongeza Faida',
      n2Pill: 'Biashara', n2ReadTime: 'dakika 5',
      n3Title: 'Mifugo na Kilimo: Ushirikiano Mpya', n3Pill: 'Mifugo', n3ReadTime: 'dakika 4',
      n4Title: 'Utabiri wa Hali ya Hewa wa Msimu Ujao', n4Pill: 'Hali ya hewa', n4ReadTime: 'dakika 5',
      n5Title: 'Teknolojia Mpya Inawafikia Wakulima', n5Pill: 'Teknolojia', n5ReadTime: 'dakika 6',
      n6Title: 'Jinsi ya Kuimarisha Udongo Wako: Mwongozo Kamili', n6Pill: 'Udongo', n6ReadTime: 'dakika 7',
      vmEy: 'MAONO NA DHAMIRA', vmTitle: 'Maono na Dhamira Yetu',
      visionTitle: 'Maono',
      visionText: 'Kuwa jukwaa kuu la maarifa ya kilimo katika Pembe ya Afrika na ulimwengu wa Kiarabu — mahali ambapo wakulima wanaweza kupata habari za hivi karibuni, utafiti, na masuluhisho yanayoendeshwa na AI.',
      missionTitle: 'Dhamira',
      missionText: 'Kuleta maarifa ya kisasa ya kilimo kwa wakulima wa Kisomali, Pembe ya Afrika na Waarabu — kwa kuchanganya teknolojia ya AI, habari, na elimu kwa njia inayofikika kwa kila mkulima.',
      val1Title: 'Wakulima Kwanza', val1Text: 'Kila uamuzi na huduma tunayojenga huanza na mahitaji ya wakulima.',
      val2Title: 'Teknolojia ya AI', val2Text: 'Kutumia AI ya kisasa kufanya maarifa ya kilimo kuwa rahisi kupatikana kwa wote.',
      val3Title: 'Maarifa Yaliyothibitishwa', val3Text: 'Tunachapisha tu habari iliyothibitishwa, yenye msingi wa sayansi.',
      srEy: 'TAFUTA', srTitle: 'Tafuta chochote kwenye Beylood',
      srSub: 'Mazao, miongozo, huduma, habari na bidhaa — mahali pamoja.',
      srLabel: 'Tafuta tovuti ya Beylood',
      srPlaceholder: 'Tafuta mazao, bidhaa, huduma, habari, au taarifa...',
      srFAll: 'Zote', srFCrop: 'Mazao', srFGuide: 'Miongozo',
      srFService: 'Huduma', srFNews: 'Habari', srFProduct: 'Bidhaa',
      srNoResults: 'Hakuna matokeo',
      srTypeMore: 'Anza kuandika kutafuta…',
      srOpen: 'Fungua',
      srTagCrop: 'Zao', srTagGuide: 'Mwongozo', srTagService: 'Huduma',
      srTagNews: 'Habari', srTagProduct: 'Bidhaa',
      signInBtn: 'INGIA', signUpBtn: 'JISAJILI',
      signInTitle: 'Karibu Beylood',
      signInSub: 'Ingia kupata maarifa na huduma.',
      signInGoogle: 'Endelea na Google', signInOr: 'Au tumia barua pepe yako',
      signInEmail: 'Barua pepe', signInEmailPh: 'wewe@mfano.com',
      signInPass: 'Nenosiri',
      signInRemember: 'Nikumbuke', signInForgot: 'Umesahau nenosiri?',
      signInNoAcc: 'Huna akaunti?', signUpLink: 'Jisajili hapa',
      signUpTitle: 'Fungua Akaunti Mpya',
      signUpSub: 'Anza safari yako ya maarifa ya kilimo — bure.',
      signUpGoogle: 'Jisajili na Google',
      signUpOr: 'Au fungua akaunti ya barua pepe',
      signUpName: 'Jina Kamili', signUpNamePh: 'Jina lako kamili',
      signUpPassPh: 'Angalau herufi 8',
      signUpPass2: 'Thibitisha Nenosiri', signUpPass2Ph: 'Ingiza nenosiri tena',
      signUpBtnFull: 'Fungua Akaunti',
      signUpHasAcc: 'Tayari una akaunti?', signInLink: 'Ingia hapa'
    }
  };

  const order = ['so', 'en', 'ar', 'sw'];
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
    // If requested lang has no matching span in a group, fall back to Somali.
    document.querySelectorAll('[data-lang]').forEach(el => {
      const elLang = el.getAttribute('data-lang');
      const validLangs = ['so', 'en', 'ar', 'sw'];
      if (!validLangs.includes(elLang)) return;

      let shouldShow = (elLang === code);

      // Fallback: if requested language has no sibling with that data-lang in the
      // same parent, show the Somali version instead.
      if (!shouldShow && elLang === 'so' && el.parentElement) {
        const hasRequested = el.parentElement.querySelector('[data-lang="' + code + '"]');
        if (!hasRequested) shouldShow = true;
      }

      if (shouldShow) {
        el.style.display = '';
        el.removeAttribute('hidden');
      } else {
        el.style.display = 'none';
        el.setAttribute('hidden', '');
      }
    });

    try { localStorage.setItem('beylood_lang', code); } catch (e) { }
  }

  /* ---------- Theme (light / dark) ---------- */
  function applyTheme(t) {
    if (t !== 'dark') t = 'light';
    document.documentElement.setAttribute('data-theme', t);
    try { localStorage.setItem('beylood_theme', t); } catch (e) { }
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    // Restore saved theme or fall back to light
    let savedTheme = 'light';
    try { savedTheme = localStorage.getItem('beylood_theme') || 'light'; } catch (e) { }
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
    try { saved = localStorage.getItem('beylood_lang') || 'so'; } catch (e) { }
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

    // Site search (only on pages that include the search section)
    initSearch();

    // Scroll-reveal animations (premium polish)
    initReveal();

    // News category filter
    initNewsFilter();
  });

  /* ---------- News category filter ---------- */
  function initNewsFilter() {
    const chips = document.querySelectorAll('.news-chip');
    const grid = document.getElementById('newsGrid');
    if (!chips.length || !grid) return;
    const cards = grid.querySelectorAll('.card-article');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => { c.classList.remove('is-active'); c.setAttribute('aria-selected', 'false'); });
        chip.classList.add('is-active');
        chip.setAttribute('aria-selected', 'true');
        const f = chip.getAttribute('data-nfilter');
        cards.forEach(card => {
          const cat = card.getAttribute('data-ncat');
          card.style.display = (f === 'all' || cat === f) ? '' : 'none';
        });
      });
    });
  }

  /* ---------- Scroll-reveal ---------- */
  function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(el => io.observe(el));
  }

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

  /* ---------- Site Search ---------- */
  const SEARCH_INDEX = [
    {
      type: 'crop', url: 'categories.html', keywords: 'galley maize corn ذرة',
      title: { so: 'Galleyda', en: 'Maize', ar: 'الذرة' },
      desc: { so: 'Hagaha beerista galleyda iyo daryeelkeeda.', en: 'Guide to growing and caring for maize.', ar: 'دليل زراعة الذرة والعناية بها.' }
    },
    {
      type: 'crop', url: 'categories.html', keywords: 'tomato yaanyo طماطم',
      title: { so: 'Yaanyada', en: 'Tomatoes', ar: 'الطماطم' },
      desc: { so: 'Beerista yaanyada, biyaynta iyo wakhtiga goosashada.', en: 'Tomato cultivation, watering, and harvest timing.', ar: 'زراعة الطماطم والري ومواعيد الحصاد.' }
    },
    {
      type: 'crop', url: 'categories.html', keywords: 'rice bariis أرز',
      title: { so: 'Bariiska', en: 'Rice', ar: 'الأرز' },
      desc: { so: 'Habab waxtar leh oo lagu beero bariiska.', en: 'Productive methods for growing rice.', ar: 'طرق فعّالة لزراعة الأرز.' }
    },
    {
      type: 'crop', url: 'categories.html', keywords: 'sorghum masago ذرة رفيعة',
      title: { so: 'Masaggada', en: 'Sorghum', ar: 'الذرة الرفيعة' },
      desc: { so: 'Dalag adkaysi leh oo ku habboon abaaraha.', en: 'A drought-resistant crop suited to dry seasons.', ar: 'محصول مقاوم للجفاف ومناسب للمواسم الجافة.' }
    },
    {
      type: 'crop', url: 'categories.html', keywords: 'vegetables khudrad خضروات',
      title: { so: 'Khudradda', en: 'Vegetables', ar: 'الخضروات' },
      desc: { so: 'Khudrad kala duwan oo ku habboon beerta.', en: 'A range of vegetables for the home farm.', ar: 'مجموعة من الخضروات الملائمة للمزرعة.' }
    },
    {
      type: 'guide', url: 'article-preventing-tomato-diseases.html', keywords: 'tomato disease cudur yaanyo مرض طماطم',
      title: { so: 'Ka Hortagga Cudurrada Yaanyada', en: 'Preventing Tomato Diseases', ar: 'الوقاية من أمراض الطماطم' },
      desc: { so: '10 talooyin oo lagu badbaadiyo yaanyada cudurrada.', en: '10 practical tips to keep tomatoes disease-free.', ar: '10 نصائح عملية للوقاية من أمراض الطماطم.' }
    },
    {
      type: 'guide', url: 'article-10-lessons-farmers.html', keywords: 'lessons new farmers cashar beeraley مزارع',
      title: { so: '10 Cashar oo Loo Gudbinayo Beeraleyda Cusub', en: '10 Lessons for New Farmers', ar: '10 دروس للمزارعين الجدد' },
      desc: { so: 'Cashar muhiim ah oo aad u baahan tahay si aad u bilowdo beeritaanka.', en: 'Essential lessons for getting started in farming.', ar: 'دروس أساسية للبدء في الزراعة.' }
    },
    {
      type: 'guide', url: 'category-pests.html', keywords: 'pests cayayaan آفات',
      title: { so: 'Cudurrada & Cayayaanka', en: 'Pests & Diseases', ar: 'الآفات والأمراض' },
      desc: { so: 'Aqoonsiga iyo daawaynta cudurrada dalagga.', en: 'Identify and treat crop diseases and pests.', ar: 'التعرّف على أمراض وآفات المحاصيل وعلاجها.' }
    },
    {
      type: 'guide', url: 'articles.html', keywords: 'irrigation waraab ري',
      title: { so: 'Habaynta Waraabinta', en: 'Irrigation Best Practices', ar: 'أفضل ممارسات الري' },
      desc: { so: 'Sida loo isticmaalo biyaha si hufan iyo biyo-mareenka.', en: 'How to use water efficiently and manage flow.', ar: 'الاستخدام الفعّال للمياه وإدارة التدفق.' }
    },
    {
      type: 'guide', url: 'articles.html', keywords: 'soil carro تربة',
      title: { so: 'Xoojinta Carrada', en: 'Strengthening Your Soil', ar: 'تقوية التربة' },
      desc: { so: 'Sida carrada loo daro nafaqo iyo loo nadiifiyo.', en: 'How to enrich and maintain healthy soil.', ar: 'كيفية إثراء التربة والحفاظ على صحتها.' }
    },
    {
      type: 'service', url: 'ask.html', keywords: 'ai assistant chat caawiye مساعد',
      title: { so: 'Waydii Beylood AI', en: 'Ask Beylood AI', ar: 'اسأل بَيلود الذكاء الاصطناعي' },
      desc: { so: 'Caawiye AI ah oo kuu jawaaba su\'aalaha beeraha.', en: 'AI assistant that answers your farming questions.', ar: 'مساعد ذكاء اصطناعي يجيب على أسئلتك الزراعية.' }
    },
    {
      type: 'service', url: 'categories.html', keywords: 'categories qayb فئات',
      title: { so: 'Sahmin Qaybaha', en: 'Browse Categories', ar: 'تصفّح الفئات' },
      desc: { so: 'Sahmin qaybaha aqoonta beeraha.', en: 'Explore agricultural knowledge categories.', ar: 'استكشف فئات المعرفة الزراعية.' }
    },
    {
      type: 'service', url: 'contact.html', keywords: 'contact xidhiidh اتصال',
      title: { so: 'Nala Soo Xidhiidh', en: 'Contact Beylood', ar: 'تواصل معنا' },
      desc: { so: 'Su\'aalo, taageero ama wadashaqayn.', en: 'Questions, support, or partnership requests.', ar: 'استفسارات أو دعم أو شراكات.' }
    },
    {
      type: 'news', url: 'news-1.html', keywords: 'rainy season roob موسم الأمطار',
      title: { so: 'Xilliga Roobka: Sidee Beeralaydu u Diyaar Garoobaan', en: 'Rainy Season: How Farmers Prepare', ar: 'موسم الأمطار: كيف يستعدّ المزارعون' },
      desc: { so: 'Diyaargarow muhiim ah oo lagu raadinayo guul.', en: 'Essential preparation for a successful season.', ar: 'الاستعداد الأساسي لموسم ناجح.' }
    },
    {
      type: 'news', url: 'news.html', keywords: 'finance lacag تمويل',
      title: { so: 'Lacag-celinta Beeraha', en: 'Agricultural Financing', ar: 'تمويل الزراعة' },
      desc: { so: 'Sida loogu faa\'iido badnaan karo lacag-celinta.', en: 'How to get the most out of agricultural finance.', ar: 'كيفية الاستفادة القصوى من التمويل الزراعي.' }
    },
    {
      type: 'news', url: 'news.html', keywords: 'climate cimilo مناخ',
      title: { so: 'Cimilada: Saadaasha Xilliga Dambe', en: 'Climate Forecast for the Coming Season', ar: 'توقعات المناخ للموسم القادم' },
      desc: { so: 'Saadaasha hawada iyo waxa ay micnaheedu yihiin beeralayda.', en: 'Forecast and what it means for farmers.', ar: 'التوقعات وما تعنيه للمزارعين.' }
    },
    {
      type: 'news', url: 'news.html', keywords: 'technology tignoolajiyada تكنولوجيا',
      title: { so: 'Tignoolajiyada Cusub oo Gaadhay Beeralayda', en: 'New Technology Reaches Farmers', ar: 'التكنولوجيا الجديدة تصل إلى المزارعين' },
      desc: { so: 'Innovation cusub oo wax ka beddelaysa beerta.', en: 'New innovations changing the farm.', ar: 'ابتكارات جديدة تغيّر المزرعة.' }
    },
    {
      type: 'product', url: 'categories.html', keywords: 'seeds iniin بذور',
      title: { so: 'Iniinaha Tayada Sare', en: 'Premium Seeds', ar: 'بذور ممتازة' },
      desc: { so: 'Iniin la xulay si aad u guuleysato.', en: 'Hand-selected seeds for better yields.', ar: 'بذور مختارة بعناية لمحصول أفضل.' }
    },
    {
      type: 'product', url: 'categories.html', keywords: 'fertilizer bacrin سماد',
      title: { so: 'Bacrinta Casriga ah', en: 'Modern Fertilizers', ar: 'الأسمدة الحديثة' },
      desc: { so: 'Bacrin nafaqo leh oo carrada ku habboon.', en: 'Nutrient-rich fertilizer suited to your soil.', ar: 'أسمدة غنية بالعناصر مناسبة لتربتك.' }
    },
    {
      type: 'product', url: 'categories.html', keywords: 'drip irrigation kit waraab tuubo ري بالتنقيط',
      title: { so: 'Qalabka Drip Irrigation', en: 'Drip Irrigation Kit', ar: 'مجموعة الري بالتنقيط' },
      desc: { so: 'Qalab biyaha si hufan u maamula.', en: 'Equipment that uses water efficiently.', ar: 'معدّات تستخدم المياه بكفاءة.' }
    },
    {
      type: 'product', url: 'categories.html', keywords: 'tools qalab أدوات',
      title: { so: 'Qalabka Beerta', en: 'Farm Tools', ar: 'أدوات المزرعة' },
      desc: { so: 'Qalab adkaysi leh oo wax ku ool ah.', en: 'Durable, practical farm tools.', ar: 'أدوات متينة وعملية للمزرعة.' }
    }
  ];

  function initSearch() {
    const input = document.getElementById('siteSearch');
    const suggest = document.getElementById('searchSuggest');
    const results = document.getElementById('searchResults');
    const clearBtn = document.getElementById('searchClear');
    const filters = document.querySelectorAll('.filter-chip');
    if (!input || !suggest || !results) return;

    let activeFilter = 'all';
    let suggestIndex = -1;

    function getLang() {
      return dict[document.documentElement.lang] || dict.so;
    }
    function tagLabel(type) {
      const t = getLang();
      return ({ crop: t.srTagCrop, guide: t.srTagGuide, service: t.srTagService, news: t.srTagNews, product: t.srTagProduct })[type] || type;
    }
    function escapeHtml(s) {
      return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }
    function highlight(text, q) {
      const safe = escapeHtml(text);
      if (!q) return safe;
      const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      return safe.replace(re, '<mark class="sr-hl">$1</mark>');
    }
    function localizedTitle(item) { const code = document.documentElement.lang || 'so'; return item.title[code] || item.title.so; }
    function localizedDesc(item) { const code = document.documentElement.lang || 'so'; return item.desc[code] || item.desc.so; }

    function score(item, q) {
      const t = (localizedTitle(item) + ' ' + localizedDesc(item) + ' ' + (item.keywords || '')).toLowerCase();
      const needle = q.toLowerCase();
      if (!t.includes(needle)) return 0;
      let s = 1;
      if (localizedTitle(item).toLowerCase().includes(needle)) s += 5;
      if (localizedTitle(item).toLowerCase().startsWith(needle)) s += 5;
      return s;
    }

    function search(q) {
      return SEARCH_INDEX
        .filter(i => activeFilter === 'all' || i.type === activeFilter)
        .map(i => ({ i, s: score(i, q) }))
        .filter(x => x.s > 0)
        .sort((a, b) => b.s - a.s)
        .map(x => x.i);
    }

    function iconSvg() {
      return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>';
    }

    function renderSuggestions(q) {
      const matches = search(q).slice(0, 7);
      suggestIndex = -1;
      if (!matches.length) {
        suggest.innerHTML = '<div class="suggest-empty">' + escapeHtml(getLang().srNoResults) + '</div>';
      } else {
        suggest.innerHTML = matches.map((m, idx) =>
          '<a class="suggest-item" role="option" data-idx="' + idx + '" href="' + m.url + '">' +
          '<span class="suggest-icon">' + iconSvg() + '</span>' +
          '<span class="suggest-text">' +
          '<span class="suggest-title">' + highlight(localizedTitle(m), q) + '</span>' +
          '<span class="suggest-sub">' + highlight(localizedDesc(m), q) + '</span>' +
          '</span>' +
          '<span class="suggest-tag">' + escapeHtml(tagLabel(m.type)) + '</span>' +
          '</a>'
        ).join('');
      }
      suggest.hidden = false;
      input.setAttribute('aria-expanded', 'true');
    }

    function renderResults(q) {
      if (!q) { results.innerHTML = ''; return; }
      const matches = search(q);
      if (!matches.length) {
        results.innerHTML = '<div class="suggest-empty" style="grid-column:1/-1;">' + escapeHtml(getLang().srNoResults) + '</div>';
        return;
      }
      results.innerHTML = matches.map(m =>
        '<a class="result-card" href="' + m.url + '">' +
        '<span class="result-tag">' + escapeHtml(tagLabel(m.type)) + '</span>' +
        '<h3 class="result-title">' + highlight(localizedTitle(m), q) + '</h3>' +
        '<p class="result-desc">' + highlight(localizedDesc(m), q) + '</p>' +
        '<span class="result-link">' + escapeHtml(getLang().srOpen) + ' →</span>' +
        '</a>'
      ).join('');
    }

    function closeSuggest() {
      suggest.hidden = true;
      input.setAttribute('aria-expanded', 'false');
      suggestIndex = -1;
      Array.from(suggest.querySelectorAll('.suggest-item')).forEach(el => el.classList.remove('is-active'));
    }

    function setActive(idx) {
      const items = suggest.querySelectorAll('.suggest-item');
      if (!items.length) return;
      suggestIndex = (idx + items.length) % items.length;
      items.forEach((el, i) => el.classList.toggle('is-active', i === suggestIndex));
      items[suggestIndex].scrollIntoView({ block: 'nearest' });
    }

    let debounceId;
    input.addEventListener('input', () => {
      const q = input.value.trim();
      clearBtn.hidden = !q;
      clearTimeout(debounceId);
      debounceId = setTimeout(() => {
        if (!q) { closeSuggest(); results.innerHTML = ''; return; }
        renderSuggestions(q);
        renderResults(q);
      }, 90);
    });

    input.addEventListener('focus', () => {
      const q = input.value.trim();
      if (q) renderSuggestions(q);
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); if (suggest.hidden) renderSuggestions(input.value.trim()); setActive(suggestIndex + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(suggestIndex - 1); }
      else if (e.key === 'Enter') {
        const items = suggest.querySelectorAll('.suggest-item');
        if (suggestIndex >= 0 && items[suggestIndex]) {
          e.preventDefault();
          window.location.href = items[suggestIndex].getAttribute('href');
        }
      } else if (e.key === 'Escape') {
        closeSuggest();
        input.blur();
      }
    });

    clearBtn.addEventListener('click', () => {
      input.value = '';
      clearBtn.hidden = true;
      results.innerHTML = '';
      closeSuggest();
      input.focus();
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-shell')) closeSuggest();
    });

    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        filters.forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
        activeFilter = btn.getAttribute('data-filter') || 'all';
        const q = input.value.trim();
        if (q) { renderSuggestions(q); renderResults(q); }
      });
    });

    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        input.focus();
        input.select();
      }
    });
  }
})();

/* ============================================================
   Security: CSP-safe event handlers
   ------------------------------------------------------------
   These replace the inline onclick/onsubmit attributes that used
   to live in the HTML. Removing inline handlers lets us run a
   strict Content-Security-Policy (script-src 'self' …) with NO
   'unsafe-inline', which is a strong defense against XSS.
   ============================================================ */
(function () {
  // ---- Password show/hide toggle (was inline onclick) ----
  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('.auth-pass-toggle[data-toggle]') : null;
    if (!btn) return;
    var input = document.getElementById(btn.getAttribute('data-toggle'));
    if (input) input.type = input.type === 'password' ? 'text' : 'password';
  });

  // ---- Stop the homepage search form from reloading the page ----
  document.addEventListener('submit', function (e) {
    if (e.target && e.target.classList && e.target.classList.contains('search-shell')) {
      e.preventDefault();
    }
  });

  // ---- Contact form: validate + sanitize, then open the mail client ----
  var cf = document.getElementById('contactForm');
  if (cf) {
    var lang = function () { return document.documentElement.lang || 'so'; };
    var t = function (map) { return map[lang()] || map.en; };
    var val = function (id) { var el = document.getElementById(id); return el ? el.value : ''; };
    // Collapse newlines (header-injection safety) and cap length.
    var clean = function (s, max) { return String(s || '').replace(/[\r\n]+/g, ' ').trim().slice(0, max || 200); };
    var isEmail = function (x) { x = String(x || '').trim(); return x.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x); };

    cf.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = document.getElementById('contactMsg');
      var name = clean(val('cfName'), 80);
      var email = String(val('cfEmail') || '').trim();
      var subject = clean(val('cfSubject'), 120);
      var body = String(val('cfMessage') || '').trim().slice(0, 3000);

      if (!name || !isEmail(email) || !body) {
        if (msg) {
          msg.classList.add('is-error');
          msg.textContent = t({
            so: 'Fadlan buuxi magaca, iimayl sax ah, iyo farriinta.',
            en: 'Please fill in your name, a valid email, and a message.',
            ar: 'يرجى إدخال الاسم وبريد صحيح ورسالة.',
            sw: 'Tafadhali jaza jina, barua pepe sahihi, na ujumbe.'
          });
        }
        return;
      }

      var to = cf.getAttribute('data-mailto') || '';
      var mailBody = 'Magaca/Name: ' + name + '\r\nIimaylka/Email: ' + email + '\r\n\r\n' + body;
      var href = 'mailto:' + to +
        '?subject=' + encodeURIComponent(subject || ('Beylood — ' + name)) +
        '&body=' + encodeURIComponent(mailBody);

      if (msg) {
        msg.classList.remove('is-error');
        msg.textContent = t({
          so: 'Waxaa la furayaa email-kaaga si farriinta loo diro…',
          en: 'Opening your email app to send…',
          ar: 'يتم فتح تطبيق البريد لإرسال رسالتك…',
          sw: 'Inafungua programu yako ya barua pepe…'
        });
      }
      window.location.href = href;
    });
  }
})();
