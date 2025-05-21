/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
import pRetry from 'p-retry';

// Create a single PrismaClient instance (avoids hot-reload issues in dev)
const prismaClientSingleton = () => new PrismaClient({});

// Safely disconnect Prisma client
export async function safeDisconnectPrisma(prismaClient: PrismaClient) {
  try {
    await prismaClient.$queryRaw`SELECT 1`;
    console.log('Prisma is connected. Proceeding to disconnect...');
    await prismaClient.$disconnect();
    console.log('Prisma disconnected successfully.');
  } catch (error: any) {
    console.error('Error during Prisma disconnection:', error.message);
  }
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Use global for dev, new instance for prod
const prisma = globalThis.prisma ?? prismaClientSingleton();
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Retry logic for transient DB errors
const isTransientError = (error: any) => {
  const transientErrorCodes = ['ECONNRESET', 'ETIMEDOUT', 'EAI_AGAIN'];
  return transientErrorCodes.includes(error.code);
};

const retryablePrisma = new Proxy(prisma, {
  get(target: PrismaClient, prop: string | symbol) {
    if (typeof target[prop as keyof PrismaClient] === 'function') {
      return async (...args: any) => {
        return pRetry(
          () => (target[prop as keyof PrismaClient] as Function)(...args),
          {
            retries: 5,
            onFailedAttempt: (error) => {
              if (!isTransientError(error)) {
                throw error;
              }
              console.log(
                `Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`
              );
            },
          }
        );
      };
    }
    return target[prop as keyof PrismaClient];
  },
});

// Graceful shutdown for Prisma on process exit/signals
if (typeof process !== 'undefined') {
  process.on('exit', async () => {
    if (prisma) {
      console.log('Disconnecting Prisma Client on application exit...');
      await safeDisconnectPrisma(prisma);
    }
  });

  process.on('SIGINT', async () => {
    if (prisma) {
      console.log('Disconnecting Prisma Client on SIGINT...');
      await safeDisconnectPrisma(prisma);
      process.exit(0);
    }
  });

  process.on('SIGTERM', async () => {
    if (prisma) {
      console.log('Disconnecting Prisma Client on SIGTERM...');
      await safeDisconnectPrisma(prisma);
      process.exit(0);
    }
  });
}

export default retryablePrisma; 