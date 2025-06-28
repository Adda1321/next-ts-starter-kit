'use client';

import { ApolloLink, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { onError } from '@apollo/client/link/error';

function makeClient() {
  const httpLink = new HttpLink({
    uri: '/api/v1/graphql',
    fetchOptions: { cache: 'no-store' },
  });

  const authLink = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
      },
    };
  });

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          console.error('GraphQL Error:', err);
        }
      }

      return forward(operation);
    },
  );

  const linkFinal = ApolloLink.from([errorLink, authLink, httpLink]);

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({ addTypename: false }),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            linkFinal,
          ])
        : linkFinal,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}