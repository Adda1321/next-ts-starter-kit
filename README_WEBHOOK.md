# Webhook System Documentation

This document explains the webhook system implemented in the portfolio application, including how to set it up, test it, and integrate with real external services.

## 🎯 What are Webhooks?

Webhooks are HTTP callbacks that allow one system to notify another system about events in real-time. Think of them as "reverse APIs" - instead of you calling an API to get data, the API calls you when something happens.

### Why Use Webhooks?
- **Real-time notifications**: Get instant updates when events occur
- **Flexibility**: Add/remove integrations without code changes
- **Reliability**: Automatic retry logic handles service downtime
- **Monitoring**: Track delivery status and debug issues
- **Scalability**: Easy to add multiple external services

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
```sql
WebhookSubscription {
  id: "sub_123",
  name: "Slack Notifications",           -- Human-readable name
  url: "https://hooks.slack.com/...",    -- Where to send webhooks
  events: ["contact.created"],           -- What events to listen for
  secret: "abc123...",                   -- Security key
  isActive: true                         -- Turn on/off
}
```

### WebhookEvent
Tracks webhook delivery attempts:
```sql
WebhookEvent {
  id: "event_456",
  eventType: "contact.created",          -- What event was triggered
  payload: { name: "John", email: "..." }, -- Data that was sent
  status: "DELIVERED",                   -- Did it work?
  responseCode: 200,                     -- HTTP response code
  retryCount: 0,                         -- How many retries
  subscriptionId: "sub_123"              -- Which subscription
}
```

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

## 🛠️ Setup & Testing

### 1. Database Migration
First, create the webhook tables:
```bash
npx prisma migrate dev --name add-webhook-models
npx prisma generate
```

### 2. Create a Test Webhook Subscription
```bash
curl -X POST http://localhost:3000/api/v1/webhooks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Webhook",
    "url": "http://localhost:3000/api/v1/webhook-receiver",
    "events": ["contact.created"]
  }'
```

### 3. Test the Webhook System
1. **Submit a contact form** at `/contact`
2. **Check webhook dashboard** at `/webhooks` to see events
3. **Monitor server logs** for webhook delivery attempts
4. **Visit test receiver** at `/api/v1/webhook-receiver` to see received data

## 🎯 Webhook Pages

### Contact Form (`/contact`)
- Enhanced contact form with validation
- Real-time feedback
- Webhook information display
- Triggers `contact.created` events

### Webhook Dashboard (`/webhooks`)
- View webhook events and status
- Manage webhook subscriptions
- Real-time monitoring
- Educational information

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

## 🌐 Real Service Integration

### Slack Integration
```bash
# Create Slack webhook subscription
curl -X POST http://localhost:3000/api/v1/webhooks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Slack Notifications",
    "url": "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
    "events": ["contact.created"]
  }'
```

### Discord Integration
```bash
# Create Discord webhook subscription
curl -X POST http://localhost:3000/api/v1/webhooks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Discord Notifications",
    "url": "https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_TOKEN",
    "events": ["contact.created"]
  }'
```

### Email Service Integration
```bash
# Create email service webhook subscription
curl -X POST http://localhost:3000/api/v1/webhooks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Email Alerts",
    "url": "https://api.sendgrid.com/v3/webhooks/events",
    "events": ["contact.created"]
  }'
```

## 📊 Webhook Payload Example

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

## 🔍 Monitoring & Debugging

### Webhook Dashboard
Visit `/webhooks` to see:
- All webhook events and their status
- Delivery attempts and retry counts
- Response codes and error messages
- Subscription management

### Server Logs
Monitor console output for:
```
🔔 Triggering webhook for event: contact.created
📡 Found 2 active subscriptions for event: contact.created
✅ Webhook clx1234567890 delivered successfully to https://hooks.slack.com/...
❌ Webhook clx1234567891 failed: Connection timeout
🔄 Scheduling retry 1/3 for webhook clx1234567891
```

### Database Queries
```sql
-- View all webhook events
SELECT * FROM "WebhookEvent" ORDER BY "createdAt" DESC;

-- View active subscriptions
SELECT * FROM "WebhookSubscription" WHERE "isActive" = true;

-- Check delivery status
SELECT 
  "eventType",
  "status",
  COUNT(*) as count
FROM "WebhookEvent" 
GROUP BY "eventType", "status";
```

## 🚀 Production Considerations

### Environment Variables
```env
DATABASE_URL="postgresql://..."
WEBHOOK_SECRET="your-secret-key"
WEBHOOK_TIMEOUT=30000
```

### Security Best Practices
- Use HTTPS for webhook URLs
- Implement signature verification
- Rate limit webhook endpoints
- Validate webhook payloads

### Monitoring
- Log webhook delivery attempts
- Monitor failure rates
- Set up alerts for webhook failures
- Track webhook performance metrics

### Scalability
- Use message queues for high-volume webhooks
- Implement webhook batching
- Consider using a webhook service (Stripe, GitHub, etc.)

## 🧪 Testing Tools

### Webhook.site
Get a unique URL to receive webhooks:
1. Visit [webhook.site](https://webhook.site)
2. Copy your unique URL
3. Create webhook subscription with that URL
4. Submit contact form to see webhook data

### ngrok
Expose local server to internet:
```bash
# Install ngrok
npm install -g ngrok

# Expose local server
ngrok http 3000

# Use the ngrok URL for webhook testing
```

### Postman
Test webhook endpoints:
1. Create a POST request to your webhook URL
2. Set Content-Type: application/json
3. Add webhook payload in body
4. Send request to test webhook receiver

## 📚 Learning Resources

- [Webhooks.io Guide](https://webhooks.io/)
- [GitHub Webhooks](https://docs.github.com/en/developers/webhooks-and-events)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Webhook Security Best Practices](https://webhooks.io/docs/security)

## 🤝 Troubleshooting

### Common Issues

**Webhook not being sent:**
- Check if subscription is active (`isActive: true`)
- Verify event type matches subscription events
- Check server logs for errors

**Webhook delivery failing:**
- Verify webhook URL is accessible
- Check if external service is accepting webhooks
- Review response codes in webhook dashboard

**Signature verification failing:**
- Ensure secret key is correct
- Verify payload format matches signature generation
- Check for encoding issues

### Debug Commands
```bash
# Check webhook subscriptions
curl http://localhost:3000/api/v1/webhooks?type=subscriptions

# Check webhook events
curl http://localhost:3000/api/v1/webhooks?type=events

# Test webhook receiver
curl http://localhost:3000/api/v1/webhook-receiver
```

---

This webhook system provides a solid foundation for real-time integrations and can be easily extended to support additional event types and external services. 