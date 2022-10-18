import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWnImmAqJCPyYtwdY_RsCgA_SKuEInbnw",
  authDomain: "todolist-d658d.firebaseapp.com",
  projectId: "todolist-d658d",
  storageBucket: "todolist-d658d.appspot.com",
  messagingSenderId: "580219954065",
  appId: "1:580219954065:web:24076e8488c02d4a69f030",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
