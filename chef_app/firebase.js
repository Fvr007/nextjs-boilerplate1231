// Replace with your Firebase web config
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "YOUR_APIKEY",
  authDomain: "YOUR_AUTHDOMAIN",
  projectId: "YOUR_PROJECTID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER",
  appId: "YOUR_APPID"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
