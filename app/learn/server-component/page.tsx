export default async function ServerComponentDemoPage() {
  const serverTime = new Date().toISOString();

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900 sm:px-8">
      <div className="mx-auto w-full max-w-3xl rounded-lg border border-slate-300 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold">Server Component (Default)</h1>
        <p className="mt-3 text-slate-700">
          In App Router, pages are Server Components by default. They render on the
          server and can read secure data directly.
        </p>
        <div className="mt-6 rounded-md bg-slate-100 p-4">
          <p className="text-sm text-slate-600">Server render timestamp:</p>
          <p className="font-mono text-sm text-slate-900">{serverTime}</p>
        </div>
      </div>
    </main>
  );
}
