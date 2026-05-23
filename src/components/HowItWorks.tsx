import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Cpu, Cloud, BarChart3, Receipt } from "lucide-react";
import { AnimatedText } from "./AnimatedText";
import brandLogo from "@/assets/logo.png";
import proxWork from "@/assets/workprox.png";

const STEPS = [
  {
    icon: Cpu,
    title: "Install smart meters",
    body: "Plug-and-play BTU, energy and multi-utility meters integrate with your existing electrical infrastructure in hours, not weeks.",
    color: "bg-brand-4 text-white",
  },
  {
    icon: Cloud,
    title: "Stream to the cloud",
    body: "Secure edge gateways push real-time consumption data to the PROsmart cloud over BACnet, Modbus or LoRaWAN.",
    color: "bg-brand-3 text-white",
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
            <img src={brandLogo} alt="" className="h-4 w-4 object-contain" />
            How it works
          </div>
          <AnimatedText
            as="h2"
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
            text="From meter to invoice, fully automated."
          />
          <AnimatedText
            as="p"
            delay={0.2}
            className="mt-6 text-lg text-muted-foreground text-balance"
            text="Four simple steps take you from raw electrical data to insight-driven decisions and tenant-ready bills — without lifting a finger."
          />
        </div>

        <div className="relative grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="relative mx-auto w-full max-w-5xl">
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

          {/* PROX at work — sticky illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto hidden w-full max-w-sm lg:sticky lg:top-24 lg:mx-0 lg:block"
          >
            <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
              <div className="h-[80%] w-[80%] rounded-full bg-[hsl(var(--blue-3)/0.35)] blur-3xl" />
            </div>
            <motion.img
              src={proxWork}
              alt="PROX at work"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 h-auto w-full object-contain drop-shadow-[0_30px_45px_hsl(var(--blue-3)/0.4)]"
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-2 left-2 z-20 rounded-2xl rounded-bl-sm border border-border bg-background/90 px-4 py-2.5 text-sm font-medium shadow-[0_18px_40px_-18px_hsl(0_0%_0%/0.45)] backdrop-blur"
            >
              <span className="mr-1.5">⚡</span>
              PROX on the build
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
