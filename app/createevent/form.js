"use client";

import { useState, useEffect } from "react";
import { CreateEvent } from "./action"; // Your event creation function
import UploadPicture from "./uploadPicture"; // Your image upload function
import { createClient } from "../../ultis/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EventForm() {
  const router = useRouter();
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventPrice, setEventPrice] = useState("");
  const [startColor, setStartColor] = useState("#ff7e5f");
  const [endColor, setEndColor] = useState("#FFFFFF");
  const [userId, setUserId] = useState("");

  // State for image file and its preview URL
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const supabase = createClient();

  // Get the user id from the session on the client side
  useEffect(() => {
    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setUserId(session.user.id);
      }
    }
    getSession();
  }, [supabase]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare event data without the picture first
    const eventData = {
      eventName,
      eventDescription,
      eventPrice,
      startColor,
      endColor,
      userId,
    };

    // Create the event first
    const createdEvent = await CreateEvent(eventData);
    console.log("createdEvent", createdEvent);

    if (
      !createdEvent ||
      createdEvent.error ||
      !createdEvent.data ||
      createdEvent.data.length === 0
    ) {
      console.error("Event creation failed:", createdEvent?.error);
      return;
    }
    const { event_id } = createdEvent.data[0];
    // console.log("createdEvent event id", event_id);
    // Now that the event is created, upload the picture
    if (file) {
      // UploadPicture should accept file, event id, and user id to generate a proper file path
      const uploadResult = await UploadPicture(file, event_id, userId);
      // console.log("uploadResult", uploadResult);
      if (uploadResult.error) {
        console.error("Image upload failed:", uploadResult.error);
        // Optionally, update the event record or notify the user
        return;
      }
    }

    // Reset form after submission
    setEventName("");
    setEventDescription("");
    setEventPrice("");
    setStartColor("#ff7e5f");
    // setEndColor("#feb47b");
    setFile(null);
    setPreviewUrl(null);

    router.push("/");
  };

  // Helper functions for keypress limits
  function limitKeypressOnTitle(event, value) {
    if (value && value.toString().length >= 20) {
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
    <div
      style={{
        display: "flex",
        gap: "40px",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "40px",
        color: "#000",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Form Section */}
      <div
        style={{
          flex: 1,
          maxWidth: "500px",
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          color: "#000",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#000" }}>Create an Event</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "600",
                color: "#000",
              }}
            >
              Event Name
            </label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
              placeholder="Enter event name"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "1rem",
                backgroundColor: "#fff",
                color: "#000",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid #999")}
              onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
              onKeyPress={(e) => limitKeypressOnTitle(e, eventName)}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "600",
                color: "#000",
              }}
            >
              Event Description
            </label>
            <textarea
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
              placeholder="Enter event description"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "1rem",
                resize: "vertical",
                minHeight: "100px",
                backgroundColor: "#fff",
                color: "#000",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid #999")}
              onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
              onKeyPress={(e) =>
                limitKeypressOnDescription(e, eventDescription)
              }
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "600",
                color: "#000",
              }}
            >
              Event Price
            </label>
            <input
              type="number"
              value={eventPrice}
              onChange={(e) => setEventPrice(e.target.value)}
              required
              placeholder="Enter event price"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                fontSize: "1rem",
                backgroundColor: "#fff",
                color: "#000",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.border = "1px solid #999")}
              onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
              onKeyPress={(e) => limitKeypressOnPrice(e, eventPrice)}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "6px",
                fontWeight: "600",
                color: "#000",
              }}
            >
              Upload Event Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{
                fontSize: "0.95rem",
                color: "#000",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "12px 24px",
              backgroundColor: "#EB3B43",
              color: "white",
              fontSize: "1rem",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background 0.2s ease-in-out",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#c93038")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#EB3B43")
            }
          >
            Create Event
          </button>
        </form>

        {/* Color Pickers */}
        <div style={{ marginTop: "30px" }}>
          <label
            style={{
              fontWeight: "600",
              marginRight: "10px",
              color: "#000",
            }}
          >
            Gradient Start Color:
          </label>
          <input
            type="color"
            value={startColor}
            onChange={(e) => setStartColor(e.target.value)}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label
            style={{
              fontWeight: "600",
              marginRight: "10px",
              color: "#000",
            }}
          />

        </div>
      </div>

      {/* Preview Section */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3
          style={{ color: "#000", marginBottom: "10px", textAlign: "center" }}
        >
          Event Preview
        </h3>
        <div
          style={{
            background: `linear-gradient(135deg, ${startColor}, ${endColor})`,
            border: "1px solid #e0e0e0",
            padding: "25px",
            width: "250px",
            height: "320px",
            display: "flex",
            flexDirection: "column",
            borderRadius: "20px",
            alignItems: "center",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          }}
        >
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Event image"
              width={240}
              height={180}
              style={{
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "60%",
                backgroundColor: "#e0e0e0",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#666",
              }}
            >
              No image selected
            </div>
          )}
          <div
            style={{ width: "100%", paddingTop: "10px", textAlign: "center" }}
          >
            <h4 style={{ margin: "0", fontSize: "1.2rem", color: "#000" }}>
              {eventName || "Event Name"}
            </h4>
            <p
              style={{
                margin: "5px 0",
                fontSize: "0.9rem",
                color: "#333",
                wordWrap: "break-word",
              }}
            >
              {eventDescription
                ? eventDescription.slice(0, 50) + "..."
                : "Description of the event..."}
            </p>
            <p
              style={{
                margin: "0",
                fontWeight: "bold",
                fontSize: "1.1rem",
                color: "#000",
              }}
            >
              ${eventPrice || "0"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
