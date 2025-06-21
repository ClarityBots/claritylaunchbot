// netlify/functions/create-checkout-session.js

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  console.log("🔥 Function triggered:", event.httpMethod);

  if (event.httpMethod !== "POST") {
    console.warn("⛔ Invalid method:", event.httpMethod);
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    const { name, email, plan } = JSON.parse(event.body);
    console.log("📦 Payload received:", { name, email, plan });

    const priceMap = {
      basic: "price_1RcAt5Fp6CIVhceoKnjn5Ykv",
      pro: "price_1RcAttFp6CIVhceod7MbDVNf",
      premium: "price_1RcAuFFp6CIVhceof1teHR7d",
    };

    const priceId = priceMap[plan];

    if (!priceId) {
      console.error("❌ Invalid plan:", plan);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid plan selected." }),
      };
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      customer_email: email,
      success_url: "https://claritylaunchbot-pro.netlify.app/onboarding/thankyou.html",
      cancel_url: "https://claritylaunchbot-pro.netlify.app/onboarding/pricing.html",
      metadata: {
        name,
        plan,
      },
    });

    console.log("✅ Session created:", session.id);

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (err) {
    console.error("❌ Stripe session error:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Checkout session failed", error: err.message }),
    };
  }
};