// /onboarding/checkout.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const planDisplay = document.getElementById("planDisplay");

  const urlParams = new URLSearchParams(window.location.search);
  const plan = urlParams.get("plan") || "basic";
  const trial = urlParams.get("trial") === "true";

  // Update plan display
  const planNames = {
    basic: "Basic Plan – $129",
    pro: "Pro Plan – $249",
    premium: "Premium Plan – $399"
  };
  planDisplay.textContent = planNames[plan] || planNames.basic;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;

    try {
      const response = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, plan, trial })
      });

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        alert(data.message || "Checkout session failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  });
});