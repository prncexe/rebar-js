export const tsconfig = `{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",

    "target": "ESNext",
    "module": "NodeNext",

    "strict": true,
    "moduleDetection": "force",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,

    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    "skipLibCheck": true,
    "types": []
  },
  "include": ["src"],
  "exclude": ["dist", "node_modules"]
}`

export const frameworkBoilerPlateJs = `
  import  express  from("express")
  const app = express()
  
  
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(3000, () => {
    console.log("Example app listening on port 3000")
  })
  `
export const frameworkBoilerPlateTs = `
  import express,  {type  Request,type  Response } from "express";
  
  const app = express();
  
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });
  
  app.listen(3000, () => {
    console.log("Example app listening on port 3000");
  });
  `

export const eslintTs =
`
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.ts"],

    languageOptions: {
      parser: tseslint.parser,

      parserOptions: {
        project: "./tsconfig.json",
      },

      globals: {
        ...globals.node,
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
`


export const eslintJs = 
`
import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,

  {
    files: ["**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      globals: {
        ...globals.node,
      },
    },

    rules: {
      // code quality
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "no-console": "off",
      "no-debugger": "warn",

      // async/backend safety
      "no-async-promise-executor": "error",
      "require-await": "warn",

      // style-ish
      "object-shorthand": "warn",
      "prefer-const": "warn",

      // common backend mistakes
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],

      // imports
      "no-duplicate-imports": "error",
    },
  },

  {
    ignores: [
      "node_modules",
      "dist",
      "build",
      "coverage",
      ".env",
    ],
  },
];
`

