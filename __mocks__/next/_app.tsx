import { Authenticator } from "@aws-amplify/ui-react";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Amplify } from "aws-amplify";
import { Toaster } from "components/common/Toaster";
import { ThemeProvider } from "contexts/theme";
import "node_modules/swiper/modules/pagination/pagination.scss";
import "node_modules/swiper/swiper-bundle.min.css";
import "node_modules/swiper/swiper.min.css";
import type { FunctionComponent } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Store, store } from "store/index";
import awsConfigs from "../../src/aws-exports";

Amplify.configure(awsConfigs);
type MockAppProps = {
  children: JSX.Element;
};

declare global {
  interface Window {
    store: Store;
  }
}

const MockApp: FunctionComponent<MockAppProps> = ({ children }) => {
  window.store = store;
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });

  return (
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
  );
};

export default MockApp;
