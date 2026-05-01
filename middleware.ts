import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getTokenFromRequest } from './src/lib/auth';

// Protected routes that require authentication
const protectedRoutes = ['/admin'];

function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some(route => pathname.startsWith(route));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only admin routes require authentication.
  if (isProtectedRoute(pathname)) {
    const token = request.cookies.get('auth_token')?.value || getTokenFromRequest(request);

    if (!token) {
      // Redirect to signin if not authenticated
      const signinUrl = new URL('/signin', request.url);
      signinUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(signinUrl);
    }

    // Auth cookie exists, allow access.
    return NextResponse.next();
  }

  // All non-admin routes are public.
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

