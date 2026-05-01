import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromRequest, verifyJWT } from '@/lib/auth';
import prisma from '../../../../prisma/db';

export async function GET(request: NextRequest) {
  try {
    // Get token from request cookies
    const token = getTokenFromRequest(request);
    
    if (!token) {
      return NextResponse.json({ user: null, authenticated: false });
    }

    // Verify JWT token
    const payload = verifyJWT(token);
    
    if (!payload?.id) {
      return NextResponse.json({ user: null, authenticated: false });
    }

    // Find user in database
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ user: null, authenticated: false });
    }

    return NextResponse.json({ user, authenticated: true });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json({ user: null, authenticated: false });
  }
} 