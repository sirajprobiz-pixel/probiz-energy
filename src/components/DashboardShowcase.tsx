import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Receipt, Activity, Gauge, Clock, Zap } from "lucide-react";
import billing from "@/assets/dashboard-billing.jpg";
import consumption from "@/assets/dashboard-consumption.jpg";
import demand from "@/assets/dashboard-demand.jpg";
import tod from "@/assets/dashboard-tod.jpg";
import smartMeter from "@/assets/smartmeter.webp";
import dashboardLive from "@/assets/dashboard-live.png";
import dashboardBillingFull from "@/assets/dashboard-billing-full.png";
import brandLogo from "@/assets/logo.png";
import { AnimatedText } from "./AnimatedText";

const TABS = [
  { id: "billing", label: "Billing Info", icon: Receipt, image: billing,
    title: "Enterprise-wide billing configuration",
    body: "Manage taxation, GST, fuel adjustments, maintenance and billing cycles from a single live tax engine. Predictive billing insights project your next invoice in real time." },
  { id: "consumption", label: "Consumption", icon: Activity, image: consumption,
    title: "Historical consumption logs across utilities",
    body: "Track EB, DG, water, HVAC and gas consumption with real-time monitoring records, intensity benchmarks, and year-over-year deltas — all in one feed." },
  { id: "demand", label: "Demand Cost", icon: Gauge, image: demand,
    title: "Real-time demand monitoring & rate slabs",
    body: "Configure kVA slabs and rates, watch demand curves move hour by hour, and surface optimisation peaks and threshold alerts before they become penalties." },
  { id: "tod", label: "TOD & Losses", icon: Clock, image: tod,
    title: "Time-of-day pricing and HT/LT loss tracking",
    body: "Define peak, standard and off-peak windows, log HT/LT losses, and generate detailed billable consumption reports — with an optimised-load efficiency score." },
  { id: "metering", label: "Smart Metering", icon: Zap, image: smartMeter,
    title: "Precision smart metering hardware integration",
    body: "Seamlessly integrate smart energy meters that capture every kilowatt with sub-second precision — enabling accurate billing, real-time alerts, and predictive maintenance across your entire building portfolio." },
];

export const DashboardShowcase = () => {
  const [active, setActive] = useState(TABS[0].id);
  const tab = TABS.find((t) => t.id === active)!;

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const headingY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.3]);
  const showcaseY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const galleryLeftY = useTransform(scrollYProgress, [0, 1], [30, -50]);
  const galleryRightY = useTransform(scrollYProgress, [0, 1], [50, -30]);
  const bgBlobY = useTransform(scrollYProgress, [0, 1], [200, -200]);

  return (
    <section id="dashboard" ref={sectionRef} className="relative pt-24 pb-16 overflow-hidden sm:pt-32">
      {/* Parallax background blobs */}
      <motion.div style={{ y: bgBlobY }} className="pointer-events-none absolute inset-0 will-change-transform">
        <div className="absolute -top-32 right-[10%] h-80 w-80 rounded-full bg-[hsl(var(--green-1)/0.2)] blur-3xl" />
        <div className="absolute bottom-20 left-[5%] h-72 w-72 rounded-full bg-[hsl(var(--green-2)/0.15)] blur-3xl" />
      </motion.div>

      <div className="container relative">
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="mx-auto mb-10 max-w-3xl text-center will-change-transform sm:mb-14"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <img src={brandLogo} alt="" className="h-4 w-4 object-contain" />
            Inside the platform
          </motion.div>
          <AnimatedText
            as="h2"
            delay={0.1}
            className="font-display text-3xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl lg:text-8xl"
            text="Every screen built for energy teams."
          />
          <AnimatedText
            as="p"
            delay={0.2}
            className="mt-4 text-sm text-muted-foreground text-balance sm:mt-5 sm:text-base md:text-lg"
            text="Switch between billing, consumption, demand and TOD views — every workflow your facility, finance and sustainability teams need."
          />
        </motion.div>

        {/* Tab strip — horizontally scrollable on mobile */}
        <div className="mx-auto mb-6 flex max-w-4xl items-center justify-start gap-2 overflow-x-auto px-1 pb-2 scrollbar-hide sm:mb-8 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0">
          {TABS.map((t) => {
            const Icon = t.icon;
            const isActive = t.id === active;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`relative inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-colors sm:gap-2 sm:px-4 sm:text-sm ${
                  isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="dash-tab-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon size={14} className="sm:h-4 sm:w-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Showcase frame with parallax */}
        <motion.div style={{ y: showcaseY }} className="relative mx-auto max-w-6xl will-change-transform">
          <div className="absolute -inset-4 rounded-[2rem] bg-brand-1/20 blur-3xl sm:-inset-6 sm:rounded-[2.5rem]" />
          <div className="relative rounded-2xl surface p-2 sm:rounded-3xl sm:p-3 md:p-4">
            <AnimatePresence mode="wait">
              <motion.img
                key={tab.id}
                src={tab.image}
                alt={`PROsmart ${tab.label} dashboard`}
                width={1600}
                height={1200}
                loading="lazy"
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.99 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-full rounded-xl border border-border object-cover sm:rounded-2xl"
              />
            </AnimatePresence>
          </div>

          {/* Caption block */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id + "-caption"}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="mx-auto mt-6 max-w-3xl px-2 text-center sm:mt-10"
            >
              <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl md:text-3xl">
                {tab.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground sm:mt-3 sm:text-base">{tab.body}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── Dashboard Experience Gallery ── */}
        <div className="relative mt-20 sm:mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <img src={brandLogo} alt="" className="h-4 w-4 object-contain" />
              Smart Metering Dashboard Experience
            </div>
            <AnimatedText
              as="h2"
              delay={0.1}
              className="font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-7xl lg:text-8xl"
              text="Live data. Real control."
            />
            <AnimatedText
              as="p"
              delay={0.25}
              className="mt-4 text-sm text-muted-foreground text-balance sm:mt-5 sm:text-base md:text-lg"
              text="From live energy ring charts to granular billing breakdowns — see exactly how PROsmart delivers visibility to your facility and finance teams."
            />
          </motion.div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2">
            {/* Live Dashboard */}
            <motion.div
              style={{ y: galleryLeftY }}
              className="relative will-change-transform"
            >
              <div className="absolute -inset-3 rounded-[1.5rem] bg-[hsl(var(--green-1)/0.12)] blur-2xl sm:-inset-4 sm:rounded-[2rem]" />
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-xl surface sm:rounded-2xl"
              >
                <div className="p-2 sm:p-3">
                  <img
                    src={dashboardLive}
                    alt="PROsmart Live Monitoring — HVAC, Energy EB, DG, Water and Gas ring charts"
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="w-full rounded-lg border border-border object-cover sm:rounded-xl"
                  />
                </div>
                {/* Label below image — not overlapping */}
                <div className="flex items-center justify-between border-t border-border px-3 py-2.5 sm:px-4 sm:py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-1 animate-pulse" />
                    <span className="text-xs font-semibold text-foreground sm:text-sm">Live Monitoring</span>
                  </div>
                  <span className="hidden text-xs text-muted-foreground sm:inline">HVAC · EB · DG · Water · Gas</span>
                  <span className="text-[10px] text-muted-foreground sm:hidden">5 Utilities</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Billing Dashboard */}
            <motion.div
              style={{ y: galleryRightY }}
              className="relative will-change-transform"
            >
              <div className="absolute -inset-3 rounded-[1.5rem] bg-[hsl(var(--green-2)/0.10)] blur-2xl sm:-inset-4 sm:rounded-[2rem]" />
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden rounded-xl surface sm:rounded-2xl"
              >
                <div className="p-2 sm:p-3">
                  <img
                    src={dashboardBillingFull}
                    alt="PROsmart Billing Dashboard — billing rates, tenant breakdown and total cost"
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="w-full rounded-lg border border-border object-cover sm:rounded-xl"
                  />
                </div>
                {/* Label below image — not overlapping */}
                <div className="flex items-center justify-between border-t border-border px-3 py-2.5 sm:px-4 sm:py-3">
                  <div className="flex items-center gap-2">
                    <Receipt size={14} className="text-blue-1" />
                    <span className="text-xs font-semibold text-foreground sm:text-sm">Billing Overview</span>
                  </div>
                  <span className="hidden text-xs text-muted-foreground sm:inline">67 Devices · 14 Floors</span>
                  <span className="text-[10px] text-muted-foreground sm:hidden">67 Devices</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
