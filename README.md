<div align="center">

# rebar-js

Interactive scaffolding CLI for modern JS/TS projects.

[![npm](https://img.shields.io/npm/v/rebar-js?style=flat&color=CB3837&logo=npm)](https://www.npmjs.com/package/rebar-js)
[![license](https://img.shields.io/badge/license-ISC-gray?style=flat)](./LICENSE)
[![node](https://img.shields.io/badge/node-%3E%3D20-3c8a3c?style=flat&logo=node.js&logoColor=white)](https://nodejs.org)

</div>

---

Pick a framework, answer a few prompts, get a production-ready project — dependencies installed, tooling wired, ready to code.

```bash
npx rebar-js init
```

## Frameworks

| Framework | Tooling options |
|-----------|----------------|
| **Next.js** | shadcn/ui, tRPC, Drizzle ORM, Better Auth, React Compiler, ESLint / Biome, Husky |
| **Vite (React)** | TypeScript, Tailwind CSS, shadcn/ui, React Router, React Compiler, path aliasing |
| **Express** | TypeScript, ESLint, Git, path aliasing |
| **Expo** | passthrough via `create-expo-app` |
| **Electron** | Electron Forge or Electron Vite |

## Usage

**Interactive**
```bash
npx rebar-js init
```

**Headless**
```bash
npx rebar-js start -m npm -f nextjs
```

| Flag | Values |
|------|--------|
| `-m, --packageManager` | `npm` · `yarn` · `bun` . `pnpm`|
| `-f, --framework` | `nextjs` · `vite` · `express` · `expo` · `electron` |

## Requirements

- Node.js >= 20
- npm, yarn, bun or pnpm

## License

ISC
