import {type pkgmanager } from "@/types/common"
import { writeFile } from "fs/promises";
import { writeFileSync } from "fs";
import { eslintJs,eslintTs } from "@/constants/express";
import { addDevPackage, moduleExecutor, addScripts, removeFile } from "./common";
import { frameworkBoilerPlateJs as serverJs,frameworkBoilerPlateTs as serverTs,tsconfig } from "@/constants/express";
import { initializeProject } from "./common";
import { addPackage } from "./common";
import { createRepo } from "./common";

export const expressServer = async ({ manager, ts }: { manager: pkgmanager, ts: boolean }) => {
  initializeProject(manager)
  removeFile("index.ts")
  addPackage(manager, 'express')
  createRepo("src")
  if (ts) {
    addDevPackage(manager, "typescript ts-node nodemon @types/node @types/express")
    moduleExecutor(manager,"tsc --init")
    await writeFile("src/index.ts", serverTs)
    await writeFile("tsconfig.json", tsconfig)
     addDevScripts(ts,manager == 'bun' ? 'bun' : 'node')
  } 
  else {
  await writeFile("src/index.js",serverJs)
  addDevScripts(ts,manager == 'bun' ? 'bun' : 'node')

  }
}

export const addDevScripts = (ts:boolean,runtime:string) => {
  let scripts = [];
  if (ts == true) {
    scripts.push(
      {
              key: "build",
              command: "tsc",
            },
            {
              key: "start",
              command: `${runtime} dist/index.js`,
            },
            {
              key: "dev",
              command: "ts-node src/index.ts",
            }
    )
  }
  else {
    scripts.push(
      {
            key: "start",
            command: `${runtime} src/index.js`,
          }
    )
  }
  addScripts(scripts)
}


export const addEslint = ({eslint,ts,manager}:{eslint:boolean,ts:boolean,manager:pkgmanager}) => {
  if (!eslint)
    return 

  if (ts) {
    addDevPackage(manager, "eslint @eslint/js globals typescript typescript-eslint jiti")
    writeFileSync("eslint.config.js",eslintTs)
  }
  else {
    addDevPackage(manager, "eslint @eslint/js globals")
    writeFileSync("eslint.config.js",eslintJs)
  }
  const scripts = []
  scripts.push({
    key: "lint",
    command:"eslint ."
  },
    {
      key: "lint:fix",
      command: "eslint . --fix"
    }
  )
  addScripts(scripts)
}
