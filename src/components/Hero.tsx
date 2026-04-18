import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatedText } from "./AnimatedText";
import { Dashboard3D } from "./Dashboard3D";

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Background parallax
  const yBg = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  // Copy fades + lifts slightly
  const copyOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  // Dashboard rises and grows as user scrolls (the centerpiece)
  const yDash = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -220]);
  const scaleDash = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden pt-32 pb-24"
    >
      {/* Soft solid color blobs */}
      <motion.div style={{ y: yBg }} className="pointer-events-none absolute inset-0 will-change-transform">
        <div className="absolute -top-32 left-[8%] h-72 w-72 rounded-full bg-brand-3/40 blur-3xl" />
        <div className="absolute top-20 right-[8%] h-80 w-80 rounded-full bg-brand-4/60 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-brand-2/30 blur-3xl" />
      </motion.div>
      <div className="absolute inset-0 bg-grid" />

      <div className="container relative z-10 flex flex-col items-center">
        {/* Top copy block */}
        <motion.div
          style={{ opacity: copyOpacity, y: copyY }}
          className="flex w-full flex-col items-center will-change-transform"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 flex w-fit items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-2 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-1" />
            </span>
            <span className="text-muted-foreground">Next-gen energy intelligence platform</span>
          </motion.div>

          <AnimatedText
            as="h1"
            text="Effortless energy monitoring."
            className="mx-auto max-w-5xl text-center font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            delay={0.3}
          />
          <AnimatedText
            as="h1"
            text="Automated billing intelligence."
            className="mx-auto max-w-5xl text-center font-display text-4xl font-bold leading-[1.05] tracking-tight text-blue-1 sm:text-5xl md:text-6xl lg:text-7xl"
            delay={0.5}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mx-auto mt-8 max-w-2xl text-center text-base text-muted-foreground text-balance md:text-lg"
          >
            PROsmart is the next-generation platform for energy monitoring, management,
            and automated billing — built for real estate developers, building owners and enterprises.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/book-demo"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground transition-all hover:shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)]"
            >
              <span className="relative">Book a Demo</span>
              <span className="relative transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <a
              href="#platform"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-medium text-foreground ring-1 ring-border transition-all hover:bg-brand-5"
            >
              Explore Platform
              <span className="transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
          </motion.div>
        </motion.div>

        {/* 3D DASHBOARD — center stage, lifts on scroll */}
        <motion.div
          style={{ y: yDash, scale: scaleDash }}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-16 h-[55vh] w-full max-w-6xl will-change-transform md:h-[65vh]"
        >
          <div className="absolute -inset-10 rounded-[3rem] bg-brand-4/40 blur-3xl" />
          <div className="relative h-full w-full overflow-hidden rounded-3xl glass-strong">
            <Dashboard3D />
          </div>

          {/* Floating glass HUD cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-2 top-10 hidden md:block"
          >
            <div className="rounded-2xl glass p-4">
              <div className="text-xs text-muted-foreground">Live Consumption</div>
              <div className="font-display text-2xl font-bold text-blue-1">847 kWh</div>
              <div className="mt-1 text-xs text-blue-2">↓ 18% this week</div>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-2 bottom-10 hidden md:block"
          >
            <div className="rounded-2xl glass p-4">
              <div className="text-xs text-muted-foreground">Tenants Billed</div>
              <div className="font-display text-2xl font-bold text-blue-1">2,341</div>
              <div className="mt-1 text-xs text-blue-2">100% automated</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
