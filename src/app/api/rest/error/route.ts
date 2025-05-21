import { NextResponse } from 'next/server';

export async function GET() {
  throw new Error('This is a simulated error from the API.');
} 