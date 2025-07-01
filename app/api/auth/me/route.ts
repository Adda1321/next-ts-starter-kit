import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getTokenFromCookie, verifyJWT } from '@/src/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromCookie();
    if (!token) return NextResponse.json({ user: null });
    const payload = verifyJWT(token) as any;
    if (!payload?.id) return NextResponse.json({ user: null });
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, name: true, email: true },
    });
    return NextResponse.json({ user });
  } catch (e) {
    return NextResponse.json({ user: null });
  }
} 