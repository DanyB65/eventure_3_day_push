'use client';  // This ensures this is treated as a Client Component

import { SessionProvider } from 'next-auth/react';

export default function ClientLayout({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
