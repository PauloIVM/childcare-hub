module.exports = {
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json",
        },
    },
    clearMocks: true,
    coverageDirectory: "coverage",
    coverageReporters: ["text", "clover"],
    moduleFileExtensions: ["ts", "js", "json"],
    notify: true,
    notifyMode: "always",
    roots: ["<rootDir>build"],
    testMatch: ["**/*.test.js"],
    testEnvironment: "node",
    transform: {
        "^.+\\.(ts)$": "ts-jest",
    },
};
