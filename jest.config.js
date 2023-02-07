const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const customJestConfig = {
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "^@/(.*)$": "<rootDir>/src/$1",

    "^@/public/(.*)$": "<rootDir>/public/$1",
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "!./src/**/_*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 30,
      lines: 30,
      statements: 30,
    },
  },
  testEnvironment: "jest-environment-jsdom",
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "mjs",
    "cjs",
    "jsx",
    "json",
    "node",
  ],
  testMatch: [
    "**/cypress/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test|cy).[jt]s?(x)",
    "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
  ],
};

module.exports = createJestConfig(customJestConfig);
