

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EventForm from "./form";
import styles from "../page.module.css";
import { createClient } from "../../ultis/supabase/client";
import Header from "../_allevents/header";

export default function CreateEvent() {
  const router = useRouter();
  const [stripeId, setStripeId] = useState(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function checkSessionAndStripe() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("stripe_account_id")
        .eq("id", session.user.id)
        .single();

      if (!error && data?.stripe_account_id) {
        setStripeId(data.stripe_account_id);
      }

      setLoading(false);
    }

    checkSessionAndStripe();
  }, [router, supabase]);

  // const handleSignOut = async () => {
  //   const { error } = await supabase.auth.signOut();
  //   if (!error) router.push("/");
  // };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Header />

      <h4 style={{
        color: "#fff", backgroundColor: "#000", padding: "20px", borderRadius: "10px",
        maxWidth: "100%", margin: "0 auto",
      }}>
        {/* [Your content here] */}
        <p style={{ fontSize: "1.2rem" }}>
        </p>
        {/* ... */}
        <p style={{ fontSize: "1rem", fontStyle: "italic", textAlign: "right" }}>
        </p>
      </h4>

      {stripeId ? (
        <EventForm />
      ) : (
        <div style={{ padding: "30px", textAlign: "center" }}>
          <p>You need to connect your Stripe account before creating events.</p>
          <Link href="/api/stripe/connect">
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#00AEEF",
                color: "white",
                borderRadius: "5px",
                fontWeight: "bold",
                border: "none",
              }}
            >
              Connect Stripe
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
