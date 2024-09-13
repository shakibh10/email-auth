// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDc3bfJWG1ubUpS3Fd8ARypB7odhyIMuuw",
  authDomain: "user-email-password-d2ebc.firebaseapp.com",
  projectId: "user-email-password-d2ebc",
  storageBucket: "user-email-password-d2ebc.appspot.com",
  messagingSenderId: "950974930835",
  appId: "1:950974930835:web:b71d9daadd179993eed266"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;