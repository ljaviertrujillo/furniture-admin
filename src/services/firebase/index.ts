// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOkkQ_vjHZmFh_x-sVP8wYwYs-0RC0vTU",
  authDomain: "furniture-admin-69a12.firebaseapp.com",
  projectId: "furniture-admin-69a12",
  storageBucket: "furniture-admin-69a12.appspot.com",
  messagingSenderId: "1008732991317",
  appId: "1:1008732991317:web:0773e08a11fdd6e0f209dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
