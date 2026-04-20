import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Zap, Fuel, Snowflake, Droplets, Flame, Map } from "lucide-react";
import { AnimatedText } from "./AnimatedText";
import dashboardImg from "@/assets/dashboard-consumption.jpg";

const UTILITIES = [
  { icon: Zap, label: "Energy EB" },
  { icon: Fuel, label: "Energy DG" },
  { icon: Snowflake, label: "HVAC" },
  { icon: Droplets, label: "Water" },
  { icon: Flame, label: "Gas" },
];

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -350]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -180]);
  const yDash = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -350]);
  const scaleDash = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.15]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden pt-32 pb-20">
      {/* Light-green glass blobs */}
      <motion.div style={{ y: yBg }} className="pointer-events-none absolute inset-0 will-change-transform">
        <div className="absolute -top-32 left-[6%] h-72 w-72 rounded-full bg-[hsl(135_60%_75%/0.45)] blur-3xl backdrop-blur-2xl" />
        <div className="absolute top-20 right-[6%] h-80 w-80 rounded-full bg-[hsl(140_55%_78%/0.4)] blur-3xl backdrop-blur-2xl" />
        <div className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-[hsl(125_50%_72%/0.35)] blur-3xl backdrop-blur-2xl" />
      </motion.div>
      <div className="absolute inset-0 bg-grid" />

      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* LEFT — copy */}
          <motion.div
            style={{ opacity: copyOpacity, y: copyY }}
            className="lg:col-span-6 will-change-transform"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-2 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-1" />
              </span>
              <span className="text-muted-foreground">Next-gen energy intelligence platform</span>
            </motion.div>

            <AnimatedText
              as="h1"
              text="Effortless energy"
              className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]"
              delay={0.25}
            />
            <AnimatedText
              as="h1"
              text="monitoring &"
              className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]"
              delay={0.4}
            />
            <AnimatedText
              as="h1"
              text="automated billing."
              className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-blue-1 sm:text-6xl md:text-7xl lg:text-[5.5rem]"
              delay={0.55}
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="mt-7 max-w-xl text-base text-muted-foreground text-balance md:text-lg"
            >
              PROsmart unifies <span className="font-semibold text-foreground">EB, DG, HVAC, Water and Gas</span> into one
              live platform — with automated tenant billing and an interactive <span className="font-semibold text-foreground">3D building map</span> for
              real-estate developers and enterprises.
            </motion.p>

            {/* Utility chips */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.05 }}
              className="mt-7 flex flex-wrap gap-2"
            >
              {UTILITIES.map((u, i) => {
                const Icon = u.icon;
                return (
                  <motion.span
                    key={u.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 + i * 0.06, duration: 0.4 }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur"
                  >
                    <Icon size={12} className="text-blue-1" /> {u.label}
                  </motion.span>
                );
              })}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + UTILITIES.length * 0.06, duration: 0.4 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-blue-1"
              >
                <Map size={12} /> 3D Building Map
              </motion.span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/book-demo"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-3.5 font-medium text-primary-foreground transition-all hover:shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)]"
              >
                <span className="relative">Book a Demo</span>
                <span className="relative transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a
                href="#dashboard"
                className="group inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 font-medium text-foreground transition-all hover:bg-foreground/5"
              >
                Explore Platform
                <span className="transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT — dashboard screenshot */}
          <motion.div
            style={{ y: yDash, scale: scaleDash }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative will-change-transform lg:col-span-6"
          >
            <div className="absolute -inset-8 rounded-[2.5rem] bg-brand-1/25 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl glass-strong p-2 md:p-3">
              <img
                src={dashboardImg}
                alt="PROsmart consumption dashboard with EB, DG, HVAC, Water and Gas tracking"
                width={1600}
                height={1200}
                loading="eager"
                className="w-full rounded-2xl object-cover"
              />
            </div>

            {/* Floating glass HUD cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-3 top-10 hidden md:block"
            >
              <div className="rounded-2xl glass p-4 shadow-lg">
                <div className="text-[11px] text-muted-foreground">Live Consumption</div>
                <div className="font-display text-2xl font-bold text-blue-1">847 kWh</div>
                <div className="mt-1 text-[11px] text-blue-2">↓ 18% this week</div>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-3 -bottom-4 hidden md:block"
            >
              <div className="rounded-2xl glass p-4 shadow-lg">
                <div className="text-[11px] text-muted-foreground">Tenants Billed</div>
                <div className="font-display text-2xl font-bold text-blue-1">2,341</div>
                <div className="mt-1 text-[11px] text-blue-2">100% automated</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
