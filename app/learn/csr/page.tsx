import { CsrOnlyWidgetLoader } from "../components/csr-only-widget-loader";

export default function CsrDemoPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-slate-100 sm:px-8">
      <div className="mx-auto w-full max-w-3xl rounded-lg border border-slate-300 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-2xl font-bold">CSR-only Component Demo</h1>
        <p className="mt-3 text-slate-700 dark:text-slate-300">
          This widget is loaded only in the browser using `dynamic(...,{" "}
          {`{ ssr: false }`}).
        </p>
        <CsrOnlyWidgetLoader />
      </div>
    </main>
  );
}
