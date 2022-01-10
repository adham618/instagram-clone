// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCatFGPhIGzGz7G0TN72yJ_U0VAc7bWo1w",
  authDomain: "insta-4867b.firebaseapp.com",
  projectId: "insta-4867b",
  storageBucket: "insta-4867b.appspot.com",
  messagingSenderId: "187139057860",
  appId: "1:187139057860:web:ae3e3294a85573da0f4191",
  measurementId: "G-DVMX10JW3G"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const storage = getStorage()
const analytics = getAnalytics(app);

export { app, db, storage, analytics }