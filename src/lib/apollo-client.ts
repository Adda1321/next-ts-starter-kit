import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
import { NextSSRInMemoryCache, NextSSRApolloClient } from '@apollo/experimental-nextjs-app-support/ssr';

const httpLink = new HttpLink({
  uri: '/api/v1/graphql',
});

export const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: httpLink,
  });
});