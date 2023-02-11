import { Authenticator } from "@aws-amplify/ui-react";
import type { EmotionCache } from "@emotion/react";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Meta } from "components/common/Meta";
import { Toaster } from "components/common/Toaster";
import { ThemeProvider } from "contexts/theme";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Router } from "next/router";
import nProgress from "nprogress";
import createEmotionCache from "utils/createEmotionCache";
import "/node_modules/swiper/modules/pagination/pagination.scss";
import "/node_modules/swiper/swiper-bundle.min.css";
import "/node_modules/swiper/swiper.min.css";

import { Amplify } from "aws-amplify";

import awsConfigs from "../aws-exports";

Amplify.configure(awsConfigs);

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Osteophill</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Meta />
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Authenticator.Provider>
            <CssBaseline />
            <Toaster />
            <Component {...pageProps} />
          </Authenticator.Provider>
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
