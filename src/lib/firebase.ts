
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { firebaseConfigValues } from '@/config/appConfig'; // Import from new config file

let app: FirebaseApp | undefined = undefined;
let firestore: Firestore | undefined = undefined;

const {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId
} = firebaseConfigValues;

// Only attempt to initialize Firebase if essential config values are present
if (apiKey && authDomain && projectId) {
  if (!getApps().length) {
    app = initializeApp({
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
      measurementId
    });
  } else {
    app = getApps()[0];
  }
  firestore = getFirestore(app);
} else {
  // Log an error or warning, as Firebase-dependent features will not work
  console.error(
    "Firebase SDK not initialized due to missing configuration. " +
    "Please ensure NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, " +
    "and NEXT_PUBLIC_FIREBASE_PROJECT_ID are set in your environment variables."
  );
  // app and firestore will remain undefined
}

export { app, firestore };
