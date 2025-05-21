import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    { id: 1, title: 'Project 1' },
    { id: 2, title: 'Project 2' },
  ]);
} 