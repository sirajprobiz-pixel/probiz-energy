import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "prosmart-cookie-consent";

type Consent = "all" | "essential" | null;

export const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Consent;
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = (choice: Exclude<Consent, null>) => {
    localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 z-[70] mx-auto max-w-2xl"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card/95 p-5 shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.45)] backdrop-blur-xl">
            <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-[hsl(var(--green-1)/0.25)] blur-3xl" />
            <button
              onClick={() => accept("essential")}
              aria-label="Close"
              className="absolute right-3 top-3 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X size={14} />
            </button>
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--green-1)/0.15)] text-green-1">
                <Cookie size={22} />
              </div>
              <div className="flex-1">
                <div className="font-display text-base font-semibold">We value your privacy</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  We use cookies to enhance your browsing experience, analyze traffic and personalize content. Choose what suits you.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <button
                  onClick={() => accept("essential")}
                  className="rounded-full border border-border bg-muted/40 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Essential only
                </button>
                <button
                  onClick={() => accept("all")}
                  className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-shadow hover:shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.7)]"
                >
                  Accept all
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
