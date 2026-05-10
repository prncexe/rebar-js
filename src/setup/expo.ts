import type { pkgmanager } from "@/types/common";
import { spawn } from "child_process";

export const buildExpoApp = (manager: pkgmanager) => {
  const child = spawn(manager === 'npm' ? 'npx' : manager, ['create', 'expo-app'],
    {
      stdio: 'inherit',
        shell: true,
        cwd:process.cwd()
    })
  child.on("close", (code) => {
    process.exit(code ?? 0)
  })  
}
