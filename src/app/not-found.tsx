import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-10">
      <h1 className="text-2xl font-medium tracking-tight">404</h1>
      <p className="mt-2 font-mono text-[0.8rem] text-stone-500">
        nothing at this address.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block font-mono text-sm text-stone-500 hover:text-stone-900"
      >
        &larr; home
      </Link>
    </section>
  );
}
