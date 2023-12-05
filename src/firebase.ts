// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsrBen6pmBDh50o0OE7AOU5MTc7tmBC4k",
  authDomain: "nwitter-5c274.firebaseapp.com",
  projectId: "nwitter-5c274",
  storageBucket: "nwitter-5c274.appspot.com",
  messagingSenderId: "382513733157",
  appId: "1:382513733157:web:4ff6e221f1158c01eb69cc",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
