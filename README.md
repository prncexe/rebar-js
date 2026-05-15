<p align="center">
  <strong>Interactive project scaffolding for modern JavaScript & TypeScript frameworks.</strong>
</p>

<p align="center">
  <a href="#features"><img src="https://img.shields.io/badge/dynamic/jso
  <img src="https://img.shields.io/badge/license-ISC-6c5ce7?style=flat" alt="License">
  <img src="https://img.shields.io/badge/node-%3E%3D20-6c5ce7?style=flat" alt="Node">
  <img src="https://img.shields.io/badge/typescript-5.9-3178C6?style=flat" alt="TypeScript">
</p>

<br>

## Overview

Rebar-js is an interactive CLI that scaffolds full-featured projects across **Next.js**, **Vite**, **Express**, **Expo**, and **Electron**. Answer a few prompts and get a production-ready project with your choice of package manager, linter, database ORM, auth, and UI toolkit — all wired up and ready to code.

<br>

## Features

- **Framework selection** — Next.js, Vite (React), Express, Expo, or Electron
- **Package manager of choice** — npm, yarn, or bun
- **Per-framework tooling prompts** — TypeScript, Tailwind CSS, shadcn/ui, tRPC, Drizzle ORM, Better Auth, React Router, React Compiler, Husky, ESLint, Biome, path aliasing, and more
- **Interactive & headless modes** — `rebar-js init` for guided setup, `rebar-js start` for flag-driven automation
- **Colored terminal output** — step indicators, status symbols, and a welcome banner
- **Pinned dependency versions** — all packages are locked to stable releases so scaffolding doesn't break

<br>

## Quick start

```bash
npx rebar-js init
```

Follow the prompts to pick a package manager, framework, and extra tooling. That's it.

<br>

## Installation

### Via npx (no install)

```bash
npx rebar-js init
```

### Global install

```bash
npm install -g rebar-js
# or
yarn global add rebar-js
# or
bun add -g rebar-js
```

Then run:

```bash
rebar-js init
```

<br>

## Usage

### Interactive mode

```bash
rebar-js init
```

Walks you through:

1. **Package manager** — choose npm, yarn, or bun
2. **Framework** — pick Next.js, Vite, Express, Expo, or Electron
3. **Project name** — enter your project name
4. **Extra tooling** — select optional tools (varies by framework)

### Headless mode

```bash
rebar-js start -m npm -f vite
```

Flags:

| Flag | Description |
|------|-------------|
| `-m, --packageManager <name>` | Package manager: `npm`, `yarn`, `bun` |
| `-f, --framework <name>` | Framework: `nextjs`, `vite`, `express`, `expo`, `electron` |

<br>

## Supported frameworks

| Framework | Prompts |
|-----------|---------|
| **Next.js** | React Compiler, shadcn/ui, tRPC, Drizzle ORM, Better Auth, Husky, ESLint / Biome |
| **Vite (React)** | TypeScript, Tailwind CSS, shadcn/ui, React Compiler, React Router, path aliasing |
| **Express** | TypeScript, Git, ESLint, path aliasing |
| **Expo** | Interactive `create-expo-app` (passthrough) |
| **Electron** | Electron Forge / Electron Vite (passthrough) |

<br>

## Requirements

- **Node.js** >= 20
- **npm**, **yarn**, or **bun** (depending on your preference)
- **Git** (for Express `git` option)

<br>

## Development

```bash
# Clone
git clone https://github.com/anomalyco/rebar-js.git
cd rebar-js

# Install dependencies
npm install

# Type-check
npm run typecheck

# Lint
npm run lint
```

Run the CLI locally:

```bash
node bin/project.js init
```

<br>

## Why "rebar-js"?

rebar-js is the steel reinforcing bar that gives concrete its tensile strength — it's hidden inside the structure, but everything relies on it. A solid scaffolding tool works the same way.

<br>

## License

ISC
