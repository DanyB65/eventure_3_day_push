
// import {  NextRequest } from 'next/server'
// import { updateSession } from '@/utils/supabase/middleware'
// export async function middleware(request) {
//   return await updateSession(request)
// }
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * Feel free to modify this pattern to include more paths.
//      */
//     '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
//   ],
// }
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
  