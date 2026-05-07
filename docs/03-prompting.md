# 03 · Prompting

The quality of agent output is mostly a function of input quality. Good specs get good code on the first try.

## The shape of a good spec

```
Goal: <one sentence — what changes for the user>

Files:
- <path>: <what changes>
- <path>: <what changes>

Contract:
- Inputs: <types, validation rules>
- Outputs: <types, error shapes>

Constraints:
- Use <existing helper> from <path>
- Match the pattern in <reference file>
- Don't introduce new dependencies

Test:
- <one or two cases that prove it works>
```

Every section is short. The whole spec fits on a phone screen.

## Bad → Good

### Bad

> Add a way to get a user's profile.

This is fine for a brainstorm but bad for a code change. The agent will guess at the route, the data shape, and where to put it.

### Good

> **Goal:** Add `GET /api/users/me` that returns the current user's profile.
>
> **Files:**
> - `app/api/users/me/route.ts` (new)
> - `lib/users.ts` (add `getCurrentUser`)
> - `tests/unit/users.test.ts` (new)
>
> **Contract:**
> - Returns `{ id: string, email: string, displayName: string }` on 200
> - Returns `{ status: "error", message: string }` on 401
>
> **Constraints:**
> - Validate the auth header with the `AuthHeaderSchema` already in `lib/auth.ts`
> - Match the parse-then-branch pattern in `app/api/health/route.ts`
> - Log via `logger`, not `console`
>
> **Test:**
> - Returns 401 when header is missing
> - Returns the user's profile when header is valid

The agent now produces the same code reliably across runs.

## Common pitfalls

### Vague verbs

"Improve", "clean up", "refactor" all mean different things to different readers. Pick the concrete change: "extract the validation block into `validateUser()`".

### Leaky scope

"Also fix the unrelated bug while you're in there" → now the diff is 200 lines and you can't review it. Make a new prompt for the new task.

### Naming the wrong files

If you tell the agent to edit `app/users.ts` and the file is actually `app/(dashboard)/users.tsx`, you'll get a new file at the wrong path. Always paste the exact path.

### Silent constraints

If your team always uses `kebab-case` for routes and `camelCase` for handlers, write it down once in `CLAUDE.md`. Don't re-state it in every prompt.

## When prompting fails

If your third try produces wrong code, **stop prompting and read the file**. Either the spec is wrong, the codebase is more complex than you thought, or you've found the edge of what the model can do here. Pair down or do it yourself.
