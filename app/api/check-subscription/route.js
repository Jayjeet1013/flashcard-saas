import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { customerId } = req.query;

  if (!customerId) {
    return res.status(400).json({ error: "Customer ID is required." });
  }

  try {
    // Retrieve the customer's subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
    });

    // Check if there are any active subscriptions
    const isSubscribed = subscriptions.data.length > 0;

    return res.status(200).json({ isSubscribed });
  } catch (error) {
    console.error("Error retrieving subscription status:", error);
    return res.status(500).json({ error: "Failed to retrieve subscription status." });
  }
}
