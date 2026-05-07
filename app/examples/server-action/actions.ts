// good-vibes-only :: app/examples/server-action/actions.ts
// Server action invoked by GreetingForm. The schema lives at the top so any
// reader sees the contract before the logic. See docs/01-principles.md (Fail fast).
"use server";

import { logger } from "@/lib/logger";
import { z } from "zod";

const GreetingSchema = z.object({
  name: z.string().trim().min(1, "name is required").max(80),
});

export type GreetingState =
  | { status: "idle" }
  | { status: "ok"; greeting: string }
  | { status: "error"; message: string };

export async function greet(_prev: GreetingState, formData: FormData): Promise<GreetingState> {
  const parsed = GreetingSchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return { status: "error", message: issue?.message ?? "invalid input" };
  }
  logger.info({ name: parsed.data.name }, "greeted user");
  return { status: "ok", greeting: `Hello, ${parsed.data.name}!` };
}
