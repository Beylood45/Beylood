/* ============================================
   Beylood — GA4 Analytics Loader
   --------------------------------------------
   Loads Google Analytics 4 in a privacy-friendly
   way and exposes a tiny helper (window.beyTrack)
   for custom events (sign_up, sign_in, etc.).

   Notes:
     • Reads its Measurement ID from
       window.BEYLOOD_ANALYTICS (see analytics-config.js).
     • Loaded asynchronously so it never blocks the page.
     • Honors Do Not Track and a localhost off-switch.
   ============================================ */
(function () {
  var cfg = (window.BEYLOOD_ANALYTICS) || {};
  var mid = cfg.measurementId || '';

  if (!mid || /^G-XXXX/.test(mid)) {
    // Not configured — give the dev a hint without breaking anything.
    if (window.console && window.location.hostname === 'localhost') {
      console.info('[Beylood Analytics] No measurementId set.');
    }
    window.beyTrack = function () {}; // no-op
    return;
  }

  // Respect Do Not Track + localhost opt-out
  var dnt = (navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack);
  if (cfg.respectDoNotTrack && (dnt === '1' || dnt === 'yes')) {
    window.beyTrack = function () {};
    return;
  }
  var host = (window.location && window.location.hostname) || '';
  if (cfg.disableOnLocalhost && (host === 'localhost' || host === '127.0.0.1' || host === '')) {
    window.beyTrack = function () {};
    return;
  }

  // Inject the GA4 loader script asynchronously
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(mid);
  document.head.appendChild(s);

  // Standard GA4 bootstrap
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());

  // Privacy defaults BEFORE config so they take effect on the first page view
  gtag('set', 'ads_data_redaction', true);
  gtag('consent', 'default', {
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    ad_storage: 'denied',
    analytics_storage: 'granted'
  });

  gtag('config', mid, {
    anonymize_ip: cfg.anonymizeIp !== false,
    allow_ad_personalization_signals: !!cfg.allowAdPersonalizationSignals,
    transport_type: 'beacon'
  });

  // Helper: send a custom event from anywhere on the site
  // Usage: beyTrack('sign_up', { method: 'google' });
  window.beyTrack = function (name, params) {
    try {
      gtag('event', name, params || {});
    } catch (e) { /* no-op */ }
  };

  // Auto-track outbound link clicks (helps measure exits)
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (!/^https?:\/\//i.test(href)) return;
    try {
      var url = new URL(href);
      if (url.hostname && url.hostname !== window.location.hostname) {
        gtag('event', 'click_outbound', { link_url: href, link_domain: url.hostname });
      }
    } catch (_) { /* ignore */ }
  }, { passive: true });
})();
