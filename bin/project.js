#!/usr/bin/env node

import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const tsxPackagePath = require.resolve('tsx/package.json');
const tsxCliPath = resolve(dirname(tsxPackagePath), 'dist/cli.mjs');
const currentDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(currentDir, '..');
const entryPath = resolve(currentDir, '../src/index.ts');
const tsconfigPath = resolve(projectRoot, 'tsconfig.json');

const child = spawn(process.execPath, [tsxCliPath, '--tsconfig', tsconfigPath, entryPath, ...process.argv.slice(2)], {
  stdio: 'inherit',
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});

child.on('error', (error) => {
  console.error(error);
  process.exit(1);
});
