import "@/node_modules/swiper/modules/pagination/pagination.scss";
import "@/node_modules/swiper/swiper-bundle.min.css";
import "@/node_modules/swiper/swiper.min.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Amplify } from "aws-amplify";
import { ThemeProvider } from "contexts/theme";
import { RouterContext } from "next/dist/shared/lib/router-context";
import type { NextRouter } from "next/router";
import type { FunctionComponent } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Store, store } from "store";
import awsConfigs from "../../src/aws-exports";
import { createMockRouter } from "../../__mocks__/next/router";

Amplify.configure(awsConfigs);
type AllProvidersProps = {
  children: JSX.Element;
  router: Partial<NextRouter>;
};

declare global {
  interface Window {
    store: Store;
  }
}

const AllProviders: FunctionComponent<AllProvidersProps> = ({
  children,
  router,
}) => {
  window.store = store;
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });

  return (
    <RouterContext.Provider
      value={
        createMockRouter({
          ...router,
        }) as NextRouter
      }
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {() => (
            <ThemeProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Authenticator.Provider>
                  <CssBaseline />
                  <Toaster />
                  {children}
                </Authenticator.Provider>
              </LocalizationProvider>
            </ThemeProvider>
          )}
        </PersistGate>
      </Provider>
    </RouterContext.Provider>
  );
};

export default AllProviders;
