import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-10 flex items-center gap-3"
          >
            <div className="relative h-20 w-20">
              <div className="absolute inset-0 rounded-2xl bg-[hsl(var(--green-1)/0.55)] blur-2xl animate-pulse" />
              <div className="absolute inset-[-6px] rounded-full border border-[hsl(var(--green-1)/0.3)] animate-[spin_6s_linear_infinite]" />
              <div className="absolute inset-[-12px] rounded-full border border-dashed border-[hsl(var(--green-2)/0.25)] animate-[spin_12s_linear_infinite_reverse]" />
              <motion.img
                src={logo}
                alt="PROsmart Energy"
                animate={{ rotate: [0, 360], scale: [1, 1.05, 1] }}
                transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
                className="relative h-20 w-20 object-contain drop-shadow-[0_0_18px_hsl(var(--green-1)/0.65)]"
              />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight">PROsmart Energy</span>
          </motion.div>

          <div className="h-[2px] w-64 overflow-hidden rounded-full bg-muted">
            <motion.div animate={{ width: `${progress}%` }} transition={{ ease: "easeOut" }} className="h-full bg-green-1" />
          </div>
          <div className="mt-4 font-mono text-xs text-muted-foreground">
            {Math.floor(progress)}% — Initializing energy intelligence
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
