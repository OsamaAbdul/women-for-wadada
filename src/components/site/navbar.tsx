import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { nav } from "@/data/nasyowwa";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-border bg-background/20 backdrop-blur-lg"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-24 max-w-[1280px] items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="NASYOWWA Logo" className="h-28 w-28 md:h-36 md:w-36 drop-shadow-[0_0_25px_oklch(0.53_0.25_328/0.7)] object-contain" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <a
              key={item.target}
              href={`/${item.target}`}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-brand-soft hover:text-brand"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="/#register"
          className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90 lg:inline-flex"
        >
          Join the Movement
        </a>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <nav
          aria-label="Mobile"
          className="border-t border-border bg-background px-5 pb-6 pt-2 lg:hidden"
        >
          {nav.map((item) => (
            <a
              key={item.target}
              href={`/${item.target}`}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-3 text-base font-medium text-foreground hover:bg-brand-soft hover:text-brand"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-4 border-t border-border pt-4 px-3">
            <a
              href="/#register"
              onClick={() => setOpen(false)}
              className="block w-full text-center rounded-full bg-brand px-5 py-3 text-base font-semibold text-brand-foreground shadow-lg shadow-brand/20 transition-opacity hover:opacity-90"
            >
              Join the Movement
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
