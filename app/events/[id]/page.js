
"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "../../../ultis/supabase/client";
import Link from "next/link";

export default function EventDetails() {
    const supabase  = createClient();
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("event_id", id)
        .single();
      if (error) {
        console.error("Error fetching event:", error);
      } else {
        setEventData(data);
      }
      setLoading(false);
    }
    fetchEvent();
  }, [id, supabase]);

  if (loading) return <p>Loading event...</p>;
  if (!eventData) return <p>No event found.</p>;

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "black",
          border: "1px solid #ddd",
          padding: "25px",
          width: "250px",
          height: "320px",
          display: "flex",
          flexDirection: "column",
          borderRadius: "20px",
          alignItems: "flex-start",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          background: `linear-gradient(135deg, ${eventData.start_color}, ${eventData.end_color})`,
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
          {eventData.event_name}
        </h4>
        <p
          style={{
            color: "black",
            fontSize: "1rem",
            marginTop: "10px",
          }}
        >
          {eventData.event_description}
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
          ${eventData.event_price}
        </p>
      </div>

      <Link href="/" style={{ marginTop: "2rem", color: "#EB3B43", fontWeight: "bold" }}>
        ← Back to Home
      </Link>
    </div>
  );
}
