import { createFileRoute } from "@tanstack/react-router";

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
import { RegistrationForm } from "@/components/site/registration-form";
import { SiteFooter } from "@/components/site/footer";
import { SiteToaster } from "@/components/site/toaster";

import { BackToTop } from "@/components/site/back-to-top";

const title = "NASYOWWA — Nasarawa Young Women for Wadada";
const description =
  "A volunteer-driven movement mobilising, educating and empowering young women across the 13 Local Government Areas of Nasarawa State.";

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
        <ExpectedOutcomes />
        <OrganisationStructure />
        <Sustainability />
        
        {/* Registration Section */}
        <section id="register" className="py-24 relative isolate">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand/5 via-background to-background"></div>
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Join the Movement
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Become a part of NASYOWWA. Fill out the form below to register and help us mobilise young women across Nasarawa State.
              </p>
            </div>
            <RegistrationForm />
          </div>
        </section>
      </main>
      <BackToTop />
      <SiteFooter />
      <SiteToaster />
    </div>
  );
}
