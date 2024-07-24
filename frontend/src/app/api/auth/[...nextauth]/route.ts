import NextAuth, {AuthOptions} from "next-auth";
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth"

const client = new ApolloClient({
    uri: process.env.GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
});



const secret = `${process.env.JWT_SECRET}`


// 

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { 
              "Content-Type": "application/json" 
            },
          }
        );
        const user = await res.json();


        return user;
      },
    }),
  ],

});

export { handler as GET, handler as POST };
