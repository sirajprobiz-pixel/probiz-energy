import { motion } from "framer-motion";
import { Activity, Cpu, Gauge, Network, ShieldCheck, Zap } from "lucide-react";
import { AnimatedText } from "./AnimatedText";

const FEATURES = [
  { icon: Gauge, title: "BTU Meter Integration", body: "Precise billing for cooling systems — a critical requirement in India and the Middle East." },
  { icon: Network, title: "Multi-Meter Integration", body: "Unified billing for electricity, gas and water across diverse utility setups." },
  { icon: Cpu, title: "BACnet Support", body: "Seamless integration with Building Management Systems for centralised monitoring." },
  { icon: Activity, title: "Real-Time Monitoring", body: "Instant insights into energy usage so you can optimise and reduce costs." },
  { icon: ShieldCheck, title: "Automation & Accuracy", body: "Eliminate manual errors with automated billing — transparent and reliable." },
  { icon: Zap, title: "ISO 50001 Ready", body: "Built to support enterprises in achieving and maintaining ISO 50001 compliance." },
];

export const Features = () => {
  return (
    <section id="features" className="relative py-32">
      <div className="absolute inset-0 bg-aurora opacity-50" />
      <div className="container relative">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan" />
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-3xl glass p-7 tilt-card"
              data-cursor-hover
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-primary opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-30" />
              <div className="relative">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary/10 ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <f.icon className="h-5 w-5 text-neon-cyan" />
                </div>
                <h3 className="font-display text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
                <div className="mt-6 flex items-center gap-1 text-xs text-muted-foreground/60 transition-colors group-hover:text-neon-cyan">
                  Learn more
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
