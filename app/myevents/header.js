'use client';
import React from 'react';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from 'next-auth/react';
import styles from '../page.module.css';

export default function Home() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
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
