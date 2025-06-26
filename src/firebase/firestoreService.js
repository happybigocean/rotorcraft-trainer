import { db } from "./firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from "firebase/firestore";

// Get all scenarios (optionally sorted by title)
export async function getScenarios() {
  const colRef = collection(db, "scenarios");
  const q = query(colRef, orderBy("title"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Get a single scenario by ID
export async function getScenario(id) {
  if (!id) return null;
  const docRef = doc(db, "scenarios", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

// Add a new scenario
export async function addScenario(scenario) {
  const { id, ...data } = scenario;
  // Use custom ID if provided, otherwise auto-generate
  if (id) {
    await setDoc(doc(db, "scenarios", id), data);
    return id;
  } else {
    const newDoc = await addDoc(collection(db, "scenarios"), data);
    return newDoc.id;
  }
}

// Update an existing scenario
export async function updateScenario(scenario) {
  const { id, ...data } = scenario;
  if (!id) throw new Error("Scenario ID is required for update.");
  await updateDoc(doc(db, "scenarios", id), data);
  return id;
}

// Delete a scenario by ID
export async function deleteScenario(id) {
  await deleteDoc(doc(db, "scenarios", id));
}

// (Optional) Get all users (for admin panel)
export async function getUsers() {
  const colRef = collection(db, "users");
  const querySnapshot = await getDocs(colRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// (Optional) Get a user by UID
export async function getUser(uid) {
  if (!uid) return null;
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

// (Optional) Update a user's role or data
export async function updateUser(uid, data) {
  if (!uid) throw new Error("User ID is required for update.");
  await updateDoc(doc(db, "users", uid), data);
  return uid;
}

// (Optional) Delete a user document (not from Auth)
export async function deleteUser(uid) {
  await deleteDoc(doc(db, "users", uid));
}