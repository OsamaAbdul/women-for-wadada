import { useEffect, useState, useRef } from "react";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { nav } from "@/data/napyw";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const isRegisterPage = location.pathname === "/register";

  // Sticky navbar shadow/blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard accessibility: close mobile menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      role="banner"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || mobileOpen
          ? "border-b border-border/80 bg-background/85 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent bg-background/60 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-20 md:h-24 max-w-[1280px] items-center justify-between px-5 sm:px-8">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 transition-transform duration-200 active:scale-95"
          aria-label="NAPYW Homepage"
        >
          <img
            src="/logo.png"
            alt="NAPYW Logo"
            className="h-16 w-16 md:h-20 md:w-20 object-contain drop-shadow-[0_0_18px_oklch(0.53_0.25_328/0.65)]"
          />

        </Link>

        {/* Desktop Navigation Links with Framer Motion hover glider */}
        <nav
          role="navigation"
          aria-label="Main Navigation"
          className="hidden items-center gap-1 xl:flex rounded-full border border-border/60 bg-card/50 p-1.5 backdrop-blur-sm shadow-inner"
          onMouseLeave={() => setHoveredNav(null)}
        >
          {nav.slice(0, 8).map((item) => {
            const isHovered = hoveredNav === item.target;
            const targetUrl = isRegisterPage ? `/${item.target}` : item.target;

            return (
              <a
                key={item.target}
                href={targetUrl}
                onMouseEnter={() => setHoveredNav(item.target)}
                className="relative rounded-full px-3.5 py-1.5 text-xs font-semibold text-foreground/80 transition-colors duration-150 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                {/* Floating pill highlight */}
                {isHovered && (
                  <motion.span
                    layoutId="navbar-hover-pill"
                    transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-brand-soft"
                    style={{ zIndex: -1 }}
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action / Registration CTA */}
        <div className="hidden items-center gap-3 lg:flex">
          {!isRegisterPage ? (
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/register"
                aria-label="Navigate to member registration page"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-xs font-bold text-brand-foreground shadow-lg shadow-brand/20 transition-all hover:bg-brand/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                <span>Become Part of NAPYW</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/"
                aria-label="Return to landing page"
                className="inline-flex items-center gap-2 rounded-full border border-brand bg-card px-5 py-2.5 text-xs font-bold text-brand transition-colors hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                <span>Back to Overview</span>
              </Link>
            </motion.div>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border/80 bg-card/80 text-foreground transition-all hover:border-brand/50 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-navigation"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border/80 bg-background/95 px-5 pb-8 pt-4 backdrop-blur-2xl lg:hidden shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-border/60">
              <span className="text-xs font-bold uppercase tracking-wider text-brand flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                NAPYW Menu
              </span>
              <span className="text-[11px] text-muted-foreground">
                APC Nasarawa State
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {nav.map((item) => {
                const targetUrl = isRegisterPage ? `/${item.target}` : item.target;
                return (
                  <a
                    key={item.target}
                    href={targetUrl}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3.5 py-2.5 text-xs font-semibold text-foreground/90 transition-colors hover:bg-brand-soft hover:text-brand active:bg-brand-soft"
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-border/80">
              {!isRegisterPage ? (
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-3.5 text-sm font-bold text-brand-foreground shadow-lg shadow-brand/20 transition-all hover:bg-brand/90 active:scale-[0.98]"
                >
                  <span>Become Part of NAPYW</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-brand bg-card px-5 py-3.5 text-sm font-bold text-brand transition-colors hover:bg-brand-soft active:scale-[0.98]"
                >
                  <span>Return to Homepage</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
