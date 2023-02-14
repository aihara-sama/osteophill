const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
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
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async

module.exports = async () => ({
  /**
   * Using ...(await createJestConfig(customJestConfig)()) to override transformIgnorePatterns
   * provided byt next/jest.
   *
   * @link https://github.com/vercel/next.js/issues/36077#issuecomment-1096635363
   */
  ...(await createJestConfig(customJestConfig)()),
  /**
   * Swiper use ECMAScript Modules (ESM) and Jest provides some experimental support for it
   * but "node_modules" are not transpiled by next/jest yet.
   *
   * The "transformIgnorePatterns" on "jest.config.js" prevents the Swiper files from being
   * transformed by Jest but it affects the CSS files that are provided by this package.
   * Mocking these CSS files is the solution that demands the smallest configuration.
   *
   * @link https://github.com/vercel/next.js/issues/36077#issuecomment-1096698456
   * @link https://jestjs.io/docs/ecmascript-modules
   */
  transformIgnorePatterns: ["node_modules/(?!(swiper|ssr-window|dom7)/)"],
});
