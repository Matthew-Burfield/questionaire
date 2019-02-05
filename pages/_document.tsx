import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import { extractStyles } from "evergreen-ui";

class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const page = renderPage();

    // `css` is a string with css from both glamor and ui-box.
    // No need to get the glamor css manually if you are using it elsewhere in your app.
    //
    // `hydrationScript` is a script you should render on the server.
    // It contains a stringified version of the glamor and ui-box caches.
    // Evergreen will look for that script on the client and automatically hydrate
    // both glamor and ui-box.
    const { css, hydrationScript } = extractStyles();

    return {
      ...page,
      css,
      hydrationScript
    };
  }
  render() {
    const { css, hydrationScript } = this.props;

    return (
      <html>
        <Head>
          <title>Questionaire</title>
          <style dangerouslySetInnerHTML={{ __html: css }} />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/assets/favicon.ico"
          />
        </Head>

        <body>
          <Main />
          {hydrationScript}
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
