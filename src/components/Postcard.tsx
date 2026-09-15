"use client";
import Link from "next/link";
import CardNav from "@/components/CardNav";
import { site } from "@/lib/site";

export default function Postcard({
  children,
  onHide,
}: {
  children: React.ReactNode;
  onHide: () => void;
}) {
  return (
    <article className="card flex max-h-[76dvh] w-full flex-col px-6 py-7 md:px-10 md:py-9">
      <Link
        href="/"
        className="shrink-0 font-serif text-xl tracking-tight text-fg transition-colors hover:text-muted"
      >
        {site.name}
        <span className="text-highlight">.</span>
      </Link>

      {/* Only the content scrolls, so the tabs and the dismiss button are
          always reachable however long a page gets. */}
      <div className="mt-6 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
        {children}
      </div>

      <div className="mt-6 flex shrink-0 flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-rule pt-4">
        <CardNav />
        <button
          type="button"
          onClick={onHide}
          className="inline-flex items-center gap-2 rounded bg-cta px-4 py-2 text-[0.8rem] text-cta-ink transition-opacity hover:opacity-90"
        >
          Enjoy the view
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </article>
  );
}
