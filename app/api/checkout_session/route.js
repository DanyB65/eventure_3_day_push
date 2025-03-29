

// pages/api/checkout_session.js
import { stripe } from "../../../lib/stripe"; // Adjust the path as needed

export async function POST(request) {
  try {
    const body = await request.json();
    // Destructure any additional data you want to use
    // For now, we're using hard-coded values for demonstration.
    const { eventId, eventPrice, message, vendorStripeAccountId } = body;

    // Create the Checkout session on the server using your secret key
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Event Checkout",
              description: "test message",
            },
            unit_amount: Math.round(100.00 * 100), // Convert dollars to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // Uncomment or conditionally include this if processing a transfer to a connected account.
      // payment_intent_data: {
      //   transfer_data: {
      //     destination: vendorStripeAccountId, // ensure this is a valid connected account
      //   },
      // },
      success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/",
    });

    return new Response(JSON.stringify({ id: session.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
