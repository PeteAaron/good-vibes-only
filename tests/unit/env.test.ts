// good-vibes-only :: tests/unit/env.test.ts
// Smoke test for the env Zod schema. Add new env vars here whenever you
// add them to lib/env.ts so misconfigurations get caught at PR time.

import { parseEnv } from "@/lib/env";
import { describe, expect, it } from "vitest";

describe("parseEnv", () => {
  it("accepts a minimal valid environment", () => {
    const env = parseEnv({ NODE_ENV: "test" } as NodeJS.ProcessEnv);
    expect(env.NODE_ENV).toBe("test");
    expect(env.LOG_LEVEL).toBe("info");
  });

  it("rejects an unknown LOG_LEVEL", () => {
    expect(() =>
      parseEnv({ NODE_ENV: "test", LOG_LEVEL: "verbose" } as unknown as NodeJS.ProcessEnv),
    ).toThrow(/Invalid environment variables/);
  });

  it("defaults NODE_ENV to development when missing", () => {
    const env = parseEnv({} as NodeJS.ProcessEnv);
    expect(env.NODE_ENV).toBe("development");
  });
});
