import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "projects",
  description: "things i built and finished.",
};

export default function Projects() {
  return (
    <>
      <PageHeader title="projects" sub="things i built, mostly finished." />

      <div className="divide-y divide-[var(--rule)]">
        {projects.map((p) => (
          <article key={p.name} className="py-8 first:pt-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h2 className="font-mono text-sm text-stone-900">{p.name}</h2>
              <span className="font-mono text-xs text-stone-400">
                {p.period}
              </span>
            </div>
            <p className="mt-1 text-[0.9rem] text-stone-500">{p.tagline}</p>

            <div className="mt-4 space-y-3">
              {p.body.map((para) => (
                <p
                  key={para}
                  className="text-[0.94rem] leading-[1.7] text-stone-700"
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
              {p.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-stone-500 hover:text-stone-900"
                >
                  {l.label} ↗
                </a>
              ))}
              <span className="font-mono text-xs text-stone-300">
                {p.stack.join(" · ")}
              </span>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-10 text-[0.9rem] text-stone-500">
        the rest, including the three.js experiments and the smaller browser
        games, live on{" "}
        <a
          href="https://github.com/virajchandra51?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="link"
        >
          github
        </a>
        .
      </p>
    </>
  );
}
