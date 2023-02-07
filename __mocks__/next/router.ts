import { NextRouter } from "next/router";
import { UrlObject } from "url";

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
export const useRouter = () => {
  return {
    basePath: ".",
  };
};

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
