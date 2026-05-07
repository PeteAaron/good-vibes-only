# CLAUDE.md

Instructions for Claude (and any other agent) working in this repo. Read this before making changes. The same content lives in `.cursorrules` and `AGENTS.md` so all agents get the same rules.

## Project shape

```
app/         Next.js App Router pages, layouts, API routes, server actions
lib/         Shared modules. env.ts, logger.ts, db.ts. Server-only by default.
tests/unit/  Vitest specs. Mirrors source layout.
tests/e2e/   Playwright specs. Boot the real dev server.
docs/        The vibe-coding guide. Update when you change conventions.
recipes/     Opt-in add-ons (auth, db, payments, components, etc).
```

## Always

- **Read first.** Before editing, read the file you're about to change *and* its closest neighbors. The pattern you need is usually right there.
- **Plan first** for anything beyond a one-line fix. State your plan in chat, get a thumbs-up, then code.
- **Validate input** at every boundary. API routes, server actions, and form data go through Zod *before* any business logic runs. Use `safeParse`, branch on `success`.
- **Read env via `lib/env.ts`**. Never `process.env.SOMETHING` in app code. Add new vars to the schema in `lib/env.ts` and to the test in `tests/unit/env.test.ts`.
- **Default to server components.** Add `"use client"` only when you need state, effects, or browser APIs.
- **Use `import type`** for types. Biome enforces this.
- **Mark server-only modules** with `import "server-only";` at the top.
- **Log with structure**: `logger.info({ userId }, "loaded user")`, never string-concatenated messages.
- **Run `pnpm check`** before claiming work is done. If it doesn't pass, you're not done.

## Never

- **No `any`.** Use `unknown` and narrow, or define a type. Biome will fail the lint.
- **No `// @ts-ignore`** without an inline reason. Prefer `// @ts-expect-error: <why>`.
- **No `process.env.X` outside `lib/env.ts`**.
- **No new dependencies** without justifying them in the PR description. Three lines of code beats a dependency.
- **No console.log** in committed code (use `logger`). Tests are exempt.
- **No premature abstractions.** Don't extract a helper for a single caller. Don't add a generic for a hypothetical future use.
- **No husky / pre-commit hooks.** This repo enforces quality in CI only.

## File-level conventions

- Every config file starts with a 2–4 line comment block explaining *why* it exists, when the format supports comments. (`biome.json` and `package.json` are strict JSON — for those, add the why to README or the relevant `docs/` page.)
- TS code is grouped: imports → types → constants → functions → exports.
- Tests live in `tests/unit/<area>.test.ts`. One concept per file.

## Setup flow

When the user says "run setup" / "set up the components" / "pick a UI library":

1. Read `recipes/components/README.md`.
2. Present the options to the user via a multiple-choice question (default Tailwind, shadcn/ui, MUI, Chakra, Mantine).
3. Once they pick, open the matching `recipes/components/<choice>.md` and execute the steps in order: install deps, write/modify the listed files, then run the smoke test described in the recipe.
4. Commit with message `chore: set up <library>`.

Don't auto-pick. Don't do it without being asked.

## Workflow expectations

For any non-trivial change:

1. State the plan: files to touch, expected behavior, test you'll add.
2. Implement in small, reviewable steps.
3. Update or add a test under `tests/unit/`.
4. Run `pnpm check` and report the result.
5. Update `docs/` if you changed a convention.

If you hit something you don't understand, **ask**. Don't guess at architecture.

## Pointers

- New feature: `docs/06-extending.md`
- Reviewing the agent's own output: `docs/04-reviewing-ai-code.md`
- Common pitfalls: `docs/05-anti-patterns.md`
- Writing the spec: `docs/03-prompting.md`
