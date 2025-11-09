import { removeAuthCookieInResponse } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ success: true });
  return removeAuthCookieInResponse(response);
} 