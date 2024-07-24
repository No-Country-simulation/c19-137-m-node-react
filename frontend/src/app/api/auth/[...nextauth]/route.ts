import NextAuth, { AuthOptions } from "next-auth";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

//import { ProfileToken } from "@/types";

export type ProfileToken = {
  email: string;
  first_name: string;
  last_name: string;
  role: string | null;
  sub: string;
  iat: number;
  exp: number;
};

const client = new ApolloClient({
  uri: process.env.GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

const secret = `${process.env.JWT_SECRET}`;
//console.log("esto es el secret jwt", secret);
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data } = await client.mutate({
            mutation: gql`
              mutation SignIn($email: String!, $password: String!) {
                signIn(email: $email, password: $password) {
                  code
                  message
                  success
                  token
                  expire_at
                }
              }
            `,
            variables: {
              email: credentials?.email,
              password: credentials?.password,
            },
          });

          if (data.signIn.success) {
            console.log("Data:", {
              ...data.signIn,
            });
            return {
              ...data.signIn,
            };
          }
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }
      console.log("esto es el token", token);
      return token;
    },
    async session({ session, token }) {
      session.user = token as any;
      const tokenToString = String(token);
      console.log("esto es el token", tokenToString);
      console.log(typeof tokenToString);
      try {
        const data = jwt.verify(tokenToString, secret) as ProfileToken;
        console.log("esto son los datos del token", data);

        return {
          ...session,
          user: {
            ...session.user,
            ...data,
          },
        };
      } catch (error) {
        console.error("Error verifying JWT:", error);
        return session;
      }
    },
  },
  secret,
});

export { handler as GET, handler as POST };
