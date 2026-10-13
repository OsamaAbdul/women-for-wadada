import aboutImage from "@/assets/about-meeting.jpg";
import { about } from "@/data/napyw";
import { Reveal } from "./reveal";
import { CheckCircle2, MapPin } from "lucide-react";

export function BackgroundSection() {
  return (
    <section id="about" className="bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 items-center">
        <Reveal className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-3xl border border-border shadow-lg">
            <img
              src={aboutImage}
              alt="Young women taking notes and engaging during a grassroots community meeting"
              loading="lazy"
              width={1200}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
              <span className="font-display text-3xl font-bold text-brand">13</span>
              <p className="text-xs font-medium text-muted-foreground">
                LGAs across Nasarawa State
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
              <MapPin className="h-6 w-6 text-brand shrink-0" />
              <p className="text-xs font-medium text-muted-foreground">
                State, LGA & Ward Structures
              </p>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {about.subheading}
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {about.heading}
            </h2>
            <p className="mt-2 text-sm font-medium text-brand">
              {about.theme}
            </p>
          </Reveal>
          
          <div className="mt-6 space-y-4">
            {about.paragraphs.map((paragraph, index) => (
              <Reveal key={index} delay={0.06 * index}>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
