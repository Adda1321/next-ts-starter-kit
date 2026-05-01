import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';

const prisma = new PrismaClient();

export const createProject = async (_: any, { input }: { input: any }) => {
  try {
    return await prisma.project.create({
      data: {
        ...input,
        userId: 'abc123', // Hardcoded for now
      },
    });
  } catch (error) {
    throw new GraphQLError('Failed to create project');
  }
}; 