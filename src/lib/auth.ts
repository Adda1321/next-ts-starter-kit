import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';
const JWT_EXPIRES_IN = '7d'; // 7 days
const COOKIE_NAME = 'auth_token';

// Hash a password
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

// Compare password
export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

// Create JWT
export function createJWT(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// Verify JWT
export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

// Set auth cookie
export function setAuthCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

// Remove auth cookie
export function removeAuthCookie() {
  cookies().set(COOKIE_NAME, '', { maxAge: 0, path: '/' });
}

// Get token from cookie
export function getTokenFromCookie() {
  return cookies().get(COOKIE_NAME)?.value || null;
} 