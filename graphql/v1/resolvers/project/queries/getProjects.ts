import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';

const prisma = new PrismaClient();

export const getProjects = async () => {
  try {
    return await prisma.project.findMany({
      where: {
        userId: 'abc123', // Hardcoded for now
      },
    });
  } catch (error) {
    throw new GraphQLError('Failed to fetch projects');
  }
}; 