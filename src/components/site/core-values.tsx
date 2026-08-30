import {
  HandHeart,
  ShieldCheck,
  Users,
  Handshake,
  Scale,
  Sparkles,
  ClipboardCheck,
} from "lucide-react";
import { coreValues } from "@/data/nasyowwa";
import { Reveal, SectionHeading } from "./reveal";

const icons = {
  Service: HandHeart,
  Integrity: ShieldCheck,
  Inclusion: Users,
  Unity: Handshake,
  Respect: Scale,
  Empowerment: Sparkles,
  Accountability: ClipboardCheck,
} as const;

export function CoreValues() {
  return (
    <section id="values" className="grid-bg py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading eyebrow="What guides us" title={coreValues.heading} />
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {coreValues.values.map((value, i) => {
            const Icon = icons[value as keyof typeof icons];
            return (
              <li key={value}>
                <Reveal delay={0.04 * i}>
                  <div className="card-soft flex h-full flex-col items-start gap-4 p-6">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-brand-foreground">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-display text-lg font-semibold text-foreground">
                      {value}
                    </span>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
