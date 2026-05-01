import { PrismaClient, WebhookEventStatus, WebhookSubscription, WebhookEvent } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

/**
 * Webhook Service
 * 
 * This service handles webhook operations including:
 * - Creating webhook subscriptions
 * - Delivering webhook events to external services
 * - Managing retries for failed deliveries
 * - Generating secure signatures for webhook payloads
 */
export class WebhookService {
  
  /**
   * Create a new webhook subscription
   * @param name - Human-readable name for the webhook
   * @param url - The URL to send webhooks to
   * @param events - Array of event types this webhook listens to
   * @param secret - Secret key for webhook signature (optional, will generate if not provided)
   */
  static async createSubscription(
    name: string,
    url: string,
    events: string[],
    secret?: string
  ) {
    const generatedSecret = secret || crypto.randomBytes(32).toString('hex');
    
    return await prisma.webhookSubscription.create({
      data: {
        name,
        url,
        secret: generatedSecret,
        events,
        isActive: true,
      },
    });
  }

  /**
   * Trigger webhook events for a specific event type
   * @param eventType - The type of event (e.g., "contact.created")
   * @param payload - The data to send in the webhook
   */
  static async triggerWebhook(eventType: string, payload: any) {
    console.log(`🔔 Triggering webhook for event: ${eventType}`);
    
    // Find all active subscriptions that listen to this event type
    const subscriptions = await prisma.webhookSubscription.findMany({
      where: {
        isActive: true,
        events: {
          has: eventType,
        },
      },
    });

    console.log(`📡 Found ${subscriptions.length} active subscriptions for event: ${eventType}`);

    // Create webhook events for each subscription
    const webhookEvents = await Promise.all(
      subscriptions.map(async (subscription: WebhookSubscription) => {
        return await prisma.webhookEvent.create({
          data: {
            eventType,
            payload,
            subscriptionId: subscription.id,
            status: WebhookEventStatus.PENDING,
          },
        });
      })
    );

    // Deliver webhooks asynchronously
    webhookEvents.forEach((event: WebhookEvent) => {
      this.deliverWebhook(event.id).catch((error) => {
        console.error(`❌ Failed to deliver webhook ${event.id}:`, error);
      });
    });

    return webhookEvents;
  }

  /**
   * Deliver a webhook event to the subscription URL
   * @param eventId - The ID of the webhook event to deliver
   */
  static async deliverWebhook(eventId: string) {
    const event = await prisma.webhookEvent.findUnique({
      where: { id: eventId },
      include: { subscription: true },
    });

    if (!event) {
      throw new Error(`Webhook event ${eventId} not found`);
    }

    if (!event.subscription.isActive) {
      await this.updateEventStatus(eventId, WebhookEventStatus.FAILED, null, 'Subscription is inactive');
      return;
    }

    try {
      // Generate signature for the webhook payload
      const signature = this.generateSignature(event.payload, event.subscription.secret);
      
      // Prepare headers
      const headers = {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': signature,
        'X-Webhook-Event': event.eventType,
        'X-Webhook-Id': event.id,
        'User-Agent': 'Portfolio-Webhook/1.0',
      };

      // Send the webhook
      const response = await fetch(event.subscription.url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          event: event.eventType,
          data: event.payload,
          timestamp: new Date().toISOString(),
          webhook_id: event.id,
        }),
      });

      const responseBody = await response.text();

      if (response.ok) {
        // Webhook delivered successfully
        await this.updateEventStatus(
          eventId,
          WebhookEventStatus.DELIVERED,
          response.status,
          responseBody
        );
        console.log(`✅ Webhook ${eventId} delivered successfully to ${event.subscription.url}`);
      } else {
        // Webhook delivery failed
        await this.handleDeliveryFailure(eventId, response.status, responseBody);
      }
    } catch (error) {
      console.error(`❌ Error delivering webhook ${eventId}:`, error);
      await this.handleDeliveryFailure(eventId, null, error instanceof Error ? error.message : 'Unknown error');
    }
  }

  /**
   * Handle webhook delivery failure with retry logic
   * @param eventId - The ID of the webhook event
   * @param responseCode - HTTP response code (if any)
   * @param responseBody - Response body or error message
   */
  private static async handleDeliveryFailure(
    eventId: string,
    responseCode: number | null,
    responseBody: string
  ) {
    const event = await prisma.webhookEvent.findUnique({
      where: { id: eventId },
    });

    if (!event) return;

    const newRetryCount = event.retryCount + 1;
    const maxRetries = event.maxRetries;

    if (newRetryCount <= maxRetries) {
      // Schedule retry with exponential backoff
      const retryDelay = Math.min(1000 * Math.pow(2, newRetryCount - 1), 30000); // Max 30 seconds
      const nextRetryAt = new Date(Date.now() + retryDelay);

      await prisma.webhookEvent.update({
        where: { id: eventId },
        data: {
          status: WebhookEventStatus.RETRYING,
          responseCode,
          responseBody,
          retryCount: newRetryCount,
          nextRetryAt,
        },
      });

      console.log(`🔄 Scheduling retry ${newRetryCount}/${maxRetries} for webhook ${eventId} at ${nextRetryAt.toISOString()}`);

      // Schedule retry
      setTimeout(() => {
        this.deliverWebhook(eventId).catch((error) => {
          console.error(`❌ Retry failed for webhook ${eventId}:`, error);
        });
      }, retryDelay);
    } else {
      // Max retries exceeded
      await this.updateEventStatus(eventId, WebhookEventStatus.FAILED, responseCode, responseBody);
      console.log(`💀 Webhook ${eventId} failed after ${maxRetries} retries`);
    }
  }

  /**
   * Update webhook event status
   * @param eventId - The ID of the webhook event
   * @param status - New status
   * @param responseCode - HTTP response code
   * @param responseBody - Response body
   */
  private static async updateEventStatus(
    eventId: string,
    status: WebhookEventStatus,
    responseCode: number | null,
    responseBody: string | null
  ) {
    await prisma.webhookEvent.update({
      where: { id: eventId },
      data: {
        status,
        responseCode,
        responseBody,
        deliveredAt: status === WebhookEventStatus.DELIVERED ? new Date() : null,
      },
    });
  }

  /**
   * Generate HMAC signature for webhook payload
   * @param payload - The webhook payload
   * @param secret - The webhook secret
   * @returns HMAC signature
   */
  private static generateSignature(payload: any, secret: string): string {
    const payloadString = JSON.stringify(payload);
    return crypto
      .createHmac('sha256', secret)
      .update(payloadString)
      .digest('hex');
  }

  /**
   * Get all webhook events with pagination
   * @param page - Page number (1-based)
   * @param limit - Number of events per page
   */
  static async getWebhookEvents(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;
    
    const [events, total] = await Promise.all([
      prisma.webhookEvent.findMany({
        include: {
          subscription: {
            select: {
              name: true,
              url: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.webhookEvent.count(),
    ]);

    return {
      events,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Get webhook subscriptions
   */
  static async getSubscriptions() {
    return await prisma.webhookSubscription.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
} 