import { PrismaClient } from '@prisma/client';
import { Request } from 'express';

export interface Context {
  prisma: PrismaClient;
  req: Request;
}

export async function createContext({ req }: { req: Request }): Promise<Context> {
  const prisma = new PrismaClient();
  return {
    prisma,
    req,
  };
} 