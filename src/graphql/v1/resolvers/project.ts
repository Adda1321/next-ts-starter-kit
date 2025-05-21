import { Context } from '../context';
import { CreateProjectInput, UpdateProjectInput } from '@prisma/client';

export const projectResolvers = {
  Query: {
    projects: async (_: any, __: any, { prisma }: Context) => {
      return prisma.project.findMany();
    },
    project: async (_: any, { id }: { id: string }, { prisma }: Context) => {
      return prisma.project.findUnique({
        where: { id },
      });
    },
  },
  Mutation: {
    createProject: async (
      _: any,
      { input }: { input: CreateProjectInput },
      { prisma }: Context
    ) => {
      return prisma.project.create({
        data: input,
      });
    },
    updateProject: async (
      _: any,
      { id, input }: { id: string; input: UpdateProjectInput },
      { prisma }: Context
    ) => {
      return prisma.project.update({
        where: { id },
        data: input,
      });
    },
    deleteProject: async (
      _: any,
      { id }: { id: string },
      { prisma }: Context
    ) => {
      await prisma.project.delete({
        where: { id },
      });
      return true;
    },
  },
}; 