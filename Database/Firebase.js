import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtGybPi2vo9fe596uncxtrMX4cogE1ALk",
  authDomain: "villa-club-3.firebaseapp.com",
  projectId: "villa-club-3",
  storageBucket: "villa-club-3.appspot.com",
  messagingSenderId: "620296882804",
  appId: "1:620296882804:web:ea68500e3417a02eeddf21",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
