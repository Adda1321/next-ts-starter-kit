import { WebhookService } from '@/services/webhookService';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Webhook API Endpoint
 * 
 * This endpoint handles:
 * - GET: Retrieve webhook events and subscriptions
 * - POST: Create new webhook subscriptions
 * - PUT: Update webhook subscriptions
 * - DELETE: Delete webhook subscriptions
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const type = searchParams.get('type'); // 'events' or 'subscriptions'

    if (type === 'subscriptions') {
      const subscriptions = await WebhookService.getSubscriptions();
      return NextResponse.json({ success: true, data: subscriptions });
    } else {
      const events = await WebhookService.getWebhookEvents(page, limit);
      return NextResponse.json({ success: true, data: events });
    }
  } catch (error) {
    console.error('Error fetching webhook data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch webhook data' },
      { status: 500 }
    );
  }
}

/**
 * Create a new webhook subscription
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, url, events, secret } = body;

    // Validate required fields
    if (!name || !url || !events || !Array.isArray(events)) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, url, events' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    const subscription = await WebhookService.createSubscription(name, url, events, secret);
    
    return NextResponse.json(
      { 
        success: true, 
        data: subscription,
        message: 'Webhook subscription created successfully' 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating webhook subscription:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create webhook subscription' },
      { status: 500 }
    );
  }
} 