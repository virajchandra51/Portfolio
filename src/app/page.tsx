import Link from "next/link";
import Preloader from "@/components/Preloader";
import { site } from "@/lib/site";

// The right panel of the card. Everything a person who just looked you up
// needs, visible in the first screenful rather than behind the mood.
const facts = [
  { org: "Google", detail: "software engineer ii, monetization infra" },
  { org: "TLE Eliminators", detail: "educator, product and operations" },
  { org: "Fikar", detail: "maker, fikar.app" },
  { org: "NIT Raipur", detail: "b.tech information technology, 9.18" },
];

export default function Home() {
  return (
    <>
      <Preloader />

      <div className="grid gap-7 md:grid-cols-[1.35fr_1fr] md:gap-10">
        <section>
          <h1 className="display text-[2.1rem] md:text-[2.6rem]">
            hi, i&apos;m viraj chandra.
          </h1>
          <p className="mt-3 font-serif text-lg italic text-muted">
            pull up a chair.
          </p>

          <div className="mt-5 space-y-3 text-[0.92rem] leading-[1.7] text-body">
            <p>
              i build backend and data infrastructure at google, and teach
              competitive programming to a few thousand people. i like problems
              that have a correct answer, and systems where you can prove you
              found it.
            </p>
            <p>
              lately that means agents and data discovery at work, leading
              product and operations at{" "}
              <a
                href="https://www.tle-eliminators.com/"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                tle eliminators
              </a>
              , and{" "}
              <a
                href="https://fikar.app"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                fikar
              </a>
              , a menu bar app where a pixel-art desi maa worries about your
              water, food and sleep.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Link
              href="/journey"
              className="inline-flex items-center gap-2 rounded bg-cta px-5 py-3 text-[0.85rem] text-cta-ink transition-opacity hover:opacity-90"
            >
              the long version
              <span aria-hidden="true">&rarr;</span>
            </Link>
            <a href={`mailto:${site.email}`} className="link text-[0.88rem]">
              {site.email}
            </a>
          </div>
        </section>

        <aside className="md:border-l md:border-rule md:pl-10">
          <div className="flex items-start justify-between gap-4">
            <p className="label">at a glance</p>
            {/* Postmark. A real stamp image can sit here once the art exists. */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-dashed border-rule text-center font-serif text-[0.68rem] leading-tight text-faint">
              bengaluru
              <br />
              2026
            </div>
          </div>

          <dl className="mt-4 space-y-3">
            {facts.map((f) => (
              <div key={f.org}>
                <dt className="font-serif text-[1.05rem] text-fg">{f.org}</dt>
                <dd className="mt-0.5 text-[0.82rem] leading-snug text-muted">
                  {f.detail}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 border-t border-rule pt-3 text-[0.76rem] leading-relaxed text-faint">
            codeforces expert · codechef 5-star · leetcode guardian · icpc 2023
            regionalist
          </p>
        </aside>
      </div>
    </>
  );
}
