import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedText } from "./AnimatedText";
import heroDashboard from "@/assets/hero-dashboard.jpg";

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden pt-32">
      {/* Animated background layers */}
      <motion.div style={{ y: y2 }} className="absolute inset-0 bg-aurora" />
      <div className="absolute inset-0 bg-grid" />
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-radial blur-3xl"
      />

      {/* Floating orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[20%] h-32 w-32 rounded-full bg-neon-blue/30 blur-3xl animate-float" />
        <div className="absolute right-[15%] top-[30%] h-40 w-40 rounded-full bg-neon-purple/30 blur-3xl animate-float-slow" />
        <div className="absolute bottom-[20%] left-[20%] h-28 w-28 rounded-full bg-neon-cyan/30 blur-3xl animate-float" />
      </div>

      <motion.div style={{ opacity }} className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mx-auto mb-8 flex w-fit items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
          </span>
          <span className="text-muted-foreground">Next-gen energy intelligence platform</span>
        </motion.div>

        <AnimatedText
          as="h1"
          text="Effortless energy monitoring."
          className="mx-auto max-w-5xl text-center font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-[6rem]"
          delay={1.6}
        />
        <AnimatedText
          as="h1"
          text="Automated billing intelligence."
          className="mx-auto max-w-5xl text-center font-display text-5xl font-bold leading-[1.05] tracking-tight gradient-text md:text-7xl lg:text-[6rem]"
          delay={1.9}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="mx-auto mt-8 max-w-2xl text-center text-lg text-muted-foreground text-balance md:text-xl"
        >
          PROsmart is the next-generation platform for energy monitoring, management,
          and automated billing — built for real estate developers, building owners and enterprises.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-primary px-7 py-3.5 font-medium text-primary-foreground transition-all hover:shadow-[0_0_50px_hsl(var(--primary)/0.7)]"
          >
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">Book a Demo</span>
            <span className="relative transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#platform"
            className="group inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 font-medium transition-all hover:bg-white/10"
          >
            Explore Platform
            <span className="transition-transform group-hover:translate-y-0.5">↓</span>
          </a>
        </motion.div>

        {/* Glass dashboard hero image */}
        <motion.div
          style={{ scale }}
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-20 max-w-6xl"
        >
          <div className="absolute -inset-10 bg-gradient-aurora opacity-40 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl glass-strong p-2">
            <img
              src={heroDashboard}
              alt="PROsmart energy monitoring dashboard"
              width={1536}
              height={1024}
              className="rounded-2xl"
            />
            {/* Floating glass cards on top */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-6 top-12 hidden md:block"
            >
              <div className="rounded-2xl glass p-4">
                <div className="text-xs text-muted-foreground">Live Consumption</div>
                <div className="font-display text-2xl font-bold gradient-text">847 kWh</div>
                <div className="mt-1 text-xs text-neon-cyan">↓ 18% this week</div>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-6 bottom-12 hidden md:block"
            >
              <div className="rounded-2xl glass p-4">
                <div className="text-xs text-muted-foreground">Tenants Billed</div>
                <div className="font-display text-2xl font-bold gradient-text">2,341</div>
                <div className="mt-1 text-xs text-neon-cyan">100% automated</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border border-white/20 p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-2 w-1 rounded-full bg-white/60"
          />
        </div>
      </motion.div>
    </section>
  );
};
