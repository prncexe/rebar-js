import { spawn } from "child_process"
import { pkgmanager } from "@/types/common"
export const buildViteApp = (manager: pkgmanager) => {
  
  const child = spawn(manager, ["create", "vite"], {
    stdio: 'inherit',
   shell: true,
   cwd:process.cwd()
  })
 
 child.on("close", (code) => {
   process.exit(code ?? 0)
 })
}