module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.json"
    },
    plugins: [
        "@typescript-eslint",
    ],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended",
    ],
    rules: {
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/explicit-module-boundary-types": "off"
    }
};
