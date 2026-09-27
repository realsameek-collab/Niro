
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "niroui-b4ed0.firebaseapp.com",
  projectId: "niroui-b4ed0",
  storageBucket: "niroui-b4ed0.firebasestorage.app",
  messagingSenderId: "493677557749",
  appId: "1:493677557749:web:9b0b85aea2d05e858692bc",
  measurementId: "G-DVVN4EQ2RF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth,provider}