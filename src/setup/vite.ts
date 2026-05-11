import type { pkgmanager } from "@/types/common"
import { viteChoices } from "@/prompts/vite"
import { typeProjectName } from "@/prompts/basic"
import { initiateVite, patchViteEslintConfigForShadcn, pathAliasingSetup, reactCompilerSetup, reactRouterSetup, rewriteViteConfig, shadcnSetup, tailwindViteSetup, viteConfigCreate } from "@/scripts/vite"
export const buildViteApp = async (manager: pkgmanager) => {
  const name  = await typeProjectName()
  const answers = await viteChoices();
  const ts = answers.includes("typescript")
  const tailwind = answers.includes("tailwind")
  const rc = answers.includes("reactCompiler")
  const rr = answers.includes("reactRouter")
  const shadcn = answers.includes("shadcn")
  const pathAliasing = answers.includes("pathAlising")
  initiateVite({ ts, manager, name })
  const viteConfig = viteConfigCreate({ tailwind, rc, pathAliasing });
  rewriteViteConfig(viteConfig, ts);
  pathAliasingSetup({pathAliasing,ts})
  patchViteEslintConfigForShadcn(shadcn)
  tailwindViteSetup(manager, tailwind);
  reactCompilerSetup(manager, rc);
  shadcnSetup(shadcn, manager);
  reactRouterSetup({rr, manager, ts});
}
