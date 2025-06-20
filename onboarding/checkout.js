import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  // ✅ Firebase config
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

  // ✅ Read URL params
  const params = new URLSearchParams(window.location.search);
  const plan = params.get("plan") || "basic";
  const trial = params.get("trial") === "true";
  const summary = document.getElementById("planSummary");

  const planDisplayNames = {
    basic: "Basic Plan",
    pro: "Pro Plan",
    premium: "Premium Plan"
  };

  const planPrices = {
    basic: "$129",
    pro: "$249",
    premium: "$399"
  };

  const planName = planDisplayNames[plan] || "Basic Plan";
  const priceText = trial ? "Free Trial" : (planPrices[plan] || "$129");

  if (summary) {
    summary.textContent = `${planName} – ${priceText}`;
  }

  // ✅ Handle form submission
  const form = document.getElementById("checkoutForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const fullNameEl = document.getElementById("fullName");
      const emailEl = document.getElementById("email");

      const fullName = fullNameEl?.value.trim();
      const email = emailEl?.value.trim();

      if (!fullName || !email) {
        alert("Please fill in all fields.");
        return;
      }

      try {
        await addDoc(collection(db, "checkouts"), {
          fullName,
          email,
          plan,
          trial,
          timestamp: serverTimestamp()
        });

        window.location.href = "thankyou.html";
      } catch (err) {
        console.error("❌ Firebase error:", err);
        alert("Something went wrong. Please try again.");
      }
    });
  }
});