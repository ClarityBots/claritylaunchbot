import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBFPU03g16fanyT-a6wJ5NqRxtCwW-Opsg",
  authDomain: "claritylaunchbot.firebaseapp.com",
  projectId: "claritylaunchbot",
  storageBucket: "claritylaunchbot.appspot.com",
  messagingSenderId: "558688698630",
  appId: "1:558688698630:web:67de9a65cfe738bd615e87",
  measurementId: "G-6TES3TB1LK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const trialToggle = document.getElementById("trialToggle");
  const basicBtn = document.getElementById("basicBtn");
  const proBtn = document.getElementById("proBtn");

  const navigateWithFade = (plan, trial) => {
    document.body.classList.remove("fade-in");
    document.body.classList.add("fade-out");
    setTimeout(() => {
      window.location.href = `checkout.html?plan=${plan}&trial=${trial}`;
    }, 300);
  };

  if (basicBtn && proBtn && trialToggle) {
    basicBtn.addEventListener("click", () => {
      const trial = trialToggle.checked;
      navigateWithFade("basic", trial);
    });

    proBtn.addEventListener("click", () => {
      const trial = trialToggle.checked;
      navigateWithFade("pro", trial);
    });
  }
});