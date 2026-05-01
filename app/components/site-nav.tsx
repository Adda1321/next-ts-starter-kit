'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/learn", label: "Learn" },
  { href: "/contact", label: "Contact" },
  { href: "/webhooks", label: "Webhooks" },
  { href: "/admin", label: "Admin" },
];

export function SiteNav() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const isAuthInitialized = useUserStore((state) => state.isAuthInitialized);
  const setUser = useUserStore((state) => state.setUser);

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Signout failed:', error);
    } finally {
      setUser(null);
      router.push('/signin');
    }
  };

  return (
    <header className="w-full border-b border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-4 sm:px-8">
        <Link href="/" className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Adil Mustafa
        </Link>
        <nav className="flex items-center gap-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-slate-700 transition hover:text-blue-700 dark:text-slate-200 dark:hover:text-blue-300"
            >
              {item.label}
            </Link>
          ))}
          {!isAuthInitialized ? (
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Checking session...</span>
          ) : isAuthenticated ? (
            <>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                Signed in{user?.name ? ` as ${user.name}` : ""}
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 dark:border-slate-600 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-slate-100"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">Signed out</span>
              <Link
                href="/signin"
                className="rounded border border-blue-700 px-3 py-1 text-xs font-semibold text-blue-700 transition hover:bg-blue-50 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-slate-800"
              >
                Sign in
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
