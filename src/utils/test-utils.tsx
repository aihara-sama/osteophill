import { Authenticator } from "@aws-amplify/ui-react";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { render, RenderOptions } from "@testing-library/react";
import { Amplify } from "aws-amplify";
import { Toaster } from "components/common/Toaster";
import { ThemeProvider } from "contexts/theme";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { NextRouter } from "next/router";
import "node_modules/swiper/modules/pagination/pagination.scss";
import "node_modules/swiper/swiper-bundle.min.css";
import "node_modules/swiper/swiper.min.css";
import type { FunctionComponent, ReactElement } from "react";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Store, store } from "store/index";
import { UrlObject } from "url";
import awsConfigs from "../aws-exports";

export const createMockRouter = (
  router: Partial<NextRouter>
): Partial<NextRouter> => {
  return {
    query: {},
    isFallback: false,
    back: () => {},
    beforePopState: () => {},
    basePath: "",
    pathname: "/",
    asPath: "/",
    route: "/",
    prefetch: () => Promise.resolve(),
    push: (url: string | UrlObject) =>
      new Promise(() => {
        if (typeof url === "string") {
          window.history.pushState({}, "", url);
        } else {
          window.history.pushState({}, "", url.pathname);
        }
      }),
    reload: () => {},
    replace: (url: string | UrlObject) =>
      new Promise(() => {
        if (typeof url === "string") {
          window.history.replaceState({}, "", url);
        } else {
          window.history.replaceState({}, "", url.pathname);
        }
      }),
    events: {
      on: () => {},
      off: () => {},
      emit: () => {},
    },
    isLocaleDomain: false,
    isReady: true,
    defaultLocale: "en",
    domainLocales: [],
    isPreview: false,

    ...router,
  };
};

Amplify.configure(awsConfigs);
type MockAppProps = {
  children: JSX.Element;
  router?: Partial<NextRouter>;
};

declare global {
  interface Window {
    store: Store;
  }
}

const AllTheProviders: FunctionComponent<MockAppProps> = ({ children }) => {
  window.store = store;
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });

  return (
    <RouterContext.Provider value={createMockRouter({}) as NextRouter}>
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

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & { router: Partial<NextRouter> }
) => {
  const { router, ...renderOptions } = options || {};
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders router={router}>{children}</AllTheProviders>
    ),
    ...renderOptions,
  });
};

export * from "@testing-library/react";
export { customRender as render };
