// pages/api/test.js

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    // Retrieve the connected account details from Stripe
    const account = await stripe.accounts.retrieve('acct_1Oz4J3GMOBITBGG0');
    

    // Log the account object to the console
    console.log(account);

    // Return the account data in the API response
    res.status(200).json(account);
  } catch (error) {
    console.error('Error retrieving account:', error);
    res.status(500).json({ error: 'Error retrieving account' });
  }
}
