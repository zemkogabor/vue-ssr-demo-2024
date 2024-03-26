/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  "root": true,
  "parser": "vue-eslint-parser",
  "extends": [
    "standard",
    "eslint:recommended",
    "plugin:vue/base",
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-strongly-recommended",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-typescript",
    "plugin:@typescript-eslint/recommended"
  ],
  "plugins": [
    "@typescript-eslint"
  ],
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser"
  },
  "rules": {
    "vue/multi-word-component-names": "off",
    "vue/max-attributes-per-line": [
      "error", {
        "singleline": {
          "max": 3
        },
        "multiline": {
          "max": 1
        }
      }
    ],
    "space-before-function-paren": [
      "error",
      {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "always"
      }
    ],
    "comma-dangle": [
      "error", {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "always-multiline"
      }
    ],
    "object-shorthand": "off"
  }
}


