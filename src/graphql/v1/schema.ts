import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { projectTypeDefs } from './types/project';
import { projectResolvers } from './resolvers/project';

export const typeDefs = mergeTypeDefs([projectTypeDefs]);
export const resolvers = mergeResolvers([projectResolvers]); 