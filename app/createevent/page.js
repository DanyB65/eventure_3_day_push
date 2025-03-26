// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import EventForm from "./form";
// import styles from "../page.module.css";
// import { supabase } from "../ultis/supabase/client";

// export default function CreateEvent() {
//   const router = useRouter();

//   const handleSession = async () => {
//     try {
//       const { data, error } = await supabase.auth.getSession();
//       if (error || !data.session) {
//         // console.error("No active session found:", error);
//         router.push("/login");
//       } else {
//         // console.log("Session data:", data);
//       }
//     } catch (err) {
//       // console.error("Unexpected error fetching session:", err);
//       router.push("/login");
//     }
//   };
  

//   useEffect(() => {
//     handleSession();
//   }, []);

//   const handleSignOut = async () => {
//     const { error } = await supabase.auth.signOut();
//     if (!error) {
//       // Redirect after sign-out
//       router.push("/");
//     } else {
//       // console.error("Error signing out:", error);
//     }
//   };

//   return (
//     <div>
//       <header className={styles.header}>
//         <h1 className={styles.title}>
//           <Link href="/">Eventure</Link>
//         </h1>
//         <nav className={styles.nav}>
//           <div className={styles.navLinks}>
//             <Link href="/createevent" className={styles.createEventLink}>
//               Create Event
//             </Link>
//             <button className={styles.signOutButton} onClick={handleSignOut}>
//               Sign Out
//             </button>
//           </div>
//         </nav>
//       </header>
//       <h4
//         style={{
//           color: "#fff",
//           backgroundColor: "#000",
//           padding: "20px",
//           borderRadius: "10px",
//           maxWidth: "100%",
//           margin: "0 auto",
//         }}
//       >
//         <p style={{ fontSize: "1.2rem" }}>
//           I know this website may not be perfect just yet, but the core functionality is exactly what I aim to offer. This app is still in its early stages, and I am committed to continuously improving it. As a vendor, your experience is incredibly important to me, and I’ll be adding new features to make your life easier as we go. Thank you for your patience and support as we start this journey together.
//         </p>
//         <ul style={{ fontSize: "1rem", lineHeight: "1.6" }}>
//           <li>
//             <strong>Core Functionality First:</strong> Getting the essential tools in your hands quickly so you can start managing your events.
//           </li>
//           <li>
//             <strong>Picture Uploads:</strong> A feature to allow vendors to upload pictures of their services and events. This will make your event cards more visual and engaging.
//           </li>
//           <li>
//             <strong>Availability Scheduling:</strong> A calendar feature to manage and display your availability, making it easier for clients to choose times that work for you.
//           </li>
//           <li>
//             <strong>Real-time Updates:</strong> Changes to your events, pricing, or availability will be instantly updated for your clients to see.
//           </li>
//           <li>
//             <strong>Booking Management:</strong> An easy-to-use interface for tracking and managing event bookings, including confirming, rescheduling, or canceling bookings.
//           </li>
//           <li>
//             <strong>Ratings & Reviews:</strong> A feature for clients to leave reviews on your services, helping to build credibility and attract more customers.
//           </li>
//           <li>
//             <strong>Mobile-Friendly Interface:</strong> Optimizing the platform for mobile use so you can manage your events on the go.
//           </li>
//         </ul>
//         <p style={{ fontSize: "1.2rem" }}>
//           Please bear with us as we work on these features. Your feedback is essential, and we’re excited to keep improving to make this app as helpful as possible for you!
//         </p>
//         <p style={{ fontSize: "1rem", fontStyle: "italic", textAlign: "right" }}>
//           - Dany Briceno
//         </p>
//       </h4>
//       <EventForm />
//     </div>
//   );
// }

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EventForm from "./form";
import styles from "../page.module.css";
import { supabase } from "../ultis/supabase/client";

export default function CreateEvent() {
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error || !data.session) {
          router.push("/login");
        }
      } catch (err) {
        router.push("/login");
      }
    }
    checkSession();
  }, [router]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/");
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Link href="/">Eventure</Link>
        </h1>
        <nav className={styles.nav}>
          <div className={styles.navLinks}>
            <Link href="/createevent" className={styles.createEventLink}>
              Create Event
            </Link>
            <button className={styles.signOutButton} onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </nav>
      </header>
      <h4
        style={{
          color: "#fff",
          backgroundColor: "#000",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        <p style={{ fontSize: "1.2rem" }}>
          I know this website may not be perfect just yet, but the core functionality is exactly what I aim to offer. This app is still in its early stages, and I am committed to continuously improving it. As a vendor, your experience is incredibly important to me, and I’ll be adding new features to make your life easier as we go. Thank you for your patience and support as we start this journey together.
        </p>
        <ul style={{ fontSize: "1rem", lineHeight: "1.6" }}>
          <li>
            <strong>Core Functionality First:</strong> Getting the essential tools in your hands quickly so you can start managing your events.
          </li>
          <li>
            <strong>Picture Uploads:</strong> A feature to allow vendors to upload pictures of their services and events. This will make your event cards more visual and engaging.
          </li>
          <li>
            <strong>Availability Scheduling:</strong> A calendar feature to manage and display your availability, making it easier for clients to choose times that work for you.
          </li>
          <li>
            <strong>Real-time Updates:</strong> Changes to your events, pricing, or availability will be instantly updated for your clients to see.
          </li>
          <li>
            <strong>Booking Management:</strong> An easy-to-use interface for tracking and managing event bookings, including confirming, rescheduling, or canceling bookings.
          </li>
          <li>
            <strong>Ratings & Reviews:</strong> A feature for clients to leave reviews on your services, helping to build credibility and attract more customers.
          </li>
          <li>
            <strong>Mobile-Friendly Interface:</strong> Optimizing the platform for mobile use so you can manage your events on the go.
          </li>
        </ul>
        <p style={{ fontSize: "1.2rem" }}>
          Please bear with us as we work on these features. Your feedback is essential, and we’re excited to keep improving to make this app as helpful as possible for you!
        </p>
        <p style={{ fontSize: "1rem", fontStyle: "italic", textAlign: "right" }}>
          - Dany Briceno
        </p>
      </h4>
      <EventForm />
    </div>
  );
}
