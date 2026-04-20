import { useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Leaf, Recycle, ShieldCheck, Sprout, TreePine, Users } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { AnimatedText } from "@/components/AnimatedText";
import { Counter } from "@/components/Stats";

const PILLARS = [
  { icon: TreePine, title: "Net Zero acceleration", body: "Real-time carbon accounting at meter level — every kWh tagged to a Scope 1/2/3 bucket." },
  { icon: Recycle, title: "Circular energy", body: "Recover, reuse and rebalance loads across cooling, lighting and mobility infrastructure." },
  { icon: Users, title: "Tenant equity", body: "Transparent, auditable bills make sub-metered energy fair for every occupant in the building." },
  { icon: ShieldCheck, title: "Compliance ready", body: "ISO 50001, BRSR, GRI and BEE — reporting templates produced from your live data, not spreadsheets." },
];

const COMMITMENTS = [
  { year: "2026", title: "100% sub-meter coverage", body: "Across all PROsmart Energy customer portfolios." },
  { year: "2027", title: "Carbon-neutral platform ops", body: "All cloud workloads matched with verified renewable energy." },
  { year: "2030", title: "1 GWh saved annually", body: "Aggregate measurable savings across our customer base." },
];

const Sustainability = () => {
  useLenis();

  useEffect(() => {
    document.title = "Sustainability — PROsmart Energy";
    const meta = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
      return m;
    })();
    meta.setAttribute("content", "PROsmart Energy sustainability — net-zero acceleration, circular energy, tenant equity and ISO-ready compliance for smart buildings.");
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ScrollProgress />
      <CustomCursor />
      <Header />
      <ThemeToggle />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-40 pb-24">
          <div className="pointer-events-none absolute -top-24 left-[10%] h-96 w-96 rounded-full bg-[hsl(var(--green-1)/0.45)] blur-3xl" />
          <div className="pointer-events-none absolute top-20 right-[6%] h-[28rem] w-[28rem] rounded-full bg-[hsl(var(--green-2)/0.4)] blur-3xl" />
          <div className="absolute inset-0 bg-grid" />

          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium"
            >
              <Leaf size={12} className="text-green-1" />
              <span className="text-muted-foreground">Sustainability</span>
            </motion.div>

            <AnimatedText as="h1" text="Every kWh," className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl" />
            <AnimatedText as="h1" text="counted &amp; cut." className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-green-1 sm:text-6xl md:text-7xl lg:text-8xl" delay={0.15} />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 max-w-2xl text-lg text-muted-foreground"
            >
              We help real-estate developers and enterprises hit their net-zero commitments — with real-time meter data, audit-grade reporting and tenant-level accountability built in.
            </motion.p>

            {/* Stat counters */}
            <div className="mt-14 grid gap-6 sm:grid-cols-3">
              {[
                { value: 1240, suffix: " t", label: "CO₂ avoided / yr" },
                { value: 3800000, suffix: " kWh", label: "Energy saved / yr" },
                { value: 40, suffix: "M sq.ft", label: "Portfolio monitored" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="surface rounded-3xl p-6"
                >
                  <div className="font-display text-4xl font-bold text-green-1">
                    <Counter value={s.value} />{s.suffix}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="py-24">
          <div className="container">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                <Sprout size={12} className="text-green-1" /> Pillars
              </div>
              <AnimatedText as="h2" text="Four pillars of impact." className="font-display text-4xl font-bold tracking-tight md:text-5xl" />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {PILLARS.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="surface tilt-card relative overflow-hidden rounded-3xl p-7"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--green-1)/0.18)] text-green-1">
                    <p.icon size={22} />
                  </div>
                  <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Commitments */}
        <section className="relative py-24">
          <div className="container">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <AnimatedText as="h2" text="Our commitments." className="font-display text-4xl font-bold tracking-tight md:text-5xl" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {COMMITMENTS.map((c, i) => (
                <motion.div
                  key={c.year}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="surface relative overflow-hidden rounded-3xl p-6"
                >
                  <div className="absolute right-4 top-4 text-xs font-semibold uppercase tracking-[0.22em] text-green-1">{c.year}</div>
                  <div className="mt-6 font-display text-xl font-semibold">{c.title}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Report CTA */}
        <section className="pb-32 pt-12">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="surface relative overflow-hidden rounded-[2rem] p-10 md:p-14"
            >
              <div className="absolute -top-20 right-10 h-72 w-72 rounded-full bg-[hsl(var(--green-1)/0.4)] blur-3xl" />
              <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                <div>
                  <h3 className="font-display text-3xl font-bold md:text-4xl">Read our 2026 sustainability report.</h3>
                  <p className="mt-2 max-w-xl text-muted-foreground">A deep-dive on emissions avoided, kWh saved and what we&apos;re tackling next across our customer portfolios.</p>
                </div>
                <a
                  href="#"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)]"
                >
                  <Download size={16} /> Download PDF
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Sustainability;
