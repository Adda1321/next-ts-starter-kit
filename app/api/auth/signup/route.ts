import { NextRequest, NextResponse } from 'next/server';
import { hashPassword, createJWT, setAuthCookieInResponse, validatePassword, validateEmail } from '@/lib/auth';
import prisma from '../../../../prisma/db';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    
    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required.' },
        { status: 400 }
      );
    }

    // Validate name
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Name must be at least 2 characters long.' },
        { status: 400 }
      );
    }

    if (trimmedName.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Name must be less than 100 characters.' },
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

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { success: false, error: passwordValidation.error },
        { status: 400 }
      );
    }

    // Normalize email (lowercase and trim)
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists.' },
        { status: 409 }
      );
    }

    // Hash password
    const hashed = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        name: trimmedName,
        email: normalizedEmail,
        password: hashed,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    // Create JWT token
    const token = createJWT({ id: user.id, email: user.email });

    // Create response with user data
    const response = NextResponse.json({
      success: true,
      user,
    });

    // Set auth cookie in response
    return setAuthCookieInResponse(response, token);
  } catch (error: any) {
    console.error('Signup error:', error);
    
    // Handle Prisma unique constraint error
    if (error.code === 'P2002') {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'An error occurred during signup. Please try again.' },
      { status: 500 }
    );
  }
} 