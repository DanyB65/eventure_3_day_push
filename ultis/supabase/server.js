

'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        // Use getAll and setAll for proper cookie management
        getAll: () => cookieStore.getAll(),
        setAll: (cookieArray) => {
          cookieArray.forEach((cookie) => cookieStore.set(cookie));
        },
      },
    }
  );
}
