import { checkbox, select } from "@inquirer/prompts";

type optionalChoice = "None";
export type nextjschoice =   "reactCompiler" | "shadcn" | "betterAuth" |  "Drizzle" | "trpc" | "husky" 

export type linter = "eslint" | "biome" | optionalChoice

export type Auth = "authJs" | "betterAuth" | optionalChoice;



const linterChoices: Record<linter, string> = {
  eslint: "eslint",
  biome: "biome",
  None: "none"
}
const nextChoices: Record<nextjschoice, string> = {
  husky : "husky",
  shadcn: "shadcn",
  trpc: "trpc",
  Drizzle: "drizzle ORM",
  reactCompiler: "react Compiler",
  betterAuth : "Better Auth"
}


export const nextjsChoices = async (): Promise<nextjschoice[]> => {
  const answers: readonly nextjschoice[] = await checkbox<nextjschoice>({
    message: "Choose tools to include",
    choices: Object.entries(nextChoices).map(
      ([value, name]) => ({
         name,
         value: value as nextjschoice
        })
    )
  });

  const selected = new Set(answers);

  if (selected.has("betterAuth")) {
    selected.add("Drizzle")
}
  return Array.from(selected);
};

export const linter = async ():Promise<linter> => {
 return  await select<linter>({
    message: 'select a linter',
   choices: Object.entries(linterChoices).map(
     ([value, name]) => ({
       name,
       value: value as linter
      })
    )
 })
}


