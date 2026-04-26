import { useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, Compass, HeartHandshake, Sparkles, Target, Users } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { AnimatedText } from "@/components/AnimatedText";
import { CTA } from "@/components/CTA";
import sirajPhoto from "@/assets/team-siraj.png";

const TIMELINE = [
  { year: "2018", title: "Founded in Chennai", body: "Probiz Automation begins with a mission to bring smart energy intelligence to Indian buildings." },
  { year: "2020", title: "First 1M sq.ft", body: "PROsmart deployed across early enterprise campuses, automating tenant billing for 200+ tenants." },
  { year: "2022", title: "ISO 50001 partner", body: "Launched compliance-ready analytics, helping clients achieve global energy management certification." },
  { year: "2024", title: "GCC expansion", body: "Operations expand into UAE & KSA, with multi-utility billing for mixed-use developments." },
  { year: "2026", title: "Today", body: "PROsmart Energy unifies EB, DG, HVAC, water and gas across 40M+ sq.ft of real estate." },
];

const VALUES = [
  { icon: Target, title: "Outcomes over outputs", body: "We obsess over real savings, real compliance and real tenant experience — not vanity metrics." },
  { icon: HeartHandshake, title: "Customer in the room", body: "Every roadmap call starts with a facility, finance or sustainability lead from a real building." },
  { icon: Compass, title: "Engineered for trust", body: "Audit-grade billing, encrypted edge gateways, and ISO-aligned processes by default." },
];

const TEAM: Array<{ name: string; role: string; initials: string; photo?: string }> = [
  { name: "Siraj", role: "Director & CEO", initials: "S", photo: sirajPhoto },
  { name: "Abdul Rahuman", role: "Product Marketer & Developer", initials: "AR" },
  { name: "Rajendiran M", role: "Cloud DevOps Engineer", initials: "RM" },
  { name: "Deepan", role: "Software Developer", initials: "D" },
  { name: "Sanjay", role: "Application Developer", initials: "S" },
];

const About = () => {
  useLenis();

  useEffect(() => {
    document.title = "About — PROsmart Energy";
    const meta = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
      return m;
    })();
    meta.setAttribute("content", "About PROsmart Energy — the team, story and mission behind the next-gen energy monitoring and automated billing platform.");
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
          <div className="pointer-events-none absolute -top-32 left-[8%] h-80 w-80 rounded-full bg-[hsl(var(--green-1)/0.4)] blur-3xl" />
          <div className="pointer-events-none absolute top-20 right-[8%] h-96 w-96 rounded-full bg-[hsl(var(--green-2)/0.35)] blur-3xl" />
          <div className="absolute inset-0 bg-grid" />

          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-1 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-1" />
              </span>
              <span className="text-muted-foreground">About PROsmart Energy</span>
            </motion.div>

            <AnimatedText as="h1" text="Powering smarter," className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl" />
            <AnimatedText as="h1" text="greener buildings." className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-green-1 sm:text-6xl md:text-7xl lg:text-8xl" delay={0.15} />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 max-w-2xl text-lg text-muted-foreground"
            >
              We&apos;re a team of energy engineers, software builders and sustainability leads on a mission to make every kilowatt-hour visible, accountable and optimisable — for developers, enterprises and tenants alike.
            </motion.p>
          </div>
        </section>

        {/* Mission / Vision / Values */}
        <section className="py-24">
          <div className="container">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <AnimatedText as="h2" text="What we stand for." className="font-display text-4xl font-bold tracking-tight md:text-5xl" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="surface tilt-card relative overflow-hidden rounded-3xl p-7"
                >
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--green-1)/0.18)] text-green-1">
                    <v.icon size={22} />
                  </div>
                  <h3 className="font-display text-xl font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="relative py-24">
          <div className="container">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                <Sparkles size={12} className="text-green-1" /> Our journey
              </div>
              <AnimatedText as="h2" text="Eight years, one mission." className="font-display text-4xl font-bold tracking-tight md:text-5xl" />
            </div>

            <div className="relative mx-auto max-w-3xl">
              <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2" />
              {TIMELINE.map((t, i) => (
                <motion.div
                  key={t.year}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className={`relative mb-10 flex flex-col gap-3 md:flex-row md:items-start ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="absolute left-4 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-green-1 ring-4 ring-background md:left-1/2" />
                  <div className="ml-10 md:ml-0 md:w-1/2 md:px-8">
                    <div className="surface rounded-2xl p-5">
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-green-1">{t.year}</div>
                      <h3 className="mt-1 font-display text-lg font-semibold">{t.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{t.body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24">
          <div className="container">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                <Users size={12} className="text-green-1" /> Leadership
              </div>
              <AnimatedText as="h2" text="The people behind it." className="font-display text-4xl font-bold tracking-tight md:text-5xl" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {TEAM.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="surface tilt-card overflow-hidden rounded-3xl p-6 text-center"
                >
                  {m.photo ? (
                    <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full ring-2 ring-[hsl(var(--green-1)/0.4)] ring-offset-2 ring-offset-background">
                      <img src={m.photo} alt={`${m.name} — ${m.role}`} className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-110" loading="lazy" />
                    </div>
                  ) : (
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(var(--green-1)/0.18)] font-display text-2xl font-bold text-green-1">
                      {m.initials}
                    </div>
                  )}
                  <div className="font-display text-base font-semibold">{m.name}</div>
                  <div className="text-xs text-muted-foreground">{m.role}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>

      <Footer />
    </div>
  );
};

export default About;
