import type { nextjschoice, linter } from "@/prompts/nextjs";
import {
  addDevPackage,
  addPackage,
  addScripts,
  changeDir,
  createRepo,
  packageExecutor,
  removeFile,
  writeData,
} from "@/scripts/common";
import type { pkgmanager } from "@/types/common";
import { execSync } from "child_process";
import { appendFileSync, readFileSync } from "fs";

const scaffoldCommandMap: Record<pkgmanager, string> = {
  npm: "npx create-next-app@latest",
  pnpm: "pnpm create next-app",
  yarn: "yarn create next-app",
  bun: "bunx create-next-app",
};

// const installCommandMap: Record<pkgmanager, string> = {
//   npm: "npm install",
//   pnpm: "pnpm install",
//   yarn: "yarn install",
//   bun: "bun install",
// };

export const buildFlags = (answer: nextjschoice[], linter: linter) => {
  const flagsArray = ["--tailwind","--ts", "--src-dir", "--app", "--no-agents-md","--skip-install",`--import-alias "@/*"`];

  if (answer.includes("reactCompiler")) flagsArray.push("--react-compiler");
  else flagsArray.push("--no-react-compiler");

  switch (linter) {
    case "biome":
      flagsArray.push("--biome");
      break;
    case "eslint":
      flagsArray.push("--eslint");
      break;
    default:
      flagsArray.push("--no-eslint");
  }
  return flagsArray;
};

export const installNextApp = (
  manager: pkgmanager,
  flagsArray: string[],
  name: string,
) => {
  if (manager === 'pnpm')
  flagsArray.push("--skip-install")
  const flagString = flagsArray.join(" ");
  const scaffoldCommand = `${scaffoldCommandMap[manager]} ${name} ${flagString} `;

  execSync(scaffoldCommand, {
    stdio: "inherit",
  });
  changeDir(name);
  if (manager === 'pnpm') {
   
    execSync("pnpm install --config.ignore-scripts=false --no-frozen-lockfile", {
      stdio: "inherit",
    });
  }
};

export const shadcnInstall = (manager: pkgmanager, shadcn: boolean) => {
  if (!shadcn) return;
  packageExecutor(manager, "shadcn@latest init --preset b0 --template next");
  packageExecutor(manager, "shadcn@latest add --all");
};

export const trpcSetup = (manager: pkgmanager, trpc: boolean) => {
  if (!trpc) return;
  addPackage(
    manager,
    "@trpc/server @trpc/client @trpc/react-query @trpc/next @tanstack/react-query superjson zod",
  );

  createRepo("src/server/routers");

  writeData(
    "src/server/trpc.ts",
    `import { initTRPC } from "@trpc/server"
import superjson from "superjson"
import { ZodError } from "zod"

const t = initTRPC.create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure`,
  );

  writeData(
    "src/server/routers/_app.ts",
    `import { createTRPCRouter } from "@/server/trpc"

export const appRouter = createTRPCRouter({})

export type AppRouter = typeof appRouter`,
  );

  createRepo("src/trpc");

  writeData(
    "src/trpc/react.tsx",
    `"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client"
import { createTRPCReact } from "@trpc/react-query"
import { useState } from "react"
import type { AppRouter } from "@/server/routers/_app"
import superjson from "superjson"

export const trpc = createTRPCReact<AppRouter>()

function getBaseUrl() {
  if (typeof window !== "undefined") return ""
  if (process.env.VERCEL_URL) return "https://" + process.env.VERCEL_URL
  return "http://localhost:" + (process.env.PORT ?? 3000)
}

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        unstable_httpBatchStreamLink({
          transformer: superjson,
          url: getBaseUrl() + "/api/trpc",
        }),
      ],
    })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </trpc.Provider>
    </QueryClientProvider>
  )
}`,
  );

  writeData(
    "src/trpc/server.ts",
    `import { createTRPCClient, httpBatchLink } from "@trpc/client"
import type { AppRouter } from "@/server/routers/_app"
import superjson from "superjson"

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
    }),
  ],
})`,
  );

  createRepo("src/app/api/trpc/[trpc]");

  writeData(
    "src/app/api/trpc/[trpc]/route.ts",
    `import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { appRouter } from "@/server/routers/_app"

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
  })

export { handler as GET, handler as POST }`,
  );

  const layoutPath = "src/app/layout.tsx";
  const layout = readFileSync(layoutPath, "utf-8");
  const updated = layout
    .replace(
      'import "./globals.css"',
      'import "./globals.css"\nimport { TRPCReactProvider } from "@/trpc/react"',
    )
    .replace(
      /\{children\}(\s*)(<\/body>)/,
      "<TRPCReactProvider>{children}</TRPCReactProvider>$1$2",
    );
  writeData(layoutPath, updated);
};

export const drizzleSetup = (manager: pkgmanager, drizzle: boolean) => {
  if (!drizzle) return;
  addPackage(manager, "drizzle-orm pg");
  addDevPackage(manager, "drizzle-kit tsx @types/pg");
  appendFileSync(".env", "DATABASE_URL=\n");
  writeData(
    "drizzle.config.ts",
    `import { defineConfig } from "drizzle-kit"
export default defineConfig({
  schema: "./src/db/schema",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL | "" },
})`,
  );

  createRepo("src/db");

  writeData(
    "src/db/schema/user.ts",
    `import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
  export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    age: integer().notNull(),
    email: varchar().notNull().unique(),
  });`,
  );

  writeData(
    "src/config/db.ts",
    `import { drizzle } from "drizzle-orm/node-postgres";
  import { Pool } from "pg";
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
  });
  export const db = drizzle({ client: pool });`,
  );
  addScripts([
    {
      key: "db:generate",
      command: "drizzle-kit generate",
    },
    {
      key: "db:migrate",
      command: "drizzle-kit migrate",
    },
    {
      key: "db:push",
      command: "drizzle-kit push",
    },
  ]);
};

export const huskySetup = (manager: pkgmanager, husky: boolean) => {
  if (!husky) return;
  addDevPackage(manager, "husky");
  packageExecutor(manager, "husky init");
};

export const authSetup = (
  manager: pkgmanager,
  auth: boolean,
) => {
  if (!auth) return;

  createRepo("src/lib");

  addPackage(manager, "better-auth");
  appendFileSync(".env", "BETTER_AUTH_URL=http://localhost:3000\nBETTER_AUTH_SECRET=0zNTvTuWUIH0rBOSbVTofnA6Ojq4zcHCl+INhkkiGy8=\n")
 
    const authContent = 
      `import { betterAuth } from "better-auth";
      import { drizzleAdapter } from "better-auth/adapters/drizzle";
      import { db } from "@/config/db"; 
      export const auth = betterAuth({
          database: drizzleAdapter(db, {
              provider: "pg", 
          }),
          emailAndPassword: { 
             enabled: true, 
           },  socialProviders: { 
              github: { 
                clientId: process.env.GITHUB_CLIENT_ID as string, 
                clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
              }, 
            }, 
      });`
     

  writeData("src/lib/auth.ts", authContent);
  removeFile("src/db/schema/user.ts")
 packageExecutor(manager,`auth@latest generate --output "src/db/schema/user.ts" --yes`)
    createRepo("src/app/api/auth/[...all]");
    writeData(
      "src/app/api/auth/[...all]/route.ts",
      `import { auth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"
export const { POST, GET } = toNextJsHandler(auth)`,
    );
  writeData("src/lib/auth-client.ts", `
    import { createAuthClient } from "better-auth/react"
    export const authClient = createAuthClient({
        /** The base URL of the server (optional if you're using the same domain) */
        baseURL: "http://localhost:3000"
    })
    `)
};
