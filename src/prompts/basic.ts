import type { framework, pkgmanager } from "@/types/common";
import { select, input } from "@inquirer/prompts";
import { colors } from "@/utils/display";
export async function choosePackageManager(): Promise<pkgmanager> {
  return await select({
    message: `${colors.cyan('\u276F')} Pick a package manager`,
    choices: [
      {
        name: 'npm',
        value: 'npm',
        description: 'Node package manager',
      },
      {
        name: 'yarn',
        value: 'yarn',
        description: 'Fast, reliable, and secure dependency management',
      },
      {
        name: 'bun',
        value: 'bun',
        description: 'All-in-one JavaScript runtime & package manager',
      },
      {
        name: 'pnpm',
        value: 'pnpm',
        description: 'Fast, disk-space efficient package manager',
        // disabled: "(not supported — pnpm install --ignore-scripts breaks builds)",
      },
    ],
  });
}

export async function chooseFramework(manager: pkgmanager): Promise<framework> {
  return await select({
    message: `${colors.cyan('\u276F')} Pick a framework`,
    choices: [
      {
        name: 'Next.js',
        value: 'nextjs',
        description: 'React framework with SSR, app router, and more',
        // disabled: manager === 'pnpm' ? "(not recommended with pnpm)" : false,
      },
      {
        name: 'Vite (React)',
        value: 'vite',
        description: 'Lightning-fast React SPA with Vite',
      },
      {
        name: 'Express',
        value: 'express',
        description: 'Minimalist Node.js backend framework',
      },
      {
        name: 'Expo',
        value: 'expo',
        description: 'Universal React Native apps for iOS, Android, and web',
      },
      {
        name: 'Electron',
        value: 'electron',
        description: 'Desktop apps with web technologies',
        disabled: manager === 'bun' ? "(not supported with bun)" : false,
      },
    ],
  });
}

export async function typeProjectName(): Promise<string> {
  const str = await input({
    message: `${colors.cyan('\u276F')} Project name`,
    default: 'my-app',
  });
  return str.trim() || 'my-app';
}
