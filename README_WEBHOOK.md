# Webhook System - Simple Guide

## 🎯 What is a Webhook?

**Simple explanation:**
- Normal API: You ask server → Server answers → Done
- Webhook: Server automatically sends you data when something happens

**Example:** When someone submits your contact form, your app automatically sends that data to Slack/Email/CRM.

## 🚀 Quick Start

### Step 1: Make sure app is running
```bash
npm run dev
```

### Step 2: Create a webhook subscription
```bash
curl -X POST http://localhost:3000/api/v1/webhooks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Webhook",
    "url": "http://localhost:3000/api/v1/webhook-receiver",
    "events": ["contact.created"]
  }'
```

### Step 3: Test it
1. Go to: http://localhost:3000/contact
2. Fill and submit the form
3. Check: http://localhost:3000/webhooks
4. You'll see the webhook event was sent!

## 📋 How It Works

```
1. Someone submits contact form
   ↓
2. Server saves to database
   ↓
3. Server sends webhook to subscribed URLs
   ↓
4. External service receives the data
```

## 🧪 Testing Steps

### Test 1: Using Built-in Receiver
```bash
# 1. Create subscription
curl -X POST http://localhost:3000/api/v1/webhooks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "url": "http://localhost:3000/api/v1/webhook-receiver",
    "events": ["contact.created"]
  }'

# 2. Submit contact form at /contact
# 3. Check dashboard at /webhooks
```

### Test 2: Using Webhook.site (External)
1. Visit: https://webhook.site
2. Copy your unique URL
3. Create subscription with that URL:
```bash
curl -X POST http://localhost:3000/api/v1/webhooks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Webhook.site Test",
    "url": "YOUR_WEBHOOK_SITE_URL_HERE",
    "events": ["contact.created"]
  }'
```
4. Submit contact form
5. See data appear on webhook.site!

## 🌐 Real-World Examples

### Slack Integration
```bash
curl -X POST http://localhost:3000/api/v1/webhooks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Slack Notifications",
    "url": "https://hooks.slack.com/services/YOUR_SLACK_WEBHOOK_URL",
    "events": ["contact.created"]
  }'
```

### Discord Integration
```bash
curl -X POST http://localhost:3000/api/v1/webhooks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Discord Alerts",
    "url": "https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_TOKEN",
    "events": ["contact.created"]
  }'
```

## 📊 Webhook Dashboard

Visit: http://localhost:3000/webhooks

**What you'll see:**
- All webhook events
- Delivery status (DELIVERED, PENDING, FAILED)
- Retry attempts
- Subscription list

## 🔍 Key Points

- **Subscription needed?** YES - You must create subscription first
- **Where to subscribe?** Use curl command or add UI later
- **What gets sent?** Contact form data (name, email, message)
- **When does it send?** Automatically when contact form is submitted

## 🛠️ Common Commands

```bash
# View all subscriptions
curl http://localhost:3000/api/v1/webhooks?type=subscriptions

# View all events
curl http://localhost:3000/api/v1/webhooks?type=events

# Test receiver
curl http://localhost:3000/api/v1/webhook-receiver
```

## ❓ FAQ

**Q: Do I need to subscribe every time?**
A: No, subscription is saved in database. It works until you delete it.

**Q: Can I have multiple webhooks?**
A: Yes! Create multiple subscriptions for different services.

**Q: What if webhook fails?**
A: System automatically retries 3 times with delays.

**Q: Is webhook-receiver needed?**
A: No, it's just for testing. In production, use real services (Slack, email, etc.)

## 📚 More Info

- Webhook = Server sends HTTP POST to external URL
- Used for: Slack notifications, email alerts, CRM updates
- No subscription needed for WebSocket (different system)
