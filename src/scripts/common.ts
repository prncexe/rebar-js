import { pkgmanager } from "@/types/common"
import { execSync ,spawnSync} from "child_process"
import { mkdirSync } from "fs"
import path from  "path"


export const initializeProject = (manager: pkgmanager) => {
  const command = manager == 'npm' ? `${manager} init -y` : `${manager} init`
  console.log(process.cwd())
  execSync(command, {
    stdio:'inherit'
  })
}
export const createRepo = (name: string) => {
  mkdirSync(name,{recursive:true})
  process.chdir(path.resolve(name));
}
export const addPackage = (manager: pkgmanager,packageName:string) => {
  const command = manager == 'npm' ? `npm i ${packageName}` : `${manager} add ${packageName}`
  execSync(command, {
    stdio:'inherit'
  })
}
export const addDevPackage = (manager: pkgmanager,packageName:string) => {
  const command = manager == 'npm' ? `npm i -D ${packageName}` : `${manager} add -D ${packageName}`
  execSync(command, {
    stdio:'inherit'
  })
}
export const packageExecutor = (manager: pkgmanager, pkg: string) => {
  const exeMap:Record<pkgmanager,string> = {
    npm: 'npx',
    pnpm: 'pnpm dlx',
    yarn: 'yarn dlx',
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
    pnpm: 'pnpm exec',
    yarn: 'yarn exec',
    bun: 'bunx'
  }
  const executor = exeMap[manager]
  execSync(`${executor} ${command}`, {
    stdio:'inherit'
  })
}