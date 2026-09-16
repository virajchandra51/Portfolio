import Link from "next/link";
import { nav, profiles, site, social } from "@/lib/site";

const year = 2026;

function Column({
  title,
  items,
}: {
  title: string;
  items: { label: string; url: string }[];
}) {
  const live = items.filter((i) => i.url);
  if (!live.length) return null;
  return (
    <div>
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint">
        {title}
      </p>
      <ul className="mt-3 space-y-1.5">
        {live.map((i) => (
          <li key={i.label}>
            <a
              href={i.url}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-muted hover:text-fg"
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-rule py-10">
      <div className="grid grid-cols-3 gap-6 md:gap-8">
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint">
            pages
          </p>
          <ul className="mt-3 space-y-1.5">
            <li>
              <Link
                href="/"
                className="font-mono text-sm text-muted hover:text-fg"
              >
                home
              </Link>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-mono text-sm text-muted hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Column title="social" items={social} />
        <Column title="profiles" items={profiles} />
      </div>
      <p className="mt-10 font-mono text-xs text-faint">
        {site.name} · {year}
      </p>
    </footer>
  );
}
