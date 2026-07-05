/* ============================================================
   Beylood — Weather (Open-Meteo, free, no API key)
   ------------------------------------------------------------
   Current conditions + 7-day forecast + season-based farming
   advice (Gu / Hagaa / Deyr / Jilaal). 4 languages. Offline cache.
   ============================================================ */
(function () {
  'use strict';

  var API = 'https://api.open-meteo.com/v1/forecast';

  var CITIES = [
    { so: 'Muqdisho',   en: 'Mogadishu',  lat: 2.0469,  lon: 45.3182 },
    { so: 'Hargeysa',   en: 'Hargeisa',   lat: 9.5624,  lon: 44.0770 },
    { so: 'Kismaayo',   en: 'Kismayo',    lat: -0.3582, lon: 42.5454 },
    { so: 'Baydhabo',   en: 'Baidoa',     lat: 3.1136,  lon: 43.6498 },
    { so: 'Beledweyne', en: 'Beledweyne', lat: 4.7358,  lon: 45.2036 },
    { so: 'Garoowe',    en: 'Garowe',     lat: 8.4054,  lon: 48.4845 },
    { so: 'Boosaaso',   en: 'Bosaso',     lat: 11.2842, lon: 49.1816 },
    { so: 'Gaalkacyo',  en: 'Galkayo',    lat: 6.7697,  lon: 47.4308 },
    { so: 'Berbera',    en: 'Berbera',    lat: 10.4396, lon: 45.0143 },
    { so: 'Jowhar',     en: 'Jowhar',     lat: 2.7809,  lon: 45.5005 },
    { so: 'Marka',      en: 'Merca',      lat: 1.7159,  lon: 44.7710 },
    { so: 'Burco',      en: 'Burao',      lat: 9.5221,  lon: 45.5336 }
  ];

  var DAYS = {
    so: ['Axd', 'Isn', 'Tal', 'Arb', 'Kha', 'Jim', 'Sab'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    ar: ['أحد', 'إثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت'],
    sw: ['Jpi', 'Jtt', 'Jnn', 'Jtn', 'Alh', 'Ijm', 'Jms']
  };

  // WMO weather codes -> emoji + 4-language description
  function wmo(code) {
    var m = {
      0:  ['☀️', 'Caded', 'Clear', 'صحو', 'Wazi'],
      1:  ['🌤️', 'Cadad yar', 'Mainly clear', 'صحو غالباً', 'Wazi kiasi'],
      2:  ['⛅', 'Daruur qayb ah', 'Partly cloudy', 'غائم جزئياً', 'Mawingu kiasi'],
      3:  ['☁️', 'Daruuro', 'Overcast', 'غائم', 'Mawingu'],
      45: ['🌫️', 'Ceeryaamo', 'Fog', 'ضباب', 'Ukungu'],
      48: ['🌫️', 'Ceeryaamo', 'Rime fog', 'ضباب', 'Ukungu'],
      51: ['🌦️', 'Tiix fudud', 'Light drizzle', 'رذاذ خفيف', 'Manyunyu'],
      53: ['🌦️', 'Tiix', 'Drizzle', 'رذاذ', 'Manyunyu'],
      55: ['🌦️', 'Tiix xoog leh', 'Heavy drizzle', 'رذاذ كثيف', 'Manyunyu mengi'],
      61: ['🌧️', 'Roob fudud', 'Light rain', 'مطر خفيف', 'Mvua kidogo'],
      63: ['🌧️', 'Roob', 'Rain', 'مطر', 'Mvua'],
      65: ['🌧️', 'Roob xoog leh', 'Heavy rain', 'مطر غزير', 'Mvua kubwa'],
      66: ['🌧️', 'Roob qaboow', 'Freezing rain', 'مطر متجمد', 'Mvua baridi'],
      67: ['🌧️', 'Roob qaboow', 'Freezing rain', 'مطر متجمد', 'Mvua baridi'],
      71: ['🌨️', 'Baraf', 'Snow', 'ثلج', 'Theluji'],
      73: ['🌨️', 'Baraf', 'Snow', 'ثلج', 'Theluji'],
      75: ['🌨️', 'Baraf badan', 'Heavy snow', 'ثلج كثيف', 'Theluji nyingi'],
      80: ['🌦️', 'Tuux roob', 'Rain showers', 'زخات مطر', 'Manyunyu ya mvua'],
      81: ['🌧️', 'Tuux roob', 'Rain showers', 'زخات مطر', 'Manyunyu ya mvua'],
      82: ['⛈️', 'Roob daran', 'Violent showers', 'زخات عنيفة', 'Mvua kali'],
      95: ['⛈️', 'Onkod', 'Thunderstorm', 'عاصفة رعدية', 'Ngurumo'],
      96: ['⛈️', 'Onkod & roob', 'Thunderstorm', 'عاصفة رعدية', 'Ngurumo'],
      99: ['⛈️', 'Onkod daran', 'Severe storm', 'عاصفة شديدة', 'Dhoruba kali']
    };
    return m[code] || ['🌡️', 'Hawo', 'Weather', 'طقس', 'Hali ya hewa'];
  }

  // Season by month (0-indexed) — Somali agro-calendar
  var SEASON = {
    gu:     { name: { so: 'Gu\'', en: 'Gu (main rains)', ar: 'موسم غو', sw: 'Gu' },
              tip:  { so: 'Xilliga beerashada ugu weyn. Diyaari dhulka oo beero dalagyada aasaasiga ah (masago, galley, digir).',
                      en: 'The main planting season. Prepare land and plant staple crops (sorghum, maize, cowpea).',
                      ar: 'موسم الزراعة الرئيسي. جهّز الأرض وازرع المحاصيل الأساسية (ذرة رفيعة، ذرة، لوبيا).',
                      sw: 'Msimu mkuu wa kupanda. Andaa ardhi na upande mazao makuu (mtama, mahindi, kunde).' } },
    hagaa:  { name: { so: 'Hagaa', en: 'Hagaa (dry, windy)', ar: 'موسم هجاء', sw: 'Hagaa' },
              tip:  { so: 'Xilli qalalan oo dabayl badan. Ilaali qoyaanka ciidda, isticmaal mulch iyo waraab toosan.',
                      en: 'Dry, windy season. Conserve soil moisture — use mulching and drip irrigation.',
                      ar: 'موسم جاف ورياح. حافظ على رطوبة التربة — استخدم التغطية والري بالتنقيط.',
                      sw: 'Msimu mkavu wenye upepo. Hifadhi unyevu wa udongo — tumia matandazo na umwagiliaji wa matone.' } },
    deyr:   { name: { so: 'Deyr', en: 'Deyr (short rains)', ar: 'موسم ديير', sw: 'Deyr' },
              tip:  { so: 'Roobabka gaaban. Beero noocyo wakhti-gaaban oo goor hore la goosto.',
                      en: 'Short rains. Plant short-duration varieties that mature quickly.',
                      ar: 'الأمطار القصيرة. ازرع أصنافاً قصيرة المدة تنضج سريعاً.',
                      sw: 'Mvua fupi. Panda aina za muda mfupi zinazokomaa haraka.' } },
    jilaal: { name: { so: 'Jilaal', en: 'Jilaal (dry, hot)', ar: 'موسم جيلال', sw: 'Jilaal' },
              tip:  { so: 'Xilliga ugu qalalan. Ku tiirsanow waraab, ilaali biyaha, oo daryeel xoolaha.',
                      en: 'The driest season. Rely on irrigation, conserve water, and care for livestock.',
                      ar: 'أجف موسم. اعتمد على الري، وفّر الماء، واعتنِ بالماشية.',
                      sw: 'Msimu mkavu zaidi. Tegemea umwagiliaji, hifadhi maji, na tunza mifugo.' } }
  };
  var RAIN = {
    wet:  { so: 'Roob badan ayaa la filayaa 7-da maalmood ee soo socota — fursad wanaagsan beerasho, laakiin ka digtoonow biyo-baxa iyo cudurrada fangaska.',
            en: 'Significant rain expected over the next 7 days — a good planting window, but watch for flooding and fungal disease.',
            ar: 'أمطار غزيرة متوقعة خلال 7 أيام — فرصة جيدة للزراعة، لكن احذر الفيضانات والأمراض الفطرية.',
            sw: 'Mvua nyingi inatarajiwa siku 7 zijazo — nafasi nzuri ya kupanda, lakini jihadhari na mafuriko na magonjwa ya ukungu.' },
    some: { so: 'Roob dhexdhexaad ah ayaa la filayaa. Beero oo isticmaal roobka si hufan.',
            en: 'Moderate rain expected. Plant and make efficient use of the rainfall.',
            ar: 'أمطار معتدلة متوقعة. ازرع واستفد من الأمطار بكفاءة.',
            sw: 'Mvua ya wastani inatarajiwa. Panda na utumie mvua kwa ufanisi.' },
    dry:  { so: 'Roob yar ama la\'aan ayaa la filayaa. U baahan doontaa waraab; ilaali qoyaanka ciidda.',
            en: 'Little or no rain expected. You will need irrigation; conserve soil moisture.',
            ar: 'أمطار قليلة أو معدومة متوقعة. ستحتاج إلى الري؛ حافظ على رطوبة التربة.',
            sw: 'Mvua kidogo au hakuna inatarajiwa. Utahitaji umwagiliaji; hifadhi unyevu wa udongo.' }
  };

  function lang() { return (document.documentElement.lang || 'so').slice(0, 2); }
  function L(arr, idxBase) { return arr[idxBase + ({ so: 0, en: 1, ar: 2, sw: 3 }[lang()] || 0)]; }

  var citySel = document.getElementById('wxCity');
  var geoBtn  = document.getElementById('wxGeo');
  var statusEl = document.getElementById('wxStatus');
  var curEl   = document.getElementById('wxCurrent');
  var fcEl    = document.getElementById('wxForecast');
  var advEl   = document.getElementById('wxAdvice');
  if (!citySel || !curEl) return;

  function cityName(c) { return lang() === 'en' ? c.en : c.so; }

  function populateCities() {
    citySel.innerHTML = '';
    CITIES.forEach(function (c, i) {
      var o = document.createElement('option');
      o.value = i; o.textContent = cityName(c);
      citySel.appendChild(o);
    });
  }

  function tr(key) {
    var T = {
      loading: { so: 'Waa la soo dejinayaa…', en: 'Loading…', ar: 'جارٍ التحميل…', sw: 'Inapakia…' },
      offline: { so: 'Offline — xogtii ugu dambaysay.', en: 'Offline — showing last saved data.', ar: 'دون اتصال — آخر بيانات محفوظة.', sw: 'Nje ya mtandao — data ya mwisho.' },
      error:   { so: 'Lama heli karo xogta cimilada. Isku day mar kale.', en: 'Could not load weather. Try again.', ar: 'تعذّر تحميل الطقس. حاول مجدداً.', sw: 'Imeshindwa kupata hali ya hewa. Jaribu tena.' },
      feels:   { so: 'Dareen', en: 'Feels', ar: 'الإحساس', sw: 'Huhisi' },
      humidity:{ so: 'Qoyaan', en: 'Humidity', ar: 'الرطوبة', sw: 'Unyevu' },
      wind:    { so: 'Dabayl', en: 'Wind', ar: 'الرياح', sw: 'Upepo' },
      rain:    { so: 'Roob', en: 'Rain', ar: 'المطر', sw: 'Mvua' }
    };
    var m = T[key]; return (m && (m[lang()] || m.so)) || key;
  }

  function cacheKey(lat, lon) { return 'beylood_wx_' + lat.toFixed(2) + '_' + lon.toFixed(2); }

  function render(data, placeName, fromCache) {
    var cur = data.current, daily = data.daily;
    var w = wmo(cur.weather_code);
    curEl.hidden = false; fcEl.hidden = false; advEl.hidden = false;

    // Current
    curEl.className = 'wx-current';
    curEl.innerHTML =
      '<div class="wx-emoji">' + w[0] + '</div>' +
      '<div>' +
        '<div class="wx-place">' + placeName + (fromCache ? ' · ' + tr('offline') : '') + '</div>' +
        '<div class="wx-temp">' + Math.round(cur.temperature_2m) + '°C</div>' +
        '<div class="wx-desc">' + L(w, 1) + '</div>' +
        '<div class="wx-metrics">' +
          '<span><b>' + tr('feels') + ':</b> ' + Math.round(cur.apparent_temperature) + '°</span>' +
          '<span><b>' + tr('humidity') + ':</b> ' + cur.relative_humidity_2m + '%</span>' +
          '<span><b>' + tr('wind') + ':</b> ' + Math.round(cur.wind_speed_10m) + ' km/h</span>' +
          '<span><b>' + tr('rain') + ':</b> ' + (cur.precipitation || 0) + ' mm</span>' +
        '</div>' +
      '</div>';

    // 7-day forecast
    var html = '';
    var rain7 = 0;
    for (var i = 0; i < daily.time.length; i++) {
      var d = new Date(daily.time[i] + 'T00:00');
      var dw = wmo(daily.weather_code[i]);
      rain7 += (daily.precipitation_sum[i] || 0);
      html +=
        '<div class="wx-day">' +
          '<div class="d">' + DAYS[lang() in DAYS ? lang() : 'so'][d.getDay()] + '</div>' +
          '<div class="e">' + dw[0] + '</div>' +
          '<div class="t">' + Math.round(daily.temperature_2m_max[i]) + '° <small>' + Math.round(daily.temperature_2m_min[i]) + '°</small></div>' +
          '<div class="r">' + Math.round(daily.precipitation_sum[i]) + ' mm</div>' +
        '</div>';
    }
    fcEl.innerHTML = html;

    // Advice
    var s = SEASON[seasonKey(new Date().getMonth())];
    var rk = rain7 > 25 ? 'wet' : (rain7 >= 8 ? 'some' : 'dry');
    advEl.innerHTML =
      '<h3>' + s.name[lang()] + ' · ' + (Math.round(rain7)) + ' mm / 7' + (lang() === 'so' ? ' maalmood' : (lang() === 'en' ? ' days' : '')) + '</h3>' +
      '<p>' + (s.tip[lang()] || s.tip.so) + ' ' + (RAIN[rk][lang()] || RAIN[rk].so) + '</p>';

    statusEl.textContent = '';
  }

  function seasonKey(m) {
    if (m >= 3 && m <= 5) return 'gu';
    if (m >= 6 && m <= 8) return 'hagaa';
    if (m >= 9 && m <= 10) return 'deyr';
    return 'jilaal';
  }

  function load(lat, lon, placeName) {
    statusEl.textContent = tr('loading');
    var url = API + '?latitude=' + lat + '&longitude=' + lon +
      '&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m' +
      '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&forecast_days=7';
    fetch(url).then(function (r) { return r.json(); }).then(function (data) {
      if (!data || !data.current) throw new Error('bad data');
      try { localStorage.setItem(cacheKey(lat, lon), JSON.stringify({ data: data, place: placeName, ts: Date.now() })); } catch (e) {}
      render(data, placeName, false);
    }).catch(function () {
      // Offline / failed — try cache
      var cached = null;
      try { cached = JSON.parse(localStorage.getItem(cacheKey(lat, lon)) || 'null'); } catch (e) {}
      if (cached && cached.data) { render(cached.data, cached.place || placeName, true); }
      else { statusEl.textContent = tr('error'); curEl.hidden = true; fcEl.hidden = true; advEl.hidden = true; }
    });
  }

  function loadCity(i) {
    var c = CITIES[i]; if (!c) return;
    try { localStorage.setItem('beylood_wx_city', String(i)); } catch (e) {}
    load(c.lat, c.lon, cityName(c));
  }

  // Events
  citySel.addEventListener('change', function () { loadCity(parseInt(citySel.value, 10)); });
  geoBtn.addEventListener('click', function () {
    if (!navigator.geolocation) { statusEl.textContent = tr('error'); return; }
    statusEl.textContent = tr('loading');
    navigator.geolocation.getCurrentPosition(function (pos) {
      var place = { so: 'Goobtaada', en: 'Your location', ar: 'موقعك', sw: 'Mahali pako' }[lang()] || 'Goobtaada';
      load(pos.coords.latitude, pos.coords.longitude, place);
    }, function () { statusEl.textContent = tr('error'); }, { timeout: 8000 });
  });

  // Re-render city names + current view when language changes (via language button)
  var langBtn = document.getElementById('langBtn');
  if (langBtn) langBtn.addEventListener('click', function () {
    setTimeout(function () { populateCities(); citySel.value = String(restoreIdx()); loadCity(restoreIdx()); }, 60);
  });

  function restoreIdx() {
    var i = 0; try { i = parseInt(localStorage.getItem('beylood_wx_city') || '0', 10) || 0; } catch (e) {}
    return (i >= 0 && i < CITIES.length) ? i : 0;
  }

  // Init
  populateCities();
  var start = restoreIdx();
  citySel.value = String(start);
  loadCity(start);
})();
