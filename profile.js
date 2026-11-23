/* ============================================
   Beylood — Profile page
   --------------------------------------------
   • Guards page: guests → signin.html
   • Loads/merges user doc from Firestore (users/{uid})
   • Renders avatar, identity, location, completion bar
   • Renders 4-stat grid (read / saved / logins / member since)
   • Lists saved bookmarks with date
   • Edit modal for name / photo URL / country / city
   • Email is read-only
   ============================================ */

import {
  onAuthStateChanged, updateProfile, deleteUser,
  reauthenticateWithPopup, reauthenticateWithCredential, EmailAuthProvider
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc, getDoc, setDoc, deleteDoc, collection, getDocs, query, orderBy, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { auth, db, googleProvider, configReady } from "./firebase-init.js";

/* ---------- Helpers ---------- */
function curLang() { return document.documentElement.lang || 'so'; }
function tr(map) { return map[curLang()] || map.en || map.so; }
function $(id) { return document.getElementById(id); }

function escapeHTML(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function safePhotoURL(url) {
  return (typeof url === 'string' && /^https:\/\//i.test(url)) ? url : '';
}
function safeInternalURL(url) {
  const u = String(url || '');
  return /^[a-z0-9._-]+\.html$/i.test(u) ? u : 'articles.html';
}
function sanitizeText(s, max = 60) {
  return String(s || '').replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, max);
}
function initials(name, email) {
  const src = (name && name.trim()) || (email ? email.split('@')[0] : '') || 'U';
  const p = src.trim().split(/\s+/);
  return ((p[0] ? p[0][0] : 'U') + (p[1] ? p[1][0] : '')).toUpperCase();
}
function formatMonthYear(ts) {
  try {
    const d = ts && ts.toDate ? ts.toDate() : (ts ? new Date(ts) : null);
    if (!d) return '—';
    const loc = curLang() === 'ar' ? 'ar' : (curLang() === 'sw' ? 'sw' : 'en');
    return d.toLocaleDateString(loc, { month: 'short', year: 'numeric' });
  } catch { return '—'; }
}
function formatFullDate(ts) {
  try {
    const d = ts && ts.toDate ? ts.toDate() : (ts ? new Date(ts) : null);
    if (!d) return '—';
    return d.toLocaleDateString(curLang() === 'ar' ? 'ar' : 'en', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch { return '—'; }
}

/* ---------- Auth gate ---------- */
if (!configReady()) {
  hideLoading();
  showFatal(tr({
    so: 'Firebase config weli lama dejin.',
    en: 'Firebase configuration is not set yet.',
    ar: 'لم يتم ضبط إعدادات Firebase بعد.',
    sw: 'Mipangilio ya Firebase haijawekwa.'
  }));
} else {
  // Slow network banner
  const slowTimer = setTimeout(() => {
    const s = $('profLoadingStatus');
    if (s) s.hidden = false;
  }, 6000);

  onAuthStateChanged(auth, async (user) => {
    clearTimeout(slowTimer);
    if (!user) {
      window.location.replace('signin.html');
      return;
    }

    // Step 1 — Always reveal the page first (auth is confirmed)
    revealPage();

    // Step 2 — Build a minimal profile object from auth user so the
    //          page always has SOMETHING to show, even if Firestore
    //          fails. Then merge any data we manage to load.
    let profile = {
      displayName: user.displayName || '',
      email: user.email || '',
      photoURL: user.photoURL || '',
      country: '',
      city: '',
      bookmarksCount: 0,
      articlesRead: 0,
      loginCount: 0,
      createdAt: user.metadata && user.metadata.creationTime ? user.metadata.creationTime : null
    };

    // Step 3 — Try to load Firestore profile. If it fails (permission,
    //          offline, etc.), keep the defaults from auth.
    try {
      const loaded = await loadProfile(user);
      profile = Object.assign({}, profile, loaded || {});
    } catch (err) {
      console.warn('Firestore profile load failed, using auth defaults:', err);
    }

    // Step 4 — Render whatever we have (always succeeds with defaults)
    try { renderHero(user, profile); }       catch (e) { console.warn('renderHero:', e); }
    try { renderStats(user, profile); }      catch (e) { console.warn('renderStats:', e); }
    try { renderCompletion(user, profile); } catch (e) { console.warn('renderCompletion:', e); }

    // Step 5 — Try bookmarks (best-effort)
    let bookmarks = [];
    try {
      bookmarks = await loadBookmarks(user);
      renderSavedList(bookmarks);
      // sync saved count if it's drifted (best-effort, ignore failures)
      if (profile.bookmarksCount !== bookmarks.length) {
        try {
          await setDoc(doc(db, 'users', user.uid), { bookmarksCount: bookmarks.length }, { merge: true });
          const el = $('statSaved');
          if (el) el.textContent = bookmarks.length;
        } catch (e) { console.warn('Could not sync bookmarksCount:', e); }
      }
    } catch (err) {
      console.warn('Bookmarks load failed:', err);
      renderSavedList([]);
    }

    // Step 6 — Always wire the edit modal
    try { wireEdit(user, profile); } catch (e) { console.warn('wireEdit:', e); }

    // Step 7 — Account deletion (required by app stores + privacy policy)
    try { wireDelete(user); } catch (e) { console.warn('wireDelete:', e); }
  });
}

function hideLoading() {
  const l = $('profLoading');
  if (l) l.hidden = true;
}
function revealPage() {
  hideLoading();
  const m = $('profMain');
  if (m) m.hidden = false;
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
}
function showFatal(msg) {
  const m = $('profMain');
  if (!m) return;
  m.hidden = false;
  m.innerHTML = '<div class="container"><div class="profile-hero" style="text-align:center;padding:64px 32px;">' +
    '<p style="margin-bottom:16px;color:var(--gray-700);font-size:16px;">' + escapeHTML(msg) + '</p>' +
    '<a class="btn btn-ask" href="index.html">Home</a></div></div>';
}

/* ---------- Firestore ---------- */
async function loadProfile(user) {
  const ref = doc(db, 'users', user.uid);
  let snap;
  try {
    snap = await getDoc(ref);
  } catch (e) {
    console.warn('Could not read user doc:', e);
    return {};
  }

  if (snap.exists()) {
    return snap.data() || {};
  }

  // Bootstrap doc on first visit — best-effort, never throw
  const data = {
    displayName: user.displayName || '',
    email: user.email || '',
    photoURL: user.photoURL || '',
    country: '',
    city: '',
    bookmarksCount: 0,
    articlesRead: 0,
    loginCount: 1,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  try {
    await setDoc(ref, data);
  } catch (e) {
    console.warn('Could not bootstrap user doc (rules may be old):', e);
    // Return defaults anyway so page renders
  }
  return data;
}

async function loadBookmarks(user) {
  try {
    const ref = collection(db, 'users', user.uid, 'bookmarks');
    const q = query(ref, orderBy('savedAt', 'desc'));
    const snap = await getDocs(q);
    const items = [];
    snap.forEach((d) => items.push({ id: d.id, ...d.data() }));
    return items;
  } catch (e) {
    console.warn('Bookmarks load failed:', e);
    return [];
  }
}

/* ---------- Render ---------- */
function renderHero(user, profile) {
  // Name
  const name = profile.displayName || user.displayName || (user.email ? user.email.split('@')[0] : 'Beylood');
  $('profName').textContent = name;
  $('profEmail').textContent = user.email || '';

  // Avatar
  const av = $('profAvatar');
  const photo = safePhotoURL(profile.photoURL || user.photoURL);
  if (av) {
    av.innerHTML = photo
      ? '<img class="auth-avatar-img" src="' + escapeHTML(photo) + '" alt="" referrerpolicy="no-referrer" />'
      : '<span class="auth-avatar-fallback">' + escapeHTML(initials(name, user.email)) + '</span>';
  }

  // Location
  const loc = $('profLocationText');
  const country = sanitizeText(profile.country || '', 40);
  const city = sanitizeText(profile.city || '', 60);
  if (loc) {
    if (city && country)      loc.textContent = city + ', ' + country;
    else if (country)         loc.textContent = country;
    else if (city)            loc.textContent = city;
    else                      loc.innerHTML = '<span data-lang="so">Goob lama dejin</span><span data-lang="en" hidden>Location not set</span><span data-lang="ar" hidden>الموقع غير محدد</span><span data-lang="sw" hidden>Eneo halijawekwa</span>';
  }
}

function renderStats(user, profile) {
  $('statArticlesRead').textContent = profile.articlesRead || 0;
  $('statSaved').textContent = profile.bookmarksCount || 0;
  $('statLogins').textContent = profile.loginCount || 0;
  const memberSince = profile.createdAt || user.metadata?.creationTime;
  $('statMemberSince').textContent = formatMonthYear(memberSince);
}

function renderCompletion(user, profile) {
  // 5 fields contribute to completion: name, photo, country, city, email (always present)
  const checks = [
    !!(profile.displayName || user.displayName),
    !!(profile.photoURL || user.photoURL),
    !!profile.country,
    !!profile.city,
    !!user.email
  ];
  const filled = checks.filter(Boolean).length;
  const pct = Math.round((filled / checks.length) * 100);
  $('profCompletionPct').textContent = pct + '%';
  $('profCompletionFill').style.width = pct + '%';
  const hint = $('profCompletionHint');
  if (pct === 100) {
    hint.innerHTML = '<span data-lang="so">Hambalyo! Profile-kaagu waa dhamaystiran yahay.</span><span data-lang="en" hidden>Great! Your profile is complete.</span><span data-lang="ar" hidden>رائع! ملفك مكتمل.</span><span data-lang="sw" hidden>Vyema! Wasifu wako umekamilika.</span>';
  } else {
    const need = [];
    if (!checks[0]) need.push(tr({ so: 'magaca', en: 'name', ar: 'الاسم', sw: 'jina' }));
    if (!checks[1]) need.push(tr({ so: 'sawirka', en: 'photo', ar: 'الصورة', sw: 'picha' }));
    if (!checks[2]) need.push(tr({ so: 'waddanka', en: 'country', ar: 'البلد', sw: 'nchi' }));
    if (!checks[3]) need.push(tr({ so: 'magaalada', en: 'city', ar: 'المدينة', sw: 'jiji' }));
    hint.textContent = tr({
      so: 'Ku dar: ', en: 'Add: ', ar: 'أضف: ', sw: 'Ongeza: '
    }) + need.join(', ');
  }
}

function renderSavedList(items) {
  const list = $('savedList');
  const empty = $('savedEmpty');
  if (!list || !empty) return;
  if (!items.length) {
    list.hidden = true;
    empty.hidden = false;
    return;
  }
  empty.hidden = true;
  list.hidden = false;
  list.innerHTML = items.map(item => {
    const href = safeInternalURL(item.url || item.id);
    const title = escapeHTML(sanitizeText(item.title || 'Maqaalka', 120));
    const dateStr = formatFullDate(item.savedAt);
    return '<a class="profile-saved-row" href="' + href + '">' +
      '<div class="profile-saved-ico">' +
        '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>' +
      '</div>' +
      '<div class="profile-saved-meta">' +
        '<span class="profile-saved-title">' + title + '</span>' +
        '<span class="profile-saved-date">' + escapeHTML(dateStr) + '</span>' +
      '</div>' +
      '<svg class="profile-saved-arrow" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>' +
    '</a>';
  }).join('');
}

/* ---------- Edit modal ---------- */
function wireEdit(user, initial) {
  const modal = $('profModal');
  const openA = $('profEditBtn');
  const openB = $('profEditPhotoBtn');
  const closeBtn = $('profModalCloseBtn');
  const overlay = $('profModalClose');
  const form = $('profForm');
  const msg = $('formMsg');

  // Latest snapshot we display from
  let current = { ...initial };

  function open() {
    $('formName').value    = current.displayName || user.displayName || '';
    $('formPhoto').value   = current.photoURL || user.photoURL || '';
    $('formCountry').value = current.country || '';
    $('formCity').value    = sanitizeText(current.city || '', 60);
    $('formEmail').value   = user.email || '';
    msg.textContent = '';
    msg.className = 'auth-msg';
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    setTimeout(() => $('formName').focus(), 50);
  }
  function close() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }
  openA && openA.addEventListener('click', open);
  openB && openB.addEventListener('click', open);
  closeBtn && closeBtn.addEventListener('click', close);
  overlay && overlay.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) close(); });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = '';
    msg.className = 'auth-msg';

    const newName = sanitizeText($('formName').value, 60);
    const newPhotoRaw = $('formPhoto').value.trim();
    const newPhoto = safePhotoURL(newPhotoRaw);
    if (newPhotoRaw && !newPhoto) {
      msg.className = 'auth-msg is-err';
      msg.textContent = tr({
        so: 'URL-ka sawirka waa inuu noqdaa https://…',
        en: 'Photo URL must start with https://',
        ar: 'يجب أن يبدأ رابط الصورة بـ https://',
        sw: 'URL ya picha lazima ianze na https://'
      });
      return;
    }
    const newCountry = sanitizeText($('formCountry').value, 40);
    const newCity    = sanitizeText($('formCity').value, 60);

    const submitBtn = $('formSubmit');
    submitBtn.disabled = true;
    submitBtn.textContent = tr({ so: 'Waa la kaydinayaa…', en: 'Saving…', ar: 'جارٍ الحفظ…', sw: 'Inahifadhi…' });

    try {
      // 1) Update Firebase Auth profile (name + photo)
      if (newName !== (user.displayName || '') || newPhoto !== (user.photoURL || '')) {
        await updateProfile(user, {
          displayName: newName || user.displayName || null,
          photoURL: newPhoto || user.photoURL || null
        });
      }
      // 2) Merge into Firestore users/{uid}
      const updates = {
        displayName: newName,
        photoURL: newPhoto,
        country: newCountry,
        city: newCity,
        updatedAt: serverTimestamp()
      };
      await setDoc(doc(db, 'users', user.uid), updates, { merge: true });

      current = { ...current, ...updates };
      renderHero(user, current);
      renderCompletion(user, current);

      msg.className = 'auth-msg is-ok';
      msg.textContent = tr({
        so: 'Waa la kaydiyay.',
        en: 'Saved successfully.',
        ar: 'تم الحفظ.',
        sw: 'Imehifadhiwa.'
      });
      setTimeout(close, 900);
    } catch (err) {
      msg.className = 'auth-msg is-err';
      msg.textContent = tr({
        so: 'Cilad ayaa dhacday. Isku day mar kale.',
        en: 'Something went wrong. Try again.',
        ar: 'حدث خطأ. حاول مرة أخرى.',
        sw: 'Hitilafu imetokea. Jaribu tena.'
      });
      console.warn('Profile update failed:', err);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span data-lang="so">Kaydi isbeddelka</span><span data-lang="en" hidden>Save changes</span><span data-lang="ar" hidden>حفظ التغييرات</span><span data-lang="sw" hidden>Hifadhi mabadiliko</span>';
    }
  });
}


/* ---------- Delete account ----------
   Removes the user's Firestore data (bookmarks, AI chats + messages,
   profile document) and then the Firebase Auth account itself.
   Firebase requires a recent sign-in to delete an account, so we
   re-authenticate (Google popup or password prompt) when needed.   */
async function deleteAllUserData(uid) {
  // bookmarks
  try {
    const bms = await getDocs(collection(db, 'users', uid, 'bookmarks'));
    for (const d of bms.docs) await deleteDoc(d.ref);
  } catch (e) { console.warn('delete bookmarks:', e); }
  // chats + messages
  try {
    const chats = await getDocs(collection(db, 'users', uid, 'chats'));
    for (const c of chats.docs) {
      try {
        const msgs = await getDocs(collection(db, 'users', uid, 'chats', c.id, 'messages'));
        for (const m of msgs.docs) await deleteDoc(m.ref);
      } catch (e) { console.warn('delete messages:', e); }
      await deleteDoc(c.ref);
    }
  } catch (e) { console.warn('delete chats:', e); }
  // profile document (needs `allow delete: if isOwner(uid)` in firestore.rules)
  try { await deleteDoc(doc(db, 'users', uid)); }
  catch (e) { console.warn('delete profile doc:', e); }
}

async function reauth(user) {
  const isGoogle = (user.providerData || []).some(p => p && p.providerId === 'google.com');
  if (isGoogle) { await reauthenticateWithPopup(user, googleProvider); return; }
  const pw = window.prompt(tr({
    so: 'Amni darteed, geli furahaaga sirta ah (password) si aad u xaqiijiso tirtirka:',
    en: 'For security, enter your password to confirm deletion:',
    ar: 'لأسباب أمنية، أدخل كلمة المرور لتأكيد الحذف:',
    sw: 'Kwa usalama, weka nenosiri lako kuthibitisha kufuta:'
  }));
  if (!pw) throw new Error('cancelled');
  await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, pw));
}

function wireDelete(user) {
  const btn = $('profDeleteBtn');
  const msg = $('profDeleteMsg');
  if (!btn || btn.dataset.wired) return;
  btn.dataset.wired = '1';
  btn.addEventListener('click', async () => {
    const ok = window.confirm(tr({
      so: 'Ma hubtaa inaad tirtirto akoonkaaga? Profile-kaaga, maqaallada aad kaydisay iyo wada-sheekaysiga AI waa la tirtiri doonaa. Tan dib looma celin karo.',
      en: 'Are you sure you want to delete your account? Your profile, saved articles and AI chats will be deleted. This cannot be undone.',
      ar: 'هل أنت متأكد من حذف حسابك؟ سيتم حذف ملفك الشخصي ومقالاتك المحفوظة ومحادثات الذكاء الاصطناعي. لا يمكن التراجع عن ذلك.',
      sw: 'Una uhakika unataka kufuta akaunti yako? Wasifu wako, makala ulizohifadhi na mazungumzo ya AI yatafutwa. Hili haliwezi kutenduliwa.'
    }));
    if (!ok) return;
    btn.disabled = true;
    if (msg) { msg.className = 'auth-msg'; msg.textContent = tr({ so: 'Waa la tirtirayaa…', en: 'Deleting…', ar: 'جارٍ الحذف…', sw: 'Inafuta…' }); }
    try {
      // Re-authenticate first so the final step cannot fail half-way.
      await reauth(user);
      await deleteAllUserData(user.uid);
      await deleteUser(user);
      try { localStorage.removeItem('beylood_farm_v1'); } catch (e) {}
      alert(tr({
        so: 'Akoonkaaga waa la tirtiray. Mahadsanid inaad isticmaashay Beylood.',
        en: 'Your account has been deleted. Thank you for using Beylood.',
        ar: 'تم حذف حسابك. شكراً لاستخدامك Beylood.',
        sw: 'Akaunti yako imefutwa. Asante kwa kutumia Beylood.'
      }));
      window.location.replace('index.html');
    } catch (err) {
      console.warn('Account deletion failed:', err);
      btn.disabled = false;
      if (msg) {
        msg.className = 'auth-msg is-err';
        msg.textContent = (err && err.message === 'cancelled') ? '' : tr({
          so: 'Tirtirku ma dhammaan. Isku day mar kale ama nala soo xiriir.',
          en: 'Deletion did not complete. Please try again or contact us.',
          ar: 'لم يكتمل الحذف. حاول مرة أخرى أو تواصل معنا.',
          sw: 'Kufuta hakukukamilika. Jaribu tena au wasiliana nasi.'
        });
      }
    }
  });
}
