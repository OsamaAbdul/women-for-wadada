import { useEffect, useState } from "react";
import { GooeyToaster, gooeyToast } from "goey-toast";
import "goey-toast/styles.css";

export function SiteToaster() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = window.setTimeout(() => {
      gooeyToast.info("Welcome to NASYOWWA", {
        description: "Mobilising young women across the 13 LGAs of Nasarawa State.",
      });
    }, 1200);
    return () => window.clearTimeout(timer);
  }, []);

  if (!mounted) return null;
  return <GooeyToaster position="bottom-right" />;
}
