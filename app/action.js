'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signOut() {
  // Get the cookie store
  const cookieStore = await cookies();

  // Delete the NextAuth session cookie. Adjust the cookie name if needed.
  cookieStore.delete('next-auth.session-token');
  
  // Optionally, delete additional related cookies like the CSRF token if necessary:
//   cookieStore.delete('next-auth.csrf-token');
  
  // Redirect to the login page
  redirect('/')
}
