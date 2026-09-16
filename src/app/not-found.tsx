import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-10">
      <h1 className="text-2xl font-medium tracking-tight">404</h1>
      <p className="mt-2 font-mono text-[0.8rem] text-muted">
        nothing at this address.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block font-mono text-sm text-muted hover:text-fg"
      >
        &larr; home
      </Link>
    </section>
  );
}
