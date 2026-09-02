import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import {
  achievements,
  education,
  ratings,
  responsibilities,
  roles,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "journey",
  description: "where i have worked, studied and competed.",
};

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14 first:mt-0">
      <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-stone-400">
        {label}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function Journey() {
  return (
    <>
      <PageHeader title="journey" sub="work, study, contests." />

      <Section label="work">
        <div className="space-y-10">
          {roles.map((role) => (
            <article key={`${role.org}-${role.title}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-mono text-sm text-stone-900">
                  {role.url ? (
                    <a
                      href={role.url}
                      target="_blank"
                      rel="noreferrer"
                      className="link"
                    >
                      {role.org}
                    </a>
                  ) : (
                    role.org
                  )}
                  <span className="text-stone-400"> / {role.title}</span>
                </h3>
                <span className="font-mono text-xs text-stone-400">
                  {role.period}
                </span>
              </div>
              <ul className="mt-3 space-y-2">
                {role.points.map((point) => (
                  <li
                    key={point}
                    className="relative pl-4 text-[0.94rem] leading-[1.7] text-stone-700 before:absolute before:left-0 before:text-stone-300 before:content-['·']"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section label="education">
        <div className="space-y-5">
          {education.map((e) => (
            <div
              key={e.school}
              className="flex flex-wrap items-baseline justify-between gap-x-4"
            >
              <div>
                <p className="font-mono text-sm text-stone-900">{e.school}</p>
                <p className="mt-1 text-[0.9rem] text-stone-500">{e.detail}</p>
              </div>
              <span className="font-mono text-xs text-stone-400">
                {e.period}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section label="ratings">
        <ul className="space-y-2">
          {ratings.map((r) => (
            <li key={r.platform} className="flex flex-wrap gap-x-3">
              <span className="font-mono text-sm text-stone-900">
                {r.platform}
              </span>
              <span className="text-[0.9rem] text-stone-500">{r.detail}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section label="contests and awards">
        <ul className="space-y-2">
          {achievements.map((a) => (
            <li
              key={a}
              className="relative pl-4 text-[0.94rem] leading-[1.7] text-stone-700 before:absolute before:left-0 before:text-stone-300 before:content-['·']"
            >
              {a}
            </li>
          ))}
        </ul>
      </Section>

      <Section label="positions held">
        <div className="space-y-4">
          {responsibilities.map((r) => (
            <div
              key={r.title}
              className="flex flex-wrap items-baseline justify-between gap-x-4"
            >
              <p className="text-[0.94rem] text-stone-700">
                {r.title}
                <span className="text-stone-400"> · {r.org}</span>
              </p>
              <span className="font-mono text-xs text-stone-400">
                {r.period}
              </span>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
