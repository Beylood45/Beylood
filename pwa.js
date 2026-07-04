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
    copied:   { so: 'Link la koobiyay', en: 'Link copied', ar: 'تم نسخ الرابط', sw: 'Kiungo kimenakiliwa' }
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
      'html[data-theme="dark"] .pwa-splash .pwa-name{color:#fff}';
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

  // ---- 4) Install banner ----
  var deferredPrompt = null;
  function recentlyDismissed() {
    try { var ts = parseInt(localStorage.getItem(DISMISS_KEY) || '0', 10); return ts && (Date.now() - ts) < 7 * 864e5; }
    catch (e) { return false; }
  }
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); deferredPrompt = e;
    if (isStandalone() || recentlyDismissed()) return;
    toast({
      title: 'Beylood', subtitle: t('install'), action: t('install'),
      onAction: function () {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        deferredPrompt.userChoice.finally(function () { deferredPrompt = null; });
      },
      onDismiss: function () { try { localStorage.setItem(DISMISS_KEY, Date.now().toString()); } catch (e) {} }
    });
  });
  window.addEventListener('appinstalled', function () { deferredPrompt = null; });

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
  if (document.readyState !== 'loading') buildArticleFabs();
  else document.addEventListener('DOMContentLoaded', buildArticleFabs);
})();
