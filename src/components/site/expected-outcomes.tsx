import { CheckCircle2 } from "lucide-react";
import { outcomes } from "@/data/napyw";
import { Reveal, SectionHeading } from "./reveal";

export function ExpectedOutcomes() {
  return (
    <section id="outcomes" className="grid-bg py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Target Deliverables"
          title={outcomes.heading}
          intro={outcomes.intro}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.items.map((item, i) => (
            <Reveal key={item.title} delay={0.04 * i}>
              <article className="card-soft flex h-full flex-col justify-start p-6 group">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-foreground">
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
