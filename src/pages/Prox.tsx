import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Bot,
  MessageCircle,
  Zap,
  Gauge,
  ShieldCheck,
  BookOpen,
  Activity,
  ArrowRight,
} from "lucide-react";
import { useLenis } from "@/hooks/useLenis";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import brandLogo from "@/assets/logo.png";
import mascot from "@/assets/mascot2.png";
import proxSitting from "@/assets/sittingprox1.png";
import proxWork from "@/assets/workprox.png";
import proxProcess from "@/assets/processprox.png";
import proxStories from "@/assets/storiesprox.png";
import proxCareers from "@/assets/careersprox.png";

const GALLERY = [
  { img: proxWork, title: "On the build", body: "Helping engineers wire up meters, integrations and dashboards in record time." },
  { img: proxProcess, title: "Always responsive", body: "Answering questions on any device — desktop, tablet or right inside your pocket." },
  { img: proxStories, title: "Friendly by design", body: "Approachable, expressive and made to make smart-energy management feel human." },
  { img: proxCareers, title: "Driving results", body: "Spotlighting savings, KPIs and growth across every building in your portfolio." },
];

const SKILLS = [
  {
    icon: Activity,
    title: "Live energy guidance",
    body: "PROX surfaces real-time consumption, demand and tariff anomalies the moment they happen — and explains what to do next.",
  },
  {
    icon: Gauge,
    title: "Smart insights",
    body: "From load disaggregation to billing trends, PROX turns raw meter data into clear, decision-ready answers.",
  },
  {
    icon: MessageCircle,
    title: "Always-on assistant",
    body: "24/7 chat across the website and the Probiz Energy platform. Ask in plain English — PROX understands your portfolio.",
  },
  {
    icon: BookOpen,
    title: "Product navigator",
    body: "Helping users move smoothly across Probiz Connect, Probiz Energy and Probiz Retail without leaving the conversation.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy-first",
    body: "PROX never sees raw personal data. Every interaction is encrypted and audited end-to-end.",
  },
  {
    icon: Zap,
    title: "Built to scale",
    body: "From a single tower to nationwide portfolios, PROX grows with your buildings — with zero retraining required.",
  },
];

const TIMELINE = [
  { tag: "Designed", title: "Brand-first character design", body: "Crafted by the design team at Probiz Technologies to reflect a friendly, intelligent and energy-aware companion." },
  { tag: "Engineered", title: "Built on the Probiz Energy platform", body: "Powered by the same data fabric that runs Probiz Energy — meters, billing engine, BACnet/Modbus integrations and AI." },
  { tag: "Maintained", title: "Continuously evolving", body: "PROX is shipped, monitored and improved by Probiz Technologies. New skills are released alongside every Probiz Energy product update." },
];

const Prox = () => {
  useLenis();

  useEffect(() => {
    document.title = "Meet PROX — Probiz Energy's companion";
    const meta =
      document.querySelector('meta[name="description"]') ||
      (() => {
        const m = document.createElement("meta");
        m.setAttribute("name", "description");
        document.head.appendChild(m);
        return m;
      })();
    meta.setAttribute(
      "content",
      "PROX is the friendly AI mascot designed and developed by Probiz Technologies — guiding users across Probiz Energy and the entire Probiz product suite.",
    );
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ThemeToggle />
      <Header />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="pointer-events-none absolute -top-24 left-[8%] h-96 w-96 rounded-full bg-[hsl(var(--green-1)/0.4)] blur-3xl" />
          <div className="pointer-events-none absolute top-20 right-[8%] h-[28rem] w-[28rem] rounded-full bg-[hsl(var(--blue-3)/0.35)] blur-3xl" />
          <div className="absolute inset-0 bg-grid" />

          <div className="container relative">
            <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
              {/* Copy */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium"
                >
                  <img src={brandLogo} alt="" className="h-4 w-4 object-contain" />
                  <span className="text-muted-foreground">Meet our mascot</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.05 }}
                  className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
                >
                  Say hi to <span className="text-green-1">PROX.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
                >
                  PROX is the friendly AI companion of Probiz Energy — designed and developed by{" "}
                  <span className="font-semibold text-foreground">Probiz Technologies</span> to make smart-energy management feel effortless. From live insights to instant answers, PROX is built to take every Probiz product to the next level.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-10 flex flex-wrap gap-3"
                >
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)]"
                  >
                    Chat with PROX <ArrowRight size={14} />
                  </Link>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary/40 hover:bg-card"
                  >
                    Explore Probiz products
                  </Link>
                </motion.div>
              </div>

              {/* Mascot */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none"
              >
                <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
                  <div className="h-[80%] w-[80%] rounded-full bg-[hsl(var(--green-1)/0.4)] blur-3xl" />
                </div>
                <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
                  <div className="h-[60%] w-[60%] rounded-full bg-[hsl(var(--blue-3)/0.3)] blur-2xl" />
                </div>
                <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-green-1/30 [animation:spin_22s_linear_infinite]" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-1/20 [animation:spin_18s_linear_infinite_reverse]" />

                <motion.img
                  src={mascot}
                  alt="PROX mascot"
                  animate={{ y: [0, -16, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 mx-auto h-auto w-full max-w-[440px] object-contain drop-shadow-[0_30px_50px_hsl(var(--green-1)/0.4)]"
                />

                {/* Floating chips */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="absolute -top-2 left-2 z-20 hidden items-center gap-2 rounded-2xl rounded-bl-sm border border-border bg-background/90 px-4 py-2.5 text-sm font-medium shadow-[0_18px_40px_-18px_hsl(0_0%_0%/0.45)] backdrop-blur sm:flex"
                >
                  <span>👋</span> Hey, I&apos;m PROX!
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="absolute -bottom-2 right-0 z-20 hidden items-center gap-2 rounded-full border border-border bg-background/90 px-3.5 py-2 text-xs font-medium shadow-[0_18px_40px_-18px_hsl(0_0%_0%/0.45)] backdrop-blur sm:flex"
                >
                  <Sparkles size={12} className="text-primary" />
                  Powered by Probiz Energy AI
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* WHO IS PROX */}
        <section className="relative py-20 sm:py-28">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
                <Bot size={12} className="text-primary" />
                Who is PROX
              </div>
              <h2 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                A character with a <span className="text-green-1">purpose.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                PROX is more than a mascot. He&apos;s the friendly face of every Probiz product — designed, developed and maintained by{" "}
                <span className="font-semibold text-foreground">Probiz Technologies</span> to take our software, hardware and customer experience to the next level.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {TIMELINE.map((t, i) => (
                <motion.div
                  key={t.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="rounded-2xl border border-border bg-card/50 p-6 backdrop-blur sm:p-8"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{t.tag}</div>
                  <h3 className="mt-3 font-display text-xl font-semibold">{t.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT PROX DOES */}
        <section className="relative py-20 sm:py-28">
          <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-[40rem] w-[40rem] rounded-full bg-[hsl(var(--primary)/0.08)] blur-3xl" />
          </div>
          <div className="container">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
                <Sparkles size={12} className="text-primary" />
                What PROX does
              </div>
              <h2 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Six things PROX does <span className="text-blue-1">brilliantly.</span>
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SKILLS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="group rounded-2xl border border-border bg-card/50 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_40px_-22px_hsl(var(--primary)/0.5)]"
                  >
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROBIZ TECHNOLOGIES STRIP */}
        <section className="relative py-20 sm:py-28">
          <div className="container">
            <div className="overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-card/70 via-card/40 to-card/70 p-8 backdrop-blur sm:p-12 lg:p-16">
              <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.4fr]">
                <div className="relative mx-auto w-full max-w-xs">
                  <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
                    <div className="h-[80%] w-[80%] rounded-full bg-[hsl(var(--blue-3)/0.35)] blur-3xl" />
                  </div>
                  <motion.img
                    src={proxSitting}
                    alt="PROX"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    className="mx-auto h-auto w-full object-contain drop-shadow-[0_24px_40px_hsl(var(--blue-3)/0.4)]"
                  />
                </div>
                <div>
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-1" />
                    Built by Probiz Technologies
                  </div>
                  <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                    Maintaining the next level of every Probiz product.
                  </h2>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Probiz Technologies designs, develops and maintains PROX as a unified companion across our entire product family — Probiz Connect, Probiz Energy and Probiz Retail. One mascot. One voice. Every Probiz experience, levelled up.
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link
                      to="/about"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)]"
                    >
                      About Probiz <ArrowRight size={14} />
                    </Link>
                    <Link
                      to="/products"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary/40 hover:bg-card"
                    >
                      Our products
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROX GALLERY */}
        <section className="relative py-20 sm:py-28">
          <div className="container">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
                <Sparkles size={12} className="text-primary" />
                PROX in action
              </div>
              <h2 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                Many sides, <span className="text-green-1">one personality.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
                Whether he&apos;s coding, charting growth, or just saying hi — PROX shows up everywhere Probiz does.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {GALLERY.map((g, i) => (
                <motion.div
                  key={g.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card/60 via-card/40 to-card/60 p-6 backdrop-blur transition-all hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_24px_50px_-22px_hsl(var(--primary)/0.55)]"
                >
                  {/* Soft glow */}
                  <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
                    <div className="h-[70%] w-[70%] rounded-full bg-[hsl(var(--green-1)/0.25)] blur-3xl opacity-70 transition-opacity group-hover:opacity-100" />
                  </div>

                  {/* Image */}
                  <div className="relative mx-auto flex h-52 items-center justify-center sm:h-60">
                    <motion.img
                      src={g.img}
                      alt={g.title}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                      className="h-full w-auto max-w-full object-contain drop-shadow-[0_20px_30px_hsl(var(--green-1)/0.35)] transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                  </div>

                  <div className="relative mt-5 text-center">
                    <h3 className="font-display text-lg font-semibold">{g.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative pb-28 pt-4">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Ready to talk to PROX?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                Tap the floating PROX button anywhere on the site — or send us a message and we&apos;ll introduce you in person.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  to="/book-demo"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)]"
                >
                  Book a demo <ArrowRight size={14} />
                </Link>
                <Link
                  to="/support"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-primary/40 hover:bg-card"
                >
                  Visit Support
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Prox;
