/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
  ],
  overrides: [
    {
      files: ["**/*.spec.{j,t}s?(x)"],
      extends: ["plugin:vitest-globals/recommended"],
      env: {
        "vitest-globals/env": true,
      },
      plugins: ["vitest"],
    },
    {
      files: ["cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}"],
      extends: ["plugin:cypress/recommended"],
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "vue/require-explicit-emits": "off",
    "vue/require-default-prop": "off",
  },
};
