import { CircleCheckBig } from "lucide-react";
import { outcomes } from "@/data/nasyowwa";
import { Reveal, SectionHeading } from "./reveal";

export function ExpectedOutcomes() {
  return (
    <section id="outcomes" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading eyebrow="Impact" title={outcomes.heading} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.items.map((item, i) => (
            <Reveal key={item.title} delay={0.05 * i}>
              <article className="card-soft h-full p-7">
                <CircleCheckBig className="h-6 w-6 text-brand" aria-hidden="true" />
                <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
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
