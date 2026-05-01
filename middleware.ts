import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getTokenFromRequest, verifyJWT } from './src/lib/auth';

// Public routes that don't require authentication
const publicRoutes = ['/signin', '/signup', '/api/auth/signin', '/api/auth/signup'];

// Protected routes that require authentication
const protectedRoutes = ['/admin'];

// Check if a path matches any of the given patterns
function isPublicRoute(pathname: string): boolean {
  return publicRoutes.some(route => pathname.startsWith(route));
}

function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some(route => pathname.startsWith(route));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Check authentication for protected routes
  if (isProtectedRoute(pathname)) {
    const token = getTokenFromRequest(request);
    
    if (!token) {
      // Redirect to signin if not authenticated
      const signinUrl = new URL('/signin', request.url);
      signinUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(signinUrl);
    }

    // Verify JWT token
    const payload = verifyJWT(token);
    
    if (!payload) {
      // Invalid token, redirect to signin
      const signinUrl = new URL('/signin', request.url);
      signinUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(signinUrl);
    }

    // Token is valid, allow access
    return NextResponse.next();
  }

  // For all other routes, allow access (they can check auth client-side)
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

