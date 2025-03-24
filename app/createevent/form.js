'use client';
import { useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CreateEvent } from './action';
import { redirect } from 'next/dist/server/api-utils';

export default function EventForm() {
    // Declare all hooks at the top of the component
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventPrice, setEventPrice] = useState("");
    const [startColor, setStartColor] = useState("#ff7e5f");
    const [endColor, setEndColor] = useState("#feb47b");
  const { data: session, status } = useSession(); // Get session data
  const router = useRouter();


  // If the session is still loading, you can show a loading state
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // If there's no session (user is not logged in), redirect to login page
  if (!session) {
    // router.push("/login");
    redirect("/login");
    return null;
  }

//   const handleSignOut = async () => {
//     await signOut();
//     window.location.reload(); // Reload to update session
//   };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      eventName,
      eventDescription,
      eventPrice,
      startColor,
      endColor,
      email: session.user.email,
    };

    CreateEvent(eventData);
    // console.log("Sending the following event data to the backend:", eventData);

    // Reset form after submission
    setEventName("");
    setEventDescription("");
    setEventPrice("");
    setStartColor("#ff7e5f");
    setEndColor("#feb47b");
  };

  // Helper functions for keypress limits
  function limitKeypressOnTitle(event, value) {
    if (value && value.toString().length >= 30) {
      event.preventDefault();
    }
  }
  function limitKeypressOnDescription(event, value) {
    if (value && value.toString().length >= 120) {
      event.preventDefault();
    }
  }
  function limitKeypressOnPrice(event, value) {
    const regex = /^[0-9]$/;
    if (!regex.test(event.key) && event.key !== "Backspace") {
      event.preventDefault();
    }
    if (value.length >= 4) {
      event.preventDefault();
    }
  }

  return (
    <div style={{ display: "flex", gap: "40px", justifyContent: "center", alignItems: "flex-start" }}>
      {/* Form Section */}
      <div style={{ flex: 1, maxWidth: "500px" }}>
        <h2>Create an Event</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Event Name</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
              placeholder="Enter event name"
              style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
              onKeyPress={(e) => limitKeypressOnTitle(e, eventName)}
            />
          </div>

          <div>
            <label>Event Description</label>
            <textarea
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
              placeholder="Enter event description"
              style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
              onKeyPress={(e) => limitKeypressOnDescription(e, eventDescription)}
            />
          </div>

          <div>
            <label>Event Price</label>
            <input
              type="number"
              value={eventPrice}
              onChange={(e) => setEventPrice(e.target.value)}
              required
              placeholder="Enter event price"
              style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
              onKeyPress={(e) => limitKeypressOnPrice(e, eventPrice)}
            />
          </div>

          <div>
            <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#EB3B43", color: "white", border: "none", borderRadius: "5px" }}>
              Create Event
            </button>
          </div>
        </form>

        {/* Color Pickers for Gradient */}
        <div style={{ marginTop: "20px" }}>
          <label>Pick Gradient Start Color:</label>
          <input
            type="color"
            value={startColor}
            onChange={(e) => setStartColor(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Pick Gradient End Color:</label>
          <input
            type="color"
            value={endColor}
            onChange={(e) => setEndColor(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </div>
      </div>

      {/* Preview Section */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h3 style={{ color: "white", margin: "0", textAlign: "center" }}>Event Preview</h3>
        <div
          style={{
            backgroundColor: "black",
            border: "1px solid #ddd",
            padding: "20px",
            width: "200px",
            height: "280px",
            display: "flex",
            flexDirection: "column",
            borderRadius: "15px",
            alignItems: "left",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            background: `linear-gradient(135deg, ${startColor}, ${endColor})`,
          }}
        >
          <h4 style={{ color: "black", fontSize: "1.5rem", margin: "0", marginTop: "10px", wordWrap: "break-word" }}>
            {eventName || "Event Name"}
          </h4>
          <p style={{ color: "black", fontSize: "1rem", marginTop: "10px" }}>
            {eventDescription || "Description of the event..."}
          </p>
          <p style={{ fontWeight: "bold", color: "#EB3B43", fontSize: "1.5rem", margin: "0", wordWrap: "break-word" }}>
            ${eventPrice || "0"}
          </p>
        </div>
      </div>
    </div>
  );
}
