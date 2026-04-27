import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ITEMS = [
  "BTU METERING", "MULTI-METER", "BACnet", "REAL-TIME", "AUTOMATED BILLING",
  "ISO 50001", "BMS INTEGRATION", "ENERGY ANALYTICS", "SMART BUILDINGS", "IoT READY",
];

const COLORS = ["bg-brand-1", "bg-brand-2", "bg-brand-3", "bg-brand-4"];

export const Marquee = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bandX = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-border bg-card/40 py-8">
      <motion.div
        style={{ x: bandX }}
        className="flex w-max marquee gap-16 whitespace-nowrap will-change-transform"
      >
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <div key={i} className="flex items-center gap-16">
            <span className="font-display text-2xl font-medium text-muted-foreground/80 md:text-3xl">{item}</span>
            <span className={`h-1.5 w-1.5 rounded-full ${COLORS[i % COLORS.length]}`} />
          </div>
        ))}
      </motion.div>
    </section>
  );
};
