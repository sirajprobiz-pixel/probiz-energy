import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LifeBuoy, BookOpen, MessageCircle, Mail, Phone, ChevronDown } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import brandLogo from "@/assets/logo.png";

const CHANNELS = [
  { icon: MessageCircle, title: "Chat with Prox", body: "Our AI assistant answers product questions instantly, 24/7.", action: "Open chat" },
  { icon: Mail, title: "Email support", body: "Reach our team for any account, billing or technical issue.", action: "support@prosmart.energy", href: "mailto:support@prosmart.energy" },
  { icon: Phone, title: "Phone support", body: "Enterprise customers can call us during business hours (IST).", action: "+91 99161 99499", href: "tel:+919916199499" },
  { icon: BookOpen, title: "Knowledge base", body: "Browse setup guides, API docs and troubleshooting articles.", action: "Visit docs", href: "#" },
];

const FAQ = [
  { q: "How quickly do you respond to support requests?", a: "Standard plans receive a response within 24 business hours. Enterprise plans include 4-hour SLA response and a dedicated success engineer." },
  { q: "Do you offer onboarding for new buildings?", a: "Yes. Our team handles meter integration, BACnet/Modbus mapping and tenant onboarding. The full setup typically takes 2–4 weeks per building." },
  { q: "Can I export my data?", a: "Anytime. Use the export tools inside the dashboard for CSV / PDF, or call our REST API for live data streams." },
  { q: "Is PROsmart compliant with data regulations?", a: "We are ISO 27001 aligned and GDPR compliant. All data is encrypted at rest and in transit and stored in regional data centres." },
  { q: "How do I upgrade my plan?", a: "Open Settings → Billing → Change plan, or contact your account manager. Upgrades are pro-rated to your next renewal." },
];

const Support = () => {
  useLenis();
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Support — PROsmart";
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ThemeToggle />
      <Header />
      <main className="pt-32 pb-24 sm:pt-40">
        {/* Hero */}
        <section className="container">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium"
            >
              <img src={brandLogo} alt="" className="h-4 w-4 object-contain" />
              <span className="text-muted-foreground">Support Center</span>
            </motion.div>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              We're here to <span className="text-primary">help.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Get answers from Prox, our AI assistant, or connect with the PROsmart team. Whatever you need — a setup guide, a billing question, or an emergency call — we've got you covered.
            </p>
          </div>
        </section>

        {/* Channels */}
        <section className="container mt-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CHANNELS.map((c, i) => {
              const Icon = c.icon;
              const Wrapper: any = c.href ? "a" : "div";
              const wProps = c.href ? { href: c.href } : {};
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Wrapper
                    {...wProps}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card/40 p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_40px_-22px_hsl(var(--primary)/0.5)]"
                  >
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{c.body}</p>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      {c.action} <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </div>
                  </Wrapper>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="container mt-24">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
                <LifeBuoy size={12} className="text-primary" />
                Frequently asked
              </div>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Quick answers, when you need them.
              </h2>
            </div>

            <div className="space-y-3">
              {FAQ.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div
                    key={f.q}
                    className="overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur"
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                    >
                      <span className="font-display text-sm font-semibold sm:text-base">{f.q}</span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-6 sm:pb-6 sm:text-base">
                        {f.a}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Support;
