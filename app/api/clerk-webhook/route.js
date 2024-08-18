import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  // const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  console.log(req);

  let event;

  try {
    // Assuming this is a Clerk webhook
    event = await req.json(); // Directly parse the incoming JSON
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return new Response(`Webhook Error: ${err.message}`, { status: 404 });
  }

  // Handle user.created event from Clerk
  if (event.type === 'user.created') {
    const userId = event.data.id; // Clerk user ID
    const email = event.data.email; // User's email

    // Create a Stripe customer
    const customer = await stripe.customers.create({
      email: email,
      metadata: {
        clerkUserId: userId, // Store Clerk user ID for reference
      },
    });

    // Save customer.id to your Firestore database under the user's document
    const userDocRef = doc(db, "users",  userId); // Reference to the user document
    await setDoc(userDocRef, {
        stripeCustomerId: customer.id, // Save the Stripe customer ID
    }, { merge: true });

    console.log(`Stripe customer created: ${customer.id}`);
  }

  return new Response(null, { status: 200 });
}

// Helper function to parse the request body
const buffer = (req) => new Promise((resolve, reject) => {
  const chunks = [];
  req.on('data', (chunk) => chunks.push(chunk));
  req.on('end', () => resolve(Buffer.concat(chunks)));
  req.on('error', reject);
});