import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";

import app from "../firebase.config";

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const createUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
export const updateUserProfile = (name) => {
  const user = auth.currentUser;
  if (user) {
    return updateProfile(user, {
      displayName: name,
    });
  } else {
    return Promise.reject(new Error("No authenticated user"));
  }
};
export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

export const logOut = () => {
   return signOut(auth);
};
export const handlePasswordResetEmail = (email)=>{
  return sendPasswordResetEmail(auth,email)
}