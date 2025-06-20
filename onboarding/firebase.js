// onboarding/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfPU9316fanyT-a6wJ5NqRxtCvW-Opsgp",
  authDomain: "claritylaunchbot.firebaseapp.com",
  projectId: "claritylaunchbot",
  storageBucket: "claritylaunchbot.appspot.com",
  messagingSenderId: "558688698630",
  appId: "1:558688698630:web:67de9a65cfe738bd615e87",
  measurementId: "G-6TES3TBL1K"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
