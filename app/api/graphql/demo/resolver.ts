import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Query {
    getDemo(id: ID!): Demo
  }

  type Demo {
    id: ID!
    title: String!
    description: String
  }
`;

export const resolvers = {
  Query: {
    getDemo: (_: any, { id }: { id: string }) => {
      return {
        id,
        title: 'Demo Title',
        description: 'This is a demo description.',
      };
    },
  },
}; 