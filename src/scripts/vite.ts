import type { pkgmanager } from "@/types/common"
import { execSync } from "child_process"
import { addDevPackage, addPackage, changeDir, packageExecutor, pathAliasingConfig, writeData } from "./common"
import { readFileSync } from "fs"
import { reactRouterEntry, viteAppTsconfig } from "@/constants/vite"

export const initiateVite = ({ manager, ts, name }: { manager: pkgmanager, ts: boolean, name: string }) => { 
 const template = ts ? "react-ts" : "react"
 const command = `${manager} create vite ${name} --template ${template} --no-interactive`
 execSync(command, {
  stdio:'inherit'
 })
 changeDir(name)
}


export const viteConfigCreate = ({ tailwind, rc, pathAliasing}:{tailwind: boolean, rc: boolean, pathAliasing:boolean}) => {
  const imports = [`import { defineConfig } from "vite";`]

  if (rc) {
    imports.push(`import react, { reactCompilerPreset } from "@vitejs/plugin-react";`)
    imports.push(`import rolldownBabel from "@rolldown/plugin-babel";`)
  } else {
    imports.push(`import react from "@vitejs/plugin-react";`)
  }

  const plugins = [`react()`]

  if (tailwind) {
    imports.push(`import tailwindcss from "@tailwindcss/vite";`)
    plugins.push(`tailwindcss()`)
  }

  if (pathAliasing) {
    imports.push(`import path from "path";`)
  }

  if (rc) {
    plugins.push(`rolldownBabel({
      presets: [reactCompilerPreset()],
    })`)
  }

  const fileCode = `
 ${imports.join("\n")}

export default defineConfig({
  plugins: [
    ${plugins.join(",\n    ")},
  ],
  ${pathAliasing ? `
  resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  `
  :""
  }
});
  `
  return fileCode;
}

export const rewriteViteConfig = (data: string,ts:boolean) => {
  const fileName = ts?'vite.config.ts':'vite.config.js'
   writeData(fileName, data)
}

export const patchViteEslintConfigForShadcn = (shadcn: boolean) => {
  if (!shadcn) {
    return
  }

  const fileName = "eslint.config.js"
  const file = readFileSync(fileName, "utf-8")

  if (file.includes("react-refresh/only-export-components")) {
    return
  }

  const overrideBlock = `,
  {
    files: ["src/components/ui/**/*.tsx", "src/hooks/**/*.ts"],
    rules: {
      "react-refresh/only-export-components": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  }`

  const updatedFile = file.replace(/\]\s*$/, `${overrideBlock}\n]`)
  writeData(fileName, updatedFile)
}

export const tailwindViteSetup = (manager: pkgmanager, tailwind: boolean) => {
  if (!tailwind) {
    return 
  }
  addPackage(manager, "tailwindcss @tailwindcss/vite");
  writeData("src/App.css", `@import "tailwindcss";\n`);
  
}

export const reactCompilerSetup = (manager: pkgmanager,rc:boolean) => {
  if (!rc) {
    return
  }
  addDevPackage(manager, "@rolldown/plugin-babel @babel/core babel-plugin-react-compiler @types/babel__core");
  
}

export const shadcnSetup = (shadcn: boolean,manager:pkgmanager) => {
  if (!shadcn) {
    return
  }
  const initCommand = `${manager === "bun" ? "--bun " : ""}shadcn@latest init -d`
  const addCommand = `${manager === "bun" ? "--bun " : ""}shadcn@latest add --all`
  packageExecutor(manager,initCommand)
  packageExecutor(manager,addCommand)
}

export const reactRouterSetup = ({ rr, manager, ts }:{rr: boolean, manager: pkgmanager,ts:boolean}) => {
  if (!rr) {
    return
  }
  addPackage(manager, "react-router");
  
  if (ts) {
    writeData("src/main.tsx", reactRouterEntry("ts"));
  } else {
    writeData("src/main.jsx", reactRouterEntry("js"));
    
  }
}

export const pathAliasingSetup = ({ pathAliasing, ts }: { pathAliasing: boolean, ts: boolean }) => {
  if (!pathAliasing) {
    return
  } 
  const language = ts ? 'ts' : 'js'
  if (language === 'ts') {
    pathAliasingConfig("tsconfig.json", language)
    writeData("tsconfig.app.json", viteAppTsconfig())
  }
  else {
  pathAliasingConfig("jsconfig.json",language)
  }
}

