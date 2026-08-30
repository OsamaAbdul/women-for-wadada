import { ChevronDown } from "lucide-react";
import { structure } from "@/data/nasyowwa";
import { Reveal, SectionHeading } from "./reveal";

export function OrganisationStructure() {
  return (
    <section id="structure" className="grid-bg py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading eyebrow="How we are organised" title={structure.heading} />

        <ol className="mx-auto mt-12 max-w-2xl">
          {structure.hierarchy.map((node, i) => (
            <li key={node.role}>
              <Reveal delay={0.04 * i}>
                <div
                  className={
                    i === 0
                      ? "flex items-center justify-between gap-4 rounded-2xl bg-brand px-6 py-5 text-brand-foreground"
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
                    <span className="rounded-full border border-brand px-3 py-1 text-xs font-semibold text-brand">
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
      </div>
    </section>
  );
}
