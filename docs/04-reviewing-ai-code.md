# 04 · Reviewing AI code

Treat agent output the way you'd treat a fast junior's PR: assume it works, but verify. Here's a checklist.

## Quick scan (60 seconds)

- **Diff size matches the task?** A "fix typo" PR with 400 lines is a red flag.
- **Files touched match the plan?** If you didn't ask it to edit `next.config.ts`, why did it?
- **New dependencies?** If yes, was that justified?
- **`pnpm check` passes?** If not, send it back. Don't fix lint warnings yourself.

## Look closer

### 1. Validation at boundaries

Every external input — request body, query params, env, third-party response — must go through Zod *before* the business logic. Not after. Not "we'll check later".

```ts
// ❌ bad
const body = await req.json();
await createUser(body.email, body.name);

// ✅ good
const parsed = CreateUserSchema.safeParse(await req.json());
if (!parsed.success) return badRequest(parsed.error);
await createUser(parsed.data.email, parsed.data.name);
```

### 2. Hallucinated APIs

Agents will confidently use functions that don't exist. Three signals:

- Import from a path you don't recognize → check the file exists
- A method on a familiar object that "feels off" (`zod.parseStrict`?) → check the docs
- A package version that doesn't exist on npm → check `pnpm-lock.yaml`

When in doubt, run the code. TypeScript catches most hallucinations; the runtime catches the rest.

### 3. `process.env` outside `lib/env.ts`

This is banned in this codebase. Search the diff for `process.env`. If it appears anywhere except `lib/env.ts`, send it back.

### 4. Premature abstraction

A common failure mode: agents extract a `Helper` for a single caller, or add a `BaseService` class for one service. Three similar lines is fine; one abstraction with one user is not.

### 5. Dead code & commentary

- Removed code re-added as a comment block ("// previously: …") → delete it
- "// added by agent for X feature" → delete it
- Unused imports, unused vars → Biome will catch these, but send back rather than fix yourself
- Defensive try/catch around code that can't throw → delete it

### 6. Behavioral changes you didn't ask for

If you asked for a new route and the agent also "fixed" the existing pagination, *that's a separate PR*. Revert and re-prompt.

### 7. Tests that don't actually test

```ts
// ❌ bad
it("returns the user", async () => {
  const fn = vi.fn().mockReturnValue({ id: "1" });
  expect(fn()).toEqual({ id: "1" });
});
```

If the test only exercises a mock, it's not a test. The test should call the real function and assert real behavior.

## When to push back

You don't need to be polite. Concrete asks fix problems:

> "Replace the manual JSON parse in `route.ts` with `safeParse(BodySchema, ...)`. Remove the `process.env.DATABASE_URL` and read it from `env.DATABASE_URL` instead. Delete the unused `helpers.ts` file."

You'll get a clean diff in 30 seconds. Far better than accepting a 90% diff and "fixing it later".

## When to give up and write it yourself

If you've sent back the same fix three times and it keeps regressing, the model has hit a limitation in this part of the codebase. Just do it manually — that's a five-minute job, not a forty-minute argument.
