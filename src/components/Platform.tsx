import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedText } from "./AnimatedText";
import smartBuilding from "@/assets/smart-building.jpg";

const COLORS = ["bg-brand-1 text-white", "bg-brand-2 text-white", "bg-brand-3 text-blue-1", "bg-brand-4 text-blue-1"];

export const Platform = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [200, -200]);

  return (
    <section id="platform" ref={ref} className="relative py-32">
      <div className="container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-2" />
            Platform Overview
          </div>
          <AnimatedText
            as="h2"
            text="Smart energy management cloud platform."
            className="font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl"
          />
          <AnimatedText
            as="p"
            delay={0.2}
            className="mt-6 text-lg text-muted-foreground text-balance mx-auto max-w-2xl"
            text="Cut energy use, costs, and carbon footprints with enhanced data visibility, actionable insights, automation, data-driven maintenance, and smart problem isolation. PROsmart supports enterprises in achieving ISO 50001 compliance."
          />
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div style={{ y }} className="relative will-change-transform">
            <div className="absolute -inset-6 rounded-[2rem] bg-brand-4/60 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl surface p-2">
              <img
                src={smartBuilding}
                alt="Smart connected building"
                width={1280}
                height={1280}
                loading="lazy"
                className="aspect-square rounded-2xl object-cover opacity-90"
              />
            </div>
          </motion.div>

          <div className="space-y-5">
            {[
              { title: "Unified energy + electrical data", body: "Integrate consumption, distribution, and power quality data across your portfolio." },
              { title: "Faults & utilisation insights",    body: "Detect faults early and optimise utilisation through continuous diagnostics." },
              { title: "Efficiency programs",              body: "Run targeted efficiency programs and measure outcomes in real time." },
              { title: "Maintenance & diagnostics",        body: "Periodic, data-driven maintenance keeps systems running at peak performance." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group relative overflow-hidden rounded-2xl surface p-6 tilt-card"
              >
                <div className="relative flex items-start gap-4">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-sm font-bold ${COLORS[i]}`}>
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
