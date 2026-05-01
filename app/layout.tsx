import "./globals.css";
import React from "react";
import { ApolloWrapper } from "@/features/apollo/apollo-wrapper";
import { SiteNav } from "./components/site-nav";
import { AuthProvider } from "@/components/AuthProvider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <ApolloWrapper>
          <AuthProvider>
            <SiteNav />
            {children}
          </AuthProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
