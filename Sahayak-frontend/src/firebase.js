// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFjOAV5txwdV2ocrKTcEc-SS24x7NG7ro",
  authDomain: "codejod-380a9.firebaseapp.com",
  projectId: "codejod-380a9",
  storageBucket: "codejod-380a9.appspot.com",
  messagingSenderId: "111754472497",
  appId: "1:111754472497:web:8546e3543ead8774a33910",
  measurementId: "G-B8FY8317DF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
