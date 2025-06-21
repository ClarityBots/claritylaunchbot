const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    const { name, email, plan, trial } = JSON.parse(event.body);

    // Stripe Price IDs
    const prices = {
      basic: "price_1RcAt5Fp6CIVhceoKnjn5Ykv",
      pro: "price_1RcAttFp6CIVhceod7MbDVNf",
      premium: "price_1RcAuFFp6CIVhceof1teHR7d",
    };

    const priceId = prices[plan] || prices.basic;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: email,
      subscription_data: {
        metadata: { name, plan },
        trial_period_days: trial ? 14 : undefined,
      },
      success_url: "https://claritylaunchbot-pro.netlify.app/onboarding/thankyou.html",
      cancel_url: "https://claritylaunchbot-pro.netlify.app/onboarding/pricing.html",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error("Stripe error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Checkout session failed. Please try again." }),
    };
  }
};