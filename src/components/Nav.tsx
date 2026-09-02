"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";

export default function Nav() {
  // trailingSlash is on, so pathname arrives as "/journey/".
  const pathname = usePathname().replace(/\/+$/, "") || "/";

  return (
    <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-10 md:py-14">
      <Link
        href="/"
        className="font-mono text-sm tracking-tight text-stone-900 hover:text-stone-500"
      >
        {site.name}
      </Link>
      <nav className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-sm">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                active
                  ? "text-stone-900 underline decoration-stone-900 decoration-1 underline-offset-[5px]"
                  : "text-stone-500 hover:text-stone-900"
              }
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
