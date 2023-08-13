// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import {
  addDoc,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  collection,
  getDocs,
  where,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBLSG5Ghyj5on2cUy2S0sk2oyC6QDlMniE",
    authDomain: "hani-lawyer-bot.firebaseapp.com",
    projectId: "hani-lawyer-bot",
    storageBucket: "hani-lawyer-bot.appspot.com",
    messagingSenderId: "37346144720",
    appId: "1:37346144720:web:6a48b817c162bdb13b89d5",
    measurementId: "G-C9J6C4KQ66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  db,
  auth,
  provider,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  collection,
  getDocs,
  addDoc,
  where,
};