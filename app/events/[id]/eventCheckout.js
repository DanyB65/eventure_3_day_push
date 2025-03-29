"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

// Use the environment variable from your .env file
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutButton({ eventId, eventPrice, message, vendorStripeAccountId }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout_session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, eventPrice, message, vendorStripeAccountId }),
      });

      const session = await response.json();
      if (session?.id) {
        const stripe = await stripePromise;
        const result = await stripe.redirectToCheckout({ sessionId: session.id });
        if (result.error) {
          console.error("Stripe redirect error:", result.error.message);
        }
      } else {
        console.error("No session ID returned:", session);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
    setLoading(false);
  };

  return (
    <button onClick={handleCheckout} disabled={loading}>
      {loading ? "Processing..." : "Checkout"}
    </button>
  );
}
