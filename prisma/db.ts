/* eslint-disable no-console */
import {PrismaClient} from '@prisma/client';
import pRetry from 'p-retry';

const prismaClientSingleton = () => {
  return new PrismaClient({});
};

export async function safeDisconnectPrisma(prismaClient: PrismaClient) {
  try {
    // Check if Prisma is connected
    await prismaClient.$queryRaw`SELECT 1`;
    console.log('Prisma is connected. Proceeding to disconnect...');
    await prismaClient.$disconnect();
    console.log('Prisma disconnected successfully.');
  } catch (error: any) {
    console.error('Error during Prisma disconnection:', error.message);
  }
}

declare global {
  // noinspection ES6ConvertVarToLetConst
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Function to determine if an error is transient
const isTransientError = (error: any) => {
  // Add your logic to determine if the error is transient
  // For example, you can check for specific error codes or messages
  const transientErrorCodes = ['ECONNRESET', 'ETIMEDOUT', 'EAI_AGAIN'];
  return transientErrorCodes.includes(error.code);
};

// Wrap Prisma client methods with retry logic
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
                throw error; // Do not retry if the error is not transient
              }

              console.log(
                `Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`,
              );
            },
          },
        );
      };
    }
    return target[prop as keyof PrismaClient];
  },
});

// Disconnect the Prisma client on application exit
if (typeof process !== 'undefined') {
  process.on('exit', async () => {
    console.log(prisma, 'prisma exit');
    if (prisma) {
      console.log('Disconnecting Prisma Client on application exit...');
      await safeDisconnectPrisma(prisma);
    }
  });

  process.on('SIGINT', async () => {
    console.log(prisma, 'prisma SIGINT');
    if (prisma) {
      console.log('Disconnecting Prisma Client on SIGINT...');
      await safeDisconnectPrisma(prisma);
      process.exit(0);
    }
  });

  process.on('SIGTERM', async () => {
    console.log(prisma, 'prisma SIGTERM');
    if (prisma) {
      console.log('Disconnecting Prisma Client on SIGTERM...');
      await safeDisconnectPrisma(prisma);
      process.exit(0);
    }
  });
}

export default retryablePrisma;
