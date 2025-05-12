import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHbX7K9XA-uOtB_04Fjsn7H989gsnVT8I",
  authDomain: "meezan-funds-to-graph.firebaseapp.com",
  projectId: "meezan-funds-to-graph",
  storageBucket: "meezan-funds-to-graph.appspot.com",
  messagingSenderId: "572547169604",
  appId: "1:572547169604:web:3616ab03929e51ca7feb11",
  measurementId: "G-9QQT19QGPP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
export default db;
