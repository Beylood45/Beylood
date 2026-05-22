/* ============================================
   Beylood — Firebase Authentication
   --------------------------------------------
   SETUP (do this once):
   1. Create a project at https://console.firebase.google.com
   2. Build → Authentication → Get started
        • Enable "Email/Password"
        • Enable "Google" (set a support email)
   3. Project settings (gear) → Your apps → Web (</>) → Register app
   4. Copy the firebaseConfig values and REPLACE the placeholders below.
   5. Authentication → Settings → Authorized domains → add your live domain.
   ============================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* ----- REPLACE THESE WITH YOUR REAL FIREBASE CONFIG ----- */
const firebaseConfig = {
  apiKey: "REPLACE_ME",
  authDomain: "REPLACE_ME.firebaseapp.com",
  projectId: "REPLACE_ME",
  appId: "REPLACE_ME"
};
/* -------------------------------------------------------- */

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

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

function configReady() {
  return firebaseConfig.apiKey && firebaseConfig.apiKey !== 'REPLACE_ME';
}

/* ---------- Sign Up ---------- */
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = (document.getElementById('suName') || {}).value || '';
    const email = (document.getElementById('suEmail') || {}).value || '';
    const p1 = (document.getElementById('suPass') || {}).value || '';
    const p2 = (document.getElementById('suPass2') || {}).value || '';
    if (p1 !== p2) {
      setMsg('signupMsg', tr({ so: 'Lambarrada furaha isma egga.', en: 'Passwords do not match.', ar: 'كلمتا المرور غير متطابقتين.', sw: 'Manenosiri hayalingani.' }), true);
      return;
    }
    if (!configReady()) {
      setMsg('signupMsg', tr({ so: 'Firebase config weli lama dejin (auth.js).', en: 'Firebase config not set yet (auth.js).', ar: 'لم يتم ضبط إعدادات Firebase بعد.', sw: 'Mipangilio ya Firebase haijawekwa.' }), true);
      return;
    }
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), p1);
      if (name.trim()) await updateProfile(cred.user, { displayName: name.trim() });
      window.location.href = 'index.html';
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
    const email = (document.getElementById('signinEmail') || {}).value || '';
    const pass = (document.getElementById('signinPass') || {}).value || '';
    if (!configReady()) {
      setMsg('signinMsg', tr({ so: 'Firebase config weli lama dejin (auth.js).', en: 'Firebase config not set yet (auth.js).', ar: 'لم يتم ضبط إعدادات Firebase بعد.', sw: 'Mipangilio ya Firebase haijawekwa.' }), true);
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email.trim(), pass);
      window.location.href = 'index.html';
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
      setMsg(msgId, tr({ so: 'Firebase config weli lama dejin (auth.js).', en: 'Firebase config not set yet (auth.js).', ar: 'لم يتم ضبط إعدادات Firebase بعد.', sw: 'Mipangilio ya Firebase haijawekwa.' }), true);
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
      window.location.href = 'index.html';
    } catch (err) {
      setMsg(msgId, friendlyError(err.code), true);
    }
  });
});

/* ---------- Auth state → header chip + logout ---------- */
if (configReady()) {
  onAuthStateChanged(auth, (user) => {
    const slot = document.getElementById('authSlot');
    if (!slot) return;
    if (user) {
      const name = user.displayName || user.email || 'Account';
      slot.innerHTML =
        '<span class="auth-user">' +
        '<span class="auth-user-name">' + name + '</span>' +
        '<button type="button" id="logoutBtn" class="auth-logout">Logout</button>' +
        '</span>';
      const lo = document.getElementById('logoutBtn');
      if (lo) lo.addEventListener('click', () => signOut(auth).then(() => location.reload()));
    }
  });
}
