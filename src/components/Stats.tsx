import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 30,    suffix: "%",  label: "Avg. energy cost reduction", color: "bg-brand-1 text-white" },
  { value: 100,   suffix: "%",  label: "Automated tenant billing",   color: "bg-brand-2 text-white" },
  { value: 24,    suffix: "/7", label: "Real-time monitoring",       color: "bg-brand-3 text-blue-1" },
  { value: 50001, suffix: "",   label: "ISO compliance ready", prefix: "ISO ", color: "bg-brand-4 text-blue-1" },
];

const Counter = ({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1600;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(Math.floor(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <span ref={ref}>{prefix}{n.toLocaleString()}{suffix}</span>;
};

export const Stats = () => (
  <section className="relative py-24">
    <div className="container">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className={`group relative overflow-hidden rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1 ${s.color}`}
          >
            <div className="font-display text-4xl font-bold md:text-5xl">
              <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </div>
            <div className="mt-2 text-sm opacity-90">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
