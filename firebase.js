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
  authDomain: "flashcard-ea279.firebaseapp.com",
  projectId: "flashcard-ea279",
  storageBucket: "flashcard-ea279.appspot.com",
  messagingSenderId: "859865127883",
  appId: "1:859865127883:web:1540b7750de96db185344e",
  measurementId: "G-QN6RV57QYK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};
