// // app/mybookings/page.js
// import { cookies } from "next/headers";
// import { createClient } from "../../ultis/supabase/server";

// export default async function MyBookingsPage() {
//     const supabase = await createClient()
//     const { data: { user } } = await supabase.auth.getUser()
//     // console.log('user',user.id)
//     let { data: bookings, error } = await supabase.from("bookings").select("*").eq('user_id', user.id);
//   // If no user is logged in, prompt for login
//   if (!user) {
//     return <p>Please log in to view your bookings.</p>;
//   }



//   if (error) {
//     console.error(error);
//     return <p>Error loading your bookings: {error.message}</p>;
//   }

//   return (
//     <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
//       <h1>My Bookings</h1>
//       {bookings && bookings.length > 0 ? (
//         bookings.map((booking) => (
//           <div
//             key={booking.id}
//             style={{
//               border: "1px solid #ccc",
//               padding: "1rem",
//               marginBottom: "1rem",
//               borderRadius: "8px",
//             }}
//           >
//             <h2>{booking.event?.event_name || "Unknown Event"}</h2>
//             <p>{booking.event?.event_description}</p>
//             <p>
//               <strong>Price:</strong> ${booking.event?.event_price || "N/A"}
//             </p>
//             <p>
//               <strong>Booked on:</strong>{" "}
//               {new Date(booking.created_at).toLocaleString()}
//             </p>
//             <p>
//               <strong>Amount:</strong> ${booking.amount}
//             </p>
//           </div>
//         ))
//       ) : (
//         <p>You haven't made any bookings yet.</p>
//       )}
//     </div>
//   );
// }

// app/mybookings/page.js
import { cookies } from "next/headers";
import { createClient } from "../../ultis/supabase/server";
import Header from "../_allevents/header";

export default async function MyBookingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "system-ui, sans-serif",
          fontSize: "1.2rem",
          padding: "2rem",
        }}
      >
        Please log in to view your bookings.
      </div>
    );
  }

  let { data: bookings, error } = await supabase
    .from("bookings")
    .select("*") // include event relationship
    .eq("user_id", user.id);

  if (error) {
    console.error(error);
    return (
      <div
        style={{
          padding: "2rem",
          fontFamily: "system-ui, sans-serif",
          color: "#B00020",
        }}
      >
        <p>Error loading your bookings: {error.message}</p>
      </div>
    );
  }

  return (
    <>
    <Header/>
    <div
      style={{
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
        backgroundColor: "#FAFAFA",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem", color: "#000" }}>
        My Bookings
      </h1>

      {bookings && bookings.length > 0 ? (
        bookings.map((booking) => (
          <div
            key={booking.id}
            style={{
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              padding: "1.5rem",
              marginBottom: "1.5rem",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            }}
          >
            <h2
              style={{
                marginBottom: "0.5rem",
                color: "#000",
                fontSize: "1.3rem",
              }}
            >
              {booking.event?.event_name || "Unknown Event"}
            </h2>
            <p style={{ color: "#444", marginBottom: "0.5rem" }}>
              {booking.event?.event_description || "No description available."}
            </p>
            <p style={{ marginBottom: "0.3rem", color: "#000" }}>
              <strong>Price:</strong> ${booking.event?.event_price || "N/A"}
            </p>
            <p style={{ marginBottom: "0.3rem", color: "#000" }}>
              <strong>Booked on:</strong>{" "}
              {new Date(booking.created_at).toLocaleString()}
            </p>
            <p style={{ marginBottom: "0", color: "#000" }}>
              <strong>Amount Paid:</strong> ${booking.amount || "N/A"}
            </p>
          </div>
        ))
      ) : (
        <p style={{ fontSize: "1.1rem", color: "#555" }}>
          You haven't made any bookings yet.
        </p>
      )}
    </div>
    </>
  );
}
