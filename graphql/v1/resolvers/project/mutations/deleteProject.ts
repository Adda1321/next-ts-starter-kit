import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';

const prisma = new PrismaClient();

export const deleteProject = async (_: any, { id }: { id: string }) => {
  try {
    return await prisma.project.delete({
      where: { id },
    });
  } catch (error) {
    throw new GraphQLError('Failed to delete project');
  }
}; 