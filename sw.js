/* ============================================================
   Beylood — Service Worker (production)
   ------------------------------------------------------------
   Caching strategy:
     • HTML / navigations   -> Network First (offline.html fallback)
     • Images / fonts        -> Cache First
     • CSS / JS              -> Stale While Revalidate
     • Cross-origin (Firebase, Google, analytics, CDNs) -> never touched
   Plus:
     • Saved articles cache (user "read offline") — survives updates
     • Push Notification handlers (structure ready; off until enabled)
     • Background Sync queue (IndexedDB) for pending requests
   Bump VERSION to ship an update (clients are notified).
   ============================================================ */
const VERSION    = 'v6-20260701';
const SHELL      = 'beylood-shell-' + VERSION;
const STATIC     = 'beylood-static-' + VERSION;   // css / js (SWR)
const IMAGES     = 'beylood-img-' + VERSION;       // images / fonts (cache-first)
const PAGES      = 'beylood-pages-' + VERSION;     // html (network-first)
const SAVED      = 'beylood-saved';                // user offline articles (stable)
const OFFLINE_URL = 'offline.html';

// Caches kept on activate (everything else beylood-* is purged).
const KEEP = [SHELL, STATIC, IMAGES, PAGES, SAVED];

// App shell precached on install.
const PRECACHE = [
  './', 'index.html', 'offline.html',
  'articles.html', 'categories.html', 'news.html', 'about.html', 'contact.html', 'ask.html',
  'weather.html', 'calculators.html',
  'style.css', 'script.js', 'cover-images.js', 'ask.css', 'ask.js', 'chatbot-knowledge.js',
  'weather.js', 'calculators.js', 'pwa.js', 'manifest.json',
  'assets/logo.png', 'assets/logo-transparent.png', 'assets/icon.png',
  'assets/icon-192.png', 'assets/icon-512.png',
  'fonts/poppins-400.woff2', 'fonts/poppins-500.woff2', 'fonts/poppins-600.woff2', 'fonts/poppins-700.woff2',
  'fonts/cairo-400.woff2', 'fonts/cairo-600.woff2', 'fonts/cairo-700.woff2'
];

// ---------------------------------------------------------------------------
// Install / activate
// ---------------------------------------------------------------------------
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL).then((cache) =>
      Promise.all(PRECACHE.map((url) =>
        cache.add(url).catch((e) => console.warn('[SW] precache skip', url, e && e.message))
      ))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k.startsWith('beylood-') && KEEP.indexOf(k) === -1)
            .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ---------------------------------------------------------------------------
// Strategy helpers
// ---------------------------------------------------------------------------
function isImage(url)  { return /\.(png|jpe?g|gif|webp|avif|svg|ico)$/i.test(url.pathname); }
function isFont(url)   { return /\.(woff2?|ttf|otf|eot)$/i.test(url.pathname); }
function isStatic(url) { return /\.(css|js)$/i.test(url.pathname); }

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request, { ignoreSearch: false });
  if (hit) return hit;
  try {
    const res = await fetch(request);
    if (res && (res.ok || res.type === 'opaque')) cache.put(request, res.clone());
    return res;
  } catch (e) {
    const any = await caches.match(request, { ignoreSearch: true });
    return any || new Response('', { status: 504, statusText: 'Offline' });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request, { ignoreSearch: false });
  const network = fetch(request).then((res) => {
    if (res && res.ok) cache.put(request, res.clone());
    return res;
  }).catch(() => null);
  return cached || (await network) || new Response('', { status: 504, statusText: 'Offline' });
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(request);
    if (res && res.ok) cache.put(request, res.clone());
    return res;
  } catch (e) {
    // Try the page cache, then any cache (incl. saved articles), then offline page.
    const cached = await cache.match(request, { ignoreSearch: true })
                || await caches.match(request, { ignoreSearch: true });
    if (cached) return cached;
    const offline = await caches.match(OFFLINE_URL);
    return offline || new Response('Offline', { status: 503, statusText: 'Offline' });
  }
}

// ---------------------------------------------------------------------------
// Fetch routing
// ---------------------------------------------------------------------------
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // leave Firebase/Google/CDNs alone

  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    event.respondWith(networkFirst(req, PAGES));
    return;
  }
  if (isImage(url) || isFont(url)) {
    event.respondWith(cacheFirst(req, isFont(url) ? STATIC : IMAGES));
    return;
  }
  if (isStatic(url)) {
    event.respondWith(staleWhileRevalidate(req, STATIC));
  }
});

// ---------------------------------------------------------------------------
// Messaging: skip-waiting + save/remove articles for offline reading
// ---------------------------------------------------------------------------
self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data === 'SKIP_WAITING' || data.type === 'SKIP_WAITING') {
    self.skipWaiting();
    return;
  }
  if (data.type === 'SAVE_ARTICLE' && data.url) {
    event.waitUntil(saveArticle(data.url, data.assets || []));
  }
  if (data.type === 'REMOVE_ARTICLE' && data.url) {
    event.waitUntil(removeArticle(data.url));
  }
});

async function saveArticle(url, assets) {
  const cache = await caches.open(SAVED);
  const urls = [url].concat(assets || []);
  await Promise.all(urls.map((u) => cache.add(u).catch((e) => console.warn('[SW] save skip', u, e && e.message))));
  await broadcast({ type: 'ARTICLE_SAVED', url });
}
async function removeArticle(url) {
  const cache = await caches.open(SAVED);
  await cache.delete(url, { ignoreSearch: true });
  await broadcast({ type: 'ARTICLE_REMOVED', url });
}
async function broadcast(msg) {
  const clients = await self.clients.matchAll({ includeUncontrolled: true });
  clients.forEach((c) => c.postMessage(msg));
}

// ---------------------------------------------------------------------------
// Push Notifications — structure ready (no subscription is created until the
// site owner enables push in pwa.js, so this stays dormant by default).
// ---------------------------------------------------------------------------
self.addEventListener('push', (event) => {
  let payload = {};
  try { payload = event.data ? event.data.json() : {}; } catch (e) { payload = { body: event.data && event.data.text() }; }
  const title = payload.title || 'Beylood';
  const options = {
    body: payload.body || '',
    icon: payload.icon || 'assets/icon-192.png',
    badge: payload.badge || 'assets/icon-192.png',
    lang: payload.lang || 'so',
    tag: payload.tag || 'beylood',
    data: { url: payload.url || 'index.html' }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || 'index.html';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const c of clients) {
        if ('focus' in c) { c.navigate(target); return c.focus(); }
      }
      return self.clients.openWindow(target);
    })
  );
});

// ---------------------------------------------------------------------------
// Background Sync — replays requests queued in IndexedDB while offline.
// The page enqueues via the same DB then calls registration.sync.register('beylood-sync').
// ---------------------------------------------------------------------------
const DB_NAME = 'beylood-sync-db';
const STORE = 'requests';

function idbOpen() {
  return new Promise((resolve, reject) => {
    const r = indexedDB.open(DB_NAME, 1);
    r.onupgradeneeded = () => { if (!r.result.objectStoreNames.contains(STORE)) r.result.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true }); };
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}
function idbAll(db) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}
function idbDelete(db, id) {
  return new Promise((resolve) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => resolve();
  });
}

async function replayQueue() {
  const db = await idbOpen();
  const items = await idbAll(db);
  for (const item of items) {
    try {
      await fetch(item.url, {
        method: item.method || 'POST',
        headers: item.headers || { 'Content-Type': 'application/json' },
        body: item.body ? JSON.stringify(item.body) : undefined
      });
      await idbDelete(db, item.id);
    } catch (e) {
      // Still offline — keep the item; sync will fire again later.
      break;
    }
  }
  await broadcast({ type: 'SYNC_REPLAYED' });
}

self.addEventListener('sync', (event) => {
  if (event.tag === 'beylood-sync') {
    event.waitUntil(replayQueue());
  }
});
