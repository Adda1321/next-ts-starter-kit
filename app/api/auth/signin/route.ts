import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyPassword, createJWT, setAuthCookie } from '@/src/lib/auth';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'All fields are required.' }, { status: 400 });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid credentials.' }, { status: 401 });
    }
    const valid = await verifyPassword(password, user.password);
    if (!valid) {
      return NextResponse.json({ success: false, error: 'Invalid credentials.' }, { status: 401 });
    }
    const token = createJWT({ id: user.id, email: user.email });
    setAuthCookie(token);
    return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Signin failed.' }, { status: 500 });
  }
} 