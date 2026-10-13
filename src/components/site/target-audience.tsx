import { Users, UserCheck, HeartHandshake } from "lucide-react";
import { audience } from "@/data/napyw";
import { Reveal, SectionHeading } from "./reveal";

export function TargetAudience() {
  return (
    <section id="audience" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Inclusion & Engagement"
          title={audience.heading}
          intro={audience.intro}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* Main Target Groups (2 Columns on large screens) */}
          <div className="lg:col-span-2">
            <Reveal>
              <div className="card-soft h-full p-8 border border-border shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-brand-foreground">
                    <Users className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      Young Women Across Nasarawa State
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Key constituency & active participants
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {audience.groups.map((group, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-xl border border-border/80 bg-background/60 p-3.5 transition-colors hover:border-brand/50 hover:bg-brand-soft/50"
                    >
                      <UserCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                      <span className="text-sm font-medium text-foreground">
                        {group}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Stakeholders & Mentors Box */}
          <div className="lg:col-span-1">
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl bg-brand/5 border border-brand/20 p-8 flex flex-col justify-between">
                <div>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-brand-foreground shadow-sm">
                    <HeartHandshake className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-foreground">
                    Stakeholders & Mentorship
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {audience.stakeholderNote}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-brand/15">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand">
                    Building Lasting Capacity
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
