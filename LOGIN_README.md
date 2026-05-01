# Authentication System Documentation

This document provides comprehensive documentation for the custom authentication system implemented in this Next.js application. The system uses JWT tokens, HTTP-only cookies, bcrypt password hashing, and does not rely on third-party authentication libraries like Auth0.

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Security Features](#security-features)
4. [API Endpoints](#api-endpoints)
5. [Client-Side Usage](#client-side-usage)
6. [Environment Variables](#environment-variables)
7. [Database Schema](#database-schema)
8. [Cookie Handling](#cookie-handling)
9. [Password Encryption](#password-encryption)
10. [Middleware & Route Protection](#middleware--route-protection)
11. [Troubleshooting](#troubleshooting)

## Overview

The authentication system provides:
- User registration (signup)
- User login (signin)
- Session management with JWT tokens
- Secure password storage using bcrypt
- HTTP-only cookie-based authentication
- Route protection via middleware
- Client-side authentication state management

## Architecture

### Components

1. **Auth Library** (`src/lib/auth.ts`)
   - Password hashing and verification
   - JWT token creation and verification
   - Cookie management utilities
   - Input validation functions

2. **API Routes** (`app/api/auth/`)
   - `/api/auth/signup` - User registration
   - `/api/auth/signin` - User login
   - `/api/auth/signout` - User logout
   - `/api/auth/me` - Get current user

3. **Middleware** (`middleware.ts`)
   - Route protection
   - JWT token verification
   - Automatic redirects for unauthenticated users

4. **Client Components**
   - `AuthProvider` - Initializes auth state on app load
   - `useAuth` hook - Client-side auth utilities
   - `userStore` - Zustand store for user state

5. **UI Pages**
   - `/signin` - Login page
   - `/signup` - Registration page

## Security Features

### Password Security

- **Bcrypt Hashing**: Passwords are hashed using bcrypt with 12 salt rounds (industry standard)
- **Password Validation**: Minimum 8 characters, maximum 128 characters
- **No Plain Text Storage**: Passwords are never stored in plain text

### Token Security

- **JWT Tokens**: Secure, signed tokens with expiration (7 days)
- **HTTP-Only Cookies**: Tokens stored in HTTP-only cookies (not accessible via JavaScript)
- **Secure Flag**: Cookies use `secure` flag in production (HTTPS only)
- **SameSite Protection**: Cookies use `lax` SameSite policy to prevent CSRF attacks

### Input Validation

- **Email Validation**: RFC-compliant email format validation
- **Name Validation**: Length validation (2-100 characters)
- **Password Strength**: Enforced minimum length requirements
- **SQL Injection Protection**: Prisma ORM prevents SQL injection
- **XSS Protection**: Input sanitization and proper encoding

### Security Best Practices

- **Generic Error Messages**: Don't reveal if email exists during login
- **Rate Limiting Ready**: Structure supports rate limiting implementation
- **Token Expiration**: Tokens expire after 7 days
- **Secure Cookie Settings**: HttpOnly, Secure (production), SameSite=Lax

## API Endpoints

### POST `/api/auth/signup`

Creates a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "user": {
    "id": "clx123...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Response (Error - 400/409):**
```json
{
  "success": false,
  "error": "Error message here"
}
```

**Validation Rules:**
- Name: 2-100 characters
- Email: Valid email format, unique
- Password: 8-128 characters

### POST `/api/auth/signin`

Authenticates a user and creates a session.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "user": {
    "id": "clx123...",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "error": "Invalid email or password."
}
```

**Note:** The response includes a Set-Cookie header with the JWT token.

### POST `/api/auth/signout`

Logs out the current user by clearing the authentication cookie.

**Response (Success - 200):**
```json
{
  "success": true
}
```

### GET `/api/auth/me`

Returns the current authenticated user.

**Response (Authenticated - 200):**
```json
{
  "user": {
    "id": "clx123...",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "authenticated": true
}
```

**Response (Not Authenticated - 200):**
```json
{
  "user": null,
  "authenticated": false
}
```

## Client-Side Usage

### Using the `useAuth` Hook

The `useAuth` hook provides authentication state and utilities:

```tsx
import { useAuth } from '@/src/hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>Please sign in</div>;
  }

  return (
    <div>
      <p>Welcome, {user?.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Using the User Store Directly

```tsx
import { useUserStore } from '@/src/stores/userStore';

function MyComponent() {
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const setUser = useUserStore((state) => state.setUser);
  const logout = useUserStore((state) => state.logout);

  // Use the store...
}
```

### Protected Routes

The home page (`app/page.tsx`) demonstrates how to protect routes:

```tsx
'use client';

import { useAuth } from '@/src/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/signin');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return null;

  return <div>Protected Content</div>;
}
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# JWT Secret Key (REQUIRED in production)
# Generate a strong random string: openssl rand -base64 32
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production

# Database URL (from Prisma)
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Node Environment
NODE_ENV=production
```

### Generating a Secure JWT Secret

```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Important:** Never commit the `.env.local` file to version control. Use a strong, random JWT secret in production.

## Database Schema

The User model in Prisma schema:

```prisma
model User {
  id        String    @id @default(cuid())
  name      String
  email     String    @unique
  password  String    // Hashed with bcrypt
  projects  Project[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}
```

### Running Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Or in production
npx prisma migrate deploy
```

## Cookie Handling

### Cookie Configuration

- **Name**: `auth_token`
- **HttpOnly**: `true` (prevents JavaScript access)
- **Secure**: `true` in production (HTTPS only)
- **SameSite**: `lax` (CSRF protection)
- **MaxAge**: 7 days (604800 seconds)
- **Path**: `/` (available site-wide)

### How Cookies Work

1. **On Signin/Signup**: Server creates JWT token and sets it in an HTTP-only cookie
2. **On Subsequent Requests**: Browser automatically sends cookie with requests
3. **On Signout**: Server clears the cookie by setting maxAge to 0
4. **Token Verification**: Middleware and API routes verify the token from the cookie

### Cookie Security

- **HttpOnly**: Prevents XSS attacks by blocking JavaScript access
- **Secure**: Ensures cookies only sent over HTTPS in production
- **SameSite**: Prevents CSRF attacks by restricting cross-site requests

## Password Encryption

### Hashing Algorithm

- **Algorithm**: bcrypt
- **Salt Rounds**: 12 (recommended for 2024+)
- **Cost Factor**: 2^12 = 4,096 iterations

### Password Storage Flow

1. User submits password during signup
2. Server validates password (length, format)
3. Password is hashed using bcrypt with 12 salt rounds
4. Hashed password is stored in database
5. Original password is never stored

### Password Verification Flow

1. User submits password during signin
2. Server retrieves hashed password from database
3. bcrypt compares submitted password with hash
4. Returns true if match, false otherwise

### Example Hash

```
Input: "mypassword123"
Output: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyY5Y5Y5Y5Y5"
```

## Middleware & Route Protection

### Middleware Configuration

The middleware (`middleware.ts`) protects routes automatically:

```typescript
// Public routes (no auth required)
const publicRoutes = ['/signin', '/signup', '/api/auth/signin', '/api/auth/signup'];

// Protected routes (auth required)
const protectedRoutes = ['/admin'];
```

### How It Works

1. **Request Interception**: Middleware runs before page/API route handlers
2. **Token Extraction**: Extracts JWT token from cookie
3. **Token Verification**: Verifies token signature and expiration
4. **Route Protection**: Redirects unauthenticated users to `/signin`
5. **Redirect Preservation**: Preserves intended destination in query params

### Adding Protected Routes

Edit `middleware.ts`:

```typescript
const protectedRoutes = ['/admin', '/dashboard', '/settings'];
```

### Bypassing Middleware

Routes matching these patterns are excluded:
- `_next/static/*` - Static files
- `_next/image/*` - Image optimization
- `favicon.ico` - Favicon
- Image files (`.svg`, `.png`, `.jpg`, etc.)

## Troubleshooting

### Common Issues

#### 1. "Invalid credentials" on signin

**Possible Causes:**
- Wrong email or password
- Email not normalized (case sensitivity)
- User doesn't exist

**Solution:**
- Check email is correct and lowercase
- Verify password is correct
- Check database for user existence

#### 2. Cookies not being set

**Possible Causes:**
- Not using `credentials: 'include'` in fetch
- CORS issues
- Secure flag in development

**Solution:**
```typescript
fetch('/api/auth/signin', {
  method: 'POST',
  credentials: 'include', // Required!
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
```

#### 3. "JWT_SECRET is not defined"

**Solution:**
- Create `.env.local` file
- Add `JWT_SECRET=your-secret-key`
- Restart development server

#### 4. Middleware redirect loop

**Possible Causes:**
- Token expired
- Invalid token format
- Cookie not being sent

**Solution:**
- Clear browser cookies
- Check token expiration
- Verify cookie settings

#### 5. User state not persisting on refresh

**Solution:**
- Ensure `AuthProvider` is in root layout
- Check `/api/auth/me` endpoint works
- Verify cookies are being sent

### Debugging Tips

1. **Check Browser Cookies:**
   - Open DevTools → Application → Cookies
   - Verify `auth_token` cookie exists
   - Check cookie attributes (HttpOnly, Secure, SameSite)

2. **Check Network Requests:**
   - Open DevTools → Network
   - Verify cookies are sent in requests
   - Check API response status codes

3. **Check Server Logs:**
   - Look for authentication errors
   - Verify JWT verification logs
   - Check database query results

4. **Test API Endpoints:**
   ```bash
   # Test signup
   curl -X POST http://localhost:3000/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","password":"password123"}'

   # Test signin
   curl -X POST http://localhost:3000/api/auth/signin \
     -H "Content-Type: application/json" \
     -c cookies.txt \
     -d '{"email":"test@example.com","password":"password123"}'

   # Test me endpoint
   curl http://localhost:3000/api/auth/me -b cookies.txt
   ```

## Security Checklist

Before deploying to production:

- [ ] Set a strong, random `JWT_SECRET` (32+ characters)
- [ ] Ensure `NODE_ENV=production`
- [ ] Use HTTPS (required for secure cookies)
- [ ] Enable rate limiting on auth endpoints
- [ ] Set up proper CORS configuration
- [ ] Enable database connection pooling
- [ ] Set up error logging and monitoring
- [ ] Review and test all authentication flows
- [ ] Perform security audit
- [ ] Set up backup and recovery procedures

## Additional Resources

- [Next.js Authentication](https://nextjs.org/docs/authentication)
- [JWT Best Practices](https://datatracker.ietf.org/doc/html/rfc8725)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [bcrypt Documentation](https://github.com/kelektiv/node.bcrypt.js)

## Support

For issues or questions:
1. Check this documentation
2. Review the troubleshooting section
3. Check server logs for errors
4. Verify environment variables are set correctly

---

**Last Updated:** 2024
**Version:** 1.0.0

