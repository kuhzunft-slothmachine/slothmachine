import Head from "next/head";
import { Provider } from "react-redux";

import { AppProps } from "next/app";

import { useStore } from "../store/init";

import "../styles/globals.css";

function Slothmachine({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Head>
        <title>Slotmachine</title>
        <link rel="icon" href="../media/images/slotmachine-randomon.png" />
        <meta property="og:title" content="Slotmachine" />
        <meta property="og:url" content="http://slotmachine.kuhzunft.com" />
        <meta property="og:image" content="/media/images/slotmachine.jpg" />

        <link
          href="https://fonts.googleapis.com/css?family=Special+Elite"
          rel="stylesheet"
        />

        <link rel="icon" href="/media/images/slotmachine-randomon.png" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default Slothmachine;
