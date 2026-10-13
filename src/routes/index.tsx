import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { BackgroundSection } from "@/components/site/background-section";
import { VisionMission } from "@/components/site/vision-mission";
import { Objectives } from "@/components/site/objectives";
import { CoreValues } from "@/components/site/core-values";
import { TargetAudience } from "@/components/site/target-audience";
import { Activities } from "@/components/site/activities";
import { ExpectedOutcomes } from "@/components/site/expected-outcomes";
import { OrganisationStructure } from "@/components/site/organisation-structure";
import { Sustainability } from "@/components/site/sustainability";
import { Commitment } from "@/components/site/commitment";
import { SiteFooter } from "@/components/site/footer";
import { SiteToaster } from "@/components/site/toaster";
import { BackToTop } from "@/components/site/back-to-top";
import { callToAction } from "@/data/napyw";

const title = "NAPYW — Nasarawa Progressive Young Women";
const description =
  "Mobilising Nasarawa Young Women for Inclusive Leadership. A platform for young women within the APC in Nasarawa State to connect, organise, develop leadership capacity and participate actively in party affairs and public life.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  // Route http://localhost:8080/#register directly to the dedicated /register page
  useEffect(() => {
    const handleHashRouting = () => {
      if (typeof window !== "undefined" && window.location.hash === "#register") {
        navigate({ to: "/register" });
      }
    };

    handleHashRouting();
    window.addEventListener("hashchange", handleHashRouting);
    return () => window.removeEventListener("hashchange", handleHashRouting);
  }, [navigate]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navbar />
      <main>
        <Hero />
        <BackgroundSection />
        <VisionMission />
        <Objectives />
        <CoreValues />
        <TargetAudience />
        <Activities />
        <OrganisationStructure />
        <ExpectedOutcomes />
        <Sustainability />
        <Commitment />

        {/* Become Part of NAPYW CTA Section (Separate registration page link) */}
        <section id="register" className="py-24 relative isolate">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand/10 via-background to-background"></div>
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <div className="rounded-3xl border border-brand/25 bg-card/80 p-8 sm:p-14 text-center shadow-2xl backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 bg-brand/15 rounded-full blur-3xl pointer-events-none" />

              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand">
                <Sparkles className="h-3.5 w-3.5" />
                Membership & Engagement
              </span>

              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {callToAction.heading}
              </h2>

              <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {callToAction.question}
              </p>

              <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-brand/30 bg-background/80 px-5 py-3 text-xs sm:text-sm font-semibold text-brand shadow-sm">
                <span>{callToAction.signature}</span>
                <span className="hidden sm:inline">•</span>
                <span className="text-foreground">{callToAction.theme}</span>
              </div>

              <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/register"
                    className="inline-flex h-13 items-center justify-center gap-2.5 rounded-full bg-brand px-8 text-sm font-bold text-brand-foreground shadow-xl shadow-brand/25 transition-all hover:bg-brand/90"
                  >
                    <span>Proceed to Registration Form</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>

                <a
                  href="#about"
                  className="inline-flex h-13 items-center justify-center rounded-full border border-border bg-card px-7 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
                >
                  Learn More About NAPYW
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BackToTop />
      <SiteFooter />
      <SiteToaster />
    </div>
  );
}
