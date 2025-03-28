
// import { createServerClient } from "@supabase/ssr";
// // import { cookies } from "next/headers";

// export const createClient = (cookieStore) => {
//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//     {
//       cookies: {
//         getAll() {
//           return cookieStore.getAll()
//         },
//         setAll(cookiesToSet) {
//           try {
//             cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
//           } catch {
//             // The `setAll` method was called from a Server Component.
//             // This can be ignored if you have middleware refreshing
//             // user sessions.
//           }
//         },
//       },
//     },
//   );
// };



// 'use server'
// // import { createServerClient } from '@supabase/ssr'
// import { createServerClient } from '@supabase/auth-helpers-nextjs';

// import { cookies } from 'next/headers'

//   export async function createClient() {
//     const cookieStore = await cookies()

//     return createServerClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL,
//       process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//       {
//         cookies: {
//           getAll() {
//             return cookieStore.getAll()
//           },
//           setAll(cookiesToSet) {
//             try {
//               cookiesToSet.forEach(({ name, value, options }) =>
//                 cookieStore.set(name, value, options)
//               )
//             } catch {
//               // The `setAll` method was called from a Server Component.
//               // This can be ignored if you have middleware refreshing
//               // user sessions.
//             }
//           },
//         },
//       }
//     )
//   }
// utils/supabase/server.js
// 'use server';


// import { createServerClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';

// export const createClient = () => {
//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//     { cookies }
//   );
// };


// 'use server'
// import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';

// export async function createClient() {
//   const cookieStore = cookies();
//   return createPagesServerClient({
//     supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
//     supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//     cookies: cookieStore,
//   });
// }

// import { createServerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers'

// export async function createClient() {
//   const cookieStore = await cookies()

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//     {
//       cookies: {
//         getAll() {
//           return cookieStore.getAll()
//         },
//         setAll(cookiesToSet) {
//           try {
//             cookiesToSet.forEach(({ name, value, options }) =>
//               cookieStore.set(name, value, options)
//             )
//           } catch {
//             // The `setAll` method was called from a Server Component.
//             // This can be ignored if you have middleware refreshing
//             // user sessions.
//           }
//         },
//       },
//     }
//   )
// }
// import { createServerClient } from '@supabase/ssr';
// import { cookies } from 'next/headers';

// export function createSupabaseServerClient() {
//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//     {
//       cookies: {
//         get(name) {
//           return cookies().get(name)?.value;
//         },
//         set(name, value, options) {
//           cookies().set({ name, value, ...options });
//         },
//         remove(name, options) {
//           cookies().set({ name, value: '', ...options });
//         },
//       },
//     }
//   );
// }

// 'use server';

// import { createServerClient } from '@supabase/ssr';
// import { cookies } from 'next/headers';

// export async function createSupabaseServerClient() {
//   const cookieStore = await cookies();

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//     {
//       cookies: {
//         get(name) {
//           return cookieStore.getAll(name)?.value;
//         },
//         set(name, value, options) {
//           cookieStore.setAll({ name, value, ...options });
//         },
//         remove(name, options) {
//           cookieStore.setAll({ name, value: '', ...options });
//         },
//       },
//     }
//   );
// }
// 'use server';

// import { createServerClient } from '@supabase/ssr';
// import { cookies } from 'next/headers';

// export async function createSupabaseServerClient() {
//   // Get the cookie store
//   const cookieStore = await cookies();

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//     {
//       cookies: {
//         // Use getAll to read all cookies at once
//         getAll: () => cookieStore.getAll(),
//         // Use setAll to write cookies from an array of cookie objects
//         setAll: (cookieArray) => {
//           // The cookieArray parameter is expected to be an array of cookie objects.
//           // Loop through each cookie and set it in the cookie store.
//           cookieArray.forEach((cookie) => {
//             cookieStore.set(cookie);
//           });
//         },
//       },
//     }
//   );
// }

// import { createServerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers'

// export async function createClient() {
//   const cookieStore = await cookies()

//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//     {
//       cookies: {
//         getAll() {
//           return cookieStore.getAll()
//         },
//         setAll(cookiesToSet) {
//           try {
//             cookiesToSet.forEach(({ name, value, options }) =>
//               cookieStore.set(name, value, options)
//             )
//           } catch {
//             // The `setAll` method was called from a Server Component.
//             // This can be ignored if you have middleware refreshing
//             // user sessions.
//           }
//         },
//       },
//     }
//   )
// }

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
