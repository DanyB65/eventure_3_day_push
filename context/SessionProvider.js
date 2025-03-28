'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '../ultis/supabase/client';
const supabase = createClient();
// Create a context with a default value
const SessionContext = createContext({
  session: null,
  loading: true,
});

// SessionProvider component to wrap your app
export function SessionProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the current session when the component mounts
    async function fetchSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);
    }
    fetchSession();

    // Subscribe to auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );

    // Cleanup subscription on unmount
    return () => subscription.subscription.unsubscribe();
  }, []);

  return (
    <SessionContext.Provider value={{ session, loading }}>
      {children}
    </SessionContext.Provider>
  );
}

// Custom hook to access session data
export function useSession() {
  return useContext(SessionContext);
}
