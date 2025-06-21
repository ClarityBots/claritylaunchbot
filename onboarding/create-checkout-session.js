const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { fullName, email, planId } = JSON.parse(event.body);

    if (!planId || !email || !fullName) {
      console.error("❌ Missing required fields:", { planId, email, fullName });
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price: planId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.URL}/thankyou.html`,
      cancel_url: `${process.env.URL}/checkout.html`,
      metadata: { fullName },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    console.error("❌ Stripe error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Stripe checkout session failed' }),
    };
  }
};