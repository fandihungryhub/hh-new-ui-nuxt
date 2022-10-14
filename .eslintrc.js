module.exports = {
  env: {
    node: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:nuxt/recommended",
    // "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint"],
  rules: {},
};
