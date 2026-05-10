import { typeProjectName } from "@/prompts/basic";
import { expressPrompts } from "@/prompts/express";
import { initializeProject,createRepoAndCd, addPackage,createRepo, initializeGit } from "@/scripts/common";
import { pkgmanager } from "@/types/common";
import { addEslint, expressServer } from "@/scripts/express";




export const buildExpressApp = async (manager: pkgmanager) => {
  const name = await typeProjectName()
  const answers = await expressPrompts(manager)
  const ts = answers.includes("typescript")
  const git = answers.includes("git")
  const eslint = answers.includes("eslint")
  createRepoAndCd(name)

  await expressServer({ manager, ts })
  initializeGit(git)
  addEslint({eslint,ts,manager})
}