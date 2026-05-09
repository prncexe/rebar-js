import { typeProjectName } from "@/prompts/basic";
import { expressPrompts } from "@/prompts/express";
import { initializeProject,createRepo, addPackage, addDevPackage, packageExecutor, moduleExecutor } from "@/scripts/common";
import { pkgmanager } from "@/types/common";
import { execSync } from "child_process";
import { mkdir, writeFile } from "fs/promises";
import { tsconfig as data ,frameworkBoilerPlateJs as serverJs, frameworkBoilerPlateTs as serverTs} from "@/constants/express";
import { updateScriptJS, updateScriptTS } from "@/scripts/express";
import { gitignore } from "@/constants/common";
export const buildExpressApp = async (manager: pkgmanager) => {
  const name = await typeProjectName()
  const answers = await expressPrompts()
  createRepo(name)
  initializeProject(manager)
  addPackage(manager, 'express')
  await mkdir("src",{recursive:true})
  if (answers.includes("typescript")) {

    addDevPackage(manager, "typescript ts-node nodemon @types/node @types/express")
    moduleExecutor(manager,"tsc --init")
    await writeFile("src/index.ts", serverTs)
    await writeFile("tsconfig.json", data)
     updateScriptTS(manager=='bun'?'bun':'node')
  } 
  else {
  await writeFile("src/index.js",serverJs)
     updateScriptJS(manager=='bun'?'bun':'node')

  }
  if (answers.includes("git")) {
    writeFile(".gitignore",gitignore)
    execSync("git init", {
      stdio:"inherit"
  })
  }
}