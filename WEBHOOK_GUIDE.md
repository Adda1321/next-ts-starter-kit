# Webhook Implementation Guide

This guide explains the webhook system implemented in this Next.js portfolio project. The webhook system allows external services to receive real-time notifications when certain events occur in the application.

## 🎯 What are Webhooks?

Webhooks are HTTP callbacks that allow one system to notify another system about events in real-time. Think of them as "reverse APIs" - instead of you calling an API to get data, the API calls you when something happens.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Contact Form  │───▶│  Contact API     │───▶│  Webhook Service│
│   (Frontend)    │    │  (POST /contact) │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                         │
                                                         ▼
                                               ┌─────────────────┐
                                               │  Database       │
                                               │  (Webhook Events│
                                               │   & Subscriptions)│
                                               └─────────────────┘
                                                         │
                                                         ▼
                                               ┌─────────────────┐
                                               │  External       │
                                               │  Services       │
                                               │  (Slack, Email, │
                                               │   CRM, etc.)    │
                                               └─────────────────┘
```

## 📁 File Structure

```
app/
├── api/v1/
│   ├── contact/route.ts           # Contact form API (triggers webhooks)
│   ├── webhooks/route.ts          # Webhook management API
│   └── webhook-receiver/route.ts  # Test webhook receiver
├── contact/page.tsx               # Enhanced contact form
└── webhooks/page.tsx              # Webhook dashboard

src/
└── services/
    └── webhookService.ts          # Core webhook logic

prisma/
└── schema.prisma                  # Database schema with webhook models
```

## 🗄️ Database Models

### WebhookSubscription
Stores webhook endpoint configurations:
- `id`: Unique identifier
- `name`: Human-readable name
- `url`: Webhook endpoint URL
- `secret`: Secret key for signature verification
- `events`: Array of event types to listen for
- `isActive`: Whether the subscription is active

### WebhookEvent
Tracks webhook delivery attempts:
- `id`: Unique identifier
- `eventType`: Type of event (e.g., "contact.created")
- `payload`: JSON data sent in the webhook
- `status`: Delivery status (PENDING, DELIVERED, FAILED, RETRYING)
- `responseCode`: HTTP response code from delivery
- `responseBody`: Response body from delivery
- `retryCount`: Number of retry attempts
- `maxRetries`: Maximum retry attempts (default: 3)

## 🔄 How It Works

### 1. Event Trigger
When someone submits the contact form:
```typescript
// app/api/v1/contact/route.ts
const contact = await prisma.contact.create({
  data: { name, email, message }
});

// Trigger webhook event
await WebhookService.triggerWebhook('contact.created', {
  id: contact.id,
  name: contact.name,
  email: contact.email,
  message: contact.message,
  createdAt: contact.createdAt,
});
```

### 2. Webhook Processing
The webhook service:
1. Finds all active subscriptions for the event type
2. Creates webhook events in the database
3. Delivers webhooks asynchronously to each subscription
4. Handles retries with exponential backoff
5. Updates delivery status

### 3. Webhook Delivery
Each webhook includes:
- **Headers**: Content-Type, X-Webhook-Signature, X-Webhook-Event, X-Webhook-Id
- **Body**: Event data, timestamp, and webhook ID
- **Signature**: HMAC-SHA256 signature for security

## 🛠️ Usage Examples

### Creating a Webhook Subscription

```bash
curl -X POST http://localhost:3000/api/v1/webhooks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Slack Notifications",
    "url": "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK",
    "events": ["contact.created"]
  }'
```

### Testing Webhook Delivery

1. **Submit the contact form** at `/contact`
2. **Check the webhook dashboard** at `/webhooks`
3. **Monitor server logs** for webhook delivery attempts
4. **Use the test receiver** at `/api/v1/webhook-receiver`

### Webhook Payload Example

```json
{
  "event": "contact.created",
  "data": {
    "id": "clx1234567890",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello! I'd like to discuss a project.",
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  "timestamp": "2024-01-15T10:30:00.000Z",
  "webhook_id": "clx1234567891"
}
```

## 🔒 Security Features

### HMAC Signature Verification
Each webhook includes a signature in the `X-Webhook-Signature` header:

```typescript
// Generating signature
const signature = crypto
  .createHmac('sha256', secret)
  .update(JSON.stringify(payload))
  .digest('hex');

// Verifying signature (in webhook receiver)
const expectedSignature = crypto
  .createHmac('sha256', secret)
  .update(JSON.stringify(payload))
  .digest('hex');

if (signature !== expectedSignature) {
  throw new Error('Invalid webhook signature');
}
```

### Retry Logic
- **Exponential backoff**: 1s, 2s, 4s, 8s, 16s, 30s (max)
- **Maximum retries**: 3 attempts
- **Status tracking**: PENDING → RETRYING → DELIVERED/FAILED

## 🎨 Frontend Integration

### Contact Form (`/contact`)
- Enhanced with form validation
- Real-time feedback
- Webhook information display
- Triggers `contact.created` events

### Webhook Dashboard (`/webhooks`)
- View webhook events and status
- Manage webhook subscriptions
- Real-time monitoring
- Educational information

## 🧪 Testing

### 1. Local Testing
```bash
# Start the development server
npm run dev

# Submit a contact form
# Visit http://localhost:3000/contact

# Check webhook dashboard
# Visit http://localhost:3000/webhooks

# Monitor server logs for webhook delivery
```

### 2. Webhook Receiver Testing
```bash
# Create a test subscription
curl -X POST http://localhost:3000/api/v1/webhooks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Receiver",
    "url": "http://localhost:3000/api/v1/webhook-receiver",
    "events": ["contact.created"]
  }'

# Submit a contact form to trigger webhook
# Check server logs for webhook delivery
```

### 3. External Service Testing
Use services like:
- **Webhook.site**: Get a unique URL to receive webhooks
- **ngrok**: Expose local server to internet
- **Slack**: Create a webhook URL for notifications

## 🚀 Production Considerations

### 1. Environment Variables
```env
DATABASE_URL="postgresql://..."
WEBHOOK_SECRET="your-secret-key"
WEBHOOK_TIMEOUT=30000
```

### 2. Monitoring
- Log webhook delivery attempts
- Monitor failure rates
- Set up alerts for webhook failures
- Track webhook performance metrics

### 3. Security
- Use HTTPS for webhook URLs
- Implement signature verification
- Rate limit webhook endpoints
- Validate webhook payloads

### 4. Scalability
- Use message queues for high-volume webhooks
- Implement webhook batching
- Consider using a webhook service (Stripe, GitHub, etc.)

## 📚 Learning Resources

- [Webhooks.io Guide](https://webhooks.io/)
- [GitHub Webhooks](https://docs.github.com/en/developers/webhooks-and-events)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Webhook Security Best Practices](https://webhooks.io/docs/security)

## 🤝 Contributing

To extend the webhook system:
1. Add new event types in the webhook service
2. Create corresponding API endpoints
3. Update the webhook dashboard
4. Add tests for new functionality
5. Update this documentation

---

This webhook implementation provides a solid foundation for real-time integrations and can be easily extended to support additional event types and external services. 