# 05 · Anti-patterns

Specific failure modes we see often, with fixes.

## 1. The "while you're in there" PR

**Symptom:** You asked for a one-line change. The diff has 80 lines: "I noticed some other things…"

**Fix:** Revert. Re-prompt with: "Do *only* the change in the spec. If you see other issues, list them at the end as a follow-up plan — don't implement them."

## 2. The defensive try/catch

```ts
// ❌
try {
  return user.email.toLowerCase();
} catch (e) {
  console.error(e);
  return "";
}
```

`user.email.toLowerCase()` either works or it doesn't. If `email` might be missing, fix the type. The catch hides bugs.

**Fix:** Delete the try/catch. Use `noUncheckedIndexedAccess` and types to make the missing case explicit.

## 3. The fallback that hides config errors

```ts
// ❌
const apiKey = process.env.API_KEY ?? "dev-key";
```

Now production will run with `dev-key` if you forgot to set the var. This is exactly the bug `lib/env.ts` exists to prevent.

**Fix:** Add `API_KEY: z.string().min(1)` to the schema in `lib/env.ts`. Read it as `env.API_KEY`. Production crashes immediately if it's missing — which is what you want.

## 4. The "added by agent" comment

```ts
// ❌ added for the user feature flow
// returns the current user
function getCurrentUser() { ... }
```

Comments rot. The function name already says what it does. The provenance belongs in the PR description.

**Fix:** Delete the comments. Trust the names. If the *why* is non-obvious, write that — but only the why.

## 5. The mock-only test

```ts
// ❌
it("creates a user", () => {
  const create = vi.fn().mockResolvedValue({ id: "1" });
  expect(create()).resolves.toEqual({ id: "1" });
});
```

This tests `vi.fn()`, not your code.

**Fix:** Call the real function. Mock only the *boundary* (db, network), and assert on real return values and side effects.

## 6. The premature service class

```ts
// ❌
class UserService {
  constructor(private db: Database) {}
  async getUser(id: string) { return this.db.query("..."); }
}
```

…with one caller. You don't need a class. You don't need DI. You need a function.

**Fix:** `export async function getUser(id: string)`. When you have three callers and a real reason to swap implementations, *then* abstract.

## 7. The any-shaped escape hatch

```ts
// ❌
const data = await fetch(url).then((r) => r.json()) as any;
data.userId; // good luck
```

You've thrown away type safety at the most important boundary.

**Fix:**

```ts
const Response = z.object({ userId: z.string() });
const raw = await fetch(url).then((r) => r.json());
const data = Response.parse(raw);
data.userId; // typed and validated
```

## 8. The silent server-only leak

```ts
// ❌ in app/components/Header.tsx (client component)
import { db } from "@/lib/db";
```

Server modules in client bundles either crash at runtime or leak secrets. The `server-only` import on `lib/db.ts` will catch this — but only if you don't suppress the error.

**Fix:** Move the data fetching to a server component or a server action. The client receives the data, not the client.

## 9. The big-bang refactor

"Refactor the auth flow" → 1,200-line diff → unmergeable.

**Fix:** Make the refactor in steps. Each step should compile and pass tests on its own. Each step is a separate commit. Rule of thumb: if you can't review the diff in five minutes, it's too big.

## 10. The "trust me" change

Agent says "this should work" but didn't run anything.

**Fix:** Always run `pnpm check` before accepting. If the agent has shell access, ask it to run the check itself and paste the output. If it didn't, that's not done — that's a draft.
