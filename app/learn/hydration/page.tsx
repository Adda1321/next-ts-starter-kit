import { HydrationStatus } from "../components/hydration-status";

export default function HydrationDemoPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900 sm:px-8">
      <div className="mx-auto w-full max-w-3xl rounded-lg border border-slate-300 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold">Hydration Demo</h1>
        <p className="mt-3 text-slate-700">
          The server sends initial HTML. Then React hydrates in the browser and
          attaches event handlers. The status below switches after hydration.
        </p>
        <HydrationStatus />
      </div>
    </main>
  );
}
