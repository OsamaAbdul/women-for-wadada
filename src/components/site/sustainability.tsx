import sustainabilityImage from "@/assets/sustainability.jpg";
import { sustainability } from "@/data/nasyowwa";
import { Reveal } from "./reveal";

export function Sustainability() {
  return (
    <section id="sustainability" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <img
              src={sustainabilityImage}
              alt="A young Nigerian woman addressing a community audience at a civic event"
              loading="lazy"
              width={1440}
              height={912}
              className="h-64 w-full object-cover sm:h-80"
            />
            <div className="p-8 sm:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                Sustainability
              </p>
              <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {sustainability.heading}
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
                {sustainability.paragraph}
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {sustainability.focusAreas.map((area) => (
                  <li
                    key={area}
                    className="rounded-2xl bg-brand px-5 py-4 text-sm font-semibold text-brand-foreground"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
