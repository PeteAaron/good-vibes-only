# 01 · Principles

Five rules. Everything else in this guide is a corollary.

## 1. Read first, write second

Before you ask an agent to change a file, **read it yourself** — and read its closest neighbor. The pattern you need is almost always already in the codebase. Reusing an existing helper is faster, safer, and produces a smaller diff than inventing a new one.

> **Before:** "Add a function to validate the email."
> **After:** "Use the existing `EmailSchema` in `lib/validators.ts` to validate the email in this new route. Keep the parse-then-branch pattern from `app/api/health/route.ts`."

The second prompt produces consistent code on the first try. The first one produces a slightly different validator every time.

## 2. Plan before you prompt

The cheapest bug to fix is the one that never gets written. State the plan in plain English first: which files, what behavior, what test. If the plan is wrong, you've spent 30 seconds. If the implementation is wrong, you've spent 20 minutes — most of it on a code review you didn't need.

```
Plan:
- add app/api/users/route.ts with GET and POST
- POST validates body against UserSchema in lib/users.ts
- add tests/unit/users-route.test.ts: rejects missing email, accepts valid
- update docs/06-extending.md to mention the route
```

That's two minutes to write and saves an hour of back-and-forth.

## 3. Validate at every boundary

Anything entering your system from outside — query params, request bodies, form data, env vars, third-party API responses — passes through Zod *before* you touch it. The body of a function should never be where you discover a field is missing.

This codebase enforces it: `lib/env.ts` parses `process.env` once at startup. `app/api/health/route.ts` parses the query. `app/examples/server-action/actions.ts` parses the form. Copy those patterns.

## 4. Fail fast and loudly

Bugs that crash on startup are cheap. Bugs that silently corrupt data three weeks later are expensive. When in doubt:

- `throw` rather than return a default
- `safeParse` and bail on `success: false`
- `noUncheckedIndexedAccess` is on, so `array[0]` is `T | undefined` — handle it

If your code "probably won't" hit a case, it will. Type the case explicitly and handle it.

## 5. Prove it works

Code that hasn't been run is a guess. Before you say "done":

```bash
pnpm check    # lint + typecheck + unit tests
pnpm build    # production build
```

For UI changes, also boot `pnpm dev` and click the thing. Type checking and tests verify code; only a human or a Playwright spec verifies the *feature*.

---

These five aren't aspirational — they're the bare minimum that makes vibe coding sustainable. Skip them and you'll spend more time fixing AI output than writing it yourself would have taken.
