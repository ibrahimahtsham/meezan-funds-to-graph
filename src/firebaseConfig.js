import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY, // e.g., "AIzaSy..."
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN, // e.g., "your-project.firebaseapp.com"
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID, // e.g., "your-project-id"
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET, // e.g., "your-project.appspot.com"
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID, // e.g., "1234567890"
  appId: process.env.REACT_APP_FIREBASE_APP_ID, // e.g., "1:1234567890:web:abcdefg"
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID, // optional
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
export default db;
