
// src/config/appConfig.ts

interface FirebaseConfig {
  apiKey: string | undefined;
  authDomain: string | undefined;
  projectId: string | undefined;
  storageBucket: string | undefined;
  messagingSenderId: string | undefined;
  appId: string | undefined;
  measurementId: string | undefined;
}

export const firebaseConfigValues: FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const coupleIdentifier: string = process.env.NEXT_PUBLIC_COUPLE_IDENTIFIER || "nico-trio"; // Default if not set

// Basic validation to help during development
if (
  !firebaseConfigValues.apiKey ||
  !firebaseConfigValues.authDomain ||
  !firebaseConfigValues.projectId
) {
  console.warn(
    "Firebase configuration might be missing or incomplete. " +
    "Please check your environment variables (e.g., .env.local). " +
    "Required: NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, NEXT_PUBLIC_FIREBASE_PROJECT_ID. " +
    "App functionality related to Firebase might be affected."
  );
}
