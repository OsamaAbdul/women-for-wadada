import aboutImage from "@/assets/about-meeting.jpg";
import { background } from "@/data/nasyowwa";
import { Reveal } from "./reveal";

export function BackgroundSection() {
  return (
    <section id="about" className="bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-3xl border border-border">
            <img
              src={aboutImage}
              alt="Young women taking notes during a grassroots community meeting"
              loading="lazy"
              width={1200}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-6 flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
            <span className="font-display text-3xl font-bold text-brand">13</span>
            <p className="text-sm font-medium text-muted-foreground">
              Local Government Areas across Nasarawa State
            </p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              {background.subheading}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {background.heading}
            </h2>
          </Reveal>
          <div className="mt-6 space-y-5">
            {background.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p className="text-base leading-relaxed text-muted-foreground">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
