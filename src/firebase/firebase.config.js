// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAsMoAfJa_A-ZUHbqTDIELA4MgzqsvD-DA",
  authDomain: "simpletasksbase.firebaseapp.com",
  projectId: "simpletasksbase",
  storageBucket: "simpletasksbase.appspot.com",
  messagingSenderId: "719703159376",
  appId: "1:719703159376:web:9832af9cbd4df6f4ca5755",
  measurementId: "G-CW060KXEG1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
