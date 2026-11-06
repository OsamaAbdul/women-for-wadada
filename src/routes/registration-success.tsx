import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import confetti from "canvas-confetti";
import { ArrowLeft, ThumbsUp } from "lucide-react";

import { Navbar } from "@/components/site/navbar";
import { SiteFooter } from "@/components/site/footer";
import { Button } from "@/components/ui/button";

const title = "Registration Successful — NAS-PYW";

export const Route = createFileRoute("/registration-success")({
  head: () => ({
    meta: [
      { title },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: RegistrationSuccessPage,
});

function celebrate() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  const interval: any = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults, particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#BC00BA', '#ff66ff', '#ffffff']
    });
    confetti({
      ...defaults, particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#BC00BA', '#ff66ff', '#ffffff']
    });
  }, 250);
}

function RegistrationSuccessPage() {
  useEffect(() => {
    celebrate();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Navbar />
      <main className="flex min-h-[80vh] items-center justify-center px-5 pt-28 pb-20 sm:px-8">
        <div className="max-w-lg text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand-soft ring-8 ring-brand/10">
            <ThumbsUp className="h-12 w-12 text-brand" strokeWidth={2.25} />
          </div>
          <span className="mt-6 inline-block rounded-full border border-brand/20 bg-brand-soft px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand">
            Registration Complete
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Thank you for joining NAS-PYW!
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Your registration has been received successfully. We will reach out to you on the
            phone number you provided with details about upcoming activities.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild className="h-12 rounded-full px-8">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
