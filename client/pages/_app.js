import "../main/css/globals.scss";
import "cross-fetch/polyfill";

import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import App, { Container } from "next/app";
import Head from "next/head";
import React from "react";

import { Provider } from "../components/Context";

// Only run `focus-visible` in the browser. Super ugly, but seems to work.
if (typeof window !== "undefined") {
  // eslint-disable-next-line no-undef
  require("focus-visible");
}

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, title = "codeSamples" } = this.props;

    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        credentials: "include",
        uri: "http://localhost:4000/graphql"
      })
    });

    return (
      <ApolloProvider client={client}>
        <Provider>
          <Container>
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
              <title>{title}</title>
            </Head>
            <Component {...pageProps} />
          </Container>
        </Provider>
      </ApolloProvider>
    );
  }
}
