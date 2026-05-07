// good-vibes-only :: next.config.ts
// Typed Next.js config. Keep this file boring — feature flags belong in
// lib/env.ts, not here. See docs/06-extending.md.
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typedRoutes: true,
};

export default nextConfig;
