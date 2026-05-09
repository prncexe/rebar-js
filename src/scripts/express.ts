import { pkgmanager } from "@/types/common"
import { execSync } from "child_process"
import { mkdirSync } from "fs"
import path from  "path"
  import fs from "fs";

export const updateScriptJS = (runtime:string) => {
  
  const path = "./package.json";
  
  // 1. read package.json
  const pkg = JSON.parse(fs.readFileSync(path, "utf-8"));
  
  // 2. ensure scripts exists
  pkg.scripts = pkg.scripts || {};
  
  // 3. add your script
  pkg.scripts.start = `${runtime} dist/index.js`;
  
  // 4. write back
  fs.writeFileSync(path, JSON.stringify(pkg, null, 2));
}
export const updateScriptTS = (runtime:string) => {
  
  const path = "./package.json";
  
  const pkg = JSON.parse(fs.readFileSync(path, "utf-8"));
  pkg.type = "module";
  pkg.scripts = pkg.scripts || {};
  
  pkg.scripts.build = "tsc";
  pkg.scripts.start = `${runtime} dist/index.js`;
  pkg.scripts.dev =  "ts-node src/index.ts";
  
  fs.writeFileSync(path, JSON.stringify(pkg, null, 2));
}