import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { allPosts, elsewhere } from "@/lib/posts";

export const metadata: Metadata = {
  title: "writing",
  description: "notes on competitive programming, building things, and work.",
};

export default function Writing() {
  const posts = allPosts();

  return (
    <>
      <PageHeader
        title="writing"
        sub="notes on contests, building things, and work."
      />

      {posts.length > 0 ? (
        <ul className="divide-y divide-rule">
          {posts.map((p) => (
            <li key={p.slug} className="py-5 first:pt-0">
              <Link href={`/writing/${p.slug}`} className="group block">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h2 className="font-mono text-sm text-fg group-hover:underline group-hover:decoration-fg group-hover:underline-offset-[4px]">
                    {p.title}
                  </h2>
                  <span className="font-mono text-xs text-faint">
                    {p.date}
                  </span>
                </div>
                {p.summary && (
                  <p className="mt-1 text-[0.9rem] text-muted">
                    {p.summary}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[0.94rem] leading-[1.7] text-body">
          nothing published here yet. most of what i have written lives with the
          problems it explains, so it is listed below instead.
        </p>
      )}

      <h2 className="mt-14 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-faint">
        written elsewhere
      </h2>
      <ul className="mt-5 space-y-4">
        {elsewhere.map((e) => (
          <li key={e.url}>
            <a
              href={e.url}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-sm text-fg hover:underline hover:decoration-fg hover:underline-offset-[4px]"
            >
              {e.title} ↗
            </a>
            <p className="mt-1 text-[0.9rem] text-muted">
              {e.where} · {e.note}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
