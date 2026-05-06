import { motion } from "framer-motion";
import { Activity, Gauge, Zap, BarChart3 } from "lucide-react";
import brandLogo from "@/assets/logo.png";

const POINTS = [
  { icon: Activity, label: "Live telemetry", value: "30s refresh", color: "text-blue-1" },
  { icon: Gauge, label: "Power quality", value: "THD / PF / kVA", color: "text-blue-2" },
  { icon: Zap, label: "Load disaggregation", value: "Per-circuit AI", color: "text-blue-3" },
  { icon: BarChart3, label: "Tenant billing", value: "Auto-generated", color: "text-blue-1" },
];

export const DashboardIntro = () => {
  return (
    <section className="relative -mt-10 py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <img src={brandLogo} alt="" className="h-4 w-4 object-contain" />
            Dashboard Experience
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl"
          >
            One pane of glass for every kilowatt.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 text-base text-muted-foreground text-balance md:text-lg"
          >
            From live consumption and power quality to automated tenant invoices —
            PROsmart unifies the data your facility, finance, and sustainability teams need.
          </motion.p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {POINTS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-2xl surface p-5 tilt-card"
              >
                <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-5 ${p.color}`}>
                  <Icon size={18} />
                </div>
                <div className="font-display text-sm font-semibold">{p.label}</div>
                <div className="mt-1 text-xs text-muted-foreground">{p.value}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
