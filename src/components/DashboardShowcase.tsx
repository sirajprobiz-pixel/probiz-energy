import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Receipt, Activity, Gauge, Clock } from "lucide-react";
import billing from "@/assets/dashboard-billing.jpg";
import consumption from "@/assets/dashboard-consumption.jpg";
import demand from "@/assets/dashboard-demand.jpg";
import tod from "@/assets/dashboard-tod.jpg";
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
];

export const DashboardShowcase = () => {
  const [active, setActive] = useState(TABS[0].id);
  const tab = TABS.find((t) => t.id === active)!;

  return (
    <section id="dashboard" className="relative pt-32 pb-16">
      <div className="container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-1" />
            Inside the platform
          </motion.div>
          <AnimatedText
            as="h2"
            delay={0.1}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
            text="Every screen built for energy teams."
          />
          <AnimatedText
            as="p"
            delay={0.2}
            className="mt-5 text-base text-muted-foreground text-balance md:text-lg"
            text="Switch between billing, consumption, demand and TOD views — every workflow your facility, finance and sustainability teams need."
          />
        </div>

        {/* Tab strip */}
        <div className="mx-auto mb-8 flex max-w-3xl flex-wrap items-center justify-center gap-2">
          {TABS.map((t) => {
            const Icon = t.icon;
            const isActive = t.id === active;
            return (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
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
                <Icon size={16} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Showcase frame */}
        <div className="relative mx-auto max-w-6xl">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-brand-1/20 blur-3xl" />
          <div className="relative rounded-3xl surface p-3 md:p-4">
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
                className="w-full rounded-2xl border border-border object-cover"
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
              className="mx-auto mt-10 max-w-3xl text-center"
            >
              <h3 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
                {tab.title}
              </h3>
              <p className="mt-3 text-base text-muted-foreground">{tab.body}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
