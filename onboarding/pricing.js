// ✅ Prevent caching issues on browser back button
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    window.location.reload();
  }
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ✅ Firebase config
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

document.addEventListener("DOMContentLoaded", () => {
  const trialToggle = document.getElementById("trialToggle");
  const priceBasic = document.getElementById("price-basic");
  const pricePro = document.getElementById("price-pro");
  const btnBasic = document.getElementById("btn-basic");
  const btnPro = document.getElementById("btn-pro");

  const trialPrices = {
    basic: "$0",
    pro: "$0"
  };

  const standardPrices = {
    basic: "$49/mo",
    pro: "$199/mo"
  };

  function updatePrices() {
    const useTrial = trialToggle?.checked;
    if (priceBasic && pricePro) {
      priceBasic.innerText = useTrial ? trialPrices.basic : standardPrices.basic;
      pricePro.innerText = useTrial ? trialPrices.pro : standardPrices.pro;
    }
  }

  async function handleCheckout(plan) {
    const useTrial = trialToggle?.checked;
    const signupData = {
      plan,
      trial: useTrial,
      timestamp: serverTimestamp()
    };

    try {
      await addDoc(collection(db, "launchbot_signups"), signupData);
      window.location.replace(`/onboarding/checkout.html?plan=${plan}&trial=${useTrial}`);
    } catch (error) {
      console.error("Error saving signup data:", error);
      alert("Something went wrong. Please try again.");
    }
  }

  if (trialToggle) {
    trialToggle.addEventListener("change", updatePrices);
  }

  if (btnBasic) {
    btnBasic.addEventListener("click", () => handleCheckout("basic"));
  }

  if (btnPro) {
    btnPro.addEventListener("click", () => handleCheckout("pro"));
  }

  updatePrices();
});