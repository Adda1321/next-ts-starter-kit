import queries from './queries';
import mutations from './mutations';
// import {User} from '@/src/lib/services/types';
// import {Context} from '@/graphql/v1';

const resolvers = {
  Mutation: {
    ...mutations,
  },
  Query: {
    ...queries,
  },
  // TODO: This is causing the prisma pool to be exhausted
  // User: {
  //   roles: async (user: User, args: any, context: Context) => {
  //     return context.serviceLocator.rolesService.getUserRoles(user.id!);
  //   },
  // },
};

export default resolvers;
