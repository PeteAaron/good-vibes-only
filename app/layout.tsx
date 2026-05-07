// good-vibes-only :: app/layout.tsx
// Root layout. Keep it thin: providers go here, business logic does not.
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "good-vibes-only",
  description: "An enterprise-ready Next.js starter and guide for vibe coding with AI agents.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
