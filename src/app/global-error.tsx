"use client";
import React from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-900">
        <h2 className="text-3xl font-bold mb-4">Application Error</h2>
        <p className="mb-4">{error.message}</p>
        <button
          className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
          onClick={() => reset()}
        >
          Reload
        </button>
      </body>
    </html>
  );
} 