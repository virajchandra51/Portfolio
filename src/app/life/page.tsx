import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { life } from "@/lib/life";

export const metadata: Metadata = {
  title: "life",
  description: "things outside the editor.",
};

export default function Life() {
  return (
    <>
      <PageHeader title="life" sub="things outside the editor." />

      <div className="space-y-12">
        {life.map((s) => (
          <section key={s.title}>
            <h2 className="font-mono text-sm text-stone-900">{s.title}</h2>
            <div className="mt-3 space-y-3">
              {s.body.map((p) => (
                <p
                  key={p}
                  className="text-[0.94rem] leading-[1.7] text-stone-700"
                >
                  {p}
                </p>
              ))}
            </div>
            {s.tags && (
              <p className="mt-3 font-mono text-xs text-stone-400">
                {s.tags.join("  ·  ")}
              </p>
            )}
          </section>
        ))}
      </div>
    </>
  );
}
