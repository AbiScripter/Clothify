import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDGUAeCfVTYAmuECc0X7NSHBpTwroyvt-A",
  authDomain: "myntra-fa577.firebaseapp.com",
  projectId: "myntra-fa577",
  storageBucket: "myntra-fa577.appspot.com",
  messagingSenderId: "110660486823",
  appId: "1:110660486823:web:dd6c1ea001ba44b639fd82",
  measurementId: "G-1JJEDF2KYQ",
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc, storage };
