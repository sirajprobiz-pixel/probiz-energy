import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedText } from "./AnimatedText";
import { Dashboard3D } from "./Dashboard3D";

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  // Dashboard lifts UP on scroll (negative y)
  const yDash = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const scaleDash = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const rotDash = useTransform(scrollYProgress, [0, 1], [0, -6]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden pt-32">
      {/* Soft solid color blobs (no gradients) */}
      <motion.div style={{ y: yBg }} className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-[8%] h-72 w-72 rounded-full bg-brand-3/40 blur-3xl" />
        <div className="absolute top-20 right-[8%] h-80 w-80 rounded-full bg-brand-4/60 blur-3xl" />
        <div className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-brand-2/30 blur-3xl" />
      </motion.div>
      <div className="absolute inset-0 bg-grid" />

      <motion.div style={{ opacity }} className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium"
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
          className="mx-auto max-w-5xl text-center font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-[6rem]"
          delay={0.3}
        />
        <AnimatedText
          as="h1"
          text="Automated billing intelligence."
          className="mx-auto max-w-5xl text-center font-display text-5xl font-bold leading-[1.05] tracking-tight text-blue-1 md:text-7xl lg:text-[6rem]"
          delay={0.5}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mx-auto mt-8 max-w-2xl text-center text-lg text-muted-foreground text-balance md:text-xl"
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
          <a
            href="/book-demo"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground transition-all hover:shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)]"
          >
            <span className="relative">Book a Demo</span>
            <span className="relative transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#platform"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-medium text-foreground ring-1 ring-border transition-all hover:bg-brand-5"
          >
            Explore Platform
            <span className="transition-transform group-hover:translate-y-0.5">↓</span>
          </a>
        </motion.div>

        {/* 3D DASHBOARD — center stage */}
        <motion.div
          style={{ y: yDash, scale: scaleDash, rotateX: rotDash }}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-16 h-[60vh] max-w-6xl will-change-transform md:h-[70vh]"
        >
          <div className="absolute -inset-10 rounded-[3rem] bg-brand-4/40 blur-3xl" />
          <div className="relative h-full w-full overflow-hidden rounded-3xl glass-strong">
            <Dashboard3D />
          </div>

          {/* Floating glass HUD cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-4 top-10 hidden md:block"
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
            className="absolute right-4 bottom-10 hidden md:block"
          >
            <div className="rounded-2xl glass p-4">
              <div className="text-xs text-muted-foreground">Tenants Billed</div>
              <div className="font-display text-2xl font-bold text-blue-1">2,341</div>
              <div className="mt-1 text-xs text-blue-2">100% automated</div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border border-brand-1/30 p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-2 w-1 rounded-full bg-brand-1/70"
          />
        </div>
      </motion.div>
    </section>
  );
};
