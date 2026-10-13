import {
  HandHeart,
  ShieldCheck,
  Users,
  Handshake,
  Award,
  Sparkles,
  ClipboardCheck,
} from "lucide-react";
import { coreValues } from "@/data/napyw";
import { Reveal, SectionHeading } from "./reveal";

const icons = {
  Service: HandHeart,
  Integrity: ShieldCheck,
  Inclusion: Users,
  Unity: Handshake,
  Leadership: Award,
  Empowerment: Sparkles,
  Accountability: ClipboardCheck,
} as const;

export function CoreValues() {
  return (
    <section id="values" className="grid-bg py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="What Guides Us"
          title={coreValues.heading}
          intro="The core values that define our culture, conduct, and commitment to public life:"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {coreValues.values.map((item, i) => {
            const Icon = icons[item.name as keyof typeof icons] || Sparkles;
            return (
              <Reveal key={item.name} delay={0.04 * i}>
                <article className="card-soft flex h-full flex-col justify-start p-6 group">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-brand-foreground shadow-sm transition-transform group-hover:scale-105">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {item.name}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
