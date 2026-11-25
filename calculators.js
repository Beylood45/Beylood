/* ============================================================
   Beylood — Xisaabiyaha Beeraha / Farm Calculators
   Seed · Fertilizer · Irrigation · Plant population · Profit
   Pure JS, works offline, 4 languages. Results are estimates.
   (Formulas unchanged; wording follows the agreed Somali terms.)
   ============================================================ */
(function () {
  'use strict';

  function lang() { return (document.documentElement.lang || 'so').slice(0, 2); }
  function pick(o) { return o[lang()] || o.so; }
  function $(id) { return document.getElementById(id); }
  function num(id) { var v = parseFloat((($(id) || {}).value || '').replace(',', '.')); return isFinite(v) ? v : 0; }
  function fmt(n, dec) { return (Math.round(n * Math.pow(10, dec || 0)) / Math.pow(10, dec || 0)).toLocaleString('en-US', { maximumFractionDigits: dec || 0 }); }

  var U = {
    result:   { so: 'Natiijada', en: 'Result', ar: 'النتيجة', sw: 'Matokeo' },
    estimate: { so: 'Qiyaas', en: 'Estimate', ar: 'تقدير', sw: 'Makadirio' },
    fillAll:  { so: 'Fadlan buuxi meelaha loo baahan yahay (kuwa cas).', en: 'Please fill in the required fields (shown in red).', ar: 'يرجى ملء الحقول المطلوبة (باللون الأحمر).', sw: 'Tafadhali jaza sehemu zinazohitajika (zilizo nyekundu).' },
    kg:       { so: 'kg', en: 'kg', ar: 'كغ', sw: 'kg' },
    bags:     { so: 'jawaan', en: 'bags', ar: 'كيس', sw: 'magunia' },
    litres:   { so: 'litir', en: 'litres', ar: 'لتر', sw: 'lita' },
    perHa:    { so: 'geed/ha', en: 'plants/ha', ar: 'نبتة/هكتار', sw: 'mimea/ha' },
    seedNeed: { so: 'Abuurka guud ee loo baahan yahay', en: 'Total seed required', ar: 'إجمالي البذور المطلوبة', sw: 'Jumla ya mbegu zinazohitajika' },
    fertNeed: { so: 'Bacrinta guud ee loo baahan yahay', en: 'Total fertilizer required', ar: 'إجمالي السماد المطلوب', sw: 'Jumla ya mbolea inayohitajika' },
    bagCount: { so: 'Tirada jawaannada', en: 'Number of bags', ar: 'عدد الأكياس', sw: 'Idadi ya magunia' },
    water:    { so: 'Biyaha guud ee loo baahan yahay', en: 'Total water required', ar: 'إجمالي الماء المطلوب', sw: 'Jumla ya maji yanayohitajika' },
    inLitres: { so: 'Litir ahaan', en: 'In litres', ar: 'باللتر', sw: 'Kwa lita' },
    plants:   { so: 'Tirada guud ee dhirta', en: 'Total plant population', ar: 'إجمالي عدد النباتات', sw: 'Jumla ya idadi ya mimea' },
    sold:     { so: 'Waxsoosaarka guud', en: 'Total yield', ar: 'إجمالي الإنتاج', sw: 'Jumla ya mavuno' },
    revenue:  { so: 'Dakhliga guud', en: 'Gross revenue', ar: 'إجمالي الإيرادات', sw: 'Mapato ghafi' },
    cost:     { so: 'Kharashka guud', en: 'Total cost', ar: 'التكلفة الإجمالية', sw: 'Gharama jumla' },
    profit:   { so: "Faa'iidada saafiga ah", en: 'Net profit', ar: 'صافي الربح', sw: 'Faida halisi' },
    loss:     { so: 'Khasaaro', en: 'Loss', ar: 'خسارة', sw: 'Hasara' },
    roi:      { so: 'Soo laabashada maalgashiga (ROI)', en: 'Return on investment (ROI)', ar: 'العائد على الاستثمار', sw: 'Faida ya uwekezaji (ROI)' }
  };
  function u(k) { return pick(U[k]); }

  function row(label, value, cls) {
    return '<div class="calc-row' + (cls ? ' ' + cls : '') + '"><span>' + label + '</span><b>' + value + '</b></div>';
  }
  function show(key, rows) {
    var e = $('res-' + key); if (!e) return;
    e.classList.remove('is-msg');
    e.innerHTML = '<div class="calc-res-head"><span>' + u('result') + '</span><span class="calc-est">' + u('estimate') + '</span></div>' + rows.join('');
    e.classList.add('show');
  }
  // Highlights empty required fields; returns true when all are filled
  function need(key, ids) {
    var ok = true;
    ids.forEach(function (id) { var bad = !(num(id) > 0); var e = $(id); if (e) e.classList.toggle('is-bad', bad); if (bad) ok = false; });
    if (!ok) { var r = $('res-' + key); if (r) { r.innerHTML = u('fillAll'); r.classList.add('show', 'is-msg'); } }
    return ok;
  }

  var CALC = {
    seed: function () {
      if (!need('seed', ['seedArea'])) return;
      var rate = parseFloat(($('seedCrop') || {}).value) || 0;
      var total = num('seedArea') * rate;
      show('seed', [row(u('seedNeed'), fmt(total, 1) + ' ' + u('kg'), 'main')]);
    },
    fert: function () {
      if (!need('fert', ['fertArea', 'fertRate'])) return;
      var bag = num('fertBag') || 50;
      var total = num('fertArea') * num('fertRate');
      show('fert', [
        row(u('fertNeed'), fmt(total, 0) + ' ' + u('kg'), 'main'),
        row(u('bagCount'), fmt(total / bag, 1) + ' ' + u('bags') + ' (' + fmt(bag, 0) + ' ' + u('kg') + ')')
      ]);
    },
    irr: function () {
      if (!need('irr', ['irrArea', 'irrMm'])) return;
      var m3 = num('irrArea') * 10 * num('irrMm');      // 1 mm over 1 ha = 10 m³
      show('irr', [
        row(u('water'), fmt(m3, 0) + ' m³', 'main'),
        row(u('inLitres'), fmt(m3 * 1000, 0) + ' ' + u('litres'))
      ]);
    },
    pop: function () {
      if (!need('pop', ['popRow', 'popPlant'])) return;
      var plants = 100000000 / (num('popRow') * num('popPlant'));   // 1e8 / (row_cm × plant_cm)
      show('pop', [row(u('plants'), fmt(plants, 0) + ' ' + u('perHa'), 'main')]);
    },
    profit: function () {
      if (!need('profit', ['proArea', 'proYield', 'proPrice'])) return;
      var cost = num('proCost');
      var kg = num('proArea') * num('proYield') * 1000;
      var revenue = kg * num('proPrice');
      var net = revenue - cost, isLoss = net < 0;
      var rows = [
        row(isLoss ? u('loss') : u('profit'), (isLoss ? '−' : '') + '$' + fmt(Math.abs(net), 0), 'main' + (isLoss ? ' neg' : '')),
        row(u('revenue'), '$' + fmt(revenue, 0)),
        row(u('cost'), '$' + fmt(cost, 0)),
        row(u('sold'), fmt(kg, 0) + ' ' + u('kg'))
      ];
      if (cost > 0) rows.push(row(u('roi'), fmt(net / cost * 100, 0) + '%', isLoss ? 'neg' : ''));
      show('profit', rows);
    }
  };

  document.querySelectorAll('.calc-btn[data-calc]').forEach(function (btn) {
    btn.addEventListener('click', function () { var fn = CALC[btn.getAttribute('data-calc')]; if (fn) fn(); });
  });

  document.querySelectorAll('.calc-card').forEach(function (card) {
    // Enter = Xisaabi
    card.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' || e.target.tagName !== 'INPUT') return;
      var b = card.querySelector('.calc-btn[data-calc]'); if (b) { e.preventDefault(); b.click(); }
    });
    card.addEventListener('input', function (e) { if (e.target.classList) e.target.classList.remove('is-bad'); });
    // Nadiifi (Reset)
    var rb = card.querySelector('.calc-reset');
    if (rb) rb.addEventListener('click', function () {
      card.querySelectorAll('input').forEach(function (i) { i.value = i.defaultValue || ''; i.classList.remove('is-bad'); });
      card.querySelectorAll('select').forEach(function (s) { s.selectedIndex = 0; });
      var r = card.querySelector('.calc-result'); if (r) { r.innerHTML = ''; r.classList.remove('show', 'is-msg'); }
    });
  });

  // Crop presets: pick a crop to auto-fill a recommended value.
  function preset(selectId, targetId) {
    var sel = $(selectId), tgt = $(targetId);
    if (sel && tgt) sel.addEventListener('change', function () { if (sel.value) tgt.value = sel.value; });
  }
  preset('fertCrop', 'fertRate');   // fertilizer rate (kg/ha)
  preset('irrCrop', 'irrMm');       // whole-season water (mm)

  // Plant-population crop preset: fill row/plant spacing from "row,plant".
  var popCrop = $('popCrop');
  if (popCrop) {
    popCrop.addEventListener('change', function () {
      var v = popCrop.value; if (!v) return;
      var parts = v.split(',');
      if (parts[0]) $('popRow').value = parts[0].trim();
      if (parts[1]) $('popPlant').value = parts[1].trim();
    });
  }

  // Re-render visible results in the new language when the language changes
  new MutationObserver(function () {
    document.querySelectorAll('.calc-result.show:not(.is-msg)').forEach(function (r) {
      var fn = CALC[r.id.replace('res-', '')]; if (fn) fn();
    });
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
