document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const plan = urlParams.get("plan") || "basic";
  const isTrial = urlParams.get("trial") === "true";

  const fullNameInput = document.getElementById("fullName");
  const emailInput = document.getElementById("email");
  const planDisplay = document.getElementById("planDisplay");
  const form = document.getElementById("checkoutForm");
  const loadingText = document.getElementById("loadingText");

  // Set plan name and price
  const planNames = {
    basic: "Basic Plan – $99",
    pro: "Pro Plan – $249",
    premium: "Premium Plan – $499",
    free: "Free Trial – $0"
  };

  const selectedPlanText = isTrial ? "Free Trial – $0" : planNames[plan] || "Basic Plan – $99";
  if (planDisplay) {
    planDisplay.textContent = selectedPlanText;
    planDisplay.style.display = "block";
  }

  if (loadingText) loadingText.style.display = "none";

  // Submit form handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();

    if (!fullName || !email) {
      alert("Please enter your full name and email.");
      return;
    }

    try {
      const response = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName,
          email,
          plan,
          isTrial
        })
      });

      const result = await response.json();

      if (response.ok && result.url) {
        window.location.href = result.url;
      } else {
        console.error("Checkout error:", result);
        alert(result.message || "Checkout session failed. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Something went wrong. Please try again.");
    }
  });
});