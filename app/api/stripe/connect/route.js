// stripe/connect.js
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "../../../../ultis/supabase/client";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    // Parse any request body if needed (for MVP, you may not pass any info)
    const body = await request.json().catch(() => ({}));
    // console.log('body',body)
    // console.log('body.email',body.email)

    // For an MVP, you might create a new Express account for the vendor.
    // In a production app, you'll likely want to check if the vendor already has an account.
    const account = await stripe.accounts.create({
      type: "express",
      country: "US",
      email: body.email, // Optionally pass vendor's email if provided.
    });
    // console.log("Created connected account ID:", account.id);
    // Create an account link to redirect the vendor to Stripe's onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url:
        process.env.STRIPE_REFRESH_URL ||
        "http://localhost:3000/stripe/refresh",
      return_url: process.env.STRIPE_RETURN_URL || "http://localhost:3000/",
      type: "account_onboarding",
    });
    return NextResponse.json({ url: accountLink.url, accountId: account.id });
  } catch (error) {
    console.error("Error creating Stripe Connect account link:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
