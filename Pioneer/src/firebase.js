import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


//database adding
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrq_Swqol9fpnuq9DVFQhjPDz36LOJNIs",
  authDomain: "pioneer-hiring-cell.firebaseapp.com",
  projectId: "pioneer-hiring-cell",
  storageBucket: "pioneer-hiring-cell.appspot.com",
  messagingSenderId: "21969243046",
  appId: "1:21969243046:web:0c0a012ace3c6c828ddd67",
  measurementId: "G-7H8GPTPYNG"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export { auth, db , database };
