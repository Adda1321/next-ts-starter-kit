import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import {
  DateTimeResolver,
  DateTimeTypeDefinition,
  JSONResolver,
} from 'graphql-scalars';
import { GraphQLFormattedError } from 'graphql/error';

import { resolvers, types, Context } from '../../../../graphql/v1';
import { graphqlErrorHandler } from '../../../../graphql/v1/plugins';

/** GraphQL resolvers including scalar resolvers for custom types */
const serverResolvers = {
  DateTime: DateTimeResolver,
  JSON: JSONResolver,
  ...resolvers,
};

/** GraphQL type definitions, including scalars */
const serverTypeDefs = [DateTimeTypeDefinition, types];

/**
 * Creates an ApolloServer instance configured with resolvers, typeDefs, plugins,
 * and a custom error formatter for enhanced debugging and production error handling.
 */
const apolloServer = new ApolloServer<Context>({
  typeDefs: serverTypeDefs,
  resolvers: serverResolvers,
  plugins: [graphqlErrorHandler],

  /**
   * Custom error formatter for GraphQL.
   * - Attaches detailed errors in non-production environments.
   * - Returns a generic error message for production clients.
   */
  formatError: (formattedError: GraphQLFormattedError, error: any) => {
    const { message, ...debugErrors } = formattedError;
    const baseErrorResponse = {
      message,
    };

    if (process.env.NODE_ENV === 'production') {
      return baseErrorResponse;
    } else {
      return {
        ...baseErrorResponse,
        debug: { ...debugErrors },
      };
    }
  },
});

/**
 * Handles incoming GraphQL requests and attaches additional context.
 */
const handler = startServerAndCreateNextHandler(apolloServer);

export { handler as GET, handler as POST };