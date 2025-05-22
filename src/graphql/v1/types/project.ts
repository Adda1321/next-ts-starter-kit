// import { gql } from 'graphql-tag';

// export const projectTypeDefs = gql`
//   type Project {
//     id: ID!
//     title: String!
//     description: String!
//     imageUrl: String
//     technologies: [String!]!
//     githubUrl: String
//     liveUrl: String
//     createdAt: DateTime!
//     updatedAt: DateTime!
//   }

//   input CreateProjectInput {
//     title: String!
//     description: String!
//     imageUrl: String
//     technologies: [String!]!
//     githubUrl: String
//     liveUrl: String
//   }

//   input UpdateProjectInput {
//     title: String
//     description: String
//     imageUrl: String
//     technologies: [String!]
//     githubUrl: String
//     liveUrl: String
//   }

//   type Query {
//     projects: [Project!]!
//     project(id: ID!): Project
//   }

//   type Mutation {
//     createProject(input: CreateProjectInput!): Project!
//     updateProject(id: ID!, input: UpdateProjectInput!): Project!
//     deleteProject(id: ID!): Boolean!
//   }
// `; 