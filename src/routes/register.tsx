import { createFileRoute } from "@tanstack/react-router";

import { Navbar } from "@/components/site/navbar";
import { SiteFooter } from "@/components/site/footer";
import { SiteToaster } from "@/components/site/toaster";
import { RegistrationForm } from "@/components/site/registration-form";

const title = "Register — NASYOWWA";
const description = "Register to join Nasarawa Young Women for Wadada.";

export const Route = createFileRoute("/register")({
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
  component: RegisterRoute,
});

function RegisterRoute() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navbar />
      <main className="pt-32 pb-16 px-5 sm:px-8 mx-auto max-w-[1280px]">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Join the Movement
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Become a part of NASYOWWA. Fill out the form below to register and help us mobilise young women across Nasarawa State.
          </p>
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
