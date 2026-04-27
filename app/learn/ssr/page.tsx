export const dynamic = "force-dynamic";

export default async function SsrDemoPage() {
  const renderedAt = new Date().toISOString();

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900 sm:px-8">
      <div className="mx-auto w-full max-w-3xl rounded-lg border border-slate-300 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold">SSR (Dynamic Rendering)</h1>
        <p className="mt-3 text-slate-700">
          This route forces dynamic rendering, so it is re-rendered on each request.
        </p>
        <div className="mt-6 rounded-md bg-slate-100 p-4">
          <p className="text-sm text-slate-600">Fresh server render timestamp:</p>
          <p className="font-mono text-sm text-slate-900">{renderedAt}</p>
        </div>
      </div>
    </main>
  );
}
