import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';
const JWT_EXPIRES_IN = '7d'; // 7 days
const COOKIE_NAME = 'auth_token';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

// Hash a password using bcrypt with salt rounds of 12 (more secure than 10)
export async function hashPassword(password: string): Promise<string> {
  if (!password || password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }
  return bcrypt.hash(password, 12);
}

// Compare password with hash
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Create JWT token
export function createJWT(payload: { id: string; email: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Verify JWT token
export function verifyJWT(token: string): { id: string; email: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
    return decoded;
  } catch {
    return null;
  }
}

// Set auth cookie in NextResponse (for API routes)
export function setAuthCookieInResponse(response: NextResponse, token: string): NextResponse {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
  return response;
}

// Remove auth cookie in NextResponse (for API routes)
export function removeAuthCookieInResponse(response: NextResponse): NextResponse {
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  });
  return response;
}

// Set auth cookie using cookies() (for Server Components/Actions)
export function setAuthCookie(token: string): void {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  });
}

// Remove auth cookie using cookies() (for Server Components/Actions)
export function removeAuthCookie(): void {
  cookies().set(COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  });
}

// Get token from cookie
export function getTokenFromCookie(): string | null {
  return cookies().get(COOKIE_NAME)?.value || null;
}

// Get token from request headers (for API routes)
export function getTokenFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
  
  return cookies[COOKIE_NAME] || null;
}

// Validate password strength
export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters long' };
  }
  if (password.length > 128) {
    return { valid: false, error: 'Password must be less than 128 characters' };
  }
  // Optional: Add more validation rules
  // if (!/[A-Z]/.test(password)) {
  //   return { valid: false, error: 'Password must contain at least one uppercase letter' };
  // }
  // if (!/[a-z]/.test(password)) {
  //   return { valid: false, error: 'Password must contain at least one lowercase letter' };
  // }
  // if (!/[0-9]/.test(password)) {
  //   return { valid: false, error: 'Password must contain at least one number' };
  // }
  return { valid: true };
}

// Validate email format
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
} 