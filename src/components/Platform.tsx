import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedText } from "./AnimatedText";
import smartBuilding from "@/assets/smart-building.jpg";

export const Platform = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section id="platform" ref={ref} className="relative py-32">
      <div className="container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-neon-purple" />
            Platform Overview
          </motion.div>
          <AnimatedText
            as="h2"
            text="Smart energy management cloud platform."
            className="font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg text-muted-foreground text-balance"
          >
            Cut energy use, costs, and carbon footprints with enhanced data visibility,
            actionable insights, automation, data-driven maintenance, and smart problem isolation.
            PROsmart supports enterprises in achieving ISO 50001 compliance.
          </motion.p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div style={{ y }} className="relative">
            <div className="absolute -inset-6 bg-gradient-aurora opacity-30 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl glass-strong p-2">
              <motion.img
                style={{ scale: imgScale }}
                src={smartBuilding}
                alt="Smart connected building"
                width={1280}
                height={1280}
                loading="lazy"
                className="aspect-square rounded-2xl object-cover"
              />
            </div>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                title: "Unified energy + electrical data",
                body: "Integrate consumption, distribution, and power quality data across your portfolio.",
              },
              {
                title: "Faults & utilisation insights",
                body: "Detect faults early and optimise utilisation through continuous diagnostics.",
              },
              {
                title: "Efficiency programs",
                body: "Run targeted efficiency programs and measure outcomes in real time.",
              },
              {
                title: "Maintenance & diagnostics",
                body: "Periodic, data-driven maintenance keeps systems running at peak performance.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-2xl glass p-6 tilt-card"
                data-cursor-hover
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-aurora opacity-0 transition-all duration-700 group-hover:translate-x-0 group-hover:opacity-10" />
                <div className="relative flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-primary font-display text-sm font-bold">
                    0{i + 1}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
