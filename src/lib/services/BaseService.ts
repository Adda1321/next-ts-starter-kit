import {PrismaClient} from '@prisma/client';

export default abstract class BaseService {
  protected client: PrismaClient;
  protected constructor(client: PrismaClient) {
    this.client = client;
  }
}
