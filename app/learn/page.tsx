import Link from "next/link";

const demos = [
  {
    href: "/learn/server-component",
    title: "Server Component (Default)",
    description: "See server-rendered data without client-side JS state hooks.",
  },
  {
    href: "/learn/ssr",
    title: "SSR (Dynamic Rendering)",
    description: "Forces fresh render on every request.",
  },
  {
    href: "/learn/client-component",
    title: "Client Component",
    description: "Interactive component hydrated on the browser.",
  },
  {
    href: "/learn/csr",
    title: "CSR-only Component",
    description: "A component loaded only in browser with ssr: false.",
  },
  {
    href: "/learn/ssg",
    title: "SSG / Static Page",
    description: "Pre-rendered static output with optional revalidation.",
  },
  {
    href: "/learn/hydration",
    title: "Hydration Demo",
    description: "Visualize when React hydrates in the browser.",
  },
];

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="mb-3 text-3xl font-bold">Next.js Rendering Playground</h1>
        <p className="mb-8 text-slate-700 dark:text-slate-300">
          Use these pages to understand Server Components, SSR, Client Components,
          CSR-only rendering, SSG, and hydration behavior in App Router.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {demos.map((demo) => (
            <Link
              key={demo.href}
              href={demo.href}
              className="rounded-lg border border-slate-300 bg-white p-5 shadow-sm transition hover:border-blue-400 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-500"
            >
              <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-300">{demo.title}</h2>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{demo.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
