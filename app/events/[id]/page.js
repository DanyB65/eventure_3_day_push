
// "use client";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { createClient } from "../../../ultis/supabase/client";
// import Link from "next/link";

// export default function EventDetails() {
//     const supabase  = createClient();
//   const { id } = useParams();
//   const [eventData, setEventData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchEvent() {
//       const { data, error } = await supabase
//         .from("events")
//         .select("*")
//         .eq("event_id", id)
//         .single();
//       if (error) {
//         console.error("Error fetching event:", error);
//       } else {
//         setEventData(data);
//       }
//       setLoading(false);
//     }
//     fetchEvent();
//   }, [id, supabase]);

//   if (loading) return <p>Loading event...</p>;
//   if (!eventData) return <p>No event found.</p>;

//   return (
//     <div
//       style={{
//         padding: "2rem",
//         fontFamily: "sans-serif",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "black",
//           border: "1px solid #ddd",
//           padding: "25px",
//           width: "250px",
//           height: "320px",
//           display: "flex",
//           flexDirection: "column",
//           borderRadius: "20px",
//           alignItems: "flex-start",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//           background: `linear-gradient(135deg, ${eventData.start_color}, ${eventData.end_color})`,
//         }}
//       >
//         <h4
//           style={{
//             color: "black",
//             fontSize: "1.5rem",
//             margin: "0",
//             marginTop: "10px",
//             wordWrap: "break-word",
//           }}
//         >
//           {eventData.event_name}
//         </h4>
//         <p
//           style={{
//             color: "black",
//             fontSize: "1rem",
//             marginTop: "10px",
//           }}
//         >
//           {eventData.event_description}
//         </p>
//         <p
//           style={{
//             fontWeight: "bold",
//             color: "#EB3B43",
//             fontSize: "1.5rem",
//             margin: "0",
//             wordWrap: "break-word",
//           }}
//         >
//           ${eventData.event_price}
//         </p>
//       </div>

//       <Link href="/" style={{ marginTop: "2rem", color: "#EB3B43", fontWeight: "bold" }}>
//         ← Back to Home
//       </Link>
//     </div>
//   );
// }

// "use client";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { createClient } from "../../../ultis/supabase/client";
// import Link from "next/link";
// import { loadStripe } from "@stripe/stripe-js";

// // Initialize Stripe with your public key (for testing you can hard-code it)
// const stripePromise = loadStripe("pk_test_YourPublicKeyHere");

// export default function EventDetails() {
//   const supabase = createClient();
//   const { id } = useParams();
//   const [eventData, setEventData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [checkoutMessage, setCheckoutMessage] = useState(""); // For the message input

//   useEffect(() => {
//     async function fetchEvent() {
//       const { data, error } = await supabase
//         .from("events")
//         .select("*")
//         .eq("event_id", id)
//         .single();
//       if (error) {
//         console.error("Error fetching event:", error);
//       } else {
//         setEventData(data);
//       }
//       setLoading(false);
//     }
//     fetchEvent();
//   }, [id, supabase]);

//   // Function to handle the checkout process
//   const handleCheckout = async () => {
//     // Here we use hard-coded data along with the checkoutMessage from the input.
//     // Later, you'll likely pass more dynamic data (like the user's id, event details, etc.)
//     try {
//       const stripe = await stripePromise;
//       const response = await fetch("/api/checkout_session", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           eventId: '13f7a019-8fd5-440b-bed9-413e6e1ce8b0',
//           eventPrice: '100',
//           message: 'test message', // Message from the user
//           // Additional data can be added here (e.g., user id, stripe connection id, etc.)
//         }),
//       });
//       const session = await response.json();
//       if (session?.id) {
//         // Redirect to Stripe Checkout
//         const result = await stripe.redirectToCheckout({ sessionId: session.id });
//         if (result.error) {
//           console.error(result.error.message);
//         }
//       } else {
//         console.error("No checkout session returned", session);
//       }
//     } catch (error) {
//       console.error("Checkout error:", error);
//     }
//   };

//   if (loading) return <p>Loading event...</p>;
//   if (!eventData) return <p>No event found.</p>;

//   return (
//     <div
//       style={{
//         padding: "2rem",
//         fontFamily: "sans-serif",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//       }}
//     >
//       <div
//         style={{
//           backgroundColor: "black",
//           border: "1px solid #ddd",
//           padding: "25px",
//           width: "250px",
//           height: "320px",
//           display: "flex",
//           flexDirection: "column",
//           borderRadius: "20px",
//           alignItems: "flex-start",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//           background: `linear-gradient(135deg, ${eventData.start_color}, ${eventData.end_color})`,
//         }}
//       >
//         <h4
//           style={{
//             color: "black",
//             fontSize: "1.5rem",
//             margin: "0",
//             marginTop: "10px",
//             wordWrap: "break-word",
//           }}
//         >
//           {eventData.event_name}
//         </h4>
//         <p
//           style={{
//             color: "black",
//             fontSize: "1rem",
//             marginTop: "10px",
//           }}
//         >
//           {eventData.event_description}
//         </p>
//         <p
//           style={{
//             fontWeight: "bold",
//             color: "#EB3B43",
//             fontSize: "1.5rem",
//             margin: "0",
//             wordWrap: "break-word",
//           }}
//         >
//           ${eventData.event_price}
//         </p>
//       </div>

//       {/* Checkout section */}
//       <div
//         style={{
//           marginTop: "2rem",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           gap: "1rem",
//           width: "250px",
//         }}
//       >
//         <label style={{ width: "100%" }}>
//           Message:
//           <input
//             type="text"
//             value={checkoutMessage}
//             onChange={(e) => setCheckoutMessage(e.target.value)}
//             placeholder="Enter a message"
//             style={{
//               width: "100%",
//               padding: "0.5rem",
//               marginTop: "0.5rem",
//               borderRadius: "4px",
//               border: "1px solid #ccc",
//             }}
//           />
//         </label>
//         <button
//           onClick={handleCheckout}
//           style={{
//             padding: "0.75rem 1.5rem",
//             backgroundColor: "#6772e5",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             fontWeight: "bold",
//             cursor: "pointer",
//           }}
//         >
//           Checkout
//         </button>
//       </div>

//       <Link
//         href="/"
//         style={{ marginTop: "2rem", color: "#EB3B43", fontWeight: "bold" }}
//       >
//         ← Back to Home
//       </Link>
//     </div>
//   );
// }

// app/events/[id]/page.js
import { createClient } from "../../../ultis/supabase/client";
import EventCheckout from "./eventCheckout"; // import the client component

export default async function EventDetails({ params }) {
  const supabase = createClient();
  const { id } =await  params;

  const { data: eventData, error } = await supabase
    .from("events")
    .select("*")
    .eq("event_id", id)
    .single();

  if (error || !eventData) {
    return <p>No event found.</p>;
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <div
        style={{
          background: `linear-gradient(135deg, ${eventData.start_color}, ${eventData.end_color})`,
          padding: "25px",
          borderRadius: "20px",
          width: "250px",
          height: "320px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h4>{eventData.event_name}</h4>
        <p>{eventData.event_description}</p>
        <p style={{ fontWeight: "bold", color: "#EB3B43" }}>
          ${eventData.event_price}
        </p>
      </div>

      {/* Stripe Checkout Button and message input */}
      <EventCheckout
        eventId={eventData.event_id}
        eventPrice={eventData.event_price}
        vendorStripeAccountId={eventData.stripe_account_id} // optional if you have it
      />
    </div>
  );
}
