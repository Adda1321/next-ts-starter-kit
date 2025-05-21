'use client';

import { useMutation } from '@apollo/client';
import { USER_CREATE, type CreateUserResult, type CreateUserInput } from '@/services/user.services';

export function useCreateUser() {
  return useMutation<CreateUserResult, { input: CreateUserInput }>(USER_CREATE);
} 