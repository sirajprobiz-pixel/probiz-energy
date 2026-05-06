import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Activity, Cpu, Gauge, Network, ShieldCheck, Zap } from "lucide-react";
import { AnimatedText } from "./AnimatedText";
import brandLogo from "@/assets/logo.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const FEATURES = [
  {
    icon: Gauge, color: "bg-brand-1 text-white",
    title: "BTU Meter Integration",
    body: "Precise billing for cooling systems — a critical requirement in India and the Middle East.",
    details: "Our BTU integration captures chilled water flow, supply/return temperatures and computes tonnage in real time. Sub-metered billing is generated per tenant per cycle with full audit trail. Supports Belimo, Onicon, Kamstrup and Sontex BTU meters out of the box, with Modbus RTU/TCP and M-Bus protocols.",
    benefits: ["Tenant-wise cooling cost allocation", "Audit-ready BTU calculations", "ASHRAE-compliant reports", "Plug-and-play meter discovery"],
  },
  {
    icon: Network, color: "bg-brand-2 text-white",
    title: "Multi-Meter Integration",
    body: "Unified billing for electricity, gas and water across diverse utility setups.",
    details: "Aggregate EB, DG, gas and water meters from any vendor into a single billing engine. Automatically applies tariff slabs, fuel adjustments, GST and rebate logic per utility per tenant. One invoice, every utility, every cycle.",
    benefits: ["Unified invoice across utilities", "Vendor-agnostic meter support", "Configurable tariff engine", "Multi-currency & GST ready"],
  },
  {
    icon: Cpu, color: "bg-brand-3 text-white",
    title: "BACnet Support",
    body: "Seamless integration with Building Management Systems for centralised monitoring.",
    details: "Native BACnet/IP and BACnet MS/TP drivers connect PROsmart Energy directly to your BMS. Pull HVAC setpoints, AHU runtime and chiller telemetry alongside metering data — giving you a single pane of glass across building operations.",
    benefits: ["BACnet/IP & MS/TP drivers", "Bi-directional point exchange", "Schedule and setpoint sync", "Unified BMS + energy view"],
  },
  {
    icon: Activity, color: "bg-brand-4 text-white",
    title: "Real-Time Monitoring",
    body: "Instant insights into energy usage so you can optimise and reduce costs.",
    details: "Live load curves at 1-minute resolution with anomaly detection powered by ML. Get push, email and SMS alerts the moment consumption deviates from your baseline — catch faulty equipment and runaway loads before the bill arrives.",
    benefits: ["1-minute live granularity", "ML-driven anomaly alerts", "Push / email / SMS notifications", "Historical playback up to 7 years"],
  },
  {
    icon: ShieldCheck, color: "bg-brand-1 text-white",
    title: "Automation & Accuracy",
    body: "Eliminate manual errors with automated billing — transparent and reliable.",
    details: "From meter reading to invoice PDF — the entire billing pipeline runs without human intervention. Tenants receive itemised invoices on a fixed cycle with breakdowns by utility, slab and tax. Disputes drop by 90%+ in our customer base.",
    benefits: ["Zero manual readings", "Auto-generated PDF invoices", "Tenant self-service portal", "Dispute reduction up to 95%"],
  },
  {
    icon: Zap, color: "bg-brand-2 text-white",
    title: "ISO 50001 Ready",
    body: "Built to support enterprises in achieving and maintaining ISO 50001 compliance.",
    details: "Pre-built energy performance indicators (EnPIs), baseline tracking, M&V protocols and audit logs aligned with ISO 50001:2018. Generate compliance-ready reports in one click for your certification body.",
    benefits: ["EnPI dashboards out of the box", "M&V Option B & C support", "Audit log retention", "One-click compliance reports"],
  },
];

export const Features = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const active = openIdx !== null ? FEATURES[openIdx] : null;

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const headingY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.3]);
  const bgBlobY = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const gridY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="features" ref={ref} className="relative py-32 overflow-hidden">
      {/* Parallax background blobs */}
      <motion.div style={{ y: bgBlobY }} className="pointer-events-none absolute inset-0 will-change-transform">
        <div className="absolute -top-24 left-[15%] h-80 w-80 rounded-full bg-[hsl(var(--green-1)/0.18)] blur-3xl" />
        <div className="absolute bottom-10 right-[10%] h-72 w-72 rounded-full bg-[hsl(var(--green-2)/0.15)] blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 h-60 w-60 rounded-full bg-brand-1/10 blur-3xl" />
      </motion.div>

      <div className="container relative">
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="mx-auto mb-16 max-w-4xl text-center will-change-transform"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <img src={brandLogo} alt="" className="h-4 w-4 object-contain" />
            Features & Benefits
          </div>
          <AnimatedText
            as="h2"
            text="Built for the future of utility management."
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl pb-2"
          />
        </motion.div>

        <motion.div
          style={{ y: gridY }}
          className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 will-change-transform"
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-3xl surface p-7 tilt-card"
            >
              <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${f.color} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              <button
                type="button"
                onClick={() => setOpenIdx(i)}
                className="mt-6 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground/70 transition-colors hover:text-green-1"
              >
                Learn more
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Dialog open={openIdx !== null} onOpenChange={(o) => !o && setOpenIdx(null)}>
        <DialogContent className="max-w-2xl rounded-3xl border-border bg-card p-0 overflow-hidden">
          {active && (
            <div className="p-8">
              <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${active.color}`}>
                <active.icon className="h-6 w-6" />
              </div>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl font-bold leading-tight md:text-3xl">
                  {active.title}
                </DialogTitle>
                <DialogDescription className="text-base text-muted-foreground">
                  {active.body}
                </DialogDescription>
              </DialogHeader>
              <p className="mt-5 text-sm leading-relaxed text-foreground/80">
                {active.details}
              </p>
              <div className="mt-6">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Key benefits
                </div>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {active.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-1" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
