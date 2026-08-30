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
import { SiteFooter } from "@/components/site/footer";
import { SiteToaster } from "@/components/site/toaster";

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
      </main>
      <SiteFooter />
      <SiteToaster />
    </div>
  );
}
