"use client";
import signUpNewUser from "./action";
import Link from "next/link";
import React, { useState } from "react";

export default function SignUp() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipcode: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    // If you have a function signUpNewUser that takes an object:
    await signUpNewUser(user);

    // console.log("Signing up user with data:", user);
    // Do something with the result...
  };
  return (
    <div style={styles.container}>
      {/* Left Side (Form) */}
      <div style={styles.leftSide}>
        <h1 style={styles.title}>Create a free account now</h1>

        <form onSubmit={handleSignUp} style={styles.form}>
          {/* First Name */}
          <label style={styles.label}>
            First Name
            <input
              style={styles.input}
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              required
            />
          </label>

          {/* Last Name */}
          <label style={styles.label}>
            Last Name
            <input
              style={styles.input}
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              required
            />
          </label>

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
          <label style={styles.label}>
            Confirm Password
            <input
              style={styles.input}
              type="password" // Optionally change type to "password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              required
            />
          </label>

          {/* Street Address */}
          <label style={styles.label}>
            Street Address
            <input
              style={styles.input}
              type="text"
              name="streetAddress"
              value={user.streetAddress}
              onChange={handleChange}
              required
            />
          </label>

          {/* City */}
          <label style={styles.label}>
            City
            <input
              style={styles.input}
              type="text"
              name="city"
              value={user.city}
              onChange={handleChange}
              required
            />
          </label>

          {/* State */}
          <label style={styles.label}>
            State
            <input
              style={styles.input}
              type="text"
              name="state"
              value={user.state}
              onChange={handleChange}
              required
            />
          </label>

          {/* Zipcode */}
          <label style={styles.label}>
            Zipcode
            <input
              style={styles.input}
              type="text"
              name="zipcode"
              value={user.zipcode}
              onChange={handleChange}
              required
            />
          </label>

          {/* Phone Number */}
          <label style={styles.label}>
            Phone Number
            <input
              style={styles.input}
              type="text"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              required
            />
          </label>

          <button onClick={handleSignUp} type="submit" style={styles.button}>
            CREATE ACCOUNT
          </button>
          <Link href="/login" style={styles.signupButton}>
            Already have an account? Login
          </Link>
        </form>
      </div>
      {/* Right Side (Info / Marketing) */}
      <div style={styles.rightSide}>
        <h1 style={styles.eventureTitle}>
          <Link href="/">Eventure</Link>
        </h1>
        <h2 style={styles.subtitle}>Tailored for Event Planners & Vendors</h2>
        <p style={{ marginBottom: "1rem" }}>
          Whether you&apos;re booking your dream event or delivering top-notch
          services, Eventure connects you with the opportunities you need.
        </p>
        <ul style={styles.list}>
          <li>Seamless event booking and management for planners</li>
          <li>Effortless scheduling and notifications for vendors</li>
          <li>Transparent vendor comparisons &amp; data-driven insights</li>
          <li>Integrated communication and collaboration tools</li>
        </ul>
      </div>{" "}
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
      backgroundColor: "#EB3B43", // red background for form
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "2rem",
    },
    rightSide: {
      flex: 1,
      backgroundColor: "#fff", // white background for info
      color: "#333",
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
      color:'#EB3B43'
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
      color: "#00AEEF",
      fontWeight: "bold",
      cursor: "pointer",
    },
    loginLink: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "1rem",
      padding: "0.75rem 1rem",
      border: "none",
      borderRadius: "4px",
      backgroundColor: "#fff",
      color: "#00AEEF",
      fontWeight: "bold",
      cursor: "pointer",
      textDecoration: "none",
      textAlign: "center",
    },
    list: {
      listStyleType: "disc",
      paddingLeft: "1.5rem",
      lineHeight: "1.75",
    },
  };