/* ============================================================
   Beylood — Homepage "Latest news" auto-refresh
   ------------------------------------------------------------
   index.html ships 3 static news cards (SEO + no-JS fallback).
   This script replaces them with the TOP 3 cards from news.html,
   so publishing a new story on news.html updates the homepage
   automatically — no need to edit index.html.
   External file (CSP-safe: script-src 'self').
   ============================================================ */
(function () {
  'use strict';

  var LIMIT = 3;
  var grid = document.getElementById('homeNewsGrid');
  if (!grid || !window.fetch || !window.DOMParser) return;

  function currentLang() {
    try { return localStorage.getItem('beylood_lang') || document.documentElement.lang || 'so'; }
    catch (e) { return document.documentElement.lang || 'so'; }
  }

  // Show only the active language inside freshly injected nodes
  // (script.js already ran its language pass before we injected).
  function localize(root) {
    var code = currentLang();
    root.querySelectorAll('[data-lang]').forEach(function (el) {
      var l = el.getAttribute('data-lang');
      var show = (l === code);
      if (!show && l === 'so' && el.parentElement &&
          !el.parentElement.querySelector('[data-lang="' + code + '"]')) show = true;
      if (show) { el.style.display = ''; el.removeAttribute('hidden'); }
      else { el.style.display = 'none'; el.setAttribute('hidden', ''); }
    });
  }

  fetch('news.html', { cache: 'no-cache', credentials: 'same-origin' })
    .then(function (r) { return r.ok ? r.text() : ''; })
    .then(function (html) {
      if (!html) return;
      var doc = new DOMParser().parseFromString(html, 'text/html');
      var cards = doc.querySelectorAll('#newsGrid a.card-article');
      if (!cards.length) return;

      var frag = document.createDocumentFragment();
      for (var i = 0; i < cards.length && i < LIMIT; i++) {
        var card = document.importNode(cards[i], true);
        // Homepage cards stay compact: drop the long summary + footer line.
        var extra = card.querySelectorAll('.card-summary, .card-foot');
        for (var k = 0; k < extra.length; k++) extra[k].remove();
        card.removeAttribute('data-ncat');
        frag.appendChild(card);
      }
      grid.innerHTML = '';
      grid.appendChild(frag);
      localize(grid);
    })
    .catch(function () { /* keep the static fallback cards */ });
})();
