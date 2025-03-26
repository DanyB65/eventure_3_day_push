
// 'use client';
// import React from 'react';
// import Link from "next/link";
// import { supabase } from '../ultis/supabase/client';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';
// import styles from '../page.module.css';

// export default function Home() {
//     const router = useRouter();

//     const handleSession = async () => {
//       try {
//         const { data, error } = await supabase.auth.getSession();
//         if (error || !data.session) {
//           // console.error("No active session found:", error);
//           router.push("/login");
//         } else {
//           // console.log("Session data:", data);
//         }
//       } catch (err) {
//         // console.error("Unexpected error fetching session:", err);
//         router.push("/login");
//       }
//     };
    
  
//     useEffect(() => {
//       handleSession();
//     }, []);
  
//     const handleSignOut = async () => {
//       const { error } = await supabase.auth.signOut();
//       if (!error) {
//         // Redirect after sign-out
//         router.push("/");
//       } else {
//         // console.error("Error signing out:", error);
//       }
//     };
//   return (
//     <header className={styles.header}>
//       <h1 className={styles.title}>
//         <Link href="/">Eventure</Link>
//       </h1>
//       <nav className={styles.nav}>
//         <div className={styles.navLinks}>
//           {session ? (
//             <>
//               <Link href="/createevent" className={styles.createEventLink}>
//                 Create Event
//               </Link>
//               <button className={styles.signOutButton} onClick={handleSignOut}>
//                 Sign Out
//               </button>
//             </>
//           ) : (
//             <>
//               <Link href="/login" className={styles.loginLink}>
//                 Login
//               </Link>
//               <Link href="/signup" className={styles.signupLink}>
//                 Sign Up
//               </Link>
//             </>
//           )}
//         </div>
//       </nav>
//     </header>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../ultis/supabase/client";
import { useRouter } from "next/navigation";
import styles from "../page.module.css";

export default function Home() {
  const router = useRouter();
  const [session, setSession] = useState(null);

  const handleSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        // console.error("Session error:", error);
        setSession(null);
      } else {
        setSession(data.session); // data.session will be null if not logged in
      }
    } catch (err) {
    //   console.error("Unexpected error fetching session:", err);
      setSession(null);
    }
  };

  useEffect(() => {
    handleSession();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setSession(null);
      router.push("/");
    } else {
    //   console.error("Error signing out:", error);
    }
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link href="/">Eventure</Link>
      </h1>
      <nav className={styles.nav}>
        <div className={styles.navLinks}>
          {session ? (
            <>
              <Link href="/createevent" className={styles.createEventLink}>
                Create Event
              </Link>
              <button className={styles.signOutButton} onClick={handleSignOut}>
                Sign Out
              </button>
            </>
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
  );
}
