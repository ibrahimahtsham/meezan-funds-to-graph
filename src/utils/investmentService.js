import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import db from "../firebaseConfig";

export async function fetchInvestments() {
  const querySnapshot = await getDocs(collection(db, "investments"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export async function updateInvestment(newRow) {
  const docRef = doc(db, "investments", newRow.id);
  await updateDoc(docRef, {
    category: newRow.category,
    fund: newRow.fund,
    amount: newRow.amount,
    month: newRow.month,
    completed: newRow.completed,
  });
  return newRow;
}

export async function addInvestment(newRow) {
  const docRef = await addDoc(collection(db, "investments"), newRow);
  return { id: docRef.id, ...newRow };
}
