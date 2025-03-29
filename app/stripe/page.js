"use client";

import { useState, useEffect, useCallback } from "react";
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
    console.log("handleConnect triggered");
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, email }),
      });
      // Destructure url, accountId, and error from the response
      const { url, accountId, error } = await res.json();
    //   console.log(
    //     "Stripe Connect URL:",
    //     url,
    //     "Account ID:",
    //     accountId,
    //     "Error:",
    //     error
    //   );
      if (error) {
        // console.error("Error creating account link:", error);
      } else if (url) {
        console.log("Received Stripe Connect URL:", url);
        // Update the profile with the accountId
        console.log("userId", userId, "accountId", accountId);
        const { data, error } = await supabase
          .from("profiles")
          .update({ stripe_account_id: accountId })
          .eq("id", userId)
          .select();

        if (error) {
          console.error("Error updating profile:", error);
          // Optionally, handle the error (e.g., show a message to the user)
          return;
        }

        console.log('data',data,'error',error);
        // Now that the update is confirmed, redirect to the Stripe onboarding URL
        window.location.href = url;
      }
    } catch (err) {
      //   console.error("Error connecting to Stripe:", err);
    } finally {
      setLoading(false);
    }
  };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Stripe Connect Onboarding</h1>
//       <button
//         onClick={handleConnect}
//         disabled={loading || !userId} // disable if loading or userId is null
//         style={{
//           padding: "10px 20px",
//           backgroundColor: "#black",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//           fontSize: "1rem",
//           cursor: loading ? "not-allowed" : "pointer",
//         }}
//       >
//         {loading ? "Connecting..." : "Connect to Stripe"}
//       </button>
//     </div>
//   );
return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FAFAFA",
        fontFamily: "system-ui, sans-serif",
        color: "#000",
        padding: "40px",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
        Stripe Connect Onboarding
      </h1>
  
      <button
        onClick={handleConnect}
        disabled={loading || !userId}
        style={{
          padding: "12px 24px",
          backgroundColor: loading || !userId ? "#ccc" : "#EB3B43",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontSize: "1rem",
          cursor: loading || !userId ? "not-allowed" : "pointer",
          transition: "background 0.2s ease-in-out",
        }}
        onMouseOver={(e) => {
          if (!loading && userId)
            e.currentTarget.style.backgroundColor = "#c93038";
        }}
        onMouseOut={(e) => {
          if (!loading && userId)
            e.currentTarget.style.backgroundColor = "#EB3B43";
        }}
      >
        {loading ? "Connecting..." : "Connect to Stripe"}
      </button>
    </div>
  );
  
}
