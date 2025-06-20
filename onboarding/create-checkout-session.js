// /netlify/functions/create-checkout-session.js

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    const { plan } = JSON.parse(event.body);

    const priceIds = {
      basic: "price_1RcAt5Fp6CIVhceoKnjn5Ykv",
      pro: "price_1RcAttFp6CIVhceod7MbDVNf",
      premium: "price_1RcAuFFp6CIVhceof1teHR7d",
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price: priceIds[plan] || priceIds.basic,
          quantity: 1,
        },
      ],
      success_url: `${process.env.URL}/onboarding/thankyou.html`,
      cancel_url: `${process.env.URL}/onboarding/pricing.html`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
