"use client";

import { useEffect, useState } from "react";

export function HydrationStatus() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className="mt-6 rounded-md border border-slate-300 p-4 dark:border-slate-700 dark:bg-slate-800">
      <p className="text-sm text-slate-700 dark:text-slate-300">Hydration status:</p>
      <p
        className={`text-lg font-semibold ${
          hydrated ? "text-emerald-700 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400"
        }`}
      >
        {hydrated ? "Hydrated on client" : "Pre-hydration render"}
      </p>
    </div>
  );
}
