import {
  Users,
  GraduationCap,
  BookOpen,
  HeartHandshake,
  Radio,
  Network,
} from "lucide-react";
import { activities } from "@/data/napyw";
import { Reveal, SectionHeading } from "./reveal";

const icons = {
  Users,
  GraduationCap,
  BookOpen,
  HeartHandshake,
  Radio,
  Network,
} as const;

export function Activities() {
  return (
    <section id="programmes" className="grid-bg py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Key Action Areas"
          title={activities.heading}
          intro={activities.intro}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities.items.map((item, i) => {
            const Icon = icons[item.icon as keyof typeof icons] || Users;
            return (
              <Reveal key={item.number} delay={0.06 * i}>
                <article className="card-soft flex h-full flex-col justify-between p-8">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-brand-foreground shadow-sm">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span className="font-display text-sm font-bold text-brand">
                        {item.number}
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-xl font-bold text-foreground">
                      {item.title}
                    </h3>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/60">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                      NAPYW Programme
                    </span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
