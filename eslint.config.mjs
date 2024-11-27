import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals["react-native"], // Use react-native globals instead of browser globals
    },
    rules: {
      "no-unused-vars": ["warn", { vars: "all", args: "none", ignoreRestSiblings: true }],
      "unused-imports/no-unused-imports": "error", // Automatically remove unused imports (optional)
      "unused-imports/no-unused-vars": "warn", // Warn about unused variables in imports
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];