import { CounterClient } from "../components/counter-client";

export default function ClientComponentDemoPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900 sm:px-8">
      <div className="mx-auto w-full max-w-3xl rounded-lg border border-slate-300 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold">Client Component Demo</h1>
        <p className="mt-3 text-slate-700">
          This page is still a Server Component, but it includes a nested Client
          Component for browser interactivity.
        </p>
        <CounterClient initialCount={3} />
      </div>
    </main>
  );
}
