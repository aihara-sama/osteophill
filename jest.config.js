const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["node_modules"],
  moduleNameMapper: {
    "^components/(.*)$": "<rootDir>/src/components/$1",
    "^data/(.*)$": "<rootDir>/src/data/$1",
    "^types/(.*)$": "<rootDir>/src/types/$1",
    "^theme/(.*)$": "<rootDir>/src/theme/$1",
    "^slices/(.*)$": "<rootDir>/src/slices/$1",
    "^store/(.*)$": "<rootDir>/src/store/$1",
    "^utils/(.*)$": "<rootDir>/src/utils/$1",
    "^contexts/(.*)$": "<rootDir>/src/contexts/$1",
    "^theme/(.*)$": "<rootDir>/src/theme/$1",
    "^helpers/(.*)$": "<rootDir>/src/helpers/$1",
    "^pages/(.*)$": "<rootDir>/src/pages/$1",
    "^graphql/(.*)$": "<rootDir>/src/graphql/$1",
    "^uuid$": require.resolve("uuid"),
  },
  testEnvironment: "jest-environment-jsdom",
  moduleDirectories: ["node_modules", "utils"],
  transform: {
    "^.+\\.(js|ts)$": "ts-jest",
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
