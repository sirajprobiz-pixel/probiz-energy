import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 30, suffix: "%", label: "Avg. energy cost reduction" },
  { value: 100, suffix: "%", label: "Automated tenant billing" },
  { value: 24, suffix: "/7", label: "Real-time monitoring" },
  { value: 50001, suffix: "", label: "ISO compliance ready", prefix: "ISO " },
];

const Counter = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const dur = 1800;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(Math.floor(start + (value - start) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);
  return <span ref={ref}>{prefix}{n.toLocaleString()}{suffix}</span>;
};

export const Stats = () => (
  <section className="relative py-24">
    <div className="container">
      <div className="grid gap-px overflow-hidden rounded-3xl glass">
        <div className="grid grid-cols-2 gap-px lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative bg-card/40 p-8 backdrop-blur-xl transition-colors hover:bg-card/70"
            >
              <div className="font-display text-4xl font-bold gradient-text md:text-5xl">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
