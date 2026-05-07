// good-vibes-only :: vitest.config.ts
// Unit tests run under node. e2e runs separately via Playwright.
// `server-only` is aliased to a no-op so server modules can be tested.
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
      "server-only": resolve(__dirname, "tests/mocks/server-only.ts"),
    },
  },
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts", "tests/unit/**/*.test.tsx"],
    exclude: ["tests/e2e/**", "node_modules/**", ".next/**"],
    globals: false,
    clearMocks: true,
    restoreMocks: true,
  },
});
