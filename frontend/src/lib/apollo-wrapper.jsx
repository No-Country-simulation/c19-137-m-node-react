"use client";

import {ApolloLink, HttpLink,} from "@apollo/client";
import {
    ApolloNextAppProvider, ApolloClient, InMemoryCache, SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";

function makeClient() {
    const httpLink = new HttpLink({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    });

    return new ApolloClient({
        cache: new InMemoryCache(), link: typeof window === "undefined" ? ApolloLink.from([new SSRMultipartLink({
            stripDefer: true,
        }), httpLink,]) : httpLink,
    });
}

export function ApolloWrapper({children}) {
    return (<ApolloNextAppProvider makeClient={makeClient}>
        {children}
    < /ApolloNextAppProvider>);
}