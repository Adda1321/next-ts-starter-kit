"use client";

import { useMemo } from "react";

export function CsrOnlyWidget() {
  const mountedAt = useMemo(() => new Date().toISOString(), []);

  return (
    <div className="mt-6 rounded-md border border-slate-300 p-4">
      <p className="text-sm text-slate-700">CSR-only widget mounted in browser at:</p>
      <p className="font-mono text-sm text-slate-900">{mountedAt}</p>
    </div>
  );
}
