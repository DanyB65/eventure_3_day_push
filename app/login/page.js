"use client";
import { useRouter } from "next/navigation";
import { signInWithEmail } from "./action";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted before using the router.
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    await signInWithEmail(user);
    console.log("Signing in user with data:", user);
    router.push("/"); // This will work once the router is mounted.
  };

  // Until the component is mounted, don't render anything.
  if (!mounted) return null;

  return (
    <div style={styles.container}>
    {/* Left Side (Info / Marketing) */}
    <div style={styles.leftSide}>
      <h1 style={styles.eventureTitle}>
        <Link href="/">Eventure</Link>
      </h1>
      <h2 style={styles.subtitle}>Tailored for Event Planners & Vendors</h2>
      <p style={{ marginBottom: "1rem" }}>
        Whether you&apos;re booking your dream event or delivering top-notch services, Eventure connects you with the opportunities you need.
      </p>
      <ul style={styles.list}>
        <li>Seamless event booking and management for planners</li>
        <li>Effortless scheduling and notifications for vendors</li>
        <li>Transparent vendor comparisons & data-driven insights</li>
        <li>Integrated communication and collaboration tools</li>
      </ul>
    </div>

      {/* Right Side (Login Form) */}
      <div style={styles.rightSide}>
        <h1 style={styles.title}>Login to your account</h1>
        <form onSubmit={handleSignIn} style={styles.form}>
          {/* Email */}
          <label style={styles.label}>
            Email
            <input
              style={styles.input}
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </label>

          {/* Password */}
          <label style={styles.label}>
            Password
            <input
              style={styles.input}
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" style={styles.button}>
            LOGIN
          </button>
          <Link href="/signup" style={styles.signupButton}>
          Sign Up
          </Link>
        </form>
      </div>
    </div>
  );
}
const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      fontFamily: "sans-serif",
    },
    leftSide: {
      flex: 1,
      backgroundColor: "#fff", // white background for info
      color: "#333",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "2rem",
    },
    rightSide: {
      flex: 1,
      backgroundColor: "#EB3B43", // colored background for form
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "2rem",
    },
    eventureTitle: {
      fontSize: "2rem",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "1rem",
      color: "#EB3B43",
    },
    title: {
      fontSize: "1.5rem",
      marginBottom: "1rem",
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: "1.5rem",
      marginBottom: "1rem",
      fontWeight: "bold",
      color: "#333",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      marginBottom: "0.5rem",
      display: "flex",
      flexDirection: "column",
      fontWeight: "500",
    },
    input: {
      padding: "0.5rem",
      borderRadius: "4px",
      border: "1px solid #ccc",
      marginTop: "0.25rem",
    },
    button: {
      marginTop: "1rem",
      padding: "0.75rem 1rem",
      border: "none",
      borderRadius: "4px",
      backgroundColor: "#fff",
      color: "#EB3B43",
      fontWeight: "bold",
      cursor: "pointer",
    },
    signupButton: {
      marginTop: "1rem",
      padding: "0.75rem 1rem",
      border: "none",
      borderRadius: "4px",
      backgroundColor: "#fff",
      color: "#EB3B43",
      fontWeight: "bold",
      cursor: "pointer",
      textDecoration: "none",
      textAlign: "center",
      display: "block",
    },
    list: {
      listStyleType: "disc",
      paddingLeft: "1.5rem",
      lineHeight: "1.75",
    },
  };