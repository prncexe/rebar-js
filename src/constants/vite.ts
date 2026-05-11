import type { language } from "@/types/common"

export const reactRouterEntry = (language: language) => {
  const appImport = language === "ts" ? `import App from "./App";` : `import App from "./App";`
  return `
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
${appImport}
const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
]);

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
 `
}

export const viteAppTsconfig = () => {


  return `
{
    "compilerOptions": {
      "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
      "target": "es2023",
      "lib": ["ES2023", "DOM"],
      "module": "esnext",
      "types": ["vite/client"],
      "skipLibCheck": true,
  
      "moduleResolution": "bundler",
      "allowImportingTsExtensions": true,
      "verbatimModuleSyntax": true,
      "moduleDetection": "force",
      "noEmit": true,
      "jsx": "react-jsx",
      "paths": {
        "@/*": ["./src/*"]
      },
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "erasableSyntaxOnly": true,
      "noFallthroughCasesInSwitch": true
    },
    "include": ["src"]
}

`
}
