import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // e.g., "AIzaSy..."
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, // e.g., "your-project.firebaseapp.com"
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID, // e.g., "your-project-id"
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, // e.g., "your-project.appspot.com"
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, // e.g., "1234567890"
  appId: import.meta.env.VITE_FIREBASE_APP_ID, // e.g., "1:1234567890:web:abcdefg"
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID, // optional
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
export default db;
