"use client";

import { useMemo } from "react";

export function CsrOnlyWidget() {
  const mountedAt = useMemo(() => new Date().toISOString(), []);

  return (
    <div className="mt-6 rounded-md border border-slate-300 p-4 dark:border-slate-700 dark:bg-slate-800">
      <p className="text-sm text-slate-700 dark:text-slate-300">CSR-only widget mounted in browser at:</p>
      <p className="font-mono text-sm text-slate-900 dark:text-slate-100">{mountedAt}</p>
    </div>
  );
}
