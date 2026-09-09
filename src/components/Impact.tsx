import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import brandLogo from "@/assets/logo.png";

const CASES = [
  {
    tag: "Mixed-use development",
    metric: "₹38L",
    label: "Annual energy savings",
    body: "A 24-tower premium residential project automated tenant billing across 1,800 units and cut common-area energy waste by 22% in the first year.",
    accent: "text-blue-1",
    chip: "bg-brand-1/15 text-blue-1",
  },
  {
    tag: "Commercial portfolio",
    metric: "100%",
    label: "Billing accuracy",
    body: "Probiz Energy replaced manual meter walks across 14 office towers — eliminating disputes and reclaiming 60+ hours of facility-team work every month.",
    accent: "text-blue-2",
    chip: "bg-brand-2/15 text-blue-2",
  },
  {
    tag: "Hospitality chain",
    metric: "ISO 50001",
    label: "Compliance achieved",
    body: "A national hotel group hit ISO 50001 in 8 months using Probiz Energy's continuous diagnostics, audit-ready reports and AI anomaly alerts.",
    accent: "text-blue-3",
    chip: "bg-brand-3/15 text-blue-3",
  },
];

export const Impact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], [250, -250]);

  return (
    <section id="impact" ref={ref} className="relative overflow-hidden pt-16 pb-32">
      <motion.div style={{ y: yBg }} className="pointer-events-none absolute inset-0 will-change-transform">
        <div className="absolute -top-20 right-[10%] h-72 w-72 rounded-full bg-brand-3/20 blur-3xl" />
        <div className="absolute bottom-0 left-[5%] h-80 w-80 rounded-full bg-brand-1/15 blur-3xl" />
      </motion.div>

      <div className="container relative">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <img src={brandLogo} alt="" className="h-4 w-4 object-contain" />
            Real-world impact
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl pb-2"
          >
            Buildings running smarter, <span className="text-green-1 inline-block">bills running themselves.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lg text-muted-foreground text-balance"
          >
            From single towers to nationwide portfolios — Probiz Energy turns metering data into measurable savings.
          </motion.p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {CASES.map((c, i) => (
            <motion.article
              key={c.tag}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl surface p-8 tilt-card"
            >
              <div>
                <span className={`inline-block rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wider ${c.chip}`}>
                  {c.tag}
                </span>
                <div className="mt-8">
                  <div className={`font-display text-6xl font-bold leading-none ${c.accent}`}>{c.metric}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{c.label}</div>
                </div>
              </div>
              <p className="mt-10 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
