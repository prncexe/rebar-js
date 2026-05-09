import { input, select, checkbox } from "@inquirer/prompts";

export const expressPrompts = async () => {
  return await checkbox({
    message: "select tools to add",
    choices: [
      {
        name: 'typescript?',
        value:'typescript'
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