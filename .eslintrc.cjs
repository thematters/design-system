/** Root ESLint config — flat-config can wait until Phase 5 (CI tooling). */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  settings: {
    react: { version: "detect" },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports" }],
  },
  ignorePatterns: [
    "node_modules",
    "dist",
    "build",
    "storybook-static",
    "tokens/dist/**",
    "packages/tokens/dist/**",
    "components/**/impl.html",
    "**/*.css",
    // Astro auto-generates these in apps/page-templates/*/src/env.d.ts
    "apps/page-templates/**/src/env.d.ts",
    "apps/page-templates/**/.astro/**",
  ],
};
