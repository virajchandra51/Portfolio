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
      <div className="max-w-[26rem] rounded bg-seal px-4 py-3 text-right">
        <p className="text-[0.72rem] text-seal-ink opacity-60">
          {site.name} · 2026
        </p>
        <p className="mt-1 max-w-[22rem] text-[0.66rem] leading-relaxed text-seal-ink opacity-45">
          Forest by ansimuz (CC0). Painted backdrops: Hiroshige, Caillebotte
          and Inness, public domain via the Art Institute of Chicago. Ambience:
          CC0 recordings by VanEngelen, Sandermotions, ceich93 and Fission9.
        </p>
      </div>
    </footer>
  );
}
