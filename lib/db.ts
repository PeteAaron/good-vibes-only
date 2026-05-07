// good-vibes-only :: lib/db.ts
// Stub for the future database client. Don't add an ORM until you have a
// real query — premature abstractions cost more than they save.
//
// When you're ready, follow recipes/db-drizzle-postgres.md. The contract
// expected by the rest of the app is small:
//   - `db` is the lazily-initialized client
//   - it reads its connection string from lib/env.ts (NEVER process.env)
//   - it is server-only
import "server-only";

export const db = {
  // Replace with your real client. Throwing here is intentional —
  // any caller hitting this in production has skipped a step.
  query<_T>(_sql: string, _params?: unknown[]): never {
    throw new Error(
      "lib/db.ts is a stub. Pick an ORM via recipes/db-drizzle-postgres.md before calling db.",
    );
  },
};
