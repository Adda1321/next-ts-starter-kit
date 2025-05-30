//  import ServiceLocator from '@/lib/services';
import {PrismaClient} from '@prisma/client';
import NodeCache from 'node-cache';

export type Context = {
  prisma: PrismaClient;
  // serviceLocator: ServiceLocator;
  userId: string | null;
  origin: string | null;
  cache: NodeCache;
  req: Request;
};
