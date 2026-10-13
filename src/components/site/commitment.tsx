import { Sparkles, HeartHandshake } from "lucide-react";
import { commitment } from "@/data/napyw";
import { Reveal, SectionHeading } from "./reveal";

export function Commitment() {
  return (
    <section id="commitment" className="grid-bg py-20 sm:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our Promise"
          title={commitment.heading}
        />

        <div className="mt-12 max-w-4xl mx-auto">
          <Reveal>
            <div className="rounded-3xl border border-brand/30 bg-card/90 p-8 sm:p-12 shadow-2xl backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-brand/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-3 mb-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-brand-foreground shadow-md">
                  <HeartHandshake className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Our Commitment
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-brand font-semibold">
                    Nasarawa Progressive Young Women
                  </p>
                </div>
              </div>

              <div className="space-y-5 text-base sm:text-lg leading-relaxed text-muted-foreground">
                {commitment.paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-brand/20">
                <div className="flex items-center gap-3 rounded-2xl bg-brand p-5 text-brand-foreground shadow-lg">
                  <Sparkles className="h-6 w-6 shrink-0 text-brand-foreground" />
                  <p className="text-base sm:text-lg font-bold leading-snug">
                    {commitment.closingStatement}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
