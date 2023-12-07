import { AppProps } from "next/app";
import Head from "next/head";
import { QueryClientProvider, QueryClient } from "react-query";
import "../styles/globals.css";
import Layout from "../components/layout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false,
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title />
      <meta></meta>
    </Head>
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  </>
);

export default App;
