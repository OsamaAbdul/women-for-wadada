import { useEffect, useState } from "react";
import { GooeyToaster, gooeyToast } from "goey-toast";
import "goey-toast/styles.css";

export function SiteToaster() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = window.setTimeout(() => {
      gooeyToast.info("Welcome to NAPYW", {
        description: "Mobilising Nasarawa Young Women for Inclusive Leadership.",
      });
    }, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  if (!mounted) return null;
  return <GooeyToaster position="top-right" />;
}
