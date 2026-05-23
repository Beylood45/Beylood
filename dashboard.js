/* ============================================
   Beylood — Dashboard (protected page)
   --------------------------------------------
   • Guards the page: redirects guests to signin
   • Loads the user profile from Firestore
   • Lists saved articles (bookmarks subcollection)
   • Lets the user update their display name
   ============================================ */

import {
  onAuthStateChanged, signOut, updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc, getDoc, setDoc, deleteDoc, collection, getDocs, query, orderBy, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { auth, db, configReady } from "./firebase-init.js";

function curLang() { return document.documentElement.lang || 'so'; }
function tr(map) { return map[curLang()] || map.en; }
function $(id) { return document.getElementById(id); }

/* ---------- Security helpers ---------- */
// Escape user-controlled text before inserting into innerHTML (anti-XSS).
function escapeHTML(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
// Only allow https profile-photo URLs.
function safePhotoURL(url) {
  return (typeof url === 'string' && /^https:\/\//i.test(url)) ? url : '';
}
// Allow only local .html targets for saved-article links (no off-site / javascript: URLs).
function safeInternalURL(url) {
  const u = String(url || '');
  return /^[a-z0-9._-]+\.html$/i.test(u) ? u : 'articles.html';
}
function sanitizeName(name) {
  return String(name || '').replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 60);
}

function initials(name, email) {
  const src = (name && name.trim()) || (email ? email.split('@')[0] : '') || 'U';
  const p = src.trim().split(/\s+/);
  return ((p[0] ? p[0][0] : 'U') + (p[1] ? p[1][0] : '')).toUpperCase();
}

function formatDate(ts) {
  try {
    const d = ts && ts.toDate ? ts.toDate() : (ts ? new Date(ts) : null);
    if (!d) return '—';
    return d.toLocaleDateString(curLang() === 'ar' ? 'ar' : (curLang() === 'sw' ? 'sw' : 'en'), { year: 'numeric', month: 'long', day: 'numeric' });
  } catch { return '—'; }
}

function showError(msg) {
  const main = $('dashMain');
  const loading = $('dashLoading');
  if (loading) loading.hidden = true;
  if (main) {
    main.hidden = false;
    main.innerHTML = '<div class="container"><div class="dash-card" style="text-align:center;padding:48px;">' +
      '<p style="margin-bottom:16px;">' + msg + '</p>' +
      '<a class="btn btn-ask" href="index.html">Home</a></div></div>';
  }
}

if (!configReady()) {
  showError(tr({ so: 'Firebase config weli lama dejin.', en: 'Firebase config not set yet.', ar: 'لم يتم ضبط إعدادات Firebase بعد.', sw: 'Mipangilio ya Firebase haijawekwa.' }));
} else {
  onAuthStateChanged(auth, async (user) => {
    // Guard: no user → go to sign in
    if (!user) {
      window.location.replace('signin.html');
      return;
    }
    revealDashboard();
    fillProfile(user);
    await Promise.all([loadFromFirestore(user), loadBookmarks(user)]);
    wireSettings(user);
    wireLogout();
  });
}

function revealDashboard() {
  const loading = $('dashLoading');
  const main = $('dashMain');
  if (loading) loading.hidden = true;
  if (main) main.hidden = false;
  // Re-run reveal animation observer if available
  if (typeof window.initReveal === 'function') window.initReveal();
  else document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
}

function fillProfile(user) {
  const name = user.displayName || (user.email ? user.email.split('@')[0] : 'Beylood');
  if ($('welcomeName')) $('welcomeName').textContent = name;
  if ($('profHead')) $('profHead').textContent = name;
  if ($('profileEmail')) $('profileEmail').textContent = user.email || '';

  const av = $('profileAvatar');
  if (av) {
    const photo = safePhotoURL(user.photoURL);
    av.innerHTML = photo
      ? '<img class="auth-avatar-img" src="' + escapeHTML(photo) + '" alt="" referrerpolicy="no-referrer" />'
      : '<span class="auth-avatar-fallback">' + escapeHTML(initials(user.displayName, user.email)) + '</span>';
  }

  const provider = (user.providerData && user.providerData[0] && user.providerData[0].providerId) || '';
  if ($('profileProvider')) {
    $('profileProvider').textContent = provider.includes('google') ? 'Google' :
      tr({ so: 'Iimayl & Furo', en: 'Email & Password', ar: 'بريد وكلمة مرور', sw: 'Barua pepe & Nenosiri' });
  }

  if ($('setName')) $('setName').value = user.displayName || '';
  if ($('setEmail')) $('setEmail').value = user.email || '';

  // Fallback "member since" from auth metadata (Firestore value overrides later)
  if (user.metadata && user.metadata.creationTime && $('profileSince')) {
    $('profileSince').textContent = formatDate(user.metadata.creationTime);
  }
}

async function loadFromFirestore(user) {
  try {
    const ref = doc(db, 'users', user.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      // Self-heal: create the profile doc if missing
      await setDoc(ref, {
        name: user.displayName || '',
        email: user.email || '',
        photoURL: user.photoURL || '',
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      }, { merge: true });
      return;
    }
    const data = snap.data();
    if (data.createdAt && $('profileSince')) $('profileSince').textContent = formatDate(data.createdAt);
  } catch (err) {
    console.warn('Profile load failed:', err);
  }
}

async function loadBookmarks(user) {
  const list = $('savedList');
  const empty = $('savedEmpty');
  if (!list) return;
  list.innerHTML = '';
  try {
    const col = collection(db, 'users', user.uid, 'bookmarks');
    let snaps;
    try {
      snaps = await getDocs(query(col, orderBy('savedAt', 'desc')));
    } catch {
      snaps = await getDocs(col); // fallback if no index/order
    }
    const items = [];
    snaps.forEach((d) => items.push({ id: d.id, ...d.data() }));

    if ($('statSaved')) $('statSaved').textContent = String(items.length);

    if (!items.length) {
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;

    items.forEach((it) => {
      const row = document.createElement('div');
      row.className = 'saved-row';
      // Both the link target and the title come from stored data, so
      // validate the URL and escape the title before rendering.
      const url = safeInternalURL(it.url || (it.id.endsWith('.html') ? it.id : it.id + '.html'));
      const title = escapeHTML(it.title || it.id);
      row.innerHTML =
        '<a class="saved-link" href="' + url + '">' +
          '<span class="saved-ico"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg></span>' +
          '<span class="saved-text">' + title + '</span>' +
        '</a>' +
        '<button type="button" class="saved-remove" aria-label="Remove">' +
          '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</button>';
      row.querySelector('.saved-remove').addEventListener('click', async () => {
        row.style.opacity = '0.4';
        try {
          await deleteDoc(doc(db, 'users', user.uid, 'bookmarks', it.id));
          row.remove();
          const remaining = list.querySelectorAll('.saved-row').length;
          if ($('statSaved')) $('statSaved').textContent = String(remaining);
          if (!remaining && empty) empty.hidden = false;
        } catch (err) {
          console.warn('Remove failed:', err);
          row.style.opacity = '1';
        }
      });
      list.appendChild(row);
    });
  } catch (err) {
    console.warn('Bookmarks load failed:', err);
    if (empty) empty.hidden = false;
  }
}

function wireSettings(user) {
  const form = $('settingsForm');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = sanitizeName($('setName').value);
    const msg = $('settingsMsg');
    function setMsg(text, isError) {
      if (!msg) return;
      msg.textContent = text;
      msg.classList.toggle('is-error', !!isError);
      msg.classList.toggle('is-info', !isError);
    }
    try {
      await updateProfile(user, { displayName: name });
      await setDoc(doc(db, 'users', user.uid), { name: name }, { merge: true });
      if ($('welcomeName')) $('welcomeName').textContent = name || (user.email ? user.email.split('@')[0] : 'Beylood');
      if ($('profHead')) $('profHead').textContent = name || (user.email ? user.email.split('@')[0] : 'Beylood');
      const av = $('profileAvatar');
      if (av && !user.photoURL) av.innerHTML = '<span class="auth-avatar-fallback">' + initials(name, user.email) + '</span>';
      setMsg(tr({ so: 'Waa la kaydiyey ✓', en: 'Saved ✓', ar: 'تم الحفظ ✓', sw: 'Imehifadhiwa ✓' }), false);
    } catch (err) {
      setMsg(tr({ so: 'Khalad ayaa dhacay.', en: 'Something went wrong.', ar: 'حدث خطأ.', sw: 'Hitilafu imetokea.' }), true);
    }
  });
}

function wireLogout() {
  const btn = $('dashLogout');
  if (btn) btn.addEventListener('click', () => signOut(auth).then(() => window.location.replace('index.html')));
}
