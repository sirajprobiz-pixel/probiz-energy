import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LOGOS = [
  "PRESTIGE", "DLF", "BRIGADE", "GODREJ", "OBEROI", "SOBHA", "LODHA", "EMBASSY",
  "HIRANANDANI", "RAHEJA", "MAHINDRA", "TATA REALTY",
];

export const TrustStrip = () => {
  const loop = [...LOGOS, ...LOGOS];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const headingY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="relative border-y border-border py-16 overflow-hidden">
      <div className="container">
        <motion.p
          style={{ y: headingY }}
          className="mb-10 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground will-change-transform"
        >
          Trusted by forward-thinking developers & enterprises
        </motion.p>
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
        <div className="marquee flex w-max gap-16 whitespace-nowrap">
          {loop.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="font-display text-2xl font-semibold tracking-wider text-muted-foreground/60 transition-colors hover:text-foreground"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
