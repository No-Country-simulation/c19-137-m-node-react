import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import {getSession, useSession} from "next-auth/react";
import {setContext} from "@apollo/client/link/context";

const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
});

const authLink = setContext(async (_, {headers}) => {
    const session = await getSession();
    console.log("Session:", session);
    const token = session?.user?.token;

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        },
    };
});


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});


export default client;

