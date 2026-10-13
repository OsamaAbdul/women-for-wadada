import { objectives } from "@/data/napyw";
import { Reveal, SectionHeading } from "./reveal";

export function Objectives() {
  return (
    <section id="objectives" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our Mandate"
          title={objectives.heading}
          intro={objectives.intro}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {objectives.items.map((item, i) => (
            <Reveal key={item.number} delay={0.04 * i}>
              <article className="card-soft group flex h-full flex-col justify-between p-6">
                <div>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft font-display text-sm font-bold text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                    {item.number}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
