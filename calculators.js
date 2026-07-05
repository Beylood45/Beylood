/* ============================================================
   Beylood — Farm Calculators (pure JS, offline, no API)
   Seed · Fertilizer · Irrigation · Plant population · Profit
   4 languages. Results are guiding estimates.
   ============================================================ */
(function () {
  'use strict';

  function lang() { return (document.documentElement.lang || 'so').slice(0, 2); }
  function pick(o) { return o[lang()] || o.so; }
  function num(id) { var v = parseFloat((document.getElementById(id) || {}).value); return isFinite(v) ? v : 0; }
  function fmt(n, dec) { return (Math.round(n * Math.pow(10, dec || 0)) / Math.pow(10, dec || 0)).toLocaleString('en-US', { maximumFractionDigits: dec || 0 }); }
  function show(id, html) { var e = document.getElementById(id); if (e) { e.innerHTML = html; e.classList.add('show'); } }

  var U = {
    kg:    { so: 'kg', en: 'kg', ar: 'كغ', sw: 'kg' },
    bags:  { so: 'joonyad', en: 'bags', ar: 'كيس', sw: 'magunia' },
    plants:{ so: 'dhir/hektar', en: 'plants/ha', ar: 'نبتة/هكتار', sw: 'mimea/hekta' },
    total: { so: 'Wadarta', en: 'Total', ar: 'الإجمالي', sw: 'Jumla' },
    seedNeed: { so: 'Iniin loo baahan yahay', en: 'Seed required', ar: 'البذور المطلوبة', sw: 'Mbegu zinazohitajika' },
    water: { so: 'Biyaha loo baahan yahay', en: 'Water required', ar: 'الماء المطلوب', sw: 'Maji yanayohitajika' },
    litres:{ so: 'litir', en: 'litres', ar: 'لتر', sw: 'lita' },
    revenue:{ so: 'Dakhliga', en: 'Revenue', ar: 'الإيرادات', sw: 'Mapato' },
    profit:{ so: 'Faa\'iidada', en: 'Profit', ar: 'الربح', sw: 'Faida' },
    loss:  { so: 'Khasaaro', en: 'Loss', ar: 'خسارة', sw: 'Hasara' },
    roi:   { so: 'ROI', en: 'ROI', ar: 'العائد', sw: 'ROI' },
    fillAll:{ so: 'Fadlan buuxi qiimayaasha.', en: 'Please fill in the values.', ar: 'يرجى إدخال القيم.', sw: 'Tafadhali jaza thamani.' }
  };
  function u(k) { return pick(U[k]); }

  var CALC = {
    seed: function () {
      var rate = parseFloat((document.getElementById('seedCrop') || {}).value) || 0;
      var area = num('seedArea');
      if (!area) return show('res-seed', u('fillAll'));
      var total = area * rate;
      show('res-seed', u('seedNeed') + ': <b>' + fmt(total, 1) + ' ' + u('kg') + '</b>');
    },
    fert: function () {
      var area = num('fertArea'), rate = num('fertRate'), bag = num('fertBag') || 50;
      if (!area || !rate) return show('res-fert', u('fillAll'));
      var total = area * rate, bags = total / bag;
      show('res-fert', u('total') + ': <b>' + fmt(total, 0) + ' ' + u('kg') + '</b> · ' + fmt(bags, 1) + ' ' + u('bags'));
    },
    irr: function () {
      var area = num('irrArea'), mm = num('irrMm');
      if (!area || !mm) return show('res-irr', u('fillAll'));
      var m3 = area * 10 * mm;          // 1 mm over 1 ha = 10 m³
      var litres = m3 * 1000;
      show('res-irr', u('water') + ': <b>' + fmt(m3, 0) + ' m³</b> · ' + fmt(litres, 0) + ' ' + u('litres'));
    },
    pop: function () {
      var row = num('popRow'), plant = num('popPlant');
      if (!row || !plant) return show('res-pop', u('fillAll'));
      var plants = 100000000 / (row * plant);   // 1e8 / (row_cm * plant_cm)
      show('res-pop', '<b>' + fmt(plants, 0) + '</b> ' + u('plants'));
    },
    profit: function () {
      var area = num('proArea'), yield_ = num('proYield'), price = num('proPrice'), cost = num('proCost');
      if (!area || !yield_ || !price) return show('res-profit', u('fillAll'));
      var kg = area * yield_ * 1000;
      var revenue = kg * price;
      var profit = revenue - cost;
      var isLoss = profit < 0;
      var roiTxt = cost > 0 ? ' · ' + u('roi') + ': ' + fmt(profit / cost * 100, 0) + '%' : '';
      show('res-profit',
        u('revenue') + ': $' + fmt(revenue, 0) + ' · ' + fmt(kg, 0) + ' ' + u('kg') + '<br>' +
        (isLoss ? u('loss') : u('profit')) + ': <b style="color:' + (isLoss ? '#b91c1c' : '#246C20') + '">$' + fmt(Math.abs(profit), 0) + '</b>' + roiTxt);
    }
  };

  document.querySelectorAll('.calc-btn[data-calc]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var fn = CALC[btn.getAttribute('data-calc')];
      if (fn) fn();
    });
  });
})();
