// good-vibes-only :: lib/logger.ts
// Structured logging via pino. Pretty in dev, JSON in prod. Use logger.info
// with a *first arg as object* for structured fields:
//   logger.info({ userId }, "loaded user")  // good
//   logger.info(`loaded user ${userId}`)     // bad — no fields to query
import pino from "pino";
import { env } from "./env";

export const logger = pino({
  level: env.LOG_LEVEL,
  ...(env.NODE_ENV === "development"
    ? {
        transport: {
          target: "pino-pretty",
          options: { colorize: true, translateTime: "HH:MM:ss.l", ignore: "pid,hostname" },
        },
      }
    : {}),
});
