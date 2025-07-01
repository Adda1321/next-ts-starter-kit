import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hashPassword, createJWT, setAuthCookie } from '@/src/lib/auth';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json({ success: false, error: 'All fields are required.' }, { status: 400 });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ success: false, error: 'Email already in use.' }, { status: 409 });
    }
    const hashed = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
      select: { id: true, name: true, email: true },
    });
    const token = createJWT({ id: user.id, email: user.email });
    setAuthCookie(token);
    return NextResponse.json({ success: true, user });
  } catch (e) {
    return NextResponse.json({ success: false, error: 'Signup failed.' }, { status: 500 });
  }
} 