// lib/apolloClient.ts
'use client'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getSession } from 'next-auth/react';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
});

const authLink = setContext(async (_, { headers }) => {
  
  const session = await getSession();
  const token = session?.user.token || '';

  //console.log('Token en apollo-client:', token);
  //console.log('este es el tipo de token que pasa por apollo-client',  typeof(token))
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: 'include', // IMPORTANTE NO QUITAR
});

export default client;
