import { objectives } from "@/data/nasyowwa";
import { Reveal, SectionHeading } from "./reveal";

export function Objectives() {
  return (
    <section id="objectives" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading eyebrow="Focus" title={objectives.heading} intro={objectives.intro} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {objectives.items.map((item, i) => (
            <Reveal key={item.number} delay={0.05 * i}>
              <article className="card-soft group h-full p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft font-display text-sm font-bold text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                  {item.number}
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
