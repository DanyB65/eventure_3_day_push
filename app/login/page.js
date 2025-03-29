// import { signInWithEmail } from "./action";
// import Link from "next/link";
// export default function LoginPage() {
//   return (
//     <div style={styles.container}>
//       {/* Left Side (Info / Marketing) */}
//       <div style={styles.leftSide}>
//         <h1 style={styles.eventureTitle}>
//           <Link href="/">Eventure</Link>
//         </h1>
//         <h2 style={styles.subtitle}>Tailored for Event Planners & Vendors</h2>
//         <p style={{ marginBottom: "1rem" }}>
//           Whether you&apos;re booking your dream event or delivering top-notch
//           services, Eventure connects you with the opportunities you need.
//         </p>

//         <ul style={styles.list}>
//           <li>Seamless event booking and management for planners</li>
//           <li>Effortless scheduling and notifications for vendors</li>
//           <li>Transparent vendor comparisons & data-driven insights</li>
//           <li>Integrated communication and collaboration tools</li>
//         </ul>
//       </div>

//       {/* Right Side (Login Form) */}
//       <div style={styles.rightSide}>
//         <h1 style={styles.title}>Login to your account</h1>
//         {/* The form posts to the signInWithEmail server action */}
//         <form action={signInWithEmail} style={styles.form}>
//           {/* Email */}
//           <label style={styles.label}>
//             Email
//             <input style={styles.input} type="email" name="email" required />
//           </label>

//           {/* Password */}
//           <label style={styles.label}>
//             Password
//             <input
//               style={styles.input}
//               type="password"
//               name="password"
//               required
//             />
//           </label>

//           <button type="submit" style={styles.button}>
//             LOGIN
//           </button>
//           <Link href="/signup" style={styles.signupButton}>
//             Sign Up
//           </Link>
//         </form>
//       </div>
//     </div>
//   );
// }





"use client";

import { signInWithEmail } from "./action";
import Link from "next/link";
import { useState, useTransition } from "react";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage(''); // Clear any previous error

    const formData = new FormData(event.target);

    // Use startTransition if the server action might take a bit
    startTransition(async () => {
      const result = await signInWithEmail(formData);
      // If there's an error returned from the server action, update the error message state
      if (result && result.error) {
        setErrorMessage(result.error);
      }
    });
  }

  return (
    <div style={styles.container}>
      {/* Left Side (Info / Marketing) */}
      <div style={styles.leftSide}>
        <h1 style={styles.eventureTitle}>
          <Link href="/">Eventure</Link>
        </h1>
        <h2 style={styles.subtitle}>Tailored for Event Planners & Vendors</h2>
        <p style={{ marginBottom: "1rem" }}>
          {"Whether you're booking your dream event or delivering top-notch services, Eventure connects you with the opportunities you need."}
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
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email */}
          <label style={styles.label}>
            Email
            <input style={styles.input} type="email" name="email" required />
          </label>

          {/* Password */}
          <label style={styles.label}>
            Password
            <input style={styles.input} type="password" name="password" required />
          </label>

          {/* Inline error message */}
          {errorMessage && (
            <p style={{ color: "white", marginTop: "0.5rem" }}>
              {errorMessage}
            </p>
          )}

          <button type="submit" style={styles.button} disabled={isPending}>
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
