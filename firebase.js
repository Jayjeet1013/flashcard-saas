// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "flashcardsaas-544f3.firebaseapp.com",
  projectId: "flashcardsaas-544f3",
  storageBucket: "flashcardsaas-544f3.appspot.com",
  messagingSenderId: "205912173539",
  appId: "1:205912173539:web:901b4522a94e218d49ced6",
  measurementId: "G-64H86WLRW7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};
