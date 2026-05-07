// good-vibes-only :: app/page.tsx
// Landing page. Doubles as a sanity check that Tailwind, the App Router,
// and the build pipeline are all wired up.
import Link from "next/link";

const docs = [
  { href: "/", label: "README", description: "60-second skim of the project." },
  {
    href: "https://github.com",
    label: "docs/01-principles.md",
    description: "Core philosophy of vibe coding.",
  },
  {
    href: "https://github.com",
    label: "docs/02-workflow.md",
    description: "Plan → prompt → review → test → commit.",
  },
];

const examples = [
  { href: "/examples/server-action", label: "Server action with Zod validation" },
  { href: "/examples/client-component", label: "Client component with state" },
  { href: "/api/health", label: "Health API route" },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">good-vibes-only</h1>
      <p className="mt-4 text-lg text-neutral-700 dark:text-neutral-300">
        An opinionated Next.js starter and guide for working productively with AI agents.
      </p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Read this first</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {docs.map((d) => (
            <li key={d.label}>
              <span className="font-mono text-neutral-900 dark:text-neutral-100">{d.label}</span>
              <span className="ml-2 text-neutral-600 dark:text-neutral-400">— {d.description}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Try it</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {examples.map((e) => (
            <li key={e.href}>
              <Link
                href={e.href}
                className="text-blue-600 underline-offset-4 hover:underline dark:text-blue-400"
              >
                {e.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-lg border border-neutral-200 p-4 text-sm dark:border-neutral-800">
        <p className="font-semibold">Next step</p>
        <p className="mt-1 text-neutral-600 dark:text-neutral-400">
          Open this repo in Claude Code or Cursor and say <code>run setup</code> to choose a
          component library. See <code>recipes/components/README.md</code>.
        </p>
      </section>
    </main>
  );
}
