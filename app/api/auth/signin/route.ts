import { NextRequest, NextResponse } from 'next/server';
import  prisma from '../../../../prisma/db';
import { verifyPassword, createJWT, setAuthCookieInResponse, validateEmail } from '@/lib/auth';


export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    
    if (!user) {
      // Don't reveal if user exists or not (security best practice)
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Verify password
    const valid = await verifyPassword(password, user.password);
    
    if (!valid) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = createJWT({ id: user.id, email: user.email });

    // Create response with user data
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

    // Set auth cookie in response
    return setAuthCookieInResponse(response, token);
  } catch (error) {
    console.error('Signin error:', error);
    return NextResponse.json(
      { success: false, error: 'An error occurred during signin. Please try again.' },
      { status: 500 }
    );
  }
} 