// eslint-disable-next-line import/no-extraneous-dependencies
import cypressCoverageTask from "@cypress/code-coverage/task";
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      cypressCoverageTask(on, config);
      return config;

      // implement node event listeners here
    },
    baseUrl: "http://localhost:4000",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    setupNodeEvents(on, config) {
      cypressCoverageTask(on, config);
      return config;

      // implement node event listeners here
    },
    supportFile: "cypress/support/component.ts",
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
    indexHtmlFile: "cypress/support/component-index.html",
    video: false,
    videosFolder: "cypress/videos",
    screenshotsFolder: "cypress/screenshots",
    fixturesFolder: "cypress/fixtures",
  },
});
