import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs, resolvers } from '@/graphql/v1/schema';
import { createContext } from '@/graphql/v1/context';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const GET = startServerAndCreateNextHandler(server, {
  context: createContext,
});

export const POST = startServerAndCreateNextHandler(server, {
  context: createContext,
});

export const config = {
  api: {
    bodyParser: false,
  },
}; 