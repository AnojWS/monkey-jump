// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfRxdy6AluufJDOv1FDWYIMytFGHASqIc",
  authDomain: "monkey-jump-1e261.firebaseapp.com",
  projectId: "monkey-jump-1e261",
  storageBucket: "monkey-jump-1e261.firebasestorage.app",
  messagingSenderId: "1046627370835",
  appId: "1:1046627370835:web:61edbfb2457c93e88403a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);