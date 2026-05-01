"use client";

import dynamic from "next/dynamic";

const CsrOnlyWidget = dynamic(
  () => import("./csr-only-widget").then((mod) => mod.CsrOnlyWidget),
  { ssr: false }
);

export function CsrOnlyWidgetLoader() {
  return <CsrOnlyWidget />;
}
