import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Navbar } from "@/components/site/navbar";
import { SiteFooter } from "@/components/site/footer";
import { SiteToaster } from "@/components/site/toaster";
import { RegistrationForm } from "@/components/site/registration-form";
import { callToAction } from "@/data/napyw";

const title = "Join NAS-PYW — Registration";
const description =
  "Are you a young woman ready to take part in politics and shape governance in Nasarawa State? Connect with NAS-PYW to learn about membership and upcoming activities.";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:site_name", content: "Nasarawa Progressive Young Women (NAS-PYW)" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-image.png" },
      { property: "og:image:secure_url", content: "/og-image.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Join Nasarawa Progressive Young Women (NAS-PYW)" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: "/og-image.png" },
      { name: "twitter:image:alt", content: "Join Nasarawa Progressive Young Women (NAS-PYW)" },
    ],
  }),
  component: RegisterRoute,
});

function RegisterRoute() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navbar />
      <main className="pt-28 md:pt-36 pb-20 px-5 sm:px-8 mx-auto max-w-[1280px]">
        {/* Breadcrumb / Back Link */}
        <div className="mb-8 max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-brand hover:text-brand shadow-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Main Overview</span>
          </Link>
        </div>

        <div className="mb-12 text-center">
          <span className="inline-block rounded-full border border-brand/20 bg-brand-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand">
            Official Membership Registration
          </span>
          <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            {callToAction.heading}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {callToAction.question}
          </p>
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-brand/30 bg-card px-5 py-3 text-xs sm:text-sm font-semibold text-brand shadow-sm">
            <span>{callToAction.signature}</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-foreground">{callToAction.theme}</span>
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          <RegistrationForm />
        </div>
      </main>
      <SiteFooter />
      <SiteToaster />
    </div>
  );
}
