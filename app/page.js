// 'use client';

// import { useSession } from "next-auth/react";
// // import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { signOut } from "./action";
// import styles from './page.module.css';
// import { AllEvents } from "./_allevents/events";
// import {suspense } from 'react';
import AllEvents from "./_allevents/events";
import Home from "./_allevents/home";

export default function MainPage() {
  // const { data: session, status } = useSession();
  // // const router = useRouter();
  // // console.log(await AllEvents())

  // const handleSignOut = async () => {
  //   await signOut();
  //   window.location.reload(); // Reload to update session
  // };

  return (
    <>
      <Home />
      <AllEvents />
    </>
  );
}
