import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export const createAppolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://nurturly-tots.hasura.app/v1/graphql',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'bMaf3BXIirXzW4MmaM5wiLiadMPBLxB5AGXBfogu04B68ubnjmGgeJvhpQPwtDsV',
      },
    }),
    cache: new InMemoryCache(),
  });
};
