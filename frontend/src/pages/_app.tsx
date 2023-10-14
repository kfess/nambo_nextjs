import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import Layout from "../components/layout";

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title />
      <meta></meta>
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
);

export default App;
