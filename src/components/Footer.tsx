import { profiles, site, social } from "@/lib/site";

const links = [...social, ...profiles].filter((l) => l.url);

export default function Footer() {
  return (
    <footer className="mt-6 flex flex-wrap items-center justify-between gap-4 pb-10">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded bg-seal px-5 py-3 backdrop-blur">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.url}
            target="_blank"
            rel="noreferrer"
            className="text-[0.78rem] text-seal-ink opacity-70 transition-colors hover:text-seal-ink"
          >
            {l.label}
          </a>
        ))}
      </div>
      <p className="text-[0.72rem] text-seal-ink opacity-60">
        {site.name} · 2026
      </p>
    </footer>
  );
}
