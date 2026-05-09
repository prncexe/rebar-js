import { select } from "@inquirer/prompts";
export const electronFramework = async():Promise<'electron forge' | 'electron vite'> => {
 return  await select({
    message: 'choose a build tool',
    choices: [
      {
        name:'electron forge',
        value:'electron forge'
      },
      {
        name:'electron vite',
        value:'electron vite'
      }
    ]
  })
}