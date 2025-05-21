import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  return NextResponse.json({ id, title: `Project ${id}`, description: 'This is a detailed project description.' });
} 