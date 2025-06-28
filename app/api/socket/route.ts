import { NextRequest, NextResponse } from 'next/server';

/**
 * WebSocket API Route
 * 
 * This route provides WebSocket server information and status.
 * The actual WebSocket server is initialized in the main application.
 */
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      message: 'WebSocket API is active',
      endpoints: {
        socket: '/api/socket',
        status: '/api/socket/status'
      },
      instructions: [
        'WebSocket server is initialized with the main application',
        'Connect to WebSocket at: ws://localhost:3000',
        'Use socket.io-client to connect from the frontend'
      ]
    });
  } catch (error) {
    console.error('Error in WebSocket API:', error);
    return NextResponse.json(
      { success: false, error: 'WebSocket API error' },
      { status: 500 }
    );
  }
} 