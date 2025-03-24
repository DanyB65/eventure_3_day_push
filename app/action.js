
'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signOut() {
  // Delete the session cookie
  
  const cookieStore = await cookies()
  console.log('cookie before delete',cookieStore)
  cookieStore.delete('session')
  console.log('cookie after delete',cookieStore)

  // Redirect to the login page
  redirect('/login')
}
