const baseRules = require("eslint-config-lydell");

module.exports = {
  rules: Object.assign({}, baseRules({ import: true, react: true }), {
    "babel/no-invalid-this": "error",
    "css-modules/no-undef-class": "error",
    "no-invalid-this": "off",
    "prettier/prettier": "error",
    "react-hooks/rules-of-hooks": "error",
    "sort-imports-es6-autofix/sort-imports-es6": "error"
  }),
  parser: "babel-eslint",
  env: { es6: true },
  plugins: [
    "babel",
    "css-modules",
    "react",
    "react-hooks",
    "import",
    "sort-imports-es6-autofix",
    "prettier",
    "jest"
  ],
  overrides: [
    {
      files: ["{components,main,pages,utils}/**/*.js"],
      globals: Object.assign({}, baseRules.browserEnv(), {
        DEBUG: false
      })
    },
    {
      files: [".*.js", "*.config.js", ".storybook/*.js"],
      env: { node: true }
    },
    {
      files: ["*.test.js"],
      env: { jest: true },
      rules: baseRules({ builtin: false, jest: true })
    },
    {
      files: ["story.js"],
      globals: {
        module: false
      },
      rules: {
        "func-style": "off"
      }
    }
  ],
  settings: {
    react: {
      version: "16"
    }
  }
  //   extends: ["plugin:css-modules/recommended"]
};
