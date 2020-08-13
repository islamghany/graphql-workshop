import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import App from "next/app";
import Head from "next/head";
import React from "react";
import theme from "../src/theme";
import Navbar from "../src/components/Navbar";
import withApollo from "../lib/withApollo";
import { ApolloProvider } from "@apollo/client";
class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, apollo } = this.props;
    return (
      <ApolloProvider client={apollo}>
        <Head>
          <title>My page</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Navbar />
          <Container maxWidth="lg">
            <Component {...pageProps} />
          </Container>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}
export default withApollo(MyApp);
