// checkout.js

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const plan = urlParams.get("plan") || "";
  const trial = urlParams.get("trial") === "true";

  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const submitBtn = document.getElementById("submitBtn");
  const planSummary = document.getElementById("planSummary");

  // Map plan IDs to Stripe price IDs
  const priceIds = {
    basic: trial ? "price_1RcAt5Fp6CIVhceoKnjn5Ykv" : "price_1RcAt5Fp6CIVhceoKnjn5Ykv",
    pro: trial ? "price_1RcAttFp6CIVhceod7MbDVNf" : "price_1RcAttFp6CIVhceod7MbDVNf",
    premium: trial ? "price_1RcAuFFp6CIVhceof1teHR7d" : "price_1RcAuFFp6CIVhceof1teHR7d",
  };

  const priceLabels = {
    basic: "Basic Plan – $129",
    pro: "Pro Plan – $249",
    premium: "Premium Plan – $399",
  };

  const planId = plan.toLowerCase();
  const priceId = priceIds[planId];

  if (planId && planSummary) {
    planSummary.textContent = priceLabels[planId] || "";
  }

  submitBtn.addEventListener("click", async () => {
    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();

    if (!fullName || !email || !priceId) {
      alert("Please enter your name, email, and select a plan.");
      return;
    }

    try {
      console.log("Sending Stripe checkout:", { fullName, email, planId });

      const response = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          planId: priceId,
        }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        console.error("Stripe Checkout error:", data);
        alert("Checkout session failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Something went wrong. Please try again.");
    }
  });
});
