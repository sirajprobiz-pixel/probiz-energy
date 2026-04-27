import { motion, useInView, useScroll, useTransform } from "framer-motion";
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

export const Stats = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [120, -120]);

  // Staggered parallax offsets for each card
  const y0 = useTransform(scrollYProgress, [0, 1], [40, -60]);
  const y1 = useTransform(scrollYProgress, [0, 1], [70, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -70]);
  const y3 = useTransform(scrollYProgress, [0, 1], [80, -30]);
  const cardYs = [y0, y1, y2, y3];

  return (
    <section ref={sectionRef} className="relative py-24 overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0 will-change-transform">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-[hsl(var(--green-1)/0.12)] blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-brand-1/10 blur-3xl" />
      </motion.div>

      <div className="container relative">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              style={{ y: cardYs[i] }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className={`group relative overflow-hidden rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1 will-change-transform ${s.color}`}
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
};
