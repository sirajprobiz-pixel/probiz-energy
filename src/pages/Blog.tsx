import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Mail, Tag, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useLenis } from "@/hooks/useLenis";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { AnimatedText } from "@/components/AnimatedText";
import { toast } from "sonner";

const CATEGORIES = ["All", "Energy", "Automation", "Compliance", "Case studies"] as const;

type Category = typeof CATEGORIES[number];

const FEATURED = {
  category: "Case studies" as Category,
  title: "How a 14-tower campus eliminated meter disputes overnight",
  excerpt: "A look at how PROsmart Energy unified EB, DG, HVAC and water billing across 2,300 tenants in under 60 days.",
  author: "Priya Nair",
  date: "Apr 12, 2026",
  readTime: "8 min read",
};

const POSTS: Array<{ category: Category; title: string; excerpt: string; author: string; date: string; readTime: string }> = [
  { category: "Energy", title: "Sub-metering 101: a developer's checklist", excerpt: "Everything you need to know before specifying meters for your next mixed-use development.", author: "Vikram Shah", date: "Apr 04, 2026", readTime: "6 min" },
  { category: "Automation", title: "BACnet vs Modbus: when to use which", excerpt: "A practical decision tree for facility managers integrating new edge gateways.", author: "Arun Kumar", date: "Mar 28, 2026", readTime: "5 min" },
  { category: "Compliance", title: "Mapping your meters to ISO 50001", excerpt: "How to structure energy data so it produces audit-ready reports automatically.", author: "Sara Mathew", date: "Mar 20, 2026", readTime: "7 min" },
  { category: "Energy", title: "Why DG runs are silently inflating your bill", excerpt: "Three signals from your meters that say your generators are working harder than they should.", author: "Vikram Shah", date: "Mar 12, 2026", readTime: "4 min" },
  { category: "Automation", title: "What good tenant billing actually looks like", excerpt: "Five non-obvious things great automated billing flows get right (and most don't).", author: "Priya Nair", date: "Mar 04, 2026", readTime: "6 min" },
  { category: "Case studies", title: "From 22% to 8% peak demand penalty", excerpt: "How one IT campus used live load curves to flatten its demand profile in a quarter.", author: "Arun Kumar", date: "Feb 22, 2026", readTime: "9 min" },
];

const Blog = () => {
  useLenis();
  const [filter, setFilter] = useState<Category>("All");

  useEffect(() => {
    document.title = "Blog — PROsmart Energy";
    const meta = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
      return m;
    })();
    meta.setAttribute("content", "Insights, case studies and how-tos from the PROsmart Energy team — energy, automation, compliance and tenant billing.");
  }, []);

  const filtered = filter === "All" ? POSTS : POSTS.filter((p) => p.category === filter);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ScrollProgress />
      <CustomCursor />
      <Header />
      <ThemeToggle />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-40 pb-16">
          <div className="pointer-events-none absolute -top-24 left-[8%] h-80 w-80 rounded-full bg-[hsl(var(--green-1)/0.4)] blur-3xl" />
          <div className="pointer-events-none absolute top-20 right-[8%] h-80 w-80 rounded-full bg-[hsl(var(--green-2)/0.35)] blur-3xl" />
          <div className="absolute inset-0 bg-grid" />

          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium"
            >
              <Tag size={12} className="text-green-1" />
              <span className="text-muted-foreground">Insights & stories</span>
            </motion.div>

            <AnimatedText as="h1" text="Field notes from" className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl" />
            <AnimatedText as="h1" text="smart buildings." className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-green-1 sm:text-6xl md:text-7xl lg:text-8xl" delay={0.15} />
          </div>
        </section>

        {/* Featured */}
        <section className="pb-12">
          <div className="container">
            <motion.article
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="surface relative overflow-hidden rounded-[2rem] p-8 md:p-12"
            >
              <div className="absolute -top-20 right-10 h-72 w-72 rounded-full bg-[hsl(var(--green-1)/0.35)] blur-3xl" />
              <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr]">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--green-1)/0.18)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-green-1">
                    Featured · {FEATURED.category}
                  </div>
                  <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">{FEATURED.title}</h2>
                  <p className="mt-4 max-w-xl text-muted-foreground">{FEATURED.excerpt}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><User size={12} /> {FEATURED.author}</span>
                    <span className="inline-flex items-center gap-1.5"><Calendar size={12} /> {FEATURED.date}</span>
                    <span>{FEATURED.readTime}</span>
                  </div>
                  <a href="#" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-green-1 hover:underline">
                    Read the story <ArrowRight size={14} />
                  </a>
                </div>
                <div className="aspect-[4/3] rounded-2xl bg-[hsl(var(--green-1)/0.12)] ring-1 ring-border" />
              </div>
            </motion.article>
          </div>
        </section>

        {/* Filters */}
        <section className="pb-6">
          <div className="container">
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
                    filter === c
                      ? "border-transparent bg-green-1 text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="pb-24">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p, i) => (
                <motion.article
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="surface tilt-card group overflow-hidden rounded-3xl"
                >
                  <div className="aspect-[16/10] bg-[hsl(var(--green-1)/0.1)] ring-1 ring-border" />
                  <div className="p-6">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {p.category}
                    </div>
                    <h3 className="font-display text-lg font-semibold leading-snug">{p.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>{p.author} · {p.date}</span>
                      <span>{p.readTime}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="pb-32">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="surface relative overflow-hidden rounded-[2rem] p-10 md:p-14"
            >
              <div className="absolute -top-20 left-10 h-72 w-72 rounded-full bg-[hsl(var(--green-2)/0.35)] blur-3xl" />
              <div className="relative grid gap-6 md:grid-cols-[1.3fr_1fr] md:items-center">
                <div>
                  <h3 className="font-display text-3xl font-bold md:text-4xl">Get the monthly field notes.</h3>
                  <p className="mt-2 max-w-xl text-muted-foreground">One thoughtful email a month — no spam, no fluff. Just what we&apos;re seeing in real buildings.</p>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    const email = String(fd.get("email") || "");
                    if (!email.includes("@")) return toast.error("Please enter a valid email");
                    toast.success("Subscribed — see you next month 👋");
                    e.currentTarget.reset();
                  }}
                  className="flex flex-col gap-2 sm:flex-row"
                >
                  <div className="relative flex-1">
                    <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="w-full rounded-full border border-border bg-card px-10 py-3 text-sm outline-none focus:border-green-1"
                    />
                  </div>
                  <button type="submit" className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)]">
                    Subscribe
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
