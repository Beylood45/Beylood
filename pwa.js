/* ============================================================
   Beylood — PWA bootstrap (production)
   ------------------------------------------------------------
   • Registers the service worker
   • Standalone splash screen
   • Install banner (supported browsers)
   • Update detection ("New version available")
   • Save articles for offline reading + Web Share (article pages)
   • Push Notification structure (disabled by default)
   • Background Sync queue helper
   No dependencies. Self-contained, namespaced UI (no site-design changes).
   Public API: window.BeyloodPWA
   ============================================================ */
(function () {
  'use strict';

  // ---- Config ----
  var SW_URL = 'sw.js';
  var PUSH_ENABLED = false;          // flip to true when push is ready
  var VAPID_PUBLIC_KEY = '';         // set your VAPID public key when enabling push
  var SAVED_KEY = 'beylood_saved_articles';
  var DISMISS_KEY = 'beylood_pwa_dismissed';
  var NAVY = '#0F3F7E', GREEN = '#3BA935';
  var WA_GREEN = '#25D366';
  // WhatsApp contact numbers (international format, no +, no leading 0)
  var WHATSAPP = [
    { key: 'so', num: '252615475445' },
    { key: 'tz', num: '255792592846' }
  ];

  // ---- Localized labels ----
  function lang() { return (document.documentElement.lang || 'so').slice(0, 2); }
  var TXT = {
    install:  { so: 'Rakib App-ka',   en: 'Install app',  ar: 'تثبيت التطبيق', sw: 'Sakinisha programu' },
    dismiss:  { so: 'Maya',           en: 'Not now',      ar: 'لاحقاً',        sw: 'Si sasa' },
    update:   { so: 'Nooc cusub ayaa diyaar ah', en: 'New version available', ar: 'يتوفر إصدار جديد', sw: 'Toleo jipya linapatikana' },
    reload:   { so: 'Cusboonaysii',   en: 'Reload',       ar: 'تحديث',         sw: 'Pakia upya' },
    save:     { so: 'Kaydi offline',  en: 'Save offline', ar: 'حفظ دون اتصال', sw: 'Hifadhi nje ya mtandao' },
    saved:    { so: 'La kaydiyay ✓',  en: 'Saved ✓',      ar: 'تم الحفظ ✓',    sw: 'Imehifadhiwa ✓' },
    share:    { so: 'La wadaag',      en: 'Share',        ar: 'مشاركة',        sw: 'Shiriki' },
    copied:   { so: 'Link la koobiyay', en: 'Link copied', ar: 'تم نسخ الرابط', sw: 'Kiungo kimenakiliwa' },
    // ---- Install modal ----
    mTitle:   { so: 'Rakib App-ka Beylood', en: 'Install the Beylood app', ar: 'ثبّت تطبيق Beylood', sw: 'Sakinisha programu ya Beylood' },
    mDesc:    { so: 'Hel App-ka telefoonkaaga — dhakhso, offline wuu shaqeeyaa, mana qaadanayo meel badan.', en: 'Get the app on your phone — fast, works offline, uses little space.', ar: 'احصل على التطبيق على هاتفك — سريع، يعمل دون اتصال، ويستهلك مساحة صغيرة.', sw: 'Pata programu kwenye simu yako — haraka, hufanya kazi nje ya mtandao, hutumia nafasi ndogo.' },
    b1:       { so: 'Dhakhso & fudud', en: 'Fast & light', ar: 'سريع وخفيف', sw: 'Haraka na nyepesi' },
    b2:       { so: 'Offline akhris', en: 'Read offline', ar: 'قراءة دون اتصال', sw: 'Soma nje ya mtandao' },
    b3:       { so: 'Icon shaashadda', en: 'Home-screen icon', ar: 'أيقونة على الشاشة', sw: 'Aikoni ya skrini' },
    later:    { so: 'Ka daa hadda', en: 'Maybe later', ar: 'لاحقاً', sw: 'Baadaye' },
    iosTitle: { so: 'Sida loogu rakibo iPhone/iPad', en: 'How to install on iPhone/iPad', ar: 'كيفية التثبيت على iPhone/iPad', sw: 'Jinsi ya kusakinisha kwenye iPhone/iPad' },
    iosS1:    { so: 'Riix badhanka <b>La wadaag</b> (Share) ee hoose ee Safari.', en: 'Tap the <b>Share</b> button at the bottom of Safari.', ar: 'اضغط زر <b>المشاركة</b> أسفل Safari.', sw: 'Gusa kitufe cha <b>Shiriki</b> chini ya Safari.' },
    iosS2:    { so: 'Dooro <b>“Add to Home Screen”</b>.', en: 'Choose <b>“Add to Home Screen”</b>.', ar: 'اختر <b>“Add to Home Screen”</b>.', sw: 'Chagua <b>“Add to Home Screen”</b>.' },
    iosS3:    { so: 'Riix <b>Add</b> — App-ku wuxuu ka soo bixi doonaa shaashadda.', en: 'Tap <b>Add</b> — the app appears on your home screen.', ar: 'اضغط <b>Add</b> — سيظهر التطبيق على شاشتك.', sw: 'Gusa <b>Add</b> — programu itaonekana kwenye skrini yako.' },
    dtTitle:  { so: 'Sida loogu rakibo kombiyuutarka', en: 'How to install on desktop', ar: 'كيفية التثبيت على الكمبيوتر', sw: 'Jinsi ya kusakinisha kwenye kompyuta' },
    dtHint:   { so: 'Ku dhufo astaanta rakibka (⊕ / shaashad yar) oo ku taal cinwaanka barta booqashada Chrome ama Edge.', en: 'Click the install icon (⊕ / small screen) in the address bar of Chrome or Edge.', ar: 'انقر أيقونة التثبيت (⊕) في شريط العنوان في Chrome أو Edge.', sw: 'Bofya aikoni ya usakinishaji (⊕) kwenye upau wa anwani wa Chrome au Edge.' },
    // ---- WhatsApp ----
    waTitle:  { so: 'WhatsApp', en: 'WhatsApp', ar: 'واتساب', sw: 'WhatsApp' },
    waContact:{ so: 'Nala soo xiriir', en: 'Contact us', ar: 'تواصل معنا', sw: 'Wasiliana nasi' },
    waSO:     { so: 'Soomaaliya', en: 'Somalia', ar: 'الصومال', sw: 'Somalia' },
    waTZ:     { so: 'Tanzania', en: 'Tanzania', ar: 'تنزانيا', sw: 'Tanzania' },
    waShare:  { so: 'Wadaag maqaalkan', en: 'Share this article', ar: 'شارك هذا المقال', sw: 'Shiriki makala hii' },
    waHello:  { so: 'Asalaamu calaykum Beylood, waxaan qabaa su\'aal beeraha ku saabsan.', en: 'Hello Beylood, I have a question about farming.', ar: 'مرحباً Beylood، لدي سؤال عن الزراعة.', sw: 'Habari Beylood, nina swali kuhusu kilimo.' }
  };
  function t(k) { var m = TXT[k]; return (m && (m[lang()] || m.so)) || (m && m.so) || k; }

  // ---- Namespaced styles (do not touch site design) ----
  function injectStyles() {
    if (document.getElementById('pwaStyles')) return;
    var css = '' +
      '.pwa-toast{position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;max-width:440px;margin:0 auto;display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:16px;background:' + NAVY + ';color:#fff;box-shadow:0 10px 30px rgba(11,19,32,.28);font-family:inherit;font-size:14px;transform:translateY(160%);transition:transform .35s cubic-bezier(.2,.8,.2,1)}' +
      '.pwa-toast.show{transform:translateY(0)}' +
      '.pwa-toast img{width:38px;height:38px;border-radius:9px;background:#fff;flex:0 0 auto}' +
      '.pwa-toast .pwa-tx{flex:1 1 auto;line-height:1.3}' +
      '.pwa-toast .pwa-tx strong{display:block;font-size:14px}' +
      '.pwa-toast .pwa-tx span{display:block;font-size:12px;opacity:.85}' +
      '.pwa-btn{flex:0 0 auto;cursor:pointer;border:0;border-radius:999px;padding:9px 16px;font:inherit;font-weight:700;font-size:13px;background:' + GREEN + ';color:#fff}' +
      '.pwa-x{flex:0 0 auto;cursor:pointer;border:0;background:transparent;color:#cdd9ec;font-size:18px;line-height:1;padding:4px}' +
      '.pwa-fabs{position:fixed;right:16px;bottom:84px;z-index:9998;display:flex;flex-direction:column;gap:10px}' +
      '.pwa-fab{display:inline-flex;align-items:center;gap:8px;cursor:pointer;border:0;border-radius:999px;padding:11px 16px;font:inherit;font-weight:600;font-size:13px;background:#fff;color:' + NAVY + ';border:1px solid #E5E7EB;box-shadow:0 6px 18px rgba(11,19,32,.16)}' +
      '.pwa-fab.is-on{background:' + GREEN + ';color:#fff;border-color:' + GREEN + '}' +
      '.pwa-fab svg{width:16px;height:16px;flex:0 0 auto}' +
      '.pwa-splash{position:fixed;inset:0;z-index:100000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;background:linear-gradient(160deg,#F4F8FF 0%,#FFFFFF 60%);transition:opacity .4s ease}' +
      '.pwa-splash.hide{opacity:0;pointer-events:none}' +
      '.pwa-splash img{width:96px;height:96px;border-radius:22px;box-shadow:0 12px 30px rgba(15,63,126,.18)}' +
      '.pwa-splash .pwa-name{font-family:inherit;font-weight:800;font-size:24px;color:' + NAVY + '}' +
      '.pwa-spin{width:30px;height:30px;border-radius:50%;border:3px solid #DCE6F5;border-top-color:' + GREEN + ';animation:pwaSpin .8s linear infinite}' +
      '@keyframes pwaSpin{to{transform:rotate(360deg)}}' +
      'html[data-theme="dark"] .pwa-fab{background:#1f2937;color:#fff;border-color:#374151}' +
      'html[data-theme="dark"] .pwa-splash{background:#0b1320}' +
      'html[data-theme="dark"] .pwa-splash .pwa-name{color:#fff}' +
      /* Install FAB (persistent) */
      '.pwa-install-fab{position:fixed;left:16px;bottom:20px;z-index:9997;display:inline-flex;align-items:center;gap:8px;cursor:pointer;border:0;border-radius:999px;padding:12px 18px;font:inherit;font-weight:700;font-size:13.5px;color:#fff;background:linear-gradient(135deg,' + NAVY + ',#1E5BB0);box-shadow:0 8px 22px rgba(15,63,126,.34);opacity:0;transform:translateY(20px);transition:opacity .3s,transform .3s}' +
      '.pwa-install-fab.show{opacity:1;transform:translateY(0)}' +
      '.pwa-install-fab svg{width:17px;height:17px;flex:0 0 auto}' +
      '@media(max-width:640px){.pwa-install-fab span{display:none}.pwa-install-fab{padding:13px}}' +
      /* Install modal */
      '.pwa-modal{position:fixed;inset:0;z-index:100001;display:flex;align-items:center;justify-content:center;padding:18px;background:rgba(11,19,32,.55);opacity:0;transition:opacity .28s;font-family:inherit}' +
      '.pwa-modal.show{opacity:1}' +
      '.pwa-modal-card{width:100%;max-width:420px;background:#fff;border-radius:22px;padding:24px 22px 20px;box-shadow:0 24px 60px rgba(11,19,32,.4);transform:translateY(24px) scale(.98);transition:transform .3s cubic-bezier(.2,.8,.2,1);max-height:92vh;overflow-y:auto}' +
      '.pwa-modal.show .pwa-modal-card{transform:translateY(0) scale(1)}' +
      '.pwa-modal-head{display:flex;align-items:center;gap:14px;margin-bottom:16px}' +
      '.pwa-modal-head img{width:56px;height:56px;border-radius:14px;box-shadow:0 6px 16px rgba(15,63,126,.2)}' +
      '.pwa-modal-head h3{margin:0;font-size:18px;font-weight:800;color:' + NAVY + ';line-height:1.25}' +
      '.pwa-modal-head p{margin:4px 0 0;font-size:13px;color:#6B7280;line-height:1.5}' +
      '.pwa-bens{display:flex;gap:8px;margin:0 0 18px;flex-wrap:wrap}' +
      '.pwa-ben{flex:1 1 0;min-width:96px;text-align:center;background:#F4F8FF;border:1px solid #E3ECFA;border-radius:12px;padding:11px 6px;font-size:11.5px;font-weight:600;color:' + NAVY + '}' +
      '.pwa-ben svg{width:20px;height:20px;display:block;margin:0 auto 5px;color:' + GREEN + '}' +
      '.pwa-cta{display:block;width:100%;text-align:center;cursor:pointer;border:0;border-radius:13px;padding:15px;font:inherit;font-weight:800;font-size:15px;color:#fff;background:linear-gradient(135deg,' + GREEN + ',#2E8F29)}' +
      '.pwa-later{display:block;width:100%;text-align:center;cursor:pointer;border:0;background:transparent;color:#6B7280;font:inherit;font-size:13.5px;padding:12px 0 2px;margin-top:4px}' +
      '.pwa-steps{margin:2px 0 6px;padding:0;list-style:none;counter-reset:s}' +
      '.pwa-steps li{position:relative;padding:0 0 14px 42px;font-size:14px;line-height:1.5;color:#374151}' +
      '.pwa-steps li:before{counter-increment:s;content:counter(s);position:absolute;left:0;top:0;width:28px;height:28px;border-radius:50%;background:' + NAVY + ';color:#fff;font-weight:800;font-size:14px;display:flex;align-items:center;justify-content:center}' +
      '.pwa-steps li b{color:' + NAVY + '}' +
      '.pwa-modal-title{margin:0 0 14px;font-size:15px;font-weight:800;color:' + NAVY + '}' +
      '.pwa-share-ic{display:inline-flex;vertical-align:middle;width:18px;height:18px;margin:0 2px;color:#1E5BB0}' +
      'html[data-theme="dark"] .pwa-modal-card{background:#111827}' +
      'html[data-theme="dark"] .pwa-modal-head h3,html[data-theme="dark"] .pwa-modal-title,html[data-theme="dark"] .pwa-ben{color:#e5edf7}' +
      'html[data-theme="dark"] .pwa-ben{background:#0f1623;border-color:#243040}' +
      'html[data-theme="dark"] .pwa-steps li{color:#c7d2e0}' +
      'html[data-theme="dark"] .pwa-steps li b{color:#9db8e0}' +
      /* WhatsApp floating button + menu */
      '.wa-fab{position:fixed;right:16px;bottom:20px;z-index:9998;width:56px;height:56px;border-radius:50%;border:0;cursor:pointer;background:' + WA_GREEN + ';box-shadow:0 8px 22px rgba(37,211,102,.45);display:flex;align-items:center;justify-content:center;transition:transform .2s}' +
      '.wa-fab:hover{transform:scale(1.06)}' +
      '.wa-fab svg{width:30px;height:30px;fill:#fff}' +
      '.wa-menu{position:fixed;right:16px;bottom:86px;z-index:9999;width:250px;max-width:calc(100vw - 32px);background:#fff;border-radius:16px;box-shadow:0 16px 40px rgba(11,19,32,.28);overflow:hidden;opacity:0;transform:translateY(12px) scale(.96);transform-origin:bottom right;transition:opacity .2s,transform .2s;pointer-events:none}' +
      '.wa-menu.show{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}' +
      '.wa-menu-h{background:' + WA_GREEN + ';color:#fff;font-weight:700;font-size:14px;padding:12px 16px;display:flex;align-items:center;gap:8px}' +
      '.wa-menu-h svg{width:18px;height:18px;fill:#fff}' +
      '.wa-item{display:flex;align-items:center;gap:12px;width:100%;text-align:left;background:none;border:0;border-top:1px solid #F1F1F1;padding:13px 16px;cursor:pointer;font:inherit;font-size:14px;color:#1F2937}' +
      '.wa-item:hover{background:#F4FBF6}' +
      '.wa-item .wa-ic{width:34px;height:34px;border-radius:50%;background:#E9F9EF;display:flex;align-items:center;justify-content:center;flex:0 0 auto}' +
      '.wa-item .wa-ic svg{width:18px;height:18px;fill:' + WA_GREEN + '}' +
      '.wa-item b{display:block;font-weight:600}' +
      '.wa-item small{display:block;font-size:12px;color:#6B7280}' +
      'html[dir="rtl"] .wa-item{text-align:right}' +
      'html[data-theme="dark"] .wa-menu{background:#111827}' +
      'html[data-theme="dark"] .wa-item{color:#e5edf7;border-color:#243040}' +
      'html[data-theme="dark"] .wa-item:hover{background:#0f1623}' +
      'html[data-theme="dark"] .wa-item .wa-ic{background:#0f2a1a}';
    var s = document.createElement('style');
    s.id = 'pwaStyles';
    s.textContent = css;
    document.head.appendChild(s);
  }

  function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  }

  // ---- Generic toast (used by update + install) ----
  function toast(opts) {
    injectStyles();
    var bar = document.createElement('div');
    bar.className = 'pwa-toast';
    bar.setAttribute('role', 'dialog');
    if (opts.icon !== false) {
      var img = document.createElement('img'); img.src = 'assets/icon-192.png'; img.alt = '';
      bar.appendChild(img);
    }
    var tx = document.createElement('div'); tx.className = 'pwa-tx';
    var strong = document.createElement('strong'); strong.textContent = opts.title || 'Beylood';
    var sub = document.createElement('span'); sub.textContent = opts.subtitle || '';
    tx.appendChild(strong); tx.appendChild(sub); bar.appendChild(tx);
    var btn = document.createElement('button'); btn.type = 'button'; btn.className = 'pwa-btn';
    btn.textContent = opts.action || 'OK';
    btn.addEventListener('click', function () { opts.onAction && opts.onAction(); hide(); });
    bar.appendChild(btn);
    var x = document.createElement('button'); x.type = 'button'; x.className = 'pwa-x'; x.textContent = '✕';
    x.setAttribute('aria-label', t('dismiss'));
    x.addEventListener('click', function () { hide(); opts.onDismiss && opts.onDismiss(); });
    bar.appendChild(x);
    document.body.appendChild(bar);
    requestAnimationFrame(function () { bar.classList.add('show'); });
    function hide() { bar.classList.remove('show'); setTimeout(function () { bar.remove(); }, 360); }
    if (opts.timeout) setTimeout(hide, opts.timeout);
    return { hide: hide };
  }

  // ---- 1) Splash screen (standalone launches only) ----
  function showSplash() {
    if (!isStandalone() || document.readyState === 'complete') return;
    injectStyles();
    var sp = document.createElement('div');
    sp.className = 'pwa-splash';
    sp.innerHTML = '<img src="assets/icon-192.png" alt="Beylood"><div class="pwa-name">Beylood</div><div class="pwa-spin"></div>';
    document.body.appendChild(sp);
    function done() {
      setTimeout(function () { sp.classList.add('hide'); setTimeout(function () { sp.remove(); }, 450); }, 500);
    }
    if (document.readyState === 'complete') done();
    else window.addEventListener('load', done, { once: true });
  }

  // ---- 2 & 3) Register SW + update detection ----
  function registerSW() {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register(SW_URL).then(function (reg) {
      // Already a waiting worker (updated in a previous tab)
      if (reg.waiting && navigator.serviceWorker.controller) promptUpdate(reg.waiting);
      reg.addEventListener('updatefound', function () {
        var nw = reg.installing;
        if (!nw) return;
        nw.addEventListener('statechange', function () {
          if (nw.state === 'installed' && navigator.serviceWorker.controller) promptUpdate(nw);
        });
      });
    }).catch(function (e) { console.warn('[PWA] SW register failed', e && e.message); });

    var reloaded = false;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (reloaded) return; reloaded = true; window.location.reload();
    });
    navigator.serviceWorker.addEventListener('message', onSWMessage);
  }

  function promptUpdate(worker) {
    toast({
      title: 'Beylood', subtitle: t('update'), action: t('reload'),
      onAction: function () { worker.postMessage({ type: 'SKIP_WAITING' }); }
    });
  }

  // ---- 4) Install experience (modal popup + persistent button) ----
  var deferredPrompt = null;
  var installFab = null;

  function recentlyDismissed() {
    try { var ts = parseInt(localStorage.getItem(DISMISS_KEY) || '0', 10); return ts && (Date.now() - ts) < 7 * 864e5; }
    catch (e) { return false; }
  }
  function isIOS() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPadOS
  }
  var SVG = {
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>',
    wifi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14 0M8.5 16.11a6 6 0 0 1 7 0M2 8.82a15 15 0 0 1 20 0"/><line x1="12" y1="20" x2="12" y2="20"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
     share: '<svg class="pwa-share-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 16V4M8 8l4-4 4 4"/><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7"/></svg>'
  };

  function benChip(svg, key) { return '<div class="pwa-ben">' + svg + t(key) + '</div>'; }

  var modalEl = null, modalAuto = false, autoShown = false;
  function snooze() { try { localStorage.setItem(DISMISS_KEY, Date.now().toString()); } catch (e) {} }
  function closeModal() {
    if (!modalEl) return;
    if (modalAuto) snooze();            // auto-shown popup closed → don't nag for 7 days
    modalEl.classList.remove('show');
    var m = modalEl; modalEl = null;
    setTimeout(function () { m.remove(); }, 300);
  }
  function showInstallModal(auto) {
    if (isStandalone() || modalEl) return;
    if (auto) { if (autoShown || recentlyDismissed()) return; autoShown = true; }
    modalAuto = !!auto;
    injectStyles();
    var body;
    if (deferredPrompt) {
      // Android / Chromium — native prompt available
      body = '<button type="button" class="pwa-cta" id="pwaDoInstall">' + t('install') + '</button>';
    } else if (isIOS()) {
      body = '<p class="pwa-modal-title">' + t('iosTitle') + '</p><ol class="pwa-steps">' +
        '<li>' + t('iosS1').replace('(Share)', '(' + SVG.share + ')') + '</li>' +
        '<li>' + t('iosS2') + '</li><li>' + t('iosS3') + '</li></ol>';
    } else {
      body = '<p class="pwa-modal-title">' + t('dtTitle') + '</p><ol class="pwa-steps"><li>' + t('dtHint') + '</li></ol>';
    }
    var el = document.createElement('div');
    el.className = 'pwa-modal';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.innerHTML =
      '<div class="pwa-modal-card">' +
        '<div class="pwa-modal-head"><img src="assets/icon-192.png" alt="Beylood">' +
          '<div><h3>' + t('mTitle') + '</h3><p>' + t('mDesc') + '</p></div></div>' +
        '<div class="pwa-bens">' + benChip(SVG.bolt, 'b1') + benChip(SVG.wifi, 'b2') + benChip(SVG.grid, 'b3') + '</div>' +
        body +
        '<button type="button" class="pwa-later" id="pwaLater">' + t('later') + '</button>' +
      '</div>';
    document.body.appendChild(el);
    modalEl = el;
    requestAnimationFrame(function () { el.classList.add('show'); });
    // Close on backdrop click
    el.addEventListener('click', function (ev) { if (ev.target === el) closeModal(); });
    var later = el.querySelector('#pwaLater');
    if (later) later.addEventListener('click', function () { snooze(); closeModal(); });
    var doInstall = el.querySelector('#pwaDoInstall');
    if (doInstall) doInstall.addEventListener('click', function () {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      deferredPrompt.userChoice.finally(function () { deferredPrompt = null; closeModal(); hideFab(); });
    });
  }

  function injectInstallFab() {
    if (isStandalone() || installFab) return;
    injectStyles();
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'pwa-install-fab';
    b.innerHTML = SVG.down + '<span>' + t('install') + '</span>';
    b.setAttribute('aria-label', t('install'));
    b.addEventListener('click', function () { showInstallModal(false); });
    document.body.appendChild(b);
    installFab = b;
    requestAnimationFrame(function () { b.classList.add('show'); });
  }
  function hideFab() { if (installFab) { installFab.classList.remove('show'); var f = installFab; installFab = null; setTimeout(function () { f.remove(); }, 300); } }

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); deferredPrompt = e;
    injectInstallFab();                                    // always give a way in
    setTimeout(function () { showInstallModal(true); }, 2500); // gentle auto-popup once
  });
  window.addEventListener('appinstalled', function () { deferredPrompt = null; closeModal(); hideFab(); });

  // Boot the install UI for platforms that never fire beforeinstallprompt (iOS, some desktops)
  function bootInstallUI() {
    if (isStandalone()) return;
    if (isIOS()) {
      injectInstallFab();
      setTimeout(function () { showInstallModal(true); }, 2500);
    } else {
      // Android fires beforeinstallprompt (handled above); if it hasn't after a
      // few seconds (desktop Firefox, unsupported), still offer the button.
      setTimeout(function () { if (!deferredPrompt && !isStandalone()) injectInstallFab(); }, 3500);
    }
  }

  // ---- 4b) WhatsApp: floating contact button + menu (all pages) ----
  function buildWhatsApp() {
    if (document.getElementById('waFab')) return;
    injectStyles();
    var waIcon = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 .5C7.4.5.5 7.4.5 16c0 2.8.7 5.4 2 7.7L.5 31.5l8-2.1a15.4 15.4 0 0 0 7.5 1.9c8.6 0 15.5-6.9 15.5-15.5S24.6.5 16 .5zm0 28.3c-2.5 0-4.8-.7-6.8-1.8l-.5-.3-4.7 1.2 1.3-4.6-.3-.5a12.7 12.7 0 0 1-2-6.8C3.2 8.9 8.9 3.2 16 3.2S28.8 8.9 28.8 16 23.1 28.8 16 28.8zm7-9.6c-.4-.2-2.3-1.1-2.6-1.3-.3-.1-.6-.2-.9.2-.2.4-.9 1.3-1.1 1.5-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3.1-1.9-1.1-1-1.9-2.3-2.1-2.7-.2-.4 0-.6.2-.8l.5-.6c.2-.2.2-.4.4-.6.1-.3 0-.5 0-.7s-.8-2-1.1-2.7c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.5 3.8 6 5.3.8.4 1.5.6 2 .8.8.3 1.6.2 2.2.1.7-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5z"/></svg>';
    var chatIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/></svg>';
    var shareIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" stroke="#25D366" stroke-width="2"/></svg>';

    var isArticle = !!document.querySelector('.article-body');
    var items = '';
    WHATSAPP.forEach(function (w) {
      var label = (w.key === 'so') ? t('waSO') : t('waTZ');
      items += '<button type="button" class="wa-item" data-num="' + w.num + '">' +
        '<span class="wa-ic">' + chatIcon + '</span>' +
        '<span><b>' + t('waContact') + ' — ' + label + '</b><small>+' + w.num + '</small></span></button>';
    });
    if (isArticle) {
      items += '<button type="button" class="wa-item" data-share="1">' +
        '<span class="wa-ic">' + shareIcon + '</span><span><b>' + t('waShare') + '</b></span></button>';
    }

    var menu = document.createElement('div');
    menu.className = 'wa-menu';
    menu.setAttribute('role', 'menu');
    menu.innerHTML = '<div class="wa-menu-h">' + waIcon + ' ' + t('waTitle') + '</div>' + items;

    var fab = document.createElement('button');
    fab.type = 'button'; fab.id = 'waFab'; fab.className = 'wa-fab';
    fab.setAttribute('aria-label', t('waContact'));
    fab.innerHTML = waIcon;

    document.body.appendChild(menu);
    document.body.appendChild(fab);

    var open = false;
    function setOpen(o) { open = o; menu.classList.toggle('show', o); }
    fab.addEventListener('click', function (e) { e.stopPropagation(); setOpen(!open); });
    document.addEventListener('click', function (e) {
      if (open && !menu.contains(e.target) && e.target !== fab) setOpen(false);
    });
    menu.addEventListener('click', function (e) {
      var it = e.target.closest && e.target.closest('.wa-item');
      if (!it) return;
      if (it.getAttribute('data-share')) {
        var txt = 'Beylood — ' + pageTitle() + ' ' + location.href;
        window.open('https://wa.me/?text=' + encodeURIComponent(txt), '_blank');
      } else {
        var num = it.getAttribute('data-num');
        window.open('https://wa.me/' + num + '?text=' + encodeURIComponent(t('waHello')), '_blank');
      }
      setOpen(false);
    });
  }

  // ---- 5 & 9) Save-for-offline + Web Share (article pages only) ----
  function currentFile() { return (location.pathname.split('/').pop() || 'index.html'); }
  function readSaved() { try { return JSON.parse(localStorage.getItem(SAVED_KEY) || '[]'); } catch (e) { return []; } }
  function writeSaved(list) { try { localStorage.setItem(SAVED_KEY, JSON.stringify(list)); } catch (e) {} }
  function isSaved(file) { return readSaved().some(function (a) { return a.url === file; }); }

  function pageTitle() {
    var h = document.querySelector('.article-title, h1');
    return (h ? h.textContent : document.title).trim().slice(0, 120);
  }

  function buildArticleFabs() {
    if (!document.querySelector('.article-body')) return; // real articles/news only
    injectStyles();
    var file = currentFile();
    var wrap = document.createElement('div'); wrap.className = 'pwa-fabs';

    // Save button
    var saveBtn = document.createElement('button'); saveBtn.type = 'button'; saveBtn.className = 'pwa-fab';
    function paintSave() {
      var on = isSaved(file);
      saveBtn.classList.toggle('is-on', on);
      saveBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg><span>' + (on ? t('saved') : t('save')) + '</span>';
    }
    paintSave();
    saveBtn.addEventListener('click', function () {
      var list = readSaved();
      if (isSaved(file)) {
        list = list.filter(function (a) { return a.url !== file; });
        writeSaved(list);
        postSW({ type: 'REMOVE_ARTICLE', url: file });
      } else {
        list.unshift({ url: file, title: pageTitle(), ts: Date.now() });
        writeSaved(list.slice(0, 100));
        postSW({ type: 'SAVE_ARTICLE', url: file, assets: [] });
      }
      paintSave();
    });
    wrap.appendChild(saveBtn);

    // Share button (Web Share API with clipboard fallback)
    var shareBtn = document.createElement('button'); shareBtn.type = 'button'; shareBtn.className = 'pwa-fab';
    shareBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg><span>' + t('share') + '</span>';
    shareBtn.addEventListener('click', function () {
      var data = { title: pageTitle(), text: 'Beylood — ' + pageTitle(), url: location.href };
      if (navigator.share) { navigator.share(data).catch(function () {}); }
      else if (navigator.clipboard) { navigator.clipboard.writeText(location.href).then(function () { toast({ icon: false, title: 'Beylood', subtitle: t('copied'), action: 'OK', timeout: 2200 }); }); }
      else { window.open('https://wa.me/?text=' + encodeURIComponent(data.text + ' ' + data.url), '_blank'); }
    });
    wrap.appendChild(shareBtn);

    document.body.appendChild(wrap);
  }

  function postSW(msg) {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(msg);
    } else if (navigator.serviceWorker && navigator.serviceWorker.ready) {
      navigator.serviceWorker.ready.then(function (reg) { reg.active && reg.active.postMessage(msg); });
    }
  }
  function onSWMessage(e) { /* hook for ARTICLE_SAVED / SYNC_REPLAYED if needed */ }

  // ---- 6) Push Notifications — structure ready, disabled by default ----
  function urlBase64ToUint8Array(base64) {
    var pad = '='.repeat((4 - base64.length % 4) % 4);
    var b64 = (base64 + pad).replace(/-/g, '+').replace(/_/g, '/');
    var raw = atob(b64); var arr = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
    return arr;
  }
  function enablePush() {
    if (!PUSH_ENABLED || !VAPID_PUBLIC_KEY) { console.info('[PWA] Push disabled (set PUSH_ENABLED + VAPID key).'); return Promise.resolve(null); }
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return Promise.resolve(null);
    return Notification.requestPermission().then(function (perm) {
      if (perm !== 'granted') return null;
      return navigator.serviceWorker.ready.then(function (reg) {
        return reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) });
      });
      // -> send the subscription to your push backend here when ready
    });
  }

  // ---- 7) Background Sync queue ----
  var DB_NAME = 'beylood-sync-db', STORE = 'requests';
  function idb() {
    return new Promise(function (res, rej) {
      var r = indexedDB.open(DB_NAME, 1);
      r.onupgradeneeded = function () { if (!r.result.objectStoreNames.contains(STORE)) r.result.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true }); };
      r.onsuccess = function () { res(r.result); };
      r.onerror = function () { rej(r.error); };
    });
  }
  function queueRequest(reqObj) {
    // reqObj: { url, method, headers, body }
    return idb().then(function (db) {
      return new Promise(function (res) {
        var tx = db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).add(reqObj);
        tx.oncomplete = function () { res(true); };
        tx.onerror = function () { res(false); };
      });
    }).then(function () {
      if ('serviceWorker' in navigator && 'SyncManager' in window) {
        return navigator.serviceWorker.ready.then(function (reg) { return reg.sync.register('beylood-sync'); });
      }
      // Fallback: try immediately
      return fetch(reqObj.url, { method: reqObj.method || 'POST', headers: reqObj.headers || { 'Content-Type': 'application/json' }, body: reqObj.body ? JSON.stringify(reqObj.body) : undefined }).catch(function () {});
    });
  }

  // ---- Public API ----
  window.BeyloodPWA = {
    enablePush: enablePush,
    queueRequest: queueRequest,
    savedArticles: readSaved
  };

  // ---- Boot ----
  showSplash();
  if ('serviceWorker' in navigator) window.addEventListener('load', registerSW);
  if (document.readyState !== 'loading') { buildArticleFabs(); buildWhatsApp(); bootInstallUI(); }
  else document.addEventListener('DOMContentLoaded', function () { buildArticleFabs(); buildWhatsApp(); bootInstallUI(); });
})();
