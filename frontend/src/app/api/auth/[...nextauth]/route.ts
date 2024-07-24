import NextAuth, { AuthOptions } from "next-auth";
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth"

const client = new ApolloClient({
    uri: process.env.GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
});

const secret = `${process.env.JWT_SECRET}`

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
              mutation Login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                  id
                  name
                  email
                  token
                }
              }
            `,
                        variables: {
                            email: credentials?.email,
                            password: credentials?.password,
                        },
                    });

                    const user = data.login;

                    if (user) {
                        console.log(user)
                        return {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            token: user.token,
                        };
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error("Error in authorize:", error);
                    return null;
                }
            },
        }),
    ],

});

export { handler as GET, handler as POST };
