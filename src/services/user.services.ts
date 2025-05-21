'use client';

import { gql } from '@apollo/client';

export const USER_CREATE = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
      firstName
      lastName
      telephone
      provider
    }
  }
`;

export interface CreateUserInput {
  email: string;
  firstName?: string;
  lastName?: string;
  telephone?: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  telephone?: string;
  provider?: string;
}

export interface CreateUserResult {
  createUser: User;
} 