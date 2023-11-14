// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-fullstack.firebaseapp.com",
  projectId: "mern-estate-fullstack",
  storageBucket: "mern-estate-fullstack.appspot.com",
  messagingSenderId: "422231111091",
  appId: "1:422231111091:web:a48178347cc2c78f8087c6"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);