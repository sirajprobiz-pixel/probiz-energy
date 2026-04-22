import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

export const Loader = () => {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fadeLogo, setFadeLogo] = useState(false);

  useEffect(() => {
    let raf = 0;
    let target = 0;
    let current = 0;
    let finished = false;

    const computeTarget = () => {
      if (document.readyState === "complete") return 100;
      if (document.readyState === "interactive") return 75;
      return 35;
    };

    const onProgressEvent = () => {
      target = Math.max(target, computeTarget());
    };

    document.addEventListener("readystatechange", onProgressEvent);
    window.addEventListener("load", onProgressEvent);

    // Drift target up so it always feels alive even before events fire
    const drift = window.setInterval(() => {
      target = Math.min(95, Math.max(target, current + 8 + Math.random() * 10));
      onProgressEvent();
      if (document.readyState === "complete") target = 100;
    }, 220);

    const tick = () => {
      // Smoothly ease current toward target
      current += (target - current) * 0.08;
      if (target >= 100 && current > 99.4) {
        current = 100;
        setProgress(100);
        if (!finished) {
          finished = true;
          setFadeLogo(true);
          window.setTimeout(() => setDone(true), 650);
        }
        return;
      }
      setProgress(current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(drift);
      document.removeEventListener("readystatechange", onProgressEvent);
      window.removeEventListener("load", onProgressEvent);
    };
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
            animate={{ opacity: fadeLogo ? 0 : 1, scale: fadeLogo ? 0.85 : 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-10 flex items-center gap-3"
          >
            <div className="relative h-20 w-20">
              <div className="absolute inset-[-6px] rounded-full border border-[hsl(var(--green-1)/0.3)] animate-[spin_6s_linear_infinite]" />
              <div className="absolute inset-[-12px] rounded-full border border-dashed border-[hsl(var(--green-2)/0.25)] animate-[spin_12s_linear_infinite_reverse]" />
              <motion.img
                src={logo}
                alt="PROsmart Energy"
                animate={{ rotate: [0, 360], scale: [1, 1.05, 1] }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
                className="relative h-20 w-20 object-contain"
              />
            </div>
            <span className="font-display text-2xl font-bold tracking-tight">PROsmart Energy</span>
          </motion.div>

          <div className="h-[2px] w-64 overflow-hidden rounded-full bg-muted">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.2 }}
              className="h-full bg-green-1"
            />
          </div>
          <div className="mt-4 font-mono text-xs text-muted-foreground">
            {Math.floor(progress)}% — Initializing energy intelligence
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
