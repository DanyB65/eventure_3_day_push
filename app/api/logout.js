import { deleteSession } from '../../lib/session';  // Adjust path if necessary
import { NextResponse } from 'next/server';

export async function handler(req, res) {
  // Call deleteSession function to clear the session
  await deleteSession();

  // After session is deleted, send a redirect response to the login page
  console.log('Sign out successful')
  return NextResponse.redirect('/login');
}
