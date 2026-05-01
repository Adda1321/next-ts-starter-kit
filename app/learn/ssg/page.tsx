export const revalidate = 3600;

const generatedAt = new Date().toISOString();

export default function SsgDemoPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-8">
      <div className="mx-auto w-full max-w-3xl rounded-lg border border-slate-300 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-2xl font-bold">SSG / Static Demo</h1>
        <p className="mt-3 text-slate-700 dark:text-slate-300">
          This page is statically generated and cached. It is revalidated at most
          once every hour.
        </p>
        <div className="mt-6 rounded-md bg-slate-100 p-4 dark:bg-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-300">Static generation timestamp:</p>
          <p className="font-mono text-sm text-slate-900 dark:text-slate-100">{generatedAt}</p>
        </div>
      </div>
    </main>
  );
}
