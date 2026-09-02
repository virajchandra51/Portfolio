import type { Metadata } from "next";
import Link from "next/link";
import Preloader from "@/components/Preloader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Preloader />

      <section>
        <h1 className="text-2xl font-medium tracking-tight md:text-3xl">
          viraj chandra
        </h1>
        <p className="mt-2 font-mono text-[0.8rem] leading-relaxed text-muted">
          {site.role}
        </p>

        <div className="mt-8 space-y-5 text-[0.975rem] leading-[1.75] text-body">
          <p>
            i build backend and data infrastructure at{" "}
            <a
              href="https://about.google/"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              google
            </a>
            , and teach competitive programming to a few hundred people who are
            trying to get better at it. i like problems that have a correct
            answer, and systems where you can prove you found it.
          </p>
          <p>
            currently software engineer ii on monetization infrastructure,
            building shared infra that products like google health and payments
            run on. i started on home history for the google home app. most of
            my recent work has been agents and data discovery: an mcp-based
            agent wired to gemini that generates metadata across 120+ internal
            tables and took top-5 retrieval accuracy from 31% to 93%.
          </p>
          <p>
            alongside that i am a core member and educator at{" "}
            <a
              href="https://www.tle-eliminators.com/"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              tle eliminators
            </a>
            , where i have mentored 200+ students, written 100+ editorials, and
            run 20+ post-contest discussions that have crossed 50,000 views.
            teaching actually came first: it started with a tutoring platform i
            built for the batch below mine in college, and it never stopped.
          </p>
          <p>
            i build small things and finish them. the latest is{" "}
            <a
              href="https://fikar.app"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              fikar
            </a>
            , a menu bar app where a pixel-art desi maa worries about your
            water, food and sleep, and once a day tells you to call your actual
            mother. free, under 2 mb, on macos and windows.
          </p>
          <p>
            previously swe intern on home wifi at google. b.tech in information
            technology from nit raipur, 9.18/10. codeforces expert, codechef
            5-star, leetcode guardian, icpc 2023 regionalist.
          </p>
          <p>
            reach me at{" "}
            <a href={`mailto:${site.email}`} className="link">
              {site.email}
            </a>{" "}
            or on{" "}
            <a
              href="https://www.linkedin.com/in/viraj-chandra/"
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              linkedin
            </a>
            . i read everything that comes in.
          </p>
        </div>

        <hr className="rule" />

        <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
          <Link href="/journey" className="text-muted hover:text-fg">
            journey &rarr;
          </Link>
          <Link href="/projects" className="text-muted hover:text-fg">
            projects &rarr;
          </Link>
          <Link href="/writing" className="text-muted hover:text-fg">
            writing &rarr;
          </Link>
          <Link href="/life" className="text-muted hover:text-fg">
            life &rarr;
          </Link>
        </nav>
      </section>
    </>
  );
}
