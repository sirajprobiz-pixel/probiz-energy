import { motion } from "framer-motion";
import { Activity, Cpu, Gauge, Network, ShieldCheck, Zap } from "lucide-react";
import { AnimatedText } from "./AnimatedText";

const FEATURES = [
  { icon: Gauge,       color: "bg-brand-1 text-white", title: "BTU Meter Integration",  body: "Precise billing for cooling systems — a critical requirement in India and the Middle East." },
  { icon: Network,     color: "bg-brand-2 text-white", title: "Multi-Meter Integration", body: "Unified billing for electricity, gas and water across diverse utility setups." },
  { icon: Cpu,         color: "bg-brand-3 text-blue-1", title: "BACnet Support",         body: "Seamless integration with Building Management Systems for centralised monitoring." },
  { icon: Activity,    color: "bg-brand-4 text-blue-1", title: "Real-Time Monitoring",   body: "Instant insights into energy usage so you can optimise and reduce costs." },
  { icon: ShieldCheck, color: "bg-brand-1 text-white", title: "Automation & Accuracy",   body: "Eliminate manual errors with automated billing — transparent and reliable." },
  { icon: Zap,         color: "bg-brand-2 text-white", title: "ISO 50001 Ready",         body: "Built to support enterprises in achieving and maintaining ISO 50001 compliance." },
];

export const Features = () => {
  return (
    <section id="features" className="relative py-32">
      <div className="container relative">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-1" />
            Features & Benefits
          </div>
          <AnimatedText
            as="h2"
            text="Built for the future of utility management."
            className="font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-border tilt-card"
            >
              <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${f.color} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              <div className="mt-6 flex items-center gap-1 text-xs text-muted-foreground/60 transition-colors group-hover:text-blue-1">
                Learn more
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
