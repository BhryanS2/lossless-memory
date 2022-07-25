"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Sync object
const config = {
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
exports.default = config;
