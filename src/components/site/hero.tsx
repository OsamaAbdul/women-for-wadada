import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero-women.jpg";
import { hero } from "@/data/napyw";

export function Hero() {
  return (
    <section id="home" className="grid-bg relative overflow-hidden pb-20 pt-28 sm:pt-36 lg:pb-28">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >


          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>

          <div className="mt-4 rounded-xl border-l-4 border-brand bg-brand-soft/60 px-4 py-2.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">
              Theme: <span className="font-bold lowercase capitalize text-foreground">{hero.theme}</span>
            </p>
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {hero.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/register"
                className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-brand px-7 text-sm font-semibold text-brand-foreground shadow-lg shadow-brand/25 transition-transform hover:bg-brand/90"
              >
                <span>{hero.primaryCta.label}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <a
              href={hero.secondaryCta.target}
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card px-7 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
            >
              {hero.secondaryCta.label}
            </a>
          </div>

          <div className="mt-10 inline-flex items-center gap-4 rounded-2xl border border-border bg-card px-5 py-4 shadow-sm">
            <span className="font-display text-4xl font-bold text-brand">{hero.stat.value}</span>
            <div className="flex flex-col">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <MapPin className="h-4 w-4 text-brand" aria-hidden="true" />
                {hero.stat.label}
              </span>
              <span className="text-xs text-muted-foreground">
                State, LGA and Ward Structures
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
            <img
              src={heroImage}
              alt="Nasarawa Progressive Young Women community leaders standing together"
              width={1440}
              height={1088}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-5 right-5 rounded-2xl bg-brand px-5 py-4 text-brand-foreground shadow-xl sm:left-8 sm:right-auto sm:max-w-xs">
            <p className="text-xs font-medium uppercase tracking-wider text-brand-foreground/80">
              Our Call
            </p>
            <p className="mt-1 text-sm font-bold leading-snug">
              Connect. Learn. Lead. Serve.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
