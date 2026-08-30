import { Users, GraduationCap, HeartHandshake, Radio, Check } from "lucide-react";
import { activities } from "@/data/nasyowwa";
import { Reveal, SectionHeading } from "./reveal";

const icons = { Users, GraduationCap, HeartHandshake, Radio } as const;

export function Activities() {
  return (
    <section id="activities" className="grid-bg py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading eyebrow="Programmes" title={activities.heading} intro={activities.intro} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {activities.pillars.map((pillar, i) => {
            const Icon = icons[pillar.icon];
            return (
              <Reveal key={pillar.title} delay={0.06 * i}>
                <article className="card-soft h-full p-8">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-brand-foreground">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {pillar.title}
                    </h3>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {pillar.activities.map((activity) => (
                      <li key={activity} className="flex items-start gap-3 text-sm text-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
