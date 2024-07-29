import { getAuth } from "firebase/auth";
import app from "../firebase.config";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export const db = getFirestore(app);
const auth = getAuth(app);

const COLLECTIONS = {
  users: "users",
  tasks: "tasks",
};

export const tasksRef = collection(db, COLLECTIONS.tasks);

export const addUser = async (fullName, email) => {
  try {
    const createUserRef = await addDoc(collection(db, COLLECTIONS.users), {
      fullName,
      email,
    });
    return createUserRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const addTask = async (data = {}) => {
  try {
    const taskCreateRef = await addDoc(collection(db, COLLECTIONS.tasks), data);
    return taskCreateRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getUserTasks = (user_id, callback) => {
  const q = query(
    collection(db, COLLECTIONS.tasks),
    where("userId", "==", user_id)
  );
  return onSnapshot(q, callback);
};

export const deleteTask = async (id) => {
  const docRef = doc(db, COLLECTIONS.tasks, id);
  const res = await deleteDoc(docRef);
  return res;
};

export const updateTask = async (id, data) => {
  const docRef = doc(db, COLLECTIONS.tasks, id);
  const res = await updateDoc(docRef, data);
  return res;
};
