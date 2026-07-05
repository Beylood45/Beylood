/* ============================================================
   Beylood — Premium gating (READ-ONLY)
   ------------------------------------------------------------
   Reads users/{uid}.premium from Firestore (via the shared
   firebase-init) and toggles <html class="is-premium">.
   Does NOT modify authentication, Firebase config, or rules.
   Premium is granted by an admin setting premium:true on the
   user's doc (e.g. in the Firebase Console).

   NOTE: client-side gating is convenience, not hard security.
   To fully enforce paid access, lock the `premium` field with a
   Firestore rule / Cloud Function (server side) — not done here.

   Public API: window.BeyloodPremium.isPremium() -> boolean
   Event: window 'beylood-premium' { detail: { premium } }
   ============================================================ */
import { auth, db } from "./firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

(function () {
  'use strict';

  var state = { premium: false, user: null, checked: false };

  window.BeyloodPremium = {
    isPremium: function () { return state.premium === true; },
    getUser: function () { return state.user; },
    isChecked: function () { return state.checked; }
  };

  function apply() {
    var root = document.documentElement;
    if (state.premium) root.classList.add('is-premium');
    else root.classList.remove('is-premium');
    root.classList.add('premium-checked');
    try {
      window.dispatchEvent(new CustomEvent('beylood-premium', { detail: { premium: state.premium, user: state.user } }));
    } catch (e) {}
  }

  onAuthStateChanged(auth, function (user) {
    state.user = user || null;
    state.premium = false;
    if (!user) { state.checked = true; apply(); return; }
    getDoc(doc(db, 'users', user.uid)).then(function (snap) {
      var d = snap && snap.exists() ? (snap.data() || {}) : {};
      state.premium = d.premium === true;
    }).catch(function () {
      state.premium = false;
    }).finally(function () {
      state.checked = true;
      apply();
    });
  });

  // Reflect initial (signed-out) state fast so free tools never wait on Firebase.
  apply();
})();
