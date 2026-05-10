import { pkgmanager } from "@/types/common";
import { input, select, checkbox } from "@inquirer/prompts";

export const expressPrompts = async (manager:pkgmanager) => {
  return await checkbox({
    message: "select tools to add",
    choices: [
      {
        name: 'typescript?',
        value: 'typescript',
        disabled: manager == 'bun' ? 'Always on by bun' : false,
        checked: manager == 'bun' ? true : false
      },
      {
        name: 'git?',
        value:'git'
      },
      {
        name: 'Eslint?',
        value:'eslint'
      },
      
    ]
  })
  
}