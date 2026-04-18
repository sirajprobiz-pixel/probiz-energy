import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Building2, Calendar, CheckCircle2, Headphones, Sparkles, Zap } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";

const BENEFITS = [
  { icon: Sparkles, color: "bg-brand-1 text-white", title: "Personalised walkthrough", body: "A tailored 30-min demo focused on your portfolio and goals." },
  { icon: Zap, color: "bg-brand-2 text-white", title: "Live data simulation", body: "See real-time consumption, billing and analytics in action." },
  { icon: Building2, color: "bg-brand-3 text-blue-1", title: "ROI assessment", body: "We map your current setup to projected savings and timelines." },
  { icon: Headphones, color: "bg-brand-4 text-blue-1", title: "Onboarding plan", body: "Get a clear, white-glove rollout plan tailored to your team." },
];

const PERKS = [
  "No credit card required",
  "30-minute personalised session",
  "Tailored ROI report after the call",
  "Direct access to our energy experts",
];

const BookDemo = () => {
  useLenis();
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", buildings: "1-5", message: "" });

  useEffect(() => {
    document.title = "Book a Demo — PROsmart";
    const meta = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
      return m;
    })();
    meta.setAttribute("content", "Book a personalised demo of PROsmart energy monitoring & automated billing.");
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: "Demo request received", description: "Our team will reach out within 24 hours." });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ScrollProgress />

      {/* Top bar */}
      <div className="container pt-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </div>

      {/* Hero */}
      <section className="relative pt-12">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 left-[10%] h-72 w-72 rounded-full bg-brand-3/40 blur-3xl" />
          <div className="absolute top-10 right-[10%] h-80 w-80 rounded-full bg-brand-4/60 blur-3xl" />
        </div>

        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <Calendar className="h-3 w-3 text-blue-1" /> Book your live demo
            </div>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              See PROsmart <span className="text-blue-1">live</span> on your buildings.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              30 minutes. Zero pressure. Get a personalised walkthrough and a custom ROI report.
            </p>
          </div>
        </div>
      </section>

      {/* Benefit cards */}
      <section className="container relative mt-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-3xl surface p-7 tilt-card"
            >
              <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${b.color}`}>
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form + Side panel */}
      <section className="container relative mt-20 pb-32">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl surface p-8 md:p-10"
          >
            {submitted ? (
              <div className="flex flex-col items-center py-16 text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-display text-2xl font-bold">You're in!</h3>
                <p className="mt-3 max-w-sm text-muted-foreground">
                  Our team will reach out within 24 hours to schedule your personalised PROsmart demo.
                </p>
                <Link to="/" className="mt-8 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">
                  Back to home
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="font-display text-3xl font-bold">Tell us about you</h2>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Full name</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="mt-2 w-full rounded-xl bg-muted px-4 py-3 text-sm outline-none ring-1 ring-transparent transition focus:ring-primary"
                      placeholder="Aarav Sharma"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Work email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="mt-2 w-full rounded-xl bg-muted px-4 py-3 text-sm outline-none ring-1 ring-transparent transition focus:ring-primary"
                      placeholder="aarav@company.com"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Company</label>
                    <input
                      required
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="mt-2 w-full rounded-xl bg-muted px-4 py-3 text-sm outline-none ring-1 ring-transparent transition focus:ring-primary"
                      placeholder="Acme Realty"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">Buildings</label>
                    <select
                      value={form.buildings}
                      onChange={(e) => setForm({ ...form, buildings: e.target.value })}
                      className="mt-2 w-full rounded-xl bg-muted px-4 py-3 text-sm outline-none ring-1 ring-transparent transition focus:ring-primary"
                    >
                      <option>1-5</option>
                      <option>6-25</option>
                      <option>26-100</option>
                      <option>100+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground">What would you like to see?</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="mt-2 w-full rounded-xl bg-muted px-4 py-3 text-sm outline-none ring-1 ring-transparent transition focus:ring-primary"
                    placeholder="Tell us about your portfolio and what matters most…"
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 font-medium text-primary-foreground transition-all hover:shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)]"
                >
                  Request my demo
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
              </form>
            )}
          </motion.div>

          {/* Side panel */}
          <motion.aside
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-5"
          >
            <div className="rounded-3xl surface p-8">
              <div className="text-xs font-medium uppercase tracking-wider text-blue-1">What's included</div>
              <ul className="mt-5 space-y-3">
                {PERKS.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-2" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl surface p-8">
              <div className="font-display text-2xl font-bold">Trusted by leading developers</div>
              <p className="mt-3 text-sm text-muted-foreground">
                Forward-thinking real estate developers and enterprises rely on PROsmart for accurate billing and data-driven savings.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="font-display text-2xl font-bold">30%</div>
                  <div className="text-[10px] uppercase opacity-80">Cost ↓</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold">100%</div>
                  <div className="text-[10px] uppercase opacity-80">Automated</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold">24/7</div>
                  <div className="text-[10px] uppercase opacity-80">Live data</div>
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>
    </div>
  );
};

export default BookDemo;
