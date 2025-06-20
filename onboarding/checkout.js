// onboarding/checkout.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// --[ Firebase Config ]--
const firebaseConfig = {
  apiKey: "AIzaSyBFPU03g16fanyT-a6wJ5NqRxtCwW-Opsg",
  authDomain: "claritylaunchbot.firebaseapp.com",
  projectId: "claritylaunchbot",
  storageBucket: "claritylaunchbot.firebasestorage.app",
  messagingSenderId: "558688698630",
  appId: "1:558688698630:web:67de9a65cfe738bd615e87",
  measurementId: "G-6TES3TB1LK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --[ Helpers ]--
const getParam = (key) => new URLSearchParams(location.search).get(key);
const plan = getParam("plan") || "unspecified";
const trial = getParam("trial") === "true";

// --[ Form Handler ]--
const handleSubmit = async (event) => {
  event.preventDefault();

  const form = event.target;
  const data = {
    firstName: form.firstName.value.trim(),
    lastName: form.lastName.value.trim(),
    email: form.email.value.trim(),
    company: form.company.value.trim(),
    plan,
    trial,
    timestamp: serverTimestamp()
  };

  try {
    await addDoc(collection(db, "launchbot_checkout"), data);
    window.location.href = "/onboarding/thankyou.html";
  } catch (err) {
    console.error("⚠️ Checkout failed:", err);
    alert("Something went wrong. Please try again.");
  }
};

// --[ Init ]--
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkoutForm");
  if (form) form.addEventListener("submit", handleSubmit);
});