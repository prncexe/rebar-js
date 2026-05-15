import {type pkgmanager } from "@/types/common"
import { writeFile } from "fs/promises";
import { eslint as expressEslintConfig } from "@/constants/express";
import { addDevPackage, moduleExecutor, addScripts, removeFile, pathAliasingConfig, writeData } from "./common";
import { expressBoilerplate, tsconfig } from "@/constants/express";
import { initializeProject } from "./common";
import { addPackage } from "./common";
import { createRepo } from "./common";

export const expressServer = async ({ manager, ts }: { manager: pkgmanager, ts: boolean }) => {
  initializeProject(manager)
  removeFile("index.ts")
  addPackage(manager, 'express')
  createRepo("src")
  if (ts) {
    addDevPackage(manager, "typescript tsx nodemon @types/node @types/express")
    moduleExecutor(manager,"tsc --init")
    await writeFile("src/index.ts", expressBoilerplate("ts"))
    await writeFile("tsconfig.json", tsconfig)
    addDevScripts(ts, manager === 'bun' ? 'bun' : 'node')
  } else {
    await writeFile("src/index.js",expressBoilerplate("js"))
    addDevScripts(ts, manager === 'bun' ? 'bun' : 'node')
  }
}

export const addDevScripts = (ts:boolean,runtime:string) => {
  const scripts = [];
  if (ts === true) {
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
              command: "tsx src/index.ts",
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
  if (!eslint) {
    return 
  }

  if (ts) {
    addDevPackage(manager, "eslint @eslint/js globals typescript typescript-eslint jiti")
    writeData("eslint.config.js", expressEslintConfig('ts'))
  } else {
    addDevPackage(manager, "eslint @eslint/js globals")
    writeData("eslint.config.js", expressEslintConfig('js'))
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

export const expressPathAliasing = ({ ts, pathAliasing }:{ ts: boolean, pathAliasing: boolean }) => {
  if(!pathAliasing) {
    return 
  }
  if (ts) {
    pathAliasingConfig("tsconfig.json",'ts')
  }
  else {
    pathAliasingConfig("jsconfig.json",'js')
  }
}