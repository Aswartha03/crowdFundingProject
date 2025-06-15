import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHIIMoBEz8H-e6fMLvVf-txpFtY68oduI",
  authDomain: "crowdfunding-fd430.firebaseapp.com",
  projectId: "crowdfunding-fd430",
  storageBucket: "crowdfunding-fd430.appspot.com",
  messagingSenderId: "504175956980",
  appId: "1:504175956980:web:d46076225db79ed7051fa1",
  measurementId: "G-4XQYY3RFNJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, storage, auth, db, serverTimestamp };
