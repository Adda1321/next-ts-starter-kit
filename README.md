# My Portfolio
## for ReadMe.md preview use ctrl+shift+V


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started with Docker

1. **First Time Setup:**
   ```bash
   # Copy environment file
   cp .env.example .env.development

   # Build and start the app
   docker-compose up --build
   ```

2. **Regular Development:**
   ```bash
   # Start the app
   docker-compose up
   ```

3. **Stop the App:**
   ```bash
   docker-compose down
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Setup

The project uses two environments:

1. **Development** (default)
   - For local development
   - Shows detailed error messages
   - Hot reloading enabled
   - Run with: `docker-compose up`

2. **Production**
   - For live deployment
   - Optimized performance
   - Minimal error messages
   - Run with: `NODE_ENV=production docker-compose up`

## Project Structure

```
my-portfolio/
├── src/                # Source code
├── public/            # Static files
├── .env.development   # Development settings
├── .env.production    # Production settings
├── Dockerfile         # Docker configuration
└── docker-compose.yml # Docker setup
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Prisma & Database Setup

This project uses [Prisma ORM](https://www.prisma.io/) with PostgreSQL. The database runs in Docker Compose.

### Environment Variable for Database
- **Inside Docker Compose:**
  - `DATABASE_URL=postgresql://postgres:postgres@db:5432/mydb`
- **From Host Machine:**
  - `DATABASE_URL=postgresql://postgres:postgres@localhost:5433/mydb`

### Database Port Note
- The PostgreSQL database is exposed on port **5433** (not 5432) to avoid conflicts with local installations.
- When connecting from your host (e.g., DBeaver, TablePlus), use:
  - **Host:** localhost
  - **Port:** 5433
  - **User:** postgres
  - **Password:** postgres
  - **Database:** mydb
- For Prisma CLI from host, use:
  - `DATABASE_URL=postgresql://postgres:postgres@localhost:5433/mydb`
- For Docker Compose and app code, use:
  - `DATABASE_URL=postgresql://postgres:postgres@db:5432/mydb`

> Use `db` as the host when running inside Docker containers. Use `localhost` when running Prisma CLI from your host.

### Common Prisma CLI Commands
```bash
# Open Prisma Studio (web UI for DB)
npx prisma studio

# Generate Prisma client
yarn prisma generate # or npx prisma generate

# Run migrations (dev)
npx prisma migrate dev --name init

# Format Prisma schema
npx prisma format

# Seed the database (if seed.ts is set up)
npx prisma db seed
```

### Seeding the Database
- The seed script does **not** run automatically.
- New developers (or CI) should run it **manually** after running migrations:

```bash
npx prisma db seed
```

- This will populate the database with initial test data (users, projects, contacts).
- You can customize the seed data in `prisma/seed.ts`.

> **Note:** The seed script is typically run after `npx prisma migrate dev` or when you want to reset/test your database with sample data.

### Advanced Patterns
- For advanced connection management, see `src/db.ts` and `prisma/seed.ts` for patterns like:
  - Prisma client singleton
  - Safe disconnect on exit
  - Retry logic for transient errors
