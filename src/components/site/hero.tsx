import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-women.jpg";
import { hero } from "@/data/nasyowwa";

export function Hero() {
  return (
    <section id="home" className="grid-bg relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pb-28">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
            {hero.eyebrow}
          </p>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {hero.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={hero.primaryCta.target}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5"
            >
              {hero.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={hero.secondaryCta.target}
              className="inline-flex h-12 items-center justify-center rounded-full border border-brand bg-card px-7 text-sm font-semibold text-brand transition-colors hover:bg-brand-soft"
            >
              {hero.secondaryCta.label}
            </a>
          </div>

          <div className="mt-10 inline-flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4">
            <span className="font-display text-4xl font-bold text-brand">{hero.stat.value}</span>
            <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />
              {hero.stat.label}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <img
              src={heroImage}
              alt="Young Nigerian women community leaders standing together in a Nasarawa town square"
              width={1440}
              height={1088}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-5 right-5 rounded-2xl bg-brand px-5 py-4 text-brand-foreground sm:left-8 sm:right-auto sm:max-w-xs">
            <p className="text-sm font-semibold leading-snug">
              Mobilise. Educate. Organise. Empower.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
