import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD6jDvQudWDH1rH4IYpYkh62XhaxXC-j9A",
  authDomain: "fir-new-d5537.firebaseapp.com",
  projectId: "fir-new-d5537",
  storageBucket: "fir-new-d5537.appspot.com",
  messagingSenderId: "786342190143",
  appId: "1:786342190143:web:75c9e3cabd25f51c2bec8a",
  measurementId: "G-D660ZBM5PR",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
