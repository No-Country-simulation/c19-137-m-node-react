import NextAuth, {AuthOptions} from "next-auth";
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import CredentialsProvider from "next-auth/providers/credentials";

const client = new ApolloClient({
    uri: process.env.GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
});


export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: "",
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                console.log("credentials   ", credentials)
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
