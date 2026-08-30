import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={cn(
        "fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-[0_0_25px_oklch(0.53_0.25_328/0.7)] transition-all duration-500 hover:scale-110 hover:shadow-[0_0_40px_oklch(0.53_0.25_328/1)] focus:outline-none",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none"
      )}
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  );
}
