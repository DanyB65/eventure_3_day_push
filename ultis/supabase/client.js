
// import { createBrowserClient } from "@supabase/ssr";

// export  default function createClient(){
//     createBrowserClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//     );

// }

// import { createBrowserClient } from "@supabase/ssr";

// export default function createClient() {
//   return createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//   );
// }




// 'use server'
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// export  const supabase = createClient(supabaseUrl, supabaseAnonKey);
// 'use client'; // Ensure this directive is at the top if the file is a module

// import { createBrowserClient } from '@@supabase/ssr';

// // Retrieve environment variables for Supabase configuration
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// // Initialize the Supabase client
// export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

import { createBrowserClient } from '@supabase/ssr'
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}