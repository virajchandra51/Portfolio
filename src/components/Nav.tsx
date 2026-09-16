"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { nav, site } from "@/lib/site";

export default function Nav() {
  // trailingSlash is on, so pathname arrives as "/journey/".
  const pathname = usePathname().replace(/\/+$/, "") || "/";

  return (
    <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-10 md:py-14">
      <Link
        href="/"
        className="font-mono text-sm tracking-tight text-fg hover:text-muted"
      >
        {site.name}
      </Link>
      <div className="flex items-center gap-x-4">
        <nav className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-sm">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                active
                  ? "text-fg underline decoration-fg decoration-1 underline-offset-[5px]"
                  : "text-muted hover:text-fg"
              }
            >
              {item.label}
            </Link>
          );
          })}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
