export default function PageHeader({
  title,
  sub,
}: {
  title: string;
  sub: string;
}) {
  return (
    <div className="mb-9">
      <h1 className="display text-[1.9rem] md:text-[2.3rem]">{title}</h1>
      <p className="mt-2 font-serif text-base italic text-muted">{sub}</p>
    </div>
  );
}
