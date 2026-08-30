import { Eye, Target } from "lucide-react";
import { visionMission } from "@/data/nasyowwa";
import { Reveal, SectionHeading } from "./reveal";

const cards = [
  { ...visionMission.vision, Icon: Eye, filled: true },
  { ...visionMission.mission, Icon: Target, filled: false },
];

export function VisionMission() {
  return (
    <section id="vision-mission" className="grid-bg py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading eyebrow="Direction" title={visionMission.heading} />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {cards.map(({ title, text, Icon, filled }, i) => (
            <Reveal key={title} delay={0.08 * i}>
              <article
                className={
                  filled
                    ? "h-full rounded-3xl bg-brand p-8 text-brand-foreground transition-transform duration-300 hover:-translate-y-1 sm:p-10"
                    : "card-soft h-full p-8 sm:p-10"
                }
              >
                <span
                  className={
                    filled
                      ? "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-foreground/15"
                      : "inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand"
                  }
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold">{title}</h3>
                <p
                  className={
                    filled
                      ? "mt-4 text-base leading-relaxed opacity-90"
                      : "mt-4 text-base leading-relaxed text-muted-foreground"
                  }
                >
                  {text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
