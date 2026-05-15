import type { pkgmanager } from "@/types/common"
import { typeProjectName } from "@/prompts/basic"
import {  linter, nextjsChoices } from "@/prompts/nextjs"
import { authSetup, buildFlags, drizzleSetup, huskySetup, installNextApp, shadcnInstall, trpcSetup } from "@/scripts/nextjs"
export const buildNextApp = async(manager: pkgmanager) => {
  const name = await typeProjectName()
  const choices = await nextjsChoices()
  const linterChoice = await linter();
  const trpc = choices.includes("trpc")
  const shadcn = choices.includes("shadcn")
  const drizzle = choices.includes("Drizzle")
  const husky = choices.includes("husky")
  const auth = choices.includes("betterAuth")


  const flags = buildFlags(choices,linterChoice)
  installNextApp(manager, flags, name);
  shadcnInstall(manager, shadcn)
  trpcSetup(manager,trpc);
  drizzleSetup(manager,drizzle);
  huskySetup(manager,husky);
  authSetup(manager,auth);

}
