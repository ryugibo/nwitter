import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJ4d4CPCJq8j74wxz9080hkHfOjNLLCys",
  authDomain: "nwitter-5c274.firebaseapp.com",
  projectId: "nwitter-5c274",
  storageBucket: "nwitter-5c274.appspot.com",
  messagingSenderId: "382513733157",
  appId: "1:382513733157:web:b4b5a775668fafdbeb69cc",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getFirestore(app);
