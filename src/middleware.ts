import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import { authConfig } from './lib/authConfig';

const publicRoutes = ['/', '/posts'];
const authRoutes = ['/sign-in'];

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isPublicRoute = publicRoutes.some(
    (route) => nextUrl.pathname === route
  );
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL('/', nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/sign-in', nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
