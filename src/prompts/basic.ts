import type { framework,pkgmanager } from "@/types/common";
import { select,input } from "@inquirer/prompts";
export async function choosePackageManager():Promise<pkgmanager>{
 return await select({
    message: 'Select a package manager',
    choices: [
      {
        name: 'npm',
        value: 'npm',
      },
      {
        name: 'yarn',
        value: 'yarn',
      },
      {
        name: 'bun',
        value: 'bun',
      },
      {
        name: 'pnpm',
        value: 'pnpm',
      },
    ],
  });
}

export async function chooseFramework(manager:pkgmanager):Promise<framework> {
  return await select({
    message: 'Select a framework',
    choices: [
      {
        name: 'nextjs',
        value: 'nextjs',
      },
      {
        name: 'vite(React)',
        value:'vite',
      },
      {
        name: 'express',
        value:'express',
      },
      {
        name:'expo',
        value:'expo',
      },
      {
        name:'electron',
        value: 'electron',
        disabled: manager === 'bun'? "(Not supported with bun)" : false,
      }
    ]
  })
  
}

export async function typeProjectName(): Promise<string>{
 const str =  await input({ message: 'Enter your Project name' });
  return str.trim();
}
