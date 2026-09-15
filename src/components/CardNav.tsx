"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";

const tabs = [{ label: "about", href: "/" }, ...nav];

export default function CardNav() {
  // trailingSlash is on, so pathname arrives as "/journey/".
  const pathname = usePathname().replace(/\/+$/, "") || "/";

  return (
    <nav className="flex flex-wrap gap-x-5 gap-y-1 text-[0.82rem]">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={
              active
                ? "text-fg underline decoration-fg decoration-1 underline-offset-[6px]"
                : "text-muted transition-colors hover:text-fg"
            }
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
