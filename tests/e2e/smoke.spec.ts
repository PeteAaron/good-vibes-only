// good-vibes-only :: tests/e2e/smoke.spec.ts
// Boots the real dev server (see playwright.config.ts) and confirms the
// landing page and health route respond. This is the minimum we run in CI.
import { expect, test } from "@playwright/test";

test("landing page renders", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "good-vibes-only" })).toBeVisible();
});

test("health API returns ok", async ({ request }) => {
  const res = await request.get("/api/health");
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.status).toBe("ok");
  expect(typeof body.ts).toBe("string");
});

test("health API verbose query is validated", async ({ request }) => {
  const ok = await request.get("/api/health?verbose=true");
  expect(ok.status()).toBe(200);
  const okBody = await ok.json();
  expect(okBody.runtime).toMatch(/^v/);

  const bad = await request.get("/api/health?verbose=yes");
  expect(bad.status()).toBe(400);
});
