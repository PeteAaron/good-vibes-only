# 06 · Extending

How to add a feature without breaking the contract this repo enforces.

## Add a new env var

1. Open `lib/env.ts`. Add the field to `EnvSchema`.
2. Decide: required (no `.default()`), or optional (`.default(...)` or `.optional()`).
3. Open `tests/unit/env.test.ts`. Add a case that exercises the new var.
4. Document it in `SETUP.md` under troubleshooting if it's commonly forgotten.

```ts
// lib/env.ts
const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  LOG_LEVEL: z.enum([...]).default("info"),
  DATABASE_URL: z.string().url(),  // new — required
});
```

Read it as `env.DATABASE_URL`. Never `process.env.DATABASE_URL`.

## Add an API route

1. Create `app/api/<name>/route.ts`.
2. Define the input schema at the top of the file.
3. Use `safeParse`; on failure return `400` with `parsed.error.flatten()`.
4. Add a unit test under `tests/unit/<name>-route.test.ts` (test the handler directly) and/or an e2e test under `tests/e2e/`.

Pattern to copy: `app/api/health/route.ts`.

## Add a server action

1. Put the action in `actions.ts` next to its page.
2. First line of the action: `"use server"`. (Or `"use server"` at the top of the module.)
3. Define a Zod schema. Parse before any side effect.
4. Return a typed result, not `void` — your form will want it for `useActionState`.

Pattern to copy: `app/examples/server-action/actions.ts`.

## Add a client component

1. Default to **server components**. Only add `"use client"` when you need state, effects, or browser-only APIs.
2. Keep client components small. Push data fetching up into a server component and pass the data down as props.

Pattern to copy: `app/examples/client-component/page.tsx`.

## Add a database

Don't roll your own. Use the recipe:

- [recipes/db-drizzle-postgres.md](../recipes/db-drizzle-postgres.md)

The expected contract: `lib/db.ts` exports a lazily-initialized client; it reads its connection string from `lib/env.ts`; it imports `server-only`.

## Add auth, payments, observability

- [recipes/auth-clerk.md](../recipes/auth-clerk.md)
- [recipes/payments-stripe.md](../recipes/payments-stripe.md)
- [recipes/observability-sentry.md](../recipes/observability-sentry.md)

Each recipe is self-contained: deps to install, files to add, smoke test.

## Add a component library

Don't pick one until you need one. When you do:

- [recipes/components/README.md](../recipes/components/README.md) — index of options

In Claude Code or Cursor, just say "run setup" and the agent will walk you through it.

## Update the docs

If you change a convention — add a rule to `CLAUDE.md`, change the validation pattern, swap test runners — update the relevant `docs/*.md` file. The guide should always reflect the codebase. A divergence here is a future bug.
