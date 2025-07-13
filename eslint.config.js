import { fixupPluginRules } from "@eslint/compat";
import eslintJS from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import typescriptEslint from "typescript-eslint";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import eslintPluginImport from "eslint-plugin-import";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

const patchedReactHooksPlugin = fixupPluginRules(eslintPluginReactHooks);
const patchedImportPlugin = fixupPluginRules(eslintPluginImport);

const baseConfig = {
  name: "base",
  extends: [eslintJS.configs.recommended],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: "latest",
      sourceType: "module",
      project: "./tsconfig.json",
    },
    globals: {
      ...globals.browser,
      ...globals.es2024,
    },
  },
  rules: {
    "no-unused-vars": "off",
    "no-console": "warn",
    "no-debugger": "warn",
  },
};

const tsConfig = {
  name: "typescript",
  ...typescriptEslint.configs.recommendedTypeChecked,
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-floating-promises": "warn",
    "@typescript-eslint/consistent-type-imports": "warn",
  },
};

const reactConfig = {
  name: "react",
  extends: [eslintPluginReact.configs.flat["jsx-runtime"]],
  plugins: {
    "react-hooks": patchedReactHooksPlugin,
  },
  rules: {
    "react/jsx-boolean-value": "warn",
    "react/jsx-no-target-blank": "warn",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};

const importConfig = {
  name: "import",
  plugins: {
    import: patchedImportPlugin,
  },
  rules: {
    "import/order": ["warn", {
      "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
      "newlines-between": "always",
    }],
    "import/no-unresolved": "error",
  },
};

const jsxA11yConfig = {
  name: "a11y",
  ...jsxA11yPlugin.flatConfigs.recommended,
  plugins: {
    "jsx-a11y": jsxA11yPlugin,
  },
};

const prettierConfig = {
  name: "prettier",
  extends: [eslintConfigPrettier],
};

const eslintConfig = typescriptEslint.config(
  baseConfig,
  tsConfig,
  reactConfig,
  importConfig,
  jsxA11yConfig,
  prettierConfig
);

// Apply to all TypeScript files
eslintConfig.map(config => {
  config.files = ["src/**/*.{ts,tsx}"];
});

export default eslintConfig;
