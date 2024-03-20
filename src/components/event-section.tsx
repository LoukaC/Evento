type SectionProps = {
  title: string;
  paragraph: string;
};

export function EventSection({ title, paragraph }: SectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl mb-8">{title}</h2>
      <p className="max-w-4xl mx-auto text-lg leading-8 text-white/75">
        {paragraph}
      </p>
    </section>
  );
}
