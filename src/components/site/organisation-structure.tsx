import { ChevronDown, Shield, FileText } from "lucide-react";
import { structure } from "@/data/napyw";
import { Reveal, SectionHeading } from "./reveal";

export function OrganisationStructure() {
  return (
    <section id="structure" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Governance & Hierarchy"
          title={structure.heading}
          intro={structure.intro}
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <Reveal>
            <div className="text-center mb-8">
              <span className="inline-block rounded-full border border-brand/20 bg-brand-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
                {structure.proposedStructureIntro}
              </span>
            </div>
          </Reveal>

          <ol className="space-y-2">
            {structure.hierarchy.map((node, i) => (
              <li key={node.role}>
                <Reveal delay={0.04 * i}>
                  <div
                    className={
                      i === 0
                        ? "flex items-center justify-between gap-4 rounded-2xl bg-brand px-6 py-5 text-brand-foreground shadow-lg"
                        : "card-soft flex items-center justify-between gap-4 px-6 py-5"
                    }
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={
                          i === 0
                            ? "inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-foreground/20 text-xs font-bold"
                            : "inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand"
                        }
                      >
                        {node.level}
                      </span>
                      <span className="font-display text-base font-semibold sm:text-lg">
                        {node.role}
                      </span>
                    </div>
                    {node.quantity ? (
                      <span
                        className={
                          i === 0
                            ? "rounded-full bg-brand-foreground/20 px-3 py-1 text-xs font-semibold text-brand-foreground"
                            : "rounded-full border border-brand/40 bg-brand-soft px-3 py-1 text-xs font-semibold text-brand"
                        }
                      >
                        {node.quantity} LGAs
                      </span>
                    ) : null}
                  </div>
                </Reveal>
                {i < structure.hierarchy.length - 1 ? (
                  <div className="flex justify-center py-2" aria-hidden="true">
                    <ChevronDown className="h-5 w-5 text-brand" />
                  </div>
                ) : null}
              </li>
            ))}
          </ol>

          {/* Governance & Administrative Explanatory Paragraphs */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <Reveal delay={0.25}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3 text-brand mb-3">
                  <Shield className="h-5 w-5" />
                  <h4 className="font-display text-base font-bold text-foreground">
                    Coordination & Reporting
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {structure.paragraphs[0]}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-3 text-brand mb-3">
                  <FileText className="h-5 w-5" />
                  <h4 className="font-display text-base font-bold text-foreground">
                    Governance & APC Guidelines
                  </h4>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {structure.paragraphs[1]}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
