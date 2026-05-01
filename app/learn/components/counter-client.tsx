"use client";

import { useState } from "react";

type CounterClientProps = {
  initialCount: number;
};

export function CounterClient({ initialCount }: CounterClientProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <div className="mt-6 rounded-md border border-slate-300 p-4">
      <p className="text-sm text-slate-700">Interactive client state:</p>
      <p className="my-3 text-2xl font-bold text-slate-900">{count}</p>
      <button
        onClick={() => setCount((value) => value + 1)}
        className="rounded bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
      >
        Increment
      </button>
    </div>
  );
}
