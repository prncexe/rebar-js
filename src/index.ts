#!/usr/bin/env node

import { Command } from 'commander';
import { chooseFramework, choosePackageManager } from '@/prompts/basic';
import { execFunc, mapper } from './utils/frameworkMapper';
const program = new Command();

program.command("init")
  .action(async () => {
    const manager = await choosePackageManager();
    const framework = await chooseFramework(manager);
    const func:execFunc = mapper[framework]
    if(!func) process.exit(1) 
    func(manager)
  });
console.log('your nextjs app has been installed')

program.parse();
