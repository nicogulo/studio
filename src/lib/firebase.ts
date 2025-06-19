
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics"; // Analytics not used if not explicitly needed

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBChVpmxy_g1JfuZrd3NgwJmcieizdiUuM",
  authDomain: "nico-trio.firebaseapp.com",
  projectId: "nico-trio",
  storageBucket: "nico-trio.appspot.com", // Standard format, verify if customized
  messagingSenderId: "142120789424",
  appId: "1:142120789424:web:df492227d377923f122275",
  measurementId: "G-JBZ5XYC2T7"
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const firestore: Firestore = getFirestore(app);

// If you decide to use analytics:
// const analytics = getAnalytics(app);

export { app, firestore };
