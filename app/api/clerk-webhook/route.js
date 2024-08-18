import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the user.created event
  if (event.type === 'user.created') {
    const userId = event.data.id; // Clerk's user ID
    const email = event.data.email; // User's email

    // Create a Stripe customer
    const customer = await stripe.customers.create({
      email: email,
      metadata: {
        clerkUserId: userId, // Store Clerk user ID for reference
      },
    });

    // Here you would save the customer.id to your database linked to the user's Clerk ID
    await setDoc(doc(db, 'users', userId), {
        stripeCustomerId: customer.id,
      }, { merge: true });
    console.log(`Stripe customer created: ${customer.id}`);
  }
  res.status(200).json({ received: true });
}

// Helper function to parse the request body
const buffer = (req) => new Promise((resolve, reject) => {
  const chunks = [];
  req.on('data', (chunk) => chunks.push(chunk));
  req.on('end', () => resolve(Buffer.concat(chunks)));
  req.on('error', reject);
});