import { electronFramework } from "@/prompts/electronFramework";
import type { pkgmanager } from "@/types/common";
import { spawn } from "child_process";

export const buildElectronApp = async(manager: pkgmanager) => {
  await electronFramework();

  
  const child = spawn(manager, ['create',' @quick-start/electron'], {
    stdio: "inherit",
    cwd: process.cwd(),
    shell:true
  });

  child.on("close", (code) => process.exit(code ?? 0));
};
