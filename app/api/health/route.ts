// good-vibes-only :: app/api/health/route.ts
// Example API route. Demonstrates Zod-validated input on a GET handler.
// Pattern to copy for new routes: parse first, branch on success/failure,
// then act. Never trust raw `request.url` or body shapes.

import { logger } from "@/lib/logger";
import { NextResponse } from "next/server";
import { z } from "zod";

const QuerySchema = z.object({
  verbose: z
    .union([z.literal("true"), z.literal("false")])
    .optional()
    .transform((v) => v === "true"),
});

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = QuerySchema.safeParse({
    verbose: url.searchParams.get("verbose") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ status: "error", issues: parsed.error.flatten() }, { status: 400 });
  }

  const body = {
    status: "ok" as const,
    ts: new Date().toISOString(),
    ...(parsed.data.verbose ? { runtime: process.version, pid: process.pid } : {}),
  };

  logger.info({ route: "/api/health", verbose: parsed.data.verbose }, "health check");
  return NextResponse.json(body);
}
