'use client';

import { SessionProvider } from 'next-auth/react';

export default function CreateEventLayout({ children }) {
  return (
    <SessionProvider>
      <div>
        {/* Add any other layout-specific elements here */}
        {children}  {/* Render the children of the page inside this layout */}
      </div>
    </SessionProvider>
  );
}
