# My Portfolio

This is a [Next.js](https://nextjs.org) project with Webhooks, WebSockets, and Database features.

## 📋 Quick Start

### Option 1: Run Database in Docker, App Locally (Recommended)

**1. Start Database:**
```bash
docker compose up
```

**2. Setup Database:**
```bash
# Apply migrations
DATABASE_URL=postgresql://postgres:techclan@localhost:5433/mydb npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

**3. Start App:**
```bash
npm install
npm run dev
```

**4. Open Browser:**
- App: http://localhost:3000
- Prisma Studio: `npx prisma studio` (then open http://localhost:5555)

### Option 2: Run Everything in Docker

**1. First Time Setup:**
```bash
# Copy environment file
cp .env.example .env.development

# Build and start
docker compose up --build
```

**2. Regular Development:**
```bash
docker compose up
```

**3. Stop:**
```bash
docker compose down
```

## 🌿 Git Branches

This project has multiple feature branches:

- **`main`** - Main production branch
- **`webhook`** - Webhook system implementation
- **`web-socket`** - WebSocket real-time notifications
- **`login-system`** - Authentication and login features
- **`basic-graphql-prisma-folder-structure-next`** - Basic setup with GraphQL

**Switch branches:**
```bash
git checkout webhook
git checkout web-socket
git checkout login-system
```

## 🗄️ Database Setup

### Database Connection

**From your host machine (when app runs locally):**
```
Host: localhost
Port: 5433
User: postgres
Password: techclan
Database: mydb
```

**Connection String:**
```env
DATABASE_URL=postgresql://postgres:techclan@localhost:5433/mydb
```

### Common Database Commands

```bash
# Open Prisma Studio (web UI)
DATABASE_URL=postgresql://postgres:techclan@localhost:5433/mydb npx prisma studio

# Generate Prisma client
npx prisma generate

# Run migrations
DATABASE_URL=postgresql://postgres:techclan@localhost:5433/mydb npx prisma migrate deploy

# Seed database (optional)
DATABASE_URL=postgresql://postgres:techclan@localhost:5433/mydb npx prisma db seed
```

## 📁 Project Structure

```
my-portfolio/
├── app/                    # Next.js pages and API routes
│   ├── api/v1/            # API endpoints
│   │   ├── contact/       # Contact form API
│   │   ├── webhooks/      # Webhook management
│   │   └── webhook-receiver/ # Test webhook receiver
│   ├── admin/             # Admin dashboard (WebSocket)
│   ├── contact/           # Contact form page
│   └── webhooks/          # Webhook dashboard
├── src/
│   ├── hooks/             # React hooks (useSocket)
│   └── services/          # Business logic (webhookService)
├── prisma/                # Database schema and migrations
├── lib/                   # Socket server setup
└── server.js              # Custom Next.js server (for WebSocket)
```

## 🚀 Features

- ✅ **Contact Form** - Submit contact messages
- ✅ **Webhooks** - Send notifications to external services (Slack, Discord, etc.)
- ✅ **WebSocket** - Real-time notifications on admin dashboard
- ✅ **Database** - PostgreSQL with Prisma ORM

## 📚 Documentation

- [Webhook Guide](README_WEBHOOK.md) - How to use webhooks
- [WebSocket Guide](README_WEBSOCKET.md) - How to use WebSocket

## 🔧 Environment Variables

Create `.env` or `.env.development`:

```env
DATABASE_URL=postgresql://postgres:techclan@localhost:5433/mydb
```

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Socket.io Documentation](https://socket.io/docs)
