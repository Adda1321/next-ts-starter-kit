import { ApolloProvider } from '@apollo/client';
import { getClient } from '@/lib/apollo-client';
import { ReactNode } from 'react';

interface ApolloWrapperProps {
  children: ReactNode;
}

export function ApolloWrapper({ children }: ApolloWrapperProps) {
  return (
    <ApolloProvider client={getClient()}>
      {children}
    </ApolloProvider>
  );
}