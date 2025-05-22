import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Mutation {
    createDemo(input: DemoInput!): Demo
  }

  input DemoInput {
    title: String!
    description: String
  }

  type Demo {
    id: ID!
    title: String!
    description: String
  }
`;

export const resolvers = {
  Mutation: {
    createDemo: (_: any, { input }: { input: { title: string; description?: string } }) => {
      return {
        id: '1',
        title: input.title,
        description: input.description,
      };
    },
  },
}; 