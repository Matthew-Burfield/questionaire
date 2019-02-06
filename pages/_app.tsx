import "../src/bootstrap";
// --- Post bootstrap -----
import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import { StylesProvider, ThemeProvider } from "@material-ui/styles";
import { ApolloProvider } from "react-apollo";
import CssBaseline from "@material-ui/core/CssBaseline";
import getPageContext, { PageContext } from "../src/getPageContext";
import withData from "../lib/withData";

class MyApp extends App {
  // static async getInitialProps({ Component, ctx }) {
  //   let pageProps = {};
  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx);
  //   }
  //   // Expose the query to the user
  //   pageProps.query = ctx.query;
  //   return { pageProps };
  // }
  constructor() {
    // @ts-ignore
    super();
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, apollo, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>My page</title>
        </Head>
        {/* Wrap every page in Styles and Theme providers */}
        <StylesProvider
          generateClassName={this.pageContext.generateClassName}
          sheetsRegistry={this.pageContext.sheetsRegistry}
          sheetsManager={this.pageContext.sheetsManager}
        >
          {/* ThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          <ThemeProvider theme={this.pageContext.theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
            <ApolloProvider client={apollo}>
              <Component pageContext={this.pageContext} {...pageProps} />
            </ApolloProvider>
          </ThemeProvider>
        </StylesProvider>
      </Container>
    );
  }

  private pageContext: PageContext;
}

export default withData(MyApp);
