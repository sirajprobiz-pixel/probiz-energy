import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export const Loader = () => {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 22;
        if (next >= 100) {
          clearInterval(t);
          setTimeout(() => setDone(true), 250);
          return 100;
        }
        return next;
      });
    }, 90);
    return () => clearInterval(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background"
        >
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-10 flex items-center gap-3">
            <div className="relative h-12 w-12">
              <div className="absolute inset-0 rounded-full bg-brand-1 opacity-30 blur-xl" />
              <div className="relative flex h-full w-full items-center justify-center rounded-full bg-primary font-display text-xl font-bold text-primary-foreground">
                P
              </div>
            </div>
            <span className="font-display text-2xl font-bold tracking-tight">PROsmart</span>
          </motion.div>

          <div className="h-[2px] w-64 overflow-hidden rounded-full bg-brand-5">
            <motion.div animate={{ width: `${progress}%` }} transition={{ ease: "easeOut" }} className="h-full bg-brand-1" />
          </div>
          <div className="mt-4 font-mono text-xs text-muted-foreground">
            {Math.floor(progress)}% — Initializing energy intelligence
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
