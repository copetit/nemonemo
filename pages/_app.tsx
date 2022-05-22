import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/svg+xml" href="/Nemo.svg" />
        <title>NEMONEMO</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
