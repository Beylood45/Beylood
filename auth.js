/* ============================================
   Beylood — Authentication + dynamic navbar
   --------------------------------------------
   • Email/Password + Google sign in / sign up
   • Saves a profile to the Firestore "users" collection
   • Renders a profile chip in the navbar on every page
   • Injects a "Save article" bookmark button on articles
   Config lives in firebase-init.js (imported below).
   ============================================ */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  doc, getDoc, setDoc, deleteDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import { auth, db, googleProvider, configReady } from "./firebase-init.js";

// Keep the session in the browser's local persistence (the secure
// default) so a refresh doesn't log the user out. Made explicit here.
if (configReady()) {
  setPersistence(auth, browserLocalPersistence).catch((e) => console.warn('persistence:', e));
}

/* ---------- Security helpers ---------- */
// Escape any user-controlled text before putting it into innerHTML.
// This is the main defense against stored XSS (e.g. a malicious display name).
function escapeHTML(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
// Only trust https image URLs (Google profile photos). Blocks javascript:, data:, etc.
function safePhotoURL(url) {
  return (typeof url === 'string' && /^https:\/\//i.test(url)) ? url : '';
}
// Trim, strip angle brackets, and cap the length of a free-text name.
function sanitizeName(name) {
  return String(name || '').replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 80);
}
function isValidEmail(email) {
  const e = String(email || '').trim();
  return e.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

/* ---------- Localized helpers ---------- */
function curLang() { return document.documentElement.lang || 'so'; }
function tr(map) { return map[curLang()] || map.en; }

function friendlyError(code) {
  const messages = {
    'auth/invalid-email': { so: 'Iimaylku sax maaha.', en: 'Invalid email address.', ar: 'بريد إلكتروني غير صالح.', sw: 'Barua pepe si sahihi.' },
    'auth/user-not-found': { so: 'Akoon laguma helin iimaylkan.', en: 'No account found with this email.', ar: 'لا يوجد حساب بهذا البريد.', sw: 'Hakuna akaunti ya barua pepe hii.' },
    'auth/wrong-password': { so: 'Furaha waa khalad.', en: 'Incorrect password.', ar: 'كلمة المرور خاطئة.', sw: 'Nenosiri si sahihi.' },
    'auth/invalid-credential': { so: 'Iimaylka ama furaha waa khalad.', en: 'Invalid email or password.', ar: 'البريد أو كلمة المرور خاطئة.', sw: 'Barua pepe au nenosiri si sahihi.' },
    'auth/email-already-in-use': { so: 'Iimaylkan horey ayaa loo isticmaalay.', en: 'This email is already in use.', ar: 'هذا البريد مستخدم بالفعل.', sw: 'Barua pepe hii tayari inatumika.' },
    'auth/weak-password': { so: 'Furaha waa daciif (ugu yaraan 6 xaraf).', en: 'Password is too weak (min 6 characters).', ar: 'كلمة المرور ضعيفة (6 خانات على الأقل).', sw: 'Nenosiri ni dhaifu (angalau herufi 6).' },
    'auth/popup-closed-by-user': { so: 'Daaqaddii Google waa la xidhay.', en: 'Google sign-in window was closed.', ar: 'تم إغلاق نافذة تسجيل الدخول.', sw: 'Dirisha la Google lilifungwa.' },
    'auth/network-request-failed': { so: 'Khalad shabakad ah. Hubi internet-kaaga.', en: 'Network error. Check your connection.', ar: 'خطأ في الشبكة. تحقق من اتصالك.', sw: 'Hitilafu ya mtandao. Angalia muunganisho.' }
  };
  return (messages[code] && tr(messages[code])) ||
    tr({ so: 'Khalad ayaa dhacay. Fadlan mar kale isku day.', en: 'An error occurred. Please try again.', ar: 'حدث خطأ. حاول مرة أخرى.', sw: 'Hitilafu imetokea. Jaribu tena.' });
}

function setMsg(id, text, isError) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  el.classList.toggle('is-error', !!isError);
  el.classList.toggle('is-info', !isError);
}

/* ---------- Firestore: save / update user profile ---------- */
// Map the Firebase auth providerId (e.g. "google.com") to a short
// label we use everywhere ("google", "password"). Defaults to "password"
// for email/password, since this is the most common case.
function providerLabel(user) {
  const p = (user.providerData && user.providerData[0] && user.providerData[0].providerId) || '';
  if (/google/i.test(p)) return 'google';
  if (/password/i.test(p) || /email/i.test(p)) return 'password';
  return p || 'password';
}

async function saveUserProfile(user, fallbackName) {
  try {
    const ref = doc(db, 'users', user.uid);
    const snap = await getDoc(ref);
    const data = {
      name: user.displayName || fallbackName || '',
      email: user.email || '',
      photoURL: user.photoURL || '',
      provider: providerLabel(user),
      lastLogin: serverTimestamp()
    };
    if (!snap.exists()) data.createdAt = serverTimestamp();
    await setDoc(ref, data, { merge: true });

    // Fire-and-forget analytics events so the admin dashboard can show
    // first sign-ups separately from returning sign-ins.
    if (typeof window !== 'undefined' && typeof window.beyTrack === 'function') {
      window.beyTrack(snap.exists() ? 'sign_in' : 'sign_up', { method: data.provider });
    }
  } catch (err) {
    console.warn('Could not save user profile:', err);
  }
}

/* ---------- Sign Up ---------- */
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Sanitize + validate every input before it ever reaches Firebase.
    const name = sanitizeName((document.getElementById('suName') || {}).value);
    const email = ((document.getElementById('suEmail') || {}).value || '').trim();
    const p1 = (document.getElementById('suPass') || {}).value || '';
    const p2 = (document.getElementById('suPass2') || {}).value || '';
    if (!isValidEmail(email)) {
      setMsg('signupMsg', tr({ so: 'Iimaylku sax maaha.', en: 'Please enter a valid email.', ar: 'يرجى إدخال بريد صحيح.', sw: 'Tafadhali weka barua pepe sahihi.' }), true);
      return;
    }
    if (p1.length < 8) {
      setMsg('signupMsg', tr({ so: 'Furaha waa inuu ka kooban yahay ugu yaraan 8 xaraf.', en: 'Password must be at least 8 characters.', ar: 'يجب أن تكون كلمة المرور 8 أحرف على الأقل.', sw: 'Nenosiri liwe na angalau herufi 8.' }), true);
      return;
    }
    if (p1 !== p2) {
      setMsg('signupMsg', tr({ so: 'Lambarrada furaha isma egga.', en: 'Passwords do not match.', ar: 'كلمتا المرور غير متطابقتين.', sw: 'Manenosiri hayalingani.' }), true);
      return;
    }
    if (!configReady()) {
      setMsg('signupMsg', tr({ so: 'Firebase config weli lama dejin.', en: 'Firebase config not set yet.', ar: 'لم يتم ضبط إعدادات Firebase بعد.', sw: 'Mipangilio ya Firebase haijawekwa.' }), true);
      return;
    }
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, p1);
      if (name) await updateProfile(cred.user, { displayName: name });
      await saveUserProfile(cred.user, name);
      window.location.href = 'dashboard.html';
    } catch (err) {
      setMsg('signupMsg', friendlyError(err.code), true);
    }
  });
}

/* ---------- Sign In ---------- */
const signinForm = document.getElementById('signinForm');
if (signinForm) {
  signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = ((document.getElementById('signinEmail') || {}).value || '').trim();
    const pass = (document.getElementById('signinPass') || {}).value || '';
    if (!isValidEmail(email) || !pass) {
      setMsg('signinMsg', tr({ so: 'Geli iimayl iyo furo sax ah.', en: 'Enter a valid email and password.', ar: 'أدخل بريداً وكلمة مرور صحيحين.', sw: 'Weka barua pepe na nenosiri sahihi.' }), true);
      return;
    }
    if (!configReady()) {
      setMsg('signinMsg', tr({ so: 'Firebase config weli lama dejin.', en: 'Firebase config not set yet.', ar: 'لم يتم ضبط إعدادات Firebase بعد.', sw: 'Mipangilio ya Firebase haijawekwa.' }), true);
      return;
    }
    try {
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      await saveUserProfile(cred.user);
      window.location.href = 'dashboard.html';
    } catch (err) {
      setMsg('signinMsg', friendlyError(err.code), true);
    }
  });
}

/* ---------- Google sign-in buttons ---------- */
document.querySelectorAll('.auth-google').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const msgId = document.getElementById('signupMsg') ? 'signupMsg' : 'signinMsg';
    if (!configReady()) {
      setMsg(msgId, tr({ so: 'Firebase config weli lama dejin.', en: 'Firebase config not set yet.', ar: 'لم يتم ضبط إعدادات Firebase بعد.', sw: 'Mipangilio ya Firebase haijawekwa.' }), true);
      return;
    }
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      await saveUserProfile(cred.user);
      window.location.href = 'dashboard.html';
    } catch (err) {
      setMsg(msgId, friendlyError(err.code), true);
    }
  });
});

/* ---------- Navbar profile chip ---------- */
function firstName(name, email) {
  if (name && name.trim()) return name.trim().split(/\s+/)[0];
  if (email) return email.split('@')[0];
  return 'Account';
}
function initials(name, email) {
  const src = (name && name.trim()) || (email ? email.split('@')[0] : '') || 'U';
  const parts = src.trim().split(/\s+/);
  const a = parts[0] ? parts[0][0] : 'U';
  const b = parts[1] ? parts[1][0] : '';
  return (a + b).toUpperCase();
}

function avatarMarkup(user) {
  const photo = safePhotoURL(user.photoURL);
  if (photo) {
    return '<img class="auth-avatar-img" src="' + escapeHTML(photo) + '" alt="" referrerpolicy="no-referrer" />';
  }
  return '<span class="auth-avatar-fallback">' + escapeHTML(initials(user.displayName, user.email)) + '</span>';
}

function setAuthLinksVisible(visible) {
  document.querySelectorAll('.nav-right a[href="signin.html"], .nav-right a[href="signup.html"]').forEach((a) => {
    a.style.display = visible ? '' : 'none';
  });
}

function renderChip(user) {
  const navRight = document.querySelector('.nav-right');
  if (!navRight) return;
  let chip = document.getElementById('authChip');
  const logoutLabel = tr({ so: 'Ka bax', en: 'Logout', ar: 'خروج', sw: 'Toka' });
  const memberLabel = tr({ so: 'Xubin', en: 'Member', ar: 'عضو', sw: 'Mwanachama' });
  const html =
    '<a href="dashboard.html" class="auth-chip-link" title="Dashboard">' +
      '<span class="auth-avatar">' + avatarMarkup(user) + '</span>' +
      '<span class="auth-chip-name">' + escapeHTML(firstName(user.displayName, user.email)) + '</span>' +
      '<span class="auth-badge">' + memberLabel + '</span>' +
    '</a>' +
    '<button type="button" id="logoutBtn" class="auth-logout-btn" aria-label="' + logoutLabel + '" title="' + logoutLabel + '">' +
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>' +
    '</button>';
  if (!chip) {
    chip = document.createElement('div');
    chip.id = 'authChip';
    chip.className = 'auth-chip';
    const themeBtn = document.getElementById('themeBtn');
    navRight.insertBefore(chip, themeBtn || navRight.firstChild);
  }
  chip.innerHTML = html;
  const lo = document.getElementById('logoutBtn');
  if (lo) lo.addEventListener('click', () => signOut(auth).then(() => { window.location.href = 'index.html'; }));
}

function removeChip() {
  const chip = document.getElementById('authChip');
  if (chip) chip.remove();
}

/* ---------- Bookmark button on article pages ---------- */
function pageId() {
  const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  return file.replace(/[^a-z0-9._-]/g, '') || 'index.html';
}
function pageTitle() {
  const t = document.querySelector('.article-title');
  if (t) {
    const vis = t.querySelector('span:not([hidden])');
    if (vis && vis.textContent.trim()) return vis.textContent.trim();
  }
  return (document.title || 'Article').replace(/\s*[|—-]\s*Beylood.*$/i, '').trim();
}

function injectBookmarkButton(currentUser) {
  const page = document.querySelector('.article-page');
  if (!page) return;
  const header = page.querySelector('.article-header');
  if (!header) return;
  let btn = header.querySelector('.bookmark-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'bookmark-btn';
    header.appendChild(btn);
  }
  const id = pageId();

  function paint(saved) {
    const label = saved
      ? tr({ so: 'La kaydiyey', en: 'Saved', ar: 'محفوظ', sw: 'Imehifadhiwa' })
      : tr({ so: 'Kaydi maqaalka', en: 'Save article', ar: 'حفظ المقال', sw: 'Hifadhi makala' });
    btn.classList.toggle('is-saved', saved);
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" width="16" height="16" fill="' + (saved ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>' +
      '<span>' + label + '</span>';
  }

  paint(false);

  if (!currentUser) {
    btn.onclick = () => { window.location.href = 'signin.html'; };
    return;
  }

  const ref = doc(db, 'users', currentUser.uid, 'bookmarks', id);
  getDoc(ref).then((snap) => paint(snap.exists())).catch(() => {});

  btn.onclick = async () => {
    btn.disabled = true;
    try {
      const snap = await getDoc(ref);
      if (snap.exists()) {
        await deleteDoc(ref);
        paint(false);
      } else {
        await setDoc(ref, { title: pageTitle(), url: id, savedAt: serverTimestamp() });
        paint(true);
      }
    } catch (err) {
      console.warn('Bookmark error:', err);
    } finally {
      btn.disabled = false;
    }
  };
}

/* ---------- Auth state → drive the whole UI ---------- */
if (configReady()) {
  onAuthStateChanged(auth, (user) => {
    const path = (location.pathname.split('/').pop() || '').toLowerCase();
    // Tag the document so CSS can switch the whole UI between guest and member
    // states (.auth-guest / .auth-member) — premium locks, guest-only / member-only.
    document.documentElement.classList.toggle('auth-member', !!user);
    document.documentElement.classList.toggle('auth-guest', !user);
    if (user) {
      setAuthLinksVisible(false);
      renderChip(user);
      injectBookmarkButton(user);
      // If a logged-in user lands on the auth pages, send them to the dashboard.
      if (path === 'signin.html' || path === 'signup.html') {
        window.location.href = 'dashboard.html';
      }
    } else {
      setAuthLinksVisible(true);
      removeChip();
      injectBookmarkButton(null);
    }
  });
}
