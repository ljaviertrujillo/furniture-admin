// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9u0rduu4NnLfTz9SioYAAf07Ap1N_AS4",
  authDomain: "furniture-admin-566dc.firebaseapp.com",
  projectId: "furniture-admin-566dc",
  storageBucket: "furniture-admin-566dc.appspot.com",
  messagingSenderId: "1025324105529",
  appId: "1:1025324105529:web:8a0861ffd8ce1e1b8032e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)