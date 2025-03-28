"use client";

import { useState, useEffect,useCallback } from "react";
import { createClient } from "../../ultis/supabase/client";

export default function StripeConnectPage() {
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();


  const handleSession = useCallback(async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setUserId(null);
        setEmail(null);
      } else if (data.session) {
        setUserId(data.session.user.id);
        setEmail(data.session.user.email);
      }
    } catch (err) {
      setUserId(null);
      setEmail(null);
    }
  }, [supabase]);

  useEffect(() => {
    handleSession();
  }, [handleSession]);
  //   console.log('email',email);

  //   console.log("User ID:", userId);

  const handleConnect = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, email }),
      });
      // Destructure url, accountId, and error from the response
      const { url, accountId, error } = await res.json();
      console.log(
        "Stripe Connect URL:",
        url,
        "Account ID:",
        accountId,
        "Error:",
        error
      );
      if (error) {
        console.error("Error creating account link:", error);
      } else if (url) {
        // Optionally, store accountId in state or send it to your backend

        const { data, error } = await supabase
          .from("profiles")
          .update({ stripe_account_id: accountId })
          .eq("id", userId)
          .select();

        // console.log("data", data, "error", error);
        window.location.href = url;
      }
    } catch (err) {
      console.error("Error connecting to Stripe:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Stripe Connect Onboarding</h1>
      <button
        onClick={handleConnect}
        disabled={loading || !userId} // disable if loading or userId is null
        style={{
          padding: "10px 20px",
          backgroundColor: "#6772e5",
          color: "white",
          border: "none",
          borderRadius: "5px",
          fontSize: "1rem",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Connecting..." : "Connect to Stripe"}
      </button>
    </div>
  );
}
