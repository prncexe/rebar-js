#!/usr/bin/env node

import { Command } from 'commander';
import { chooseFramework, choosePackageManager } from '@/prompts/basic';
import type { execFunc } from './utils/frameworkMapper';
import { mapper } from './utils/frameworkMapper';
import type { framework, pkgmanager } from '@/types/common';
import { banner, info, error, colors } from '@/utils/display';

const program = new Command();

program
  .name('Rebar')
  .description('Interactive CLI for scaffolding JavaScript and TypeScript projects across multiple frameworks.')
  .version('1.0.1');

program.command("init")
  .description("choose a template to start")
  .action(async () => {
    banner();
    info(`Let's scaffold your project! Answer a few questions to get started.\n`);
    const manager = await choosePackageManager();
    const fw = await chooseFramework(manager);
    const func: execFunc = mapper[fw];
    if (!func) {
      process.exit(1);
    }
    func(manager);
  });

export type options = {
  packageManager: pkgmanager,
  framework: framework
}
program.command("start")
  .description("Enter template parameters")
  .option("-m ,--packageManager <manager>", "package Manager: npm, bun, yarn")
  .option("-f ,--framework <framework>", "framework: nextjs,vite,express,expo,electron")
  .action((options: options) => {
    banner();
    const { packageManager, framework } = options;
    if (!packageManager || !framework) {
      error(`Missing required options. Use --packageManager and --framework.`);
      console.log(colors.gray(`  Example: rebar start -m npm -f vite`));
      process.exit(1);
    }
    if (packageManager === 'pnpm') {
      error(`pnpm is not supported (pnpm install --ignore-scripts breaks builds).`);
      console.log(colors.gray(`  Use npm, yarn, or bun instead.`));
      process.exit(1);
    }
    info(`Scaffolding a ${colors.bold(framework)} project with ${colors.bold(packageManager)}...\n`);
    const func: execFunc = mapper[framework];
    if (!func) {
      error(`Invalid framework "${framework}". Run ${colors.bold('rebar --help')} for options.`);
      process.exit(1);
    }
    func(packageManager);
  });
program.parse();
