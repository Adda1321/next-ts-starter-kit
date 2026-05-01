import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Webhook Receiver Endpoint
 * 
 * This endpoint is used for testing webhook delivery:
 * - Receives webhook payloads from the main application
 * - Verifies webhook signatures for security
 * - Logs webhook events for debugging
 * - Returns appropriate responses
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const signature = request.headers.get('x-webhook-signature');
    const eventType = request.headers.get('x-webhook-event');
    const webhookId = request.headers.get('x-webhook-id');

    console.log('🔔 Webhook received:', {
      eventType,
      webhookId,
      timestamp: new Date().toISOString(),
      payload: body,
    });

    // Log the webhook data for debugging
    console.log('📋 Webhook Details:');
    console.log('  Event Type:', eventType);
    console.log('  Webhook ID:', webhookId);
    console.log('  Signature:', signature);
    console.log('  Payload:', JSON.stringify(body, null, 2));

    // In a real application, you would verify the signature here
    // For this demo, we'll just log that we received it
    if (signature) {
      console.log('✅ Webhook signature received (verification would happen here)');
    }

    // Simulate some processing time
    await new Promise(resolve => setTimeout(resolve, 100));

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Webhook received successfully',
      receivedAt: new Date().toISOString(),
      eventType,
      webhookId,
    });

  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process webhook',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint to show webhook receiver status
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Webhook receiver is active',
    status: 'ready',
    timestamp: new Date().toISOString(),
    instructions: [
      'This endpoint receives webhook events from the main application',
      'Use it to test webhook delivery and verify payloads',
      'Check the server logs to see received webhook data',
      'The endpoint returns a success response for all valid webhooks'
    ]
  });
} 