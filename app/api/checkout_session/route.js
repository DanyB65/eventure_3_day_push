// import Stripe from "stripe";

// // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const stripe = new Stripe('sk_test_51Oz4J3GMOBITBGG09ZPXKyc2QOurGUd90TVIxebAT2sJgy10WYBsNYRIZkJ3QNkGOEeVMk9G4MN4YChCaOJru7EI00YpCHR8Jp')
// // Example client-side initialization
// // import { loadStripe } from "@stripe/stripe-js";
// // const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


// export async function POST(request) {
//   // const stripe =await  stripePromise
//   try {
//     const body = await request.json();
//     // Destructure your data from the request body.
//     // eventId, eventPrice, message, and vendorStripeAccountId should be provided.
//     const { eventId, eventPrice, message, vendorStripeAccountId } = body;

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: "Event Checkout",
//               description: 'test message',
//             },
//             unit_amount: Math.round(100.00 * 100), // amount in cents
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       // Here we include the vendor's Stripe connection id so the funds go to them.
//       payment_intent_data: {
//         transfer_data: {
//           destination: 'acct_1R7eU34PHLfoVNYn',
//         },
//       },
//       success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
//       cancel_url: "http://localhost:3000/",
//       // success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
//       // cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
//     });

//     return new Response(JSON.stringify({ id: session.id }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }



// const session = await stripe.checkout.sessions.create({
//   success_url: 'https://example.com/success',
//   line_items: [
//     {
//       price: 'price_1MotwRLkdIwHu7ixYcPLm5uZ',
//       quantity: 2,
//     },
//   ],
//   mode: 'payment',
// });


// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
// import Stripe from "stripe";

// const key = "sk_test_51Oz4J3GMOBITBGG09ZPXKyc2QOurGUd90TVIxebAT2sJgy10WYBsNYRIZkJ3QNkGOEeVMk9G4MN4YChCaOJru7EI00YpCHR8Jp";
// const stripe =  await loadStripe(key);
// const stripe = require('stripe')('sk_test_51Oz4J3GMOBITBGG09ZPXKyc2QOurGUd90TVIxebAT2sJgy10WYBsNYRIZkJ3QNkGOEeVMk9G4MN4YChCaOJru7EI00YpCHR8Jp');
// import { stripe } from "../../../lib/stripe";


// export async function POST(request) {
//   console.log(stripe)
//   try {
//     const body = await request.json();
//     // Destructure your data from the request body.
//     // eventId, eventPrice, message, and vendorStripeAccountId should be provided.
//     const { eventId, eventPrice, message, vendorStripeAccountId } = body;

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: "Event Checkout",
//               description: "test message",
//             },
//             unit_amount: Math.round(100.00 * 100), // amount in cents
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       // Uncomment or conditionally include this block if you have a valid connected account.
//       payment_intent_data: {
//         transfer_data: {
//           destination: "acct_1R7nZV4bF3OHhQtx",
//         },
//       },
//       success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
//       cancel_url: "http://localhost:3000/",
//     });

//     return new Response(JSON.stringify({ id: session.id }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }


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
