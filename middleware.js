
// middleware.js
import { NextResponse } from 'next/server';
import { updateSession } from './ultis/supabase/middleware';

export async function middleware(request) {
  return await updateSession(request);
}

export const config = {
    matcher: [
      '/createevent/:path*',
      '/events/:path*',
      '/myevents/:path*',
      '/api/:path*',
      // Add any additional protected routes here if needed.
    ],
  };
  