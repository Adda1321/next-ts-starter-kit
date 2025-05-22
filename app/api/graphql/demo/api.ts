import { ApolloServer } from 'apollo-server-micro';
import { typeDefs as mutationTypeDefs, resolvers as mutationResolvers } from './mutation';
import { typeDefs as queryTypeDefs, resolvers as queryResolvers } from './resolver';

const typeDefs = [mutationTypeDefs, queryTypeDefs];
const resolvers = { ...mutationResolvers, ...queryResolvers };

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql/demo' }); 