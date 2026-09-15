import { profiles, social } from "@/lib/site";

const links = [...social, ...profiles].filter((l) => l.url);

export default function SocialBar() {
  return (
    <div className="flex max-w-[60vw] flex-wrap items-center gap-x-4 gap-y-1 rounded bg-seal px-4 py-2">
      {links.map((l) => (
        <a
          key={l.label}
          href={l.url}
          target="_blank"
          rel="noreferrer"
          className="text-[0.74rem] text-seal-ink opacity-70 transition-opacity hover:opacity-100"
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}
