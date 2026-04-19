import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Cpu, Cloud, BarChart3, Receipt } from "lucide-react";
import { AnimatedText } from "./AnimatedText";

const STEPS = [
  {
    icon: Cpu,
    title: "Install smart meters",
    body: "Plug-and-play BTU, energy and multi-utility meters integrate with your existing electrical infrastructure in hours, not weeks.",
    color: "bg-brand-4 text-blue-1",
  },
  {
    icon: Cloud,
    title: "Stream to the cloud",
    body: "Secure edge gateways push real-time consumption data to the PROsmart cloud over BACnet, Modbus or LoRaWAN.",
    color: "bg-brand-3 text-blue-1",
  },
  {
    icon: BarChart3,
    title: "Visualise & optimise",
    body: "Live dashboards, AI anomaly detection and ISO 50001 reports help facility teams cut waste and prove savings.",
    color: "bg-brand-2 text-white",
  },
  {
    icon: Receipt,
    title: "Automate billing",
    body: "Generate accurate, tenant-wise invoices automatically every cycle — no spreadsheets, no manual readings, no disputes.",
    color: "bg-brand-1 text-white",
  },
];

export const HowItWorks = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

  return (
    <section id="how-it-works" ref={ref} className="relative py-32">
      <div className="container">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-1" />
            How it works
          </div>
          <AnimatedText
            as="h2"
            className="font-display text-4xl font-bold leading-tight md:text-6xl"
            text="From meter to invoice, fully automated."
          />
          <AnimatedText
            as="p"
            delay={0.2}
            className="mt-6 text-lg text-muted-foreground text-balance"
            text="Four simple steps take you from raw electrical data to insight-driven decisions and tenant-ready bills — without lifting a finger."
          />
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Animated vertical timeline */}
          <div className="absolute left-7 top-0 hidden h-full w-px bg-border md:block">
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-0 top-0 w-px bg-brand-1 will-change-[height]"
            />
          </div>

          <div className="space-y-8">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex gap-6 md:gap-10"
              >
                <div className="relative z-10 flex shrink-0 items-start">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.6)] ${s.color}`}>
                    <s.icon className="h-6 w-6" />
                  </div>
                </div>
                <div className="flex-1 rounded-2xl surface p-6 tilt-card md:p-8">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Step 0{i + 1}
                  </div>
                  <h3 className="font-display text-2xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-muted-foreground">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
