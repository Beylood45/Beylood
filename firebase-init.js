/* ============================================
   Beylood — Firebase shared init
   --------------------------------------------
   Single source of truth for the Firebase app,
   Authentication, and Firestore. Every other
   module (auth.js, dashboard.js) imports from here
   so Firebase is initialized only once.

   FIRESTORE SETUP (do this once in the console):
   1. Build → Firestore Database → Create database
   2. Start in "production mode"
   3. Rules → paste:

      rules_version = '2';
      service cloud.firestore {
        match /databases/{database}/documents {
          match /users/{uid} {
            allow read, write: if request.auth != null && request.auth.uid == uid;
            match /bookmarks/{docId} {
              allow read, write: if request.auth != null && request.auth.uid == uid;
            }
          }
        }
      }
   ============================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAs9E6hK2zO-ax7QEhgA9sbhRFRbRX-c1A",
  authDomain: "beylood-e74d6.firebaseapp.com",
  projectId: "beylood-e74d6",
  storageBucket: "beylood-e74d6.firebasestorage.app",
  messagingSenderId: "262960651820",
  appId: "1:262960651820:web:2a92f2eff11ba619e43b89",
  measurementId: "G-YX4ZHPHQDB"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export function configReady() {
  return firebaseConfig.apiKey && firebaseConfig.apiKey !== "REPLACE_ME";
}
