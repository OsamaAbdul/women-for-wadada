import { UserRound, Users2 } from "lucide-react";
import { audience } from "@/data/nasyowwa";
import { Reveal, SectionHeading } from "./reveal";

const blocks = [
  { ...audience.primary, Icon: UserRound, tone: "primary" as const },
  { ...audience.secondary, Icon: Users2, tone: "secondary" as const },
];

export function TargetAudience() {
  return (
    <section id="audience" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading eyebrow="Audience" title={audience.heading} />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {blocks.map(({ title, groups, Icon, tone }, i) => (
            <Reveal key={title} delay={0.08 * i}>
              <article className="card-soft h-full p-8">
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-brand-foreground">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-foreground">{title}</h3>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {groups.map((group) => (
                    <li
                      key={group}
                      className={
                        tone === "primary"
                          ? "rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-foreground"
                          : "rounded-full border border-border bg-brand-soft px-4 py-2 text-sm font-medium text-brand"
                      }
                    >
                      {group}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
