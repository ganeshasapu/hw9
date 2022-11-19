// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAz414AxIFNRcEritUNromI-CmHho5Mro",
  authDomain: "hw9proj.firebaseapp.com",
  projectId: "hw9proj",
  storageBucket: "hw9proj.appspot.com",
  messagingSenderId: "502842413390",
  appId: "1:502842413390:web:83a0a694013138a047ce1f",
  measurementId: "G-9M25H1ZHW1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();