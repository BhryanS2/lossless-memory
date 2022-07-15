/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  clearMocks: true,
  coverageProvider: "v8",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "\\.[jt]sx?$": "babel-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!@types)"],
  rootDir: "./tests",
};

export default config;
