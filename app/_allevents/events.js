// // "use server";
// import { neon } from "@neondatabase/serverless";

// export async function AllEvents() {
//     const sql = neon(process.env.DATABASE_URL);
//     const result = await sql`
//     SELECT * FROM events
//     `;
//     console.log(result)
//     console.log(result); // Checking the events data

//     // Return the JSX to display the events
//     return (
//         <div style={{ display: "flex", gap: "40px", justifyContent: "center", alignItems: "flex-start", flexWrap: "wrap" }}>
//             {result.map((event) => {
//                 return (
//                     <div key={event.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "20px" }}>
//                         <div
//                             style={{
//                                 backgroundColor: "black", // Overall card background
//                                 border: "1px solid #ddd",
//                                 padding: "20px",
//                                 width: "200px", // Adjusted width to fit
//                                 height: "280px", // Adjusted height
//                                 display: "flex",
//                                 flexDirection: "column",
//                                 borderRadius: "15px",
//                                 alignItems: "left",
//                                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add shadow for depth
//                                 background: `linear-gradient(135deg, ${event.start_color}, ${event.end_color})`, // Dynamic gradient background
//                             }}
//                         >
//                             <h4 style={{ color: "black", fontSize: "1.5rem", margin: "0", marginTop: "10px", wordWrap: "break-word" }}>
//                                 {event.even_name || "Event Name"}
//                             </h4>
//                             <p style={{ color: "black", fontSize: "1rem", marginTop: "10px" }}>
//                                 {event.event_description || "Description of the event..."}
//                             </p>
//                             <p style={{ fontWeight: "bold", color: "#EB3B43", fontSize: "1.5rem", margin: "0", wordWrap: "break-word" }}>
//                                 ${event.event_price || "0"}
//                             </p>
//                         </div>
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }
// AllEvents.js (Server Component)
// "use server";
// import { neon } from "@neondatabase/serverless";

// export async function AllEvents() {
//     const sql = neon(process.env.DATABASE_URL);
//     const result = await sql`
//         SELECT * FROM events
//     `;
//     return result;  // Return data from the server
// }
// AllEvents.server.js
import { neon } from "@neondatabase/serverless";
import { getServerSession } from "next-auth";

export default async function AllEvents() {
    const user = await getServerSession();
    console.log(user);
  const sql = neon(process.env.DATABASE_URL);
  const events = await sql`
    SELECT * FROM events
  `;
  
  // Optionally, log events for debugging
//   console.log(events);

  // Return the JSX to display the events in a card format
  return (
    <div
      style={{
        display: "flex",
        gap: "40px",
        justifyContent: "center",
        alignItems: "flex-start",
        flexWrap: "wrap",
      }}
    >
      {events.map((event) => (
        <div
          key={event.id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "black", // Overall card background
              border: "1px solid #ddd",
              padding: "20px",
              width: "200px", // Adjusted width to fit
              height: "280px", // Adjusted height
              display: "flex",
              flexDirection: "column",
              borderRadius: "15px",
              alignItems: "left",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Shadow for depth
              background: `linear-gradient(135deg, ${event.start_color}, ${event.end_color})`, // Dynamic gradient background
            }}
          >
            <h4
              style={{
                color: "black",
                fontSize: "1.5rem",
                margin: "0",
                marginTop: "10px",
                wordWrap: "break-word",
              }}
            >
              {event.even_name || "Event Name"}
            </h4>
            <p
              style={{
                color: "black",
                fontSize: "1rem",
                marginTop: "10px",
              }}
            >
              {event.event_description || "Description of the event..."}
            </p>
            <p
              style={{
                fontWeight: "bold",
                color: "#EB3B43",
                fontSize: "1.5rem",
                margin: "0",
                wordWrap: "break-word",
              }}
            >
              ${event.event_price || "0"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
