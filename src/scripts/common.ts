import type { language, pkgmanager } from "@/types/common"
import { execSync } from "child_process"
import fs,{ mkdirSync ,existsSync,unlinkSync,writeFileSync,readFileSync} from "fs"
import path from  "path"
import { gitignore } from "@/constants/common"

export const initializeProject = (manager: pkgmanager) => {
  const command = manager === 'pnpm' ? `${manager} init` : `${manager} init -y`
  execSync(command, {
    stdio:'inherit'
  })
  if (manager !== "bun") {
    execSync(`npm  pkg set type=module`, {
      stdio:'inherit'
    })
  } 
}
export const createRepo = (name: string) => {
    mkdirSync(name, { recursive: true });
  
}
export const createRepoAndCd = (name: string) => {
  createRepo(name)
  changeDir(name);
}
export const changeDir = (name:string) => {
  process.chdir(path.resolve(name))
}
export const removeFile = (name: string) => {
  if (existsSync(name)) {
  unlinkSync(name)
    
  }
}
export const writeData = (name: string, data: string) => {
  const dir = name.split('/').slice(0, -1).join('/')
  if (dir) createRepo(dir)
  writeFileSync(name, data)
}
export const addPackage = (manager: pkgmanager,packageName:string) => {
  const command = manager === 'npm' ? `npm i ${packageName}` : `${manager} add ${packageName}`
  execSync(command, {
    stdio:'inherit'
  })
}
export const addDevPackage = (manager: pkgmanager,packageName:string) => {
  const command = manager === 'npm' ? `npm i -D ${packageName}` : `${manager} add -D ${packageName}`
  execSync(command, {
    stdio:'inherit'
  })
}
export const packageExecutor = (manager: pkgmanager, pkg: string) => {
  const exeMap:Record<pkgmanager,string> = {
    npm: 'npx',
    pnpm: 'npx',
    yarn: 'npx',
    bun: 'bunx'
  }
  const executor = exeMap[manager]
  execSync(`${executor} ${pkg}`, {
    stdio:'inherit'
  })
}

export const moduleExecutor = (manager: pkgmanager, command: string) => {
  const exeMap:Record<pkgmanager,string> = {
    npm: 'npx',
    pnpm: 'npx',
    yarn: 'npx',
    bun: 'bunx'
  }
  const executor = exeMap[manager]
  execSync(`${executor} ${command}`, {
    stdio:'inherit'
  })
}

type scriptProp = Array<
  {
    key: string,
    command: string,
  }
  >

export const addScripts = (scripts:scriptProp ) => {
  const path = "./package.json"
  const pkg = JSON.parse((fs.readFileSync(path, "utf-8")))
  pkg.scripts = pkg.scripts || {};
  scripts.forEach(prop => {
    pkg.scripts[prop.key] = prop.command;
  })
  writeData(path, JSON.stringify(pkg, null, 2))
}

export const initializeGit = (git: boolean)=>{
  if (git) {
    writeData(".gitignore", gitignore)
    execSync("git init", {
      stdio:"inherit"
  })
  }
  return;
}



export const pathAliasingConfig = (filename: string,language:language) => {
  let file;
  if (language === 'ts') {
   file = JSON.parse(readFileSync(filename, "utf-8"))
  }
  else {
    file = {
      compilerOptions:{},
    }
  }
  const compiler = file.compilerOptions || {};
  compiler.paths = compiler.paths || {}
  const key = "@/*"
  compiler.paths[key] = ["./src/*"]
  file.compilerOptions = compiler;
  writeData(filename, JSON.stringify(file, null, 2))
}

