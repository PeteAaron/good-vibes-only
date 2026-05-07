// good-vibes-only :: tests/mocks/server-only.ts
// Vitest aliases the `server-only` package to this empty module so we can
// import server modules in unit tests. Next.js handles the real boundary at
// build time; tests don't need that enforcement.
export {};
