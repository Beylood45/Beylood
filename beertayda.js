/* ============================================================
   Beylood — "Beertayda" (My Farm planner)
   ------------------------------------------------------------
   External file (CSP-safe: script-src 'self'). No inline script.
   Farmers register their crops + planting date; the tool builds a
   personal timeline (germination → growth → flowering → harvest),
   shows the current phase, days-to-harvest, and the next task.
   Data is saved in localStorage (offline, free, private to the
   device). No backend, no paid service.
   ============================================================ */
(function () {
  'use strict';

  var LS_KEY = 'beylood_farm_v1';
  var DAY = 86400000;

  /* ---- Crop knowledge (aligned with the Crop Calendar) --------------- */
  /* dmin/dmax = days to harvest; plant = typical planting months (0=Jan);
     grp = group id for the picker. Values are general guides for Somalia. */
  var GROUPS = [
    { id:'cereal',  name:{so:'Hadhuudh',          en:'Cereals',        ar:'الحبوب',            sw:'Nafaka'} },
    { id:'legume',  name:{so:'Digir',             en:'Legumes',        ar:'البقوليات',         sw:'Mikunde'} },
    { id:'oilseed', name:{so:'Saliid',            en:'Oilseeds',       ar:'البذور الزيتية',    sw:'Mbegu za mafuta'} },
    { id:'veg',     name:{so:'Khudaar',           en:'Vegetables',     ar:'الخضروات',          sw:'Mboga'} },
    { id:'root',    name:{so:'Xididada & Godada', en:'Roots & Tubers', ar:'الجذور والدرنات',   sw:'Mizizi'} },
    { id:'cash',    name:{so:'Dalagyo kale',      en:'Other crops',    ar:'محاصيل أخرى',       sw:'Mazao mengine'} }
  ];
  var CROPS = [
    /* --- Cereals --- */
    { id:'maize',      grp:'cereal', name:{so:'Galley',         en:'Maize',       ar:'الذرة',            sw:'Mahindi'},   dmin:90,  dmax:120, water:'500–800mm',  plant:[3,9] },
    { id:'sorghum',    grp:'cereal', name:{so:'Masago',         en:'Sorghum',     ar:'الذرة الرفيعة',    sw:'Mtama'},     dmin:90,  dmax:120, water:'400–600mm',  plant:[3,9] },
    { id:'pearlmillet',grp:'cereal', name:{so:'Dawa (masaggo)', en:'Pearl millet',ar:'الدخن',            sw:'Uwele'},     dmin:75,  dmax:100, water:'350–500mm',  plant:[3,9] },
    { id:'rice',       grp:'cereal', name:{so:'Bariis',         en:'Rice',        ar:'الأرز',            sw:'Mchele'},    dmin:110, dmax:140, water:'1200–1500mm',plant:[6] },
    { id:'wheat',      grp:'cereal', name:{so:'Qamadi',         en:'Wheat',       ar:'القمح',            sw:'Ngano'},     dmin:100, dmax:130, water:'400–600mm',  plant:[9,10] },
    { id:'barley',     grp:'cereal', name:{so:'Shaciir',        en:'Barley',      ar:'الشعير',           sw:'Shayiri'},   dmin:90,  dmax:120, water:'400–600mm',  plant:[9,10] },
    /* --- Legumes --- */
    { id:'cowpea',     grp:'legume', name:{so:'Digir',          en:'Cowpea',      ar:'اللوبيا',          sw:'Kunde'},     dmin:60,  dmax:90,  water:'300–500mm',  plant:[3,9] },
    { id:'greengram',  grp:'legume', name:{so:'Digir cagaaran', en:'Green gram',  ar:'الماش',            sw:'Choroko'},   dmin:60,  dmax:90,  water:'350–550mm',  plant:[3,9] },
    { id:'beans',      grp:'legume', name:{so:'Digiryaal',      en:'Beans',       ar:'الفاصوليا',        sw:'Maharage'},  dmin:75,  dmax:95,  water:'300–500mm',  plant:[3,9] },
    { id:'greenbeans', grp:'legume', name:{so:'Digir qoyan',    en:'Green beans', ar:'الفاصوليا الخضراء',sw:'Maharage mabichi'}, dmin:55, dmax:70, water:'300–450mm', plant:[3,9] },
    { id:'groundnut',  grp:'legume', name:{so:'Loox (fuul)',    en:'Groundnut',   ar:'الفول السوداني',   sw:'Karanga'},   dmin:90,  dmax:120, water:'500–700mm',  plant:[3,9] },
    { id:'chickpea',   grp:'legume', name:{so:'Baqeyle',        en:'Chickpea',    ar:'الحمص',            sw:'Dengu'},     dmin:90,  dmax:120, water:'300–400mm',  plant:[9,10] },
    { id:'lentil',     grp:'legume', name:{so:'Misir',          en:'Lentil',      ar:'العدس',            sw:'Adesi'},     dmin:100, dmax:120, water:'300–400mm',  plant:[9,10] },
    { id:'soybean',    grp:'legume', name:{so:'Soybean',        en:'Soybean',     ar:'فول الصويا',       sw:'Soya'},      dmin:90,  dmax:120, water:'450–700mm',  plant:[3,9] },
    { id:'pigeonpea',  grp:'legume', name:{so:'Digir geed',     en:'Pigeon pea',  ar:'البازلاء الهندية', sw:'Mbaazi'},    dmin:120, dmax:180, water:'400–600mm',  plant:[3] },
    /* --- Oilseeds --- */
    { id:'sesame',     grp:'oilseed',name:{so:'Simsim',         en:'Sesame',      ar:'السمسم',           sw:'Ufuta'},     dmin:90,  dmax:120, water:'400–600mm',  plant:[3,4] },
    { id:'sunflower',  grp:'oilseed',name:{so:'Iniin qorrax',   en:'Sunflower',   ar:'عباد الشمس',       sw:'Alizeti'},   dmin:90,  dmax:120, water:'500–700mm',  plant:[3,9] },
    { id:'castor',     grp:'oilseed',name:{so:'Khirwac',        en:'Castor',      ar:'الخروع',           sw:'Mbarika'},   dmin:140, dmax:180, water:'400–600mm',  plant:[3] },
    /* --- Vegetables --- */
    { id:'tomato',     grp:'veg',    name:{so:'Yaanyo',         en:'Tomato',      ar:'الطماطم',          sw:'Nyanya'},    dmin:70,  dmax:90,  water:'400–600mm',  plant:[9] },
    { id:'onion',      grp:'veg',    name:{so:'Basal',          en:'Onion',       ar:'البصل',            sw:'Vitunguu'},  dmin:90,  dmax:120, water:'350–550mm',  plant:[9,10] },
    { id:'pepper',     grp:'veg',    name:{so:'Basbaas',        en:'Chili',       ar:'الفلفل الحار',     sw:'Pilipili'},  dmin:90,  dmax:120, water:'600–900mm',  plant:[9] },
    { id:'sweetpepper',grp:'veg',    name:{so:'Barbarooni',     en:'Sweet pepper',ar:'الفلفل الحلو',     sw:'Pilipili hoho'}, dmin:90, dmax:120, water:'500–700mm', plant:[9] },
    { id:'eggplant',   grp:'veg',    name:{so:'Biyaan',         en:'Eggplant',    ar:'الباذنجان',        sw:'Biringanya'},dmin:90,  dmax:120, water:'600–800mm',  plant:[9,10] },
    { id:'okra',       grp:'veg',    name:{so:'Bamiye',         en:'Okra',        ar:'البامية',          sw:'Bamia'},     dmin:50,  dmax:65,  water:'400–600mm',  plant:[3] },
    { id:'cabbage',    grp:'veg',    name:{so:'Kaabash',        en:'Cabbage',     ar:'الملفوف',          sw:'Kabichi'},   dmin:70,  dmax:100, water:'350–500mm',  plant:[9,10] },
    { id:'carrot',     grp:'veg',    name:{so:'Karooto',        en:'Carrot',      ar:'الجزر',            sw:'Karoti'},    dmin:70,  dmax:100, water:'350–500mm',  plant:[9,10] },
    { id:'spinach',    grp:'veg',    name:{so:'Isbinaaj',       en:'Spinach',     ar:'السبانخ',          sw:'Mchicha'},   dmin:30,  dmax:45,  water:'300–450mm',  plant:[] },
    { id:'lettuce',    grp:'veg',    name:{so:'Salad (khas)',   en:'Lettuce',     ar:'الخس',             sw:'Saladi'},    dmin:45,  dmax:65,  water:'300–450mm',  plant:[] },
    { id:'kale',       grp:'veg',    name:{so:'Doolshe',        en:'Kale',        ar:'الكرنب',           sw:'Sukuma wiki'},dmin:55, dmax:75,  water:'350–500mm',  plant:[] },
    { id:'cucumber',   grp:'veg',    name:{so:'Khiyaar',        en:'Cucumber',    ar:'الخيار',           sw:'Tango'},     dmin:50,  dmax:70,  water:'400–600mm',  plant:[3,9] },
    { id:'pumpkin',    grp:'veg',    name:{so:'Bocor',          en:'Pumpkin',     ar:'اليقطين',          sw:'Malenge'},   dmin:90,  dmax:120, water:'400–600mm',  plant:[3,9] },
    { id:'zucchini',   grp:'veg',    name:{so:'Kuusa',          en:'Zucchini',    ar:'الكوسة',           sw:"Mung'unya"}, dmin:45,  dmax:60,  water:'400–600mm',  plant:[3,9] },
    { id:'garlic',     grp:'veg',    name:{so:'Toon',           en:'Garlic',      ar:'الثوم',            sw:'Kitunguu saumu'}, dmin:120, dmax:150, water:'350–500mm', plant:[9,10] },
    { id:'beetroot',   grp:'veg',    name:{so:'Beetroot',       en:'Beetroot',    ar:'الشمندر',          sw:'Biti'},      dmin:60,  dmax:80,  water:'350–500mm',  plant:[9,10] },
    { id:'watermelon', grp:'veg',    name:{so:'Xabxab',         en:'Watermelon',  ar:'البطيخ',           sw:'Tikitimaji'},dmin:80,  dmax:100, water:'400–600mm',  plant:[1] },
    { id:'sweetmelon', grp:'veg',    name:{so:'Shammaam',       en:'Sweet melon', ar:'الشمام',           sw:'Tikitimaji tamu'}, dmin:75, dmax:90, water:'400–600mm', plant:[1,9] },
    /* --- Roots & tubers --- */
    { id:'potato',     grp:'root',   name:{so:'Baradho',        en:'Potato',      ar:'البطاطس',          sw:'Viazi'},     dmin:90,  dmax:120, water:'500–700mm',  plant:[10] },
    { id:'sweetpotato',grp:'root',   name:{so:'Baradho macaan', en:'Sweet potato',ar:'البطاطا الحلوة',   sw:'Viazi vitamu'}, dmin:90, dmax:120, water:'450–650mm', plant:[3,9] },
    { id:'cassava',    grp:'root',   name:{so:'Mihiid (cassava)',en:'Cassava',    ar:'الكسافا',          sw:'Muhogo'},    dmin:240, dmax:330, water:'500–800mm',  plant:[3,9] },
    /* --- Other / cash --- */
    { id:'sugarcane',  grp:'cash',   name:{so:'Qasab sonkor',   en:'Sugarcane',   ar:'قصب السكر',        sw:'Miwa'},      dmin:300, dmax:365, water:'1500–2500mm',plant:[3,9] },
    { id:'cotton',     grp:'cash',   name:{so:'Cudbi',          en:'Cotton',      ar:'القطن',            sw:'Pamba'},     dmin:150, dmax:180, water:'700–900mm',  plant:[3] }
  ];
  var CROP_BY_ID = {};
  CROPS.forEach(function (c) { CROP_BY_ID[c.id] = c; });

  /* ---- UI strings (4 languages) ------------------------------------- */
  var UI = {
    phasePlanned:  {so:'La qorsheeyay',   en:'Planned',      ar:'مُخطط',        sw:'Imepangwa'},
    phaseGerm:     {so:'Soo-baxid',       en:'Germination',  ar:'الإنبات',      sw:'Kuota'},
    phaseGrow:     {so:'Koritaan',        en:'Growing',      ar:'النمو',        sw:'Kukua'},
    phaseFlower:   {so:'Ubax & midho',    en:'Flowering',    ar:'الإزهار',      sw:'Maua'},
    phaseHarvest:  {so:'Diyaar gurasho',  en:'Ready to harvest', ar:'جاهز للحصاد', sw:'Tayari kuvuna'},
    phaseOverdue:  {so:'Gurashada waa dhaaftay', en:'Harvest overdue', ar:'تأخر الحصاد', sw:'Mavuno yamechelewa'},

    taskPlant:     {so:'Beero maanta/goorta la qorsheeyay. Diyaari ciidda oo qoyi.', en:'Plant on the planned date. Prepare and moisten the soil.', ar:'ازرع في الموعد المخطط. جهّز التربة ورطّبها.', sw:'Panda tarehe iliyopangwa. Andaa na lowanisha udongo.'},
    taskGerm:      {so:'Ilaali qoyaanka ciidda — biyee si fudud oo joogto ah ilaa iniinuhu ka soo baxaan.', en:'Keep the soil moist — water lightly and regularly until seedlings emerge.', ar:'حافظ على رطوبة التربة — اسقِ بخفة وانتظام حتى تظهر البادرات.', sw:'Weka udongo unyevu — mwagilia kidogo hadi miche itokee.'},
    taskGrow:      {so:'Biyee si joogto ah, ka saar haramaha, oo bacrin dul-saar (top-dress) marka uu koray ~30 maalmood.', en:'Water regularly, remove weeds, and top-dress with fertilizer around 30 days.', ar:'اسقِ بانتظام، أزل الأعشاب، وأضف سماداً علوياً حوالي 30 يوماً.', sw:'Mwagilia mara kwa mara, ondoa magugu, na ongeza mbolea ya juu karibu siku 30.'},
    taskFlower:    {so:'Xilliga ubaxa & midhaynta — biyo ku filan, ilaali cayayaanka, ha oofin biyaha.', en:'Flowering & fruiting — ensure enough water, watch for pests, don’t let it dry.', ar:'الإزهار والإثمار — وفّر ماءً كافياً، راقب الآفات، لا تدعه يجف.', sw:'Maua na matunda — hakikisha maji ya kutosha, angalia wadudu, usiache likauke.'},
    taskHarvest:   {so:'Waa la gooyn karaa! Guro inta aan tayadu dhicin.', en:'Ready to harvest! Pick before quality drops.', ar:'جاهز للحصاد! احصد قبل أن تنخفض الجودة.', sw:'Tayari kuvuna! Vuna kabla ubora haujashuka.'},
    taskOverdue:   {so:'Waqtiga gurashadu wuu dhaafay — guro dhaqso oo diyaari beerta xigta.', en:'Harvest window has passed — harvest now and prepare the next planting.', ar:'انقضى موعد الحصاد — احصد الآن وجهّز الزراعة التالية.', sw:'Muda wa mavuno umepita — vuna sasa na andaa upandaji ujao.'},

    lblDay:        {so:'maalmo',          en:'days',         ar:'يوم',          sw:'siku'},
    lblSince:      {so:'Maalmaha laga beeray', en:'Days since planting', ar:'أيام منذ الزراعة', sw:'Siku tangu kupanda'},
    lblToHarvest:  {so:'Maalmo u haray gurashada', en:'Days to harvest', ar:'أيام حتى الحصاد', sw:'Siku hadi mavuno'},
    lblHarvestWin: {so:'Xilliga gurashada', en:'Harvest window', ar:'موعد الحصاد', sw:'Kipindi cha mavuno'},
    lblWater:      {so:'Biyaha xilliga',  en:'Season water', ar:'ماء الموسم',   sw:'Maji ya msimu'},
    lblPlanted:    {so:'La beeray',       en:'Planted',      ar:'زُرع',         sw:'Ilipandwa'},
    lblNext:       {so:'Talaabada xigta', en:'Next step',    ar:'الخطوة التالية', sw:'Hatua inayofuata'},
    lblRemove:     {so:'Ka saar',         en:'Remove',       ar:'إزالة',        sw:'Ondoa'},
    confirmRemove: {so:'Ka saar dalagkan Beertaada?', en:'Remove this crop from your farm?', ar:'إزالة هذا المحصول من مزرعتك؟', sw:'Ondoa zao hili shambani mwako?'},
    emptyTitle:    {so:'Beertaadu weli waa faaruq', en:'Your farm is empty', ar:'مزرعتك فارغة', sw:'Shamba lako ni tupu'},
    emptyText:     {so:'Ku dar dalagkaaga koowaad — dooro dalag, geli taariikhda aad beertay, kadibna waxaad heli doontaa jadwal shakhsi ah oo xasuusin ah.', en:'Add your first crop — choose a crop, enter the date you planted, and get a personal timeline with reminders.', ar:'أضف أول محصول لك — اختر محصولاً، أدخل تاريخ الزراعة، واحصل على جدول زمني شخصي مع تذكيرات.', sw:'Ongeza zao lako la kwanza — chagua zao, weka tarehe uliyopanda, upate ratiba binafsi yenye vikumbusho.'},
    summaryNone:   {so:'Ma jiraan hawlo degdeg ah maanta.', en:'No urgent tasks today.', ar:'لا مهام عاجلة اليوم.', sw:'Hakuna kazi za haraka leo.'},
    summaryTitle:  {so:'Waxa maanta lagaa filayo', en:'What needs you today', ar:'ما يحتاجك اليوم', sw:'Kinachohitaji leo'},
    overdueTag:    {so:'Degdeg', en:'Urgent', ar:'عاجل', sw:'Haraka'},
    fieldLabel:    {so:'Beerta (ikhtiyaari)', en:'Field name (optional)', ar:'اسم الحقل (اختياري)', sw:'Jina la shamba (hiari)'}
  };

  function lang() { try { return localStorage.getItem('beylood_lang') || 'so'; } catch (e) { return 'so'; } }
  function t(o) { return (o && (o[lang()] || o.so)) || ''; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (m) { return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]); }); }

  /* ---- Storage ------------------------------------------------------- */
  function load() {
    try { var a = JSON.parse(localStorage.getItem(LS_KEY) || '[]'); return Array.isArray(a) ? a : []; }
    catch (e) { return []; }
  }
  function save(arr) { try { localStorage.setItem(LS_KEY, JSON.stringify(arr)); } catch (e) {} }

  /* ---- Date helpers -------------------------------------------------- */
  function today0() { var d = new Date(); d.setHours(0,0,0,0); return d; }
  function parseDate(s) { var p = String(s).split('-'); return new Date(+p[0], (+p[1]) - 1, +p[2]); }
  function fmtDate(d) {
    try { return d.toLocaleDateString(lang() === 'ar' ? 'ar' : (lang() === 'sw' ? 'sw' : 'en-GB'), { day:'numeric', month:'short', year:'numeric' }); }
    catch (e) { return d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate(); }
  }
  function addDays(d, n) { var x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; }

  /* ---- Core computation ---------------------------------------------- */
  function compute(entry) {
    var crop = CROP_BY_ID[entry.cropId];
    if (!crop) return null;
    var plant = parseDate(entry.plantDate);
    var now = today0();
    var daysSince = Math.round((now - plant) / DAY);
    var hStart = addDays(plant, crop.dmin);
    var hEnd = addDays(plant, crop.dmax);
    var toHarvest = Math.round((hStart - now) / DAY);
    var pct = Math.max(0, Math.min(100, Math.round((daysSince / crop.dmax) * 100)));

    var phaseKey, taskKey, urgent = false;
    var germEnd = Math.min(12, Math.round(crop.dmax * 0.15));
    var growEnd = Math.round(crop.dmax * 0.60);

    if (daysSince < 0)           { phaseKey='phasePlanned'; taskKey='taskPlant'; pct=0; }
    else if (daysSince <= germEnd){ phaseKey='phaseGerm';    taskKey='taskGerm'; }
    else if (daysSince <= growEnd){ phaseKey='phaseGrow';    taskKey='taskGrow'; }
    else if (daysSince < crop.dmin){ phaseKey='phaseFlower'; taskKey='taskFlower'; }
    else if (daysSince <= crop.dmax){ phaseKey='phaseHarvest'; taskKey='taskHarvest'; urgent=true; }
    else                          { phaseKey='phaseOverdue'; taskKey='taskOverdue'; pct=100; urgent=true; }

    return { crop:crop, plant:plant, daysSince:daysSince, hStart:hStart, hEnd:hEnd,
             toHarvest:toHarvest, pct:pct, phaseKey:phaseKey, taskKey:taskKey, urgent:urgent };
  }

  /* ---- Rendering ----------------------------------------------------- */
  var elList, elSummary, elSelect, elDate, elField, elForm, elCount;

  function phaseColor(key) {
    return { phasePlanned:'#6B7280', phaseGerm:'#3BA935', phaseGrow:'#C0862D',
             phaseFlower:'#1E5BB0', phaseHarvest:'#EF9F27', phaseOverdue:'#C0392B' }[key] || '#3BA935';
  }

  function cardHTML(entry, c) {
    var name = t(entry.crop ? entry.crop.name : entry.crop);
    // c = computed
    var col = phaseColor(c.phaseKey);
    var field = entry.field ? '<span class="byf-field">' + esc(entry.field) + '</span>' : '';
    var toH;
    if (c.phaseKey === 'phasePlanned') toH = '—';
    else if (c.daysSince >= c.crop.dmin) toH = '0';
    else toH = String(c.toHarvest);

    return '' +
      '<article class="byf-card" data-id="' + esc(entry.id) + '">' +
        '<div class="byf-card-top">' +
          '<div class="byf-card-title"><b>' + esc(name) + '</b>' + field + '</div>' +
          '<span class="byf-phase" style="background:' + col + '">' + esc(t(UI[c.phaseKey])) +
            (c.urgent ? ' • ' + esc(t(UI.overdueTag)) : '') + '</span>' +
        '</div>' +
        '<div class="byf-bar"><span style="width:' + c.pct + '%;background:' + col + '"></span></div>' +
        '<div class="byf-stats">' +
          '<div><small>' + esc(t(UI.lblSince)) + '</small><b>' + (c.daysSince < 0 ? '—' : c.daysSince) + ' ' + esc(t(UI.lblDay)) + '</b></div>' +
          '<div><small>' + esc(t(UI.lblToHarvest)) + '</small><b>' + toH + ' ' + esc(t(UI.lblDay)) + '</b></div>' +
          '<div><small>' + esc(t(UI.lblHarvestWin)) + '</small><b>' + esc(fmtDate(c.hStart)) + ' – ' + esc(fmtDate(c.hEnd)) + '</b></div>' +
          '<div><small>' + esc(t(UI.lblWater)) + '</small><b>' + esc(c.crop.water) + '</b></div>' +
        '</div>' +
        '<div class="byf-next"><span class="byf-next-lbl">' + esc(t(UI.lblNext)) + '</span> ' + esc(t(UI[c.taskKey])) + '</div>' +
        '<div class="byf-card-foot">' +
          '<span class="byf-planted">' + esc(t(UI.lblPlanted)) + ': ' + esc(fmtDate(c.plant)) + '</span>' +
          '<button type="button" class="byf-remove" data-id="' + esc(entry.id) + '">' + esc(t(UI.lblRemove)) + '</button>' +
        '</div>' +
      '</article>';
  }

  function render() {
    var farm = load();
    // Select options (grouped by GROUPS into <optgroup>s)
    if (elSelect && !elSelect.dataset.filled) {
      var opts = '<option value="" disabled selected></option>';
      GROUPS.forEach(function (g) {
        var members = CROPS.filter(function (c) { return c.grp === g.id; });
        if (!members.length) return;
        opts += '<optgroup label="' + esc(t(g.name)) + '" data-grp="' + g.id + '">';
        members.forEach(function (c) { opts += '<option value="' + c.id + '">' + esc(t(c.name)) + '</option>'; });
        opts += '</optgroup>';
      });
      elSelect.innerHTML = opts;
      elSelect.dataset.filled = '1';
    } else if (elSelect) {
      // refresh option + group labels on language change
      [].forEach.call(elSelect.options, function (o) { if (o.value) o.textContent = t(CROP_BY_ID[o.value].name); });
      [].forEach.call(elSelect.querySelectorAll('optgroup'), function (og) {
        var gid = og.getAttribute('data-grp');
        for (var i = 0; i < GROUPS.length; i++) { if (GROUPS[i].id === gid) { og.label = t(GROUPS[i].name); break; } }
      });
    }

    if (elCount) elCount.textContent = farm.length ? ('(' + farm.length + ')') : '';

    if (!farm.length) {
      elList.innerHTML = '<div class="byf-empty"><div class="byf-empty-ic">🌱</div><h3>' + esc(t(UI.emptyTitle)) + '</h3><p>' + esc(t(UI.emptyText)) + '</p></div>';
      if (elSummary) elSummary.innerHTML = '';
      return;
    }

    var computed = farm.map(function (e) { return { e:e, c:compute(e) }; }).filter(function (x) { return x.c; });
    // Sort: urgent first, then by days-to-harvest ascending
    computed.sort(function (a, b) {
      if (a.c.urgent !== b.c.urgent) return a.c.urgent ? -1 : 1;
      return a.c.toHarvest - b.c.toHarvest;
    });

    // Summary of tasks needing attention (urgent or harvest within 7 days)
    if (elSummary) {
      var due = computed.filter(function (x) { return x.c.urgent || (x.c.toHarvest >= 0 && x.c.toHarvest <= 7); });
      if (!due.length) {
        elSummary.innerHTML = '<div class="byf-sum-none">✅ ' + esc(t(UI.summaryNone)) + '</div>';
      } else {
        var items = due.map(function (x) {
          return '<li><b>' + esc(t(x.e.crop ? x.e.crop.name : x.c.crop.name)) + '</b> — ' + esc(t(UI[x.c.taskKey])) + '</li>';
        }).join('');
        elSummary.innerHTML = '<div class="byf-sum"><p class="byf-sum-h">🔔 ' + esc(t(UI.summaryTitle)) + '</p><ul>' + items + '</ul></div>';
      }
    }

    elList.innerHTML = computed.map(function (x) { return cardHTML(x.e, x.c); }).join('');
  }

  /* ---- Events -------------------------------------------------------- */
  function onAdd(ev) {
    ev.preventDefault();
    var cropId = elSelect && elSelect.value;
    var date = elDate && elDate.value;
    if (!cropId || !date) return;
    var farm = load();
    farm.push({
      id: 'f' + Date.now() + Math.floor(Math.random() * 1000),
      cropId: cropId,
      plantDate: date,
      field: (elField && elField.value.trim()) || ''
    });
    save(farm);
    elForm.reset();
    if (elSelect) elSelect.selectedIndex = 0;
    render();
  }

  function onListClick(ev) {
    var btn = ev.target.closest && ev.target.closest('.byf-remove');
    if (!btn) return;
    if (!window.confirm(t(UI.confirmRemove))) return;
    var id = btn.getAttribute('data-id');
    save(load().filter(function (e) { return e.id !== id; }));
    render();
  }

  function init() {
    elList = document.getElementById('byfList');
    elSummary = document.getElementById('byfSummary');
    elSelect = document.getElementById('byfCrop');
    elDate = document.getElementById('byfDate');
    elField = document.getElementById('byfField');
    elForm = document.getElementById('byfForm');
    elCount = document.getElementById('byfCount');
    if (!elList || !elForm) return;

    // default date = today
    if (elDate && !elDate.value) {
      var d = today0();
      elDate.value = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
    }

    elForm.addEventListener('submit', onAdd);
    elList.addEventListener('click', onListClick);

    // Re-render when the language button is used (script.js updates localStorage first)
    var langBtn = document.getElementById('langBtn');
    if (langBtn) langBtn.addEventListener('click', function () { setTimeout(render, 0); });

    render();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
