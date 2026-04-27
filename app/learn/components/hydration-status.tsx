"use client";

import { useEffect, useState } from "react";

export function HydrationStatus() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div className="mt-6 rounded-md border border-slate-300 p-4">
      <p className="text-sm text-slate-700">Hydration status:</p>
      <p
        className={`text-lg font-semibold ${
          hydrated ? "text-emerald-700" : "text-amber-700"
        }`}
      >
        {hydrated ? "Hydrated on client" : "Pre-hydration render"}
      </p>
    </div>
  );
}
