export default function PageHeader({
  title,
  sub,
}: {
  title: string;
  sub: string;
}) {
  return (
    <div className="mb-10">
      <h1 className="text-2xl font-medium tracking-tight md:text-3xl">
        {title}
      </h1>
      <p className="mt-2 font-mono text-[0.8rem] text-stone-500">{sub}</p>
    </div>
  );
}
