import { NextResponse } from 'next/server';
import { verifySession } from '../../lib/session'; // Adjust the import path if necessary

export async function middleware(req) {
  // Verify the session using the imported verifySession function
  const session = await verifySession();
  console.log('session',session)

  // If the session is valid, allow access to the createevent pages
  if (session?.id) {
    return NextResponse.next();
  }

  // If no valid session, redirect to login
  return NextResponse.redirect(new URL('/login', req.url));
}


//next step is a signout button