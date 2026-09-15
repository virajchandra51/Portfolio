import Link from "next/link";
import CardNav from "@/components/CardNav";
import { site } from "@/lib/site";

// The card every page renders inside. It grows with its content rather than
// scrolling internally, so a long page (journey) just makes a longer card.
export default function Postcard({ children }: { children: React.ReactNode }) {
  return (
    <article className="card px-6 py-8 md:px-12 md:py-11">
      <Link
        href="/"
        className="font-serif text-xl tracking-tight text-fg transition-colors hover:text-muted"
      >
        {site.name}
        <span className="text-highlight">.</span>
      </Link>

      <div className="mt-8">{children}</div>

      <div className="mt-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-t border-rule pt-5">
        <CardNav />
        <p className="font-serif text-[0.85rem] italic text-faint">
          {site.cardline}
        </p>
      </div>
    </article>
  );
}
