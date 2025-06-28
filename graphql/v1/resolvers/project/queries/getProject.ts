import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';

const prisma = new PrismaClient();

export const getProject = async (_: any, { id }: { id: string }) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });
    if (!project) {
      throw new GraphQLError('Project not found');
    }
    return project;
  } catch (error) {
    throw new GraphQLError('Failed to fetch project');
  }
}; 