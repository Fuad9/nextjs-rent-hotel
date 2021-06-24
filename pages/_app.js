import Head from "next/head";
import { createContext, useState } from "react";
import "../styles/globals.scss";
import { Provider } from "next-auth/client";

export const RentsContext = createContext();

function MyApp({ Component, pageProps }) {
  const [rentsData, setRentsData] = useState([]);

  return (
    <>
      <Head>
        <title>Apartment Hunt</title>
        <meta name="viewport" content="width=device-width, initial-scale" />

        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
          crossOrigin="anonymous"
        />
      </Head>

      <Provider session={pageProps.session}>
        <RentsContext.Provider value={[rentsData, setRentsData]}>
          <Component {...pageProps} />
        </RentsContext.Provider>
      </Provider>
    </>
  );
}

export default MyApp;
