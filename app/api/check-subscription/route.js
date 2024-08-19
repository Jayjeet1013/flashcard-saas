import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const customerId = searchParams.get('customerId');

  if (!customerId) {
    console.log("Customer ID is required.");
    return new Response(JSON.stringify({ error: "Customer ID is required." }), { status: 400 });
  }

  try {
    // Retrieve the customer's subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
    });

    // Check if there are any active subscriptions
    const isSubscribed = subscriptions.data.length > 0;

    return new Response(JSON.stringify({ isSubscribed }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error("Error retrieving subscription status:", error);
    return new Response(JSON.stringify({ error: "Failed to retrieve subscription status." }), { status: 500 });
  }
}
