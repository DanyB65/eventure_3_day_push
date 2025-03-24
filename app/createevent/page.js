// app/createevent/page.js
"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Link from "next/link";
import ClientLayout from "../clientLayout";
import styles from "../page.module.css";
import { signOut } from "../action";
import EventForm from "./form";
export default function CreateEvent() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If the session is still loading, show a loading indicator
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // Now check if the session is null and redirect if needed
  if (!session) {
    router.push("/login");
    return null;
  }
  const handleSignOut = async () => {
    await signOut();
    window.location.reload(); // Reload to update session
  };
  return (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>Eventure</h1>
        <nav className={styles.nav}>
          {/* Flex container for navigation links */}
          <div className={styles.navLinks}>
            <Link href="/" className={styles.homeLink}>
              Events
            </Link>
            <Link href="/createevent" className={styles.createEventLink}>
              Create Event
            </Link>

            {/* Conditional rendering of buttons */}
            {session ? (
              <button className={styles.signOutButton} onClick={handleSignOut}>
                Sign Out
              </button>
            ) : (
              <>
                <Link href="/login" className={styles.loginLink}>
                  Login
                </Link>
                <Link href="/signup" className={styles.signupLink}>
                  Sign Up
                </Link>
              </>
            )}
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
          I know this website may not be perfect just yet, but the core
          functionality is exactly what I aim to offer. This app is still in its
          early stages, and I am committed to continuously improving it. As a
          vendor, your experience is incredibly important to me, and I’ll be
          adding new features to make your life easier as we go. Thank you for
          your patience and support as we start this journey together.
        </p>

        <ul style={{ fontSize: "1rem", lineHeight: "1.6" }}>
          <li>
            <strong>Core Functionality First:</strong> Getting the essential
            tools in your hands quickly so you can start managing your events.
          </li>
          <li>
            <strong>Picture Uploads:</strong> A feature to allow vendors to
            upload pictures of their services and events. This will make your
            event cards more visual and engaging.
          </li>
          <li>
            <strong>Availability Scheduling:</strong> A calendar feature to
            manage and display your availability, making it easier for clients
            to choose times that work for you.
          </li>
          <li>
            <strong>Real-time Updates:</strong> Changes to your events, pricing,
            or availability will be instantly updated for your clients to see.
          </li>
          <li>
            <strong>Booking Management:</strong> An easy-to-use interface for
            tracking and managing event bookings, including confirming,
            rescheduling, or canceling bookings.
          </li>
          <li>
            <strong>Ratings & Reviews:</strong> A feature for clients to leave
            reviews on your services, helping to build credibility and attract
            more customers.
          </li>
          <li>
            <strong>Mobile-Friendly Interface:</strong> Optimizing the platform
            for mobile use so you can manage your events on the go.
          </li>
        </ul>

        <p style={{ fontSize: "1.2rem" }}>
          Please bear with us as we work on these features. Your feedback is
          essential, and we’re excited to keep improving to make this app as
          helpful as possible for you!
        </p>

        <p
          style={{ fontSize: "1rem", fontStyle: "italic", textAlign: "right" }}
        >
          - Dany Briceno
        </p>
      </h4>

      {/* <p>Welcome {session.user?.email}!</p> */}
      <EventForm />
    </div>
  );
}
