import "../main/css/globals.css";

import App, { Container } from "next/app";
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
    const { Component, pageProps } = this.props;

    return (
      <Provider>
        <Container>
          <Component {...pageProps} />
        </Container>
      </Provider>
    );
  }
}
