import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
 js.configs.recommended,
 ...tseslint.configs.recommended,

 {
   files: ["**/*.{js,ts}"],
   languageOptions: {
     globals: {
       ...globals.node,
     },
   },
 },

 {
   files: ["**/*.ts"],

   languageOptions: {
     parser: tseslint.parser,

     parserOptions: {
       project: "./tsconfig.json",
     },
   },

   rules: {
     "@typescript-eslint/no-unused-vars": [
       "warn",
       {
         argsIgnorePattern: "^_",
         varsIgnorePattern: "^_",
       },
     ],

     "@typescript-eslint/consistent-type-imports": "warn",

     "no-console": "off",
     "eqeqeq": ["error", "always"],
     "curly": ["error", "all"],
     "prefer-const": "warn",
   },
 },

 {
   ignores: [
     "node_modules",
     "dist",
     "build",
     "coverage",
   ],
 },
];
