import { NextResponse } from 'next/server';

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return NextResponse.json({ message: 'This is a delayed response.' });
} 