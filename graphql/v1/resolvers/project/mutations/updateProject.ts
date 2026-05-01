import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';

const prisma = new PrismaClient();

export const updateProject = async (_: any, { id, input }: { id: string; input: any }) => {
  try {
    return await prisma.project.update({
      where: { id },
      data: input,
    });
  } catch (error) {
    throw new GraphQLError('Failed to update project');
  }
}; 