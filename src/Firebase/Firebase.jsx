// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgYT5hbOTb9SOk5gJs-wrLO6qx58W344w",
  authDomain: "e-commerce-681c3.firebaseapp.com",
  projectId: "e-commerce-681c3",
  storageBucket: "e-commerce-681c3.firebasestorage.app",
  messagingSenderId: "976587970915",
  appId: "1:976587970915:web:28db1bb8fdaa8836dcdb56",
  measurementId: "G-ZVVRN4GLYX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);