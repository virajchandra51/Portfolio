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
      <div className="text-right">
        <p className="text-[0.72rem] text-seal-ink opacity-60">
          {site.name} · 2026
        </p>
        <p className="mt-1 max-w-[22rem] text-[0.66rem] leading-relaxed text-seal-ink opacity-45">
          Backdrops: Cazin, <i>Landscape</i> (c. 1895) and Whistler,{" "}
          <i>Nocturne: Blue and Gold</i> (1872). Art Institute of Chicago,
          public domain. Ambience: CC0 field recordings by Garuda1982,
          mudflea2, BurghRecords and morvei01 on Freesound.
        </p>
      </div>
    </footer>
  );
}
