import sustainabilityImage from "@/assets/sustainability.jpg";
import { sustainability } from "@/data/napyw";
import { Reveal, SectionHeading } from "./reveal";

export function Sustainability() {
  return (
    <section id="sustainability" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <SectionHeading
          eyebrow="Beyond Electoral Cycles"
          title={sustainability.heading}
        />

        <div className="mt-12">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
              <img
                src={sustainabilityImage}
                alt="Young Nigerian woman leader addressing a civic forum in Nasarawa"
                loading="lazy"
                width={1440}
                height={912}
                className="h-64 w-full object-cover sm:h-80"
              />
              <div className="p-8 sm:p-12">
                <div className="space-y-4 max-w-4xl">
                  {sustainability.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-base leading-relaxed text-muted-foreground sm:text-lg"
                    >
                      {p}
                    </p>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand mb-4">
                    Core Pillars of Sustainability
                  </p>
                  <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                    {sustainability.focusAreas.map((area) => (
                      <li
                        key={area}
                        className="rounded-2xl border border-brand/20 bg-brand-soft/70 px-4 py-3 text-center text-xs font-bold text-brand shadow-sm"
                      >
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
