# Recipe: Postgres with Drizzle

Type-safe SQL with no surprise behavior. Pairs well with Neon, Supabase, or local Postgres.

## Install

```bash
pnpm add drizzle-orm postgres
pnpm add -D drizzle-kit
```

## Configure env

Add to `lib/env.ts`:

```ts
DATABASE_URL: z.string().url(),
```

Add the corresponding line to `tests/unit/env.test.ts`. Set it in `.env.local`.

## Replace the stub

Replace `lib/db.ts`:

```ts
// good-vibes-only :: lib/db.ts
import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "./env";

const client = postgres(env.DATABASE_URL, { max: 1 });
export const db = drizzle(client);
```

## Define a schema

```ts
// lib/schema.ts
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

## Configure migrations

```ts
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./lib/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL ?? "" },
});
```

(`drizzle.config.ts` is the one place we use `process.env` directly — drizzle-kit runs outside the Next.js runtime, so `lib/env.ts` isn't loaded.)

Add scripts to `package.json`:

```json
"db:generate": "drizzle-kit generate",
"db:migrate": "drizzle-kit migrate"
```

## Smoke test

1. `pnpm db:generate && pnpm db:migrate`
2. Add a route that selects from `users` and asserts it returns an array
3. Run `pnpm test:e2e`

## Don't forget

- Add `drizzle/` (migrations) to git.
- Use `db.select()...` not raw template strings unless you have a *very* good reason.
- Server-only by construction — `lib/db.ts` imports `server-only`.
