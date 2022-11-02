import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { nanoid } from 'nanoid';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // When a user first loads onto the site, a cookie will be generated for them
  // This cookie identifies who they are as long as they don't delete the cookie
  if (request.cookies.get('terrierCookie')) return;

  const random = nanoid();

  const res = NextResponse.redirect(request.nextUrl);

  res.cookies.set('terrierCookie', random, { sameSite: 'strict' });

  return res;
}
