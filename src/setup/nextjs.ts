import { spawn } from "child_process"
import { pkgmanager } from "@/types/common"
export const buildNextApp = (manager: pkgmanager) => {
  
  const child = spawn(manager, ["create", "next-app"], {
    stdio: 'inherit',
   shell: true,
   cwd:process.cwd()
  })
 
 child.on("close", (code) => {
   process.exit(code ?? 0)
 })
}