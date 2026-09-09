import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ArrowRight, Calendar, Clock, Mail, Tag, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useLenis } from "@/hooks/useLenis";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollProgress } from "@/components/ScrollProgress";
import { AnimatedText } from "@/components/AnimatedText";
import { toast } from "sonner";
import blogFeaturedImg from "@/assets/blog-featured-campus.png";
import blogSubmeteringImg from "@/assets/blog-submetering.png";
import blogBacnetImg from "@/assets/blog-bacnet-modbus.png";
import blogIsoImg from "@/assets/blog-iso-compliance.png";
import blogDgImg from "@/assets/blog-dg-billing.png";
import blogTenantImg from "@/assets/blog-tenant-billing.png";
import blogPeakImg from "@/assets/blog-peak-demand.png";
import proxStories from "@/assets/storiesprox.png";

const CATEGORIES = ["All", "Energy", "Automation", "Compliance", "Case studies"] as const;

type Category = typeof CATEGORIES[number];

interface BlogPost {
  category: Category;
  title: string;
  excerpt: string;
  body: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

const FEATURED: BlogPost = {
  category: "Case studies",
  title: "How a 14-tower campus eliminated meter disputes overnight",
  excerpt: "A look at how Probiz Energy unified EB, DG, HVAC and water billing across 2,300 tenants in under 60 days.",
  body: "When a leading real-estate developer in Bangalore approached us, their 14-tower mixed-use campus was drowning in billing disputes. Over 2,300 tenants were serviced by four different meter vendors, three billing cycles and zero unified visibility.\n\nThe first step was deploying Probiz Energy edge gateways across every electrical panel — EB, DG, HVAC and water. Within 72 hours, every meter was streaming live readings to our cloud, normalized into a single schema regardless of make or protocol.\n\nNext, we configured automated billing rules: slab-based tariffs for EB, runtime-weighted DG cost allocation, and chilled-water BTU billing — all mapped to each tenant's lease terms. The finance team reviewed one consolidated dashboard instead of 14 spreadsheets.\n\nThe result? Meter disputes dropped from ~120/month to zero within the first billing cycle. Tenant satisfaction scores jumped 34%, and the campus finance team reclaimed over 80 person-hours per month. The entire rollout took 58 days from contract to go-live.",
  author: "Priya Nair",
  date: "Apr 12, 2026",
  readTime: "8 min read",
  image: blogFeaturedImg,
};

const POSTS: BlogPost[] = [
  { category: "Energy", title: "Sub-metering 101: a developer's checklist", excerpt: "Everything you need to know before specifying meters for your next mixed-use development.", body: "Sub-metering is the backbone of fair tenant billing in any mixed-use development. Yet most developers leave meter specification to the last mile — leading to costly retrofits and billing gaps.\n\nStart with the basics: identify every point of consumption. EB mains, DG feeds, HVAC branch circuits, water risers — each needs its own Class 1.0 (or better) meter with RS-485 or Ethernet output.\n\nChoose meters that support at least Modbus RTU. BACnet IP is a bonus for HVAC integration. Avoid proprietary protocols — they lock you into a single vendor ecosystem and make future upgrades painful.\n\nFinally, plan your communication backbone. A single RS-485 daisy chain can handle up to 32 devices over 1,200 metres. For larger campuses, use Ethernet gateways at each riser and aggregate to a central server. Document every meter's CT ratio, address, and location in a commissioning sheet — your billing team will thank you later.", author: "Vikram Shah", date: "Apr 04, 2026", readTime: "6 min", image: blogSubmeteringImg },
  { category: "Automation", title: "BACnet vs Modbus: when to use what", excerpt: "A practical decision tree for facility managers integrating new edge gateways.", body: "BACnet and Modbus are the two dominant protocols in building automation, and choosing between them isn't always straightforward.\n\nModbus RTU is the workhorse: simple, reliable, and supported by virtually every energy meter on the market. It uses a master-slave architecture over RS-485 and is perfect for point-to-point meter reading where you just need kWh, kVA, and power factor.\n\nBACnet IP shines when you need to integrate with BMS systems — AHUs, chillers, VAV boxes. It supports object-oriented discovery, meaning your gateway can automatically enumerate points without manual register mapping.\n\nOur rule of thumb: use Modbus for energy meters and simple I/O, and BACnet for HVAC and complex control loops. When both coexist on a campus, deploy a protocol-translating edge gateway that normalises everything into a single API. This way your monitoring layer doesn't care what's underneath.", author: "Arun Kumar", date: "Mar 28, 2026", readTime: "5 min", image: blogBacnetImg },
  { category: "Compliance", title: "Mapping your meters to ISO 50001", excerpt: "How to structure energy data so it produces audit-ready reports automatically.", body: "ISO 50001 requires organisations to establish an Energy Management System (EnMS) with measurable baselines, targets, and continual improvement. The key challenge? Structuring your meter data so audits become a button click, not a month-long exercise.\n\nStep one: define your energy boundaries. Group meters by Significant Energy Uses (SEUs) — typically HVAC, lighting, plug loads, and process equipment. Each SEU needs at least one dedicated meter or virtual meter (calculated from upstream minus downstream).\n\nStep two: establish baselines. Probiz Energy automatically computes rolling 12-month baselines with weather normalisation using degree-day regression. This satisfies clause 4.4.4 without manual spreadsheet gymnastics.\n\nStep three: set Energy Performance Indicators (EnPIs). Common ones include kWh per square metre, kWh per occupant, and COP for chiller plants. Configure alerts when any EnPI drifts beyond ±5% of target.\n\nWith this structure in place, your annual surveillance audit becomes a 30-minute dashboard walkthrough instead of a 30-day data scramble.", author: "Sara Mathew", date: "Mar 20, 2026", readTime: "7 min", image: blogIsoImg },
  { category: "Energy", title: "Why DG runs are silently inflating your bill", excerpt: "Three signals from your meters that say your generators are working harder than they should.", body: "Diesel generators are meant to be backup power, but in many Indian commercial buildings they run far more than they should — and the cost goes unnoticed because it's buried in maintenance budgets rather than energy bills.\n\nSignal #1: Runtime exceeding 4 hours/day on average. If your DG logs show consistent daytime runs beyond scheduled outages, you likely have a demand-side issue — possibly undersized transformers or poor power factor causing unnecessary changeovers.\n\nSignal #2: Low load factor during runs. A DG operating below 40% load burns disproportionately more fuel per kWh generated. This usually means the changeover is triggering for brief demand spikes that could be managed with capacitor banks or load-shedding logic.\n\nSignal #3: Fuel consumption trending upward while runtime stays flat. This points to engine degradation, dirty filters, or incorrect governor settings — all fixable with predictive maintenance alerts.\n\nProbiz Energy correlates DG runtime, fuel consumption, and EB availability in real-time, helping facility teams identify and fix these leaks before they compound.", author: "Vikram Shah", date: "Mar 12, 2026", readTime: "4 min", image: blogDgImg },
  { category: "Automation", title: "What good tenant billing actually looks like", excerpt: "Five non-obvious things great automated billing flows get right (and most don't).", body: "Most automated billing systems can generate invoices. But the difference between a good system and a great one lies in five often-overlooked details.\n\n1. Proration on move-in/move-out: When a tenant vacates mid-month, billing should automatically split consumption at the meter level, not just divide the monthly total by days.\n\n2. Multi-tariff awareness: EB tariffs often have ToD (Time of Day) slabs, demand charges, and fuel surcharges. Your billing engine must apply the exact tariff structure from the utility — not a simplified average rate.\n\n3. DG cost allocation: DG costs should be allocated based on each tenant's actual consumption during DG runtime, not equally split. This requires correlating meter readings with generator changeover timestamps.\n\n4. Transparent audit trail: Every invoice should link back to raw meter readings, applied tariff, and any manual adjustments — with timestamps and user attribution.\n\n5. Tenant self-service: Give tenants a portal to view their consumption history, download invoices, and raise disputes digitally. This alone can reduce billing-related support tickets by 60%.", author: "Priya Nair", date: "Mar 04, 2026", readTime: "6 min", image: blogTenantImg },
  { category: "Case studies", title: "From 22% to 8% peak demand penalty", excerpt: "How one IT campus used live load curves to flatten its demand profile in a quarter.", body: "An IT campus in Hyderabad was paying a 22% peak demand penalty — a surcharge levied by the utility when maximum demand exceeds the contracted limit. At ₹14/kVA/month penalty rate, this translated to over ₹18 lakh annually in avoidable charges.\n\nWe deployed Probiz Energy across their 6 HT panels and 48 LT distribution boards. The live load curve immediately revealed the problem: between 10:00–11:30 AM, UPS charging cycles from three buildings coincided with chiller plant startup, creating a demand spike 35% above the contracted limit.\n\nThe fix was straightforward: stagger UPS charging across a 90-minute window and delay non-critical chiller plant startup by 20 minutes. No capex, no new equipment — just intelligent scheduling informed by real data.\n\nWithin one billing cycle, peak demand dropped to 8% above contract — well within the tolerance band. The campus saved ₹15.2 lakh in the first year and used the same load curve data to renegotiate their contracted demand downward, saving an additional ₹4 lakh annually.", author: "Arun Kumar", date: "Feb 22, 2026", readTime: "9 min", image: blogPeakImg },
];

const Blog = () => {
  const lenisRef = useLenis();
  const [filter, setFilter] = useState<Category>("All");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  useEffect(() => {
    document.title = "Blog — Probiz Energy";
    const meta = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
      return m;
    })();
    meta.setAttribute("content", "Insights, case studies and how-tos from the Probiz Energy team — energy, automation, compliance and tenant billing.");
  }, []);

  // Lock body scroll, destroy Lenis & restore normal cursor when modal is open
  useEffect(() => {
    const cursorStyle = document.querySelector('style[data-custom-cursor]') as HTMLStyleElement | null;
    const hasCustomCursor = !!cursorStyle;
    if (activePost) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.cursor = "";
      if (cursorStyle) cursorStyle.disabled = true;
      // Fully destroy Lenis to remove all its wheel/touch listeners
      lenisRef.current?.destroy();
    } else {
      document.body.style.overflow = "";
      // Only hide native cursor if custom cursor is actually active
      if (hasCustomCursor) {
        document.documentElement.style.cursor = "none";
        cursorStyle!.disabled = false;
      }
    }
    return () => {
      document.body.style.overflow = "";
      // Only hide native cursor on cleanup if custom cursor element still exists
      const cursorStyleOnCleanup = document.querySelector('style[data-custom-cursor]') as HTMLStyleElement | null;
      if (cursorStyleOnCleanup) {
        document.documentElement.style.cursor = "none";
        cursorStyleOnCleanup.disabled = false;
      } else {
        document.documentElement.style.cursor = "";
      }
    };
  }, [activePost]);

  const filtered = filter === "All" ? POSTS : POSTS.filter((p) => p.category === filter);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ScrollProgress />
      <Header />
      <ThemeToggle />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
          <div className="pointer-events-none absolute -top-24 left-[8%] h-80 w-80 rounded-full bg-[hsl(var(--green-1)/0.4)] blur-3xl" />
          <div className="pointer-events-none absolute top-20 right-[8%] h-80 w-80 rounded-full bg-[hsl(var(--green-2)/0.35)] blur-3xl" />
          <div className="absolute inset-0 bg-grid" />

          <div className="container relative">
            <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
              <div className="max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-7 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium"
                >
                  <Tag size={12} className="text-green-1" />
                  <span className="text-muted-foreground">Insights & stories</span>
                </motion.div>

                <AnimatedText as="h1" text="Field notes from" className="font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl" />
                <AnimatedText as="h1" text="smart buildings." className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-green-1 sm:text-5xl md:text-6xl lg:text-7xl" delay={0.15} />
              </div>

              {/* PROX storyteller */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative mx-auto hidden w-full max-w-xs lg:block"
              >
                <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
                  <div className="h-[80%] w-[80%] rounded-full bg-[hsl(var(--green-1)/0.35)] blur-3xl" />
                </div>
                <motion.img
                  src={proxStories}
                  alt="PROX storyteller"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 mx-auto h-auto w-full object-contain drop-shadow-[0_25px_40px_hsl(var(--green-1)/0.4)]"
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="absolute -top-3 -left-2 z-20 rounded-2xl rounded-bl-sm border border-border bg-background/90 px-4 py-2.5 text-sm font-medium shadow-[0_18px_40px_-18px_hsl(0_0%_0%/0.45)] backdrop-blur"
                >
                  <span className="mr-1.5">📚</span>
                  Story time!
                </motion.div>
              </motion.div>
            </div>
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
                  <button onClick={() => setActivePost(FEATURED)} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-green-1 hover:underline">
                    Read the story <ArrowRight size={14} />
                  </button>
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-border">
                  <img src={FEATURED.image} alt={FEATURED.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
                </div>
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
                  className="surface tilt-card group overflow-hidden rounded-3xl cursor-pointer"
                  onClick={() => setActivePost(p)}
                >
                  <div className="aspect-[16/10] overflow-hidden ring-1 ring-border">
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
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
                    <button className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-green-1 hover:underline">
                      Read more <ArrowRight size={12} />
                    </button>
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

      {/* Blog Post Modal */}
      <AnimatePresence>
        {activePost && (
          <motion.div
            key="blog-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] overflow-y-auto overscroll-contain bg-black/60 backdrop-blur-sm"
            onClick={() => setActivePost(null)}
            onKeyDown={(e) => e.key === "Escape" && setActivePost(null)}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            style={{ cursor: "auto" }}
            ref={(el) => {
              if (el) {
                el.focus();
                // Block wheel/touch events from reaching Lenis listeners on window
                const stopProp = (e: Event) => e.stopPropagation();
                el.addEventListener("wheel", stopProp, true);
                el.addEventListener("touchmove", stopProp, true);
                el.addEventListener("touchstart", stopProp, true);
                (el as any)._cleanupModal = () => {
                  el.removeEventListener("wheel", stopProp, true);
                  el.removeEventListener("touchmove", stopProp, true);
                  el.removeEventListener("touchstart", stopProp, true);
                };
              }
            }}
          >
            <div className="flex min-h-full items-center justify-center p-4 sm:p-8">
            <motion.div
              key="blog-modal"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl rounded-3xl bg-card border border-border shadow-2xl my-8"
              style={{ cursor: "auto" }}
            >
              {/* Close button */}
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground hover:bg-background transition-all"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Hero image */}
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img
                  src={activePost.image}
                  alt={activePost.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8 md:p-10">
                {/* Category badge */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--green-1)/0.18)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-green-1">
                  {activePost.category}
                </div>

                {/* Title */}
                <h2 className="font-display text-2xl font-bold leading-tight md:text-4xl">
                  {activePost.title}
                </h2>

                {/* Meta bar */}
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-b border-border pb-6">
                  <span className="inline-flex items-center gap-1.5">
                    <User size={13} /> {activePost.author}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={13} /> {activePost.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={13} /> {activePost.readTime}
                  </span>
                </div>

                {/* Body */}
                <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                  {activePost.body.split("\n\n").map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                {/* Footer CTA */}
                <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Enjoyed this article? Share it with your team.</p>
                  <button
                    onClick={() => setActivePost(null)}
                    className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all hover:shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.6)]"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Blog;
