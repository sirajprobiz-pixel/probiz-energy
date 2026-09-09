import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Zap, Fuel, Snowflake, Droplets, Flame, Map } from "lucide-react";
import { AnimatedText } from "./AnimatedText";
import dashboardImg from "@/assets/hero-dashboard.png";
import brandLogo from "@/assets/logo.png";

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

  const yBg = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -250]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.0]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -100]);
  const yDash = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -200]);
  const scaleDash = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.05]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-visible pt-36 pb-32">
      {/* Light-green glass blobs */}
      <motion.div style={{ y: yBg }} className="pointer-events-none absolute inset-0 will-change-transform flex justify-center">
        <div className="absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-[hsl(135_60%_75%/0.35)] blur-3xl backdrop-blur-0xl" />
        <div className="absolute top-20 right-1/4 h-[600px] w-[600px] rounded-full bg-[hsl(140_55%_78%/0.3)] blur-3xl backdrop-blur-0xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full bg-[hsl(125_50%_72%/0.25)] blur-3xl backdrop-blur-1xl" />
      </motion.div>
      <div className="absolute inset-0 bg-grid opacity-60" />

      <div className="container relative z-10 flex flex-col items-center">
        {/* TOP — copy */}
        <motion.div
          style={{ opacity: copyOpacity, y: copyY }}
          className="flex flex-col items-center text-center max-w-5xl mx-auto will-change-transform"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium"
          >
            <img src={brandLogo} alt="" className="h-4 w-4 object-contain" />
            <span className="text-muted-foreground">Next-gen energy intelligence platform</span>
          </motion.div>

          <div className="flex flex-col items-center">
            <AnimatedText
              as="h1"
              text="Effortless energy"
              className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[6rem]"
              delay={0.25}
            />
            <AnimatedText
              as="h1"
              text="monitoring & automated billing."
              className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-blue-1 sm:text-6xl md:text-7xl lg:text-[6rem] mt-2 lg:mt-4"
              delay={0.4}
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 max-w-3xl text-sm text-muted-foreground text-balance sm:text-base md:text-lg lg:text-xl"
          >
            Probiz Energy unifies <span className="font-semibold text-foreground">EB, DG, HVAC, Water and Gas</span> into one
            live platform — with automated tenant billing and an interactive <span className="font-semibold text-foreground">3D building map</span> for
            real-estate developers and enterprises.
          </motion.p>

          {/* Utility chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-8 flex flex-wrap justify-center gap-2"
          >
            {UTILITIES.map((u, i) => {
              const Icon = u.icon;
              return (
                <motion.span
                  key={u.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + i * 0.05, duration: 0.4 }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur sm:px-4 sm:py-2 sm:text-sm"
                >
                  <Icon size={14} className="text-blue-1" /> {u.label}
                </motion.span>
              );
            })}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + UTILITIES.length * 0.05, duration: 0.4 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-blue-1 sm:px-4 sm:py-2 sm:text-sm"
            >
              <Map size={14} /> 3D Building Map
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-10 flex flex-wrap justify-center items-center gap-4"
          >
            <Link
              to="/book-demo"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground transition-all hover:shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)]"
            >
              <span className="relative">Book a Demo</span>
              <span className="relative transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <a
              href="#dashboard"
              className="group inline-flex items-center gap-2 rounded-full glass px-8 py-4 font-medium text-foreground transition-all hover:bg-foreground/5"
            >
              Explore Platform
              <span className="transition-transform group-hover:translate-y-0.5">↓</span>
            </a>
          </motion.div>
        </motion.div>

        {/* BOTTOM — dashboard screenshot (larger & centered) */}
        <motion.div
          style={{ y: yDash, scale: scaleDash }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-20 w-full max-w-[1200px] will-change-transform origin-top z-20"
        >
          <div className="absolute -inset-6 sm:-inset-10 rounded-[3rem] bg-brand-1/25 blur-3xl opacity-80" />
          <div className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] glass-strong p-2 sm:p-3 md:p-4 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)]">
            <img
              src={dashboardImg}
              alt="Probiz Energy consumption dashboard"
              width={1920}
              height={1440}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              sizes="100vw"
              className="block h-auto w-full rounded-xl sm:rounded-2xl object-cover"
            />
          </div>

          {/* Floating glass HUD cards */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 sm:-left-8 top-[15%] hidden md:block"
          >
            <div className="rounded-2xl glass p-4 sm:p-5 shadow-xl backdrop-blur-xl">
              <div className="text-black sm:text-xs text-black-foreground uppercase tracking-widest font-semibold mb-1">Live Consumption</div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-black">847 kWh</div>
              <div className="mt-2 text-[10px] sm:text-xs font-medium text-black bg-green-1/10 rounded-full px-2 py-1 inline-flex items-center gap-1">
                ↓ 18% this week
              </div>
            </div>
          </motion.div>
          
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-4 sm:-right-10 bottom-[20%] hidden md:block"
          >
            <div className="rounded-2xl glass p-4 sm:p-5 shadow-xl backdrop-blur-xl text-right">
              <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest font-semibold mb-1">Tenants Billed</div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-blue-1">2,341</div>
              <div className="mt-2 text-[10px] sm:text-xs font-medium text-blue-1 bg-blue-1/10 rounded-full px-2 py-1 inline-flex items-center gap-1">
                100% automated
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
