import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/learn", label: "Learn" },
];

export function SiteNav() {
  return (
    <header className="w-full border-b border-slate-300 bg-white">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-4 sm:px-8">
        <Link href="/" className="text-lg font-bold text-slate-900">
          Adil Mustafa
        </Link>
        <nav className="flex items-center gap-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-slate-700 transition hover:text-blue-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
