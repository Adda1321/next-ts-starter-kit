import { NextRequest, NextResponse } from 'next/server';
import { removeAuthCookie } from '@/src/lib/auth';

export async function POST(request: NextRequest) {
  removeAuthCookie();
  return NextResponse.json({ success: true });
} 