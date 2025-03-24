'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "./action";
import styles from './page.module.css';
import { AllEvents } from "./_allevents/events";

export default  function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  // console.log(await AllEvents())

  const handleSignOut = async () => {
    await signOut();
    window.location.reload(); // Reload to update session
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Eventure</h1>
        <nav className={styles.nav}>
          {/* Flex container for navigation links */}
          <div className={styles.navLinks}>
          <Link href="/" className={styles.homeLink}>Events</Link>

            <Link href="/createevent" className={styles.createEventLink}>Create Event</Link>

            {/* Conditional rendering of buttons */}
            {session ? (
              <button className={styles.signOutButton} onClick={handleSignOut}>
                Sign Out
              </button>
            ) : (
              <>
                <Link href="/login" className={styles.loginLink}>Login</Link>
                <Link href="/signup" className={styles.signupLink}>Sign Up</Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className={styles.main}>
        <p>Welcome to Eventure! Your platform to create and manage events.</p>
        <AllEvents />
      </main>

      <footer className={styles.footer}>
        <p>© 2025 Eventure. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
