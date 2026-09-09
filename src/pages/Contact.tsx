import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Headphones, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useLenis } from "@/hooks/useLenis";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollProgress } from "@/components/ScrollProgress";
import brandLogo from "@/assets/logo.png";
import mascot from "@/assets/mascot2.png";
import { AnimatedText } from "@/components/AnimatedText";
import { toast } from "sonner";

const OFFICES = [
  { city: "Bengaluru", line1: "Karnataka, India" },
  { city: "Chennai, Coimbatore, Trichy", line1: "Tamil Nadu, India" },
  { city: "Kochi", line1: "Kerala, India" },
  { city: "Dubai", line1: "UAE" },
  { city: "Muscat", line1: "Oman" },
  { city: "Espoo", line1: "Finland" },
];

const CHANNELS = [
  { icon: MessageSquare, title: "Sales", body: "Talk to a solutions engineer", value: "info@probizautomation.com" },
  { icon: Headphones, title: "Support", body: "24/7 customer success", value: "info@probizautomation.com" },
  { icon: Building2, title: "Partnerships", body: "Integrations & resellers", value: "info@probizautomation.com" },
];

const Contact = () => {
  useLenis();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Contact — Probiz Energy";
    const meta = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
      return m;
    })();
    meta.setAttribute("content", "Get in touch with Probiz Energy — sales, support, partnerships and global office locations.");
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const email   = String(fd.get("email")   || "");
    const name    = String(fd.get("name")    || "").trim();
    const message = String(fd.get("message") || "").trim();
    const company = String(fd.get("company") || "").trim();
    const phone   = String(fd.get("phone")   || "").trim();

    if (!name)                 return toast.error("Please share your name");
    if (!email.includes("@")) return toast.error("Please enter a valid email");
    if (message.length < 10)  return toast.error("Tell us a bit more (10+ characters)");

    setSubmitting(true);

    const templateParams = {
      // Common variable names used in EmailJS templates
      full_name:    name,
      from_name:    name,
      user_name:    name,
      to_name:      "Probiz Energy",
      email:        email,
      from_email:   email,
      user_email:   email,
      reply_to:     email,
      company_name: company,
      company:      company,
      phone:        phone,
      phone_number: phone,
      message:      message,
    };

    try {
      // Send contact notification to admin
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // Send auto-reply to user
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_USER,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast.success("Thanks — we'll be in touch within one business day.");
      form.reset();
    } catch (err: any) {
      console.error("EmailJS error:", err);
      const errorMsg = err?.text || err?.message || "Unknown error";
      toast.error(`Email failed: ${errorMsg}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ScrollProgress />
      <Header />
      <ThemeToggle />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-40 pb-16">
          <div className="pointer-events-none absolute -top-24 left-[8%] h-80 w-80 rounded-full bg-[hsl(var(--green-1)/0.4)] blur-3xl" />
          <div className="pointer-events-none absolute top-20 right-[8%] h-80 w-80 rounded-full bg-[hsl(var(--green-2)/0.35)] blur-3xl" />
          <div className="absolute inset-0 bg-grid" />

          <div className="container relative">
            <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-8">
              {/* Copy */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-7 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium"
                >
                  <img src={brandLogo} alt="" className="h-4 w-4 object-contain" />
                  <span className="text-muted-foreground">Get in touch</span>
                </motion.div>

                <AnimatedText as="h1" text="Let&apos;s build" className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl" />
                <AnimatedText as="h1" text="something smart." className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-green-1 sm:text-6xl md:text-7xl lg:text-8xl" delay={0.15} />

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
                >
                  Tell us about your portfolio and our team will reach out within 24 hours with a tailored plan.
                </motion.p>
              </div>

              {/* Mascot illustration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-none"
              >
                {/* Soft glow rings */}
                <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
                  <div className="h-[80%] w-[80%] rounded-full bg-[hsl(var(--green-1)/0.35)] blur-3xl" />
                </div>
                <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
                  <div className="h-[60%] w-[60%] rounded-full bg-[hsl(var(--blue-3)/0.25)] blur-2xl" />
                </div>

                {/* Animated rings around mascot */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-green-1/30 [animation:spin_22s_linear_infinite]" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-1/20 [animation:spin_18s_linear_infinite_reverse]" />

                {/* Floating mascot */}
                <motion.img
                  src={mascot}
                  alt="Prox mascot"
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 mx-auto h-auto w-full max-w-[420px] object-contain drop-shadow-[0_30px_40px_hsl(var(--green-1)/0.35)]"
                />

                {/* Speech bubble */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="absolute -top-2 left-2 z-20 rounded-2xl rounded-bl-sm border border-border bg-background/90 px-4 py-2.5 text-sm font-medium shadow-[0_18px_40px_-18px_hsl(0_0%_0%/0.45)] backdrop-blur sm:-top-4 sm:left-0"
                >
                  <span className="mr-1.5">👋</span>
                  Hi! I&apos;m Prox.
                </motion.div>

                {/* Floating badge bottom-right */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="absolute -bottom-2 right-0 z-20 hidden items-center gap-2 rounded-full border border-border bg-background/90 px-3.5 py-2 text-xs font-medium shadow-[0_18px_40px_-18px_hsl(0_0%_0%/0.45)] backdrop-blur sm:flex"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  We reply in &lt; 24h
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Form + info */}
        <section className="pb-24">
          <div className="container">
            <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
              <motion.form
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onSubmit={onSubmit}
                className="surface rounded-[2rem] p-8 md:p-10"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Full name</label>
                    <input name="name" required className="rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-green-1" placeholder="Jane Doe" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Company</label>
                    <input name="company" className="rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-green-1" placeholder="Acme Realty" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Work email</label>
                    <input name="email" type="email" required className="rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-green-1" placeholder="you@company.com" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Phone</label>
                    <input name="phone" className="rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-green-1" placeholder="+91 ..." />
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-muted-foreground">How can we help?</label>
                    <textarea name="message" rows={5} required className="rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-green-1" placeholder="Tell us about your portfolio, utilities and goals..." />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-all hover:shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)] disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Send message"} <Send size={14} />
                </button>
              </motion.form>

              <div className="space-y-4">
                {CHANNELS.map((c, i) => (
                  <motion.div
                    key={c.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="surface tilt-card flex items-start gap-4 rounded-2xl p-5"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--green-1)/0.18)] text-green-1">
                      <c.icon size={20} />
                    </div>
                    <div>
                      <div className="font-display text-base font-semibold">{c.title}</div>
                      <div className="text-xs text-muted-foreground">{c.body}</div>
                      <a href={`mailto:${c.value}`} className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-green-1 hover:underline">
                        <Mail size={12} /> {c.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="surface flex items-start gap-4 rounded-2xl p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--green-1)/0.18)] text-green-1">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="font-display text-base font-semibold">Call us</div>
                    <div className="text-xs text-muted-foreground">Mon–Fri · 9am–7pm IST</div>
                    <a href="tel:+919916199499" className="mt-1 block text-sm font-medium text-green-1 hover:underline">+91 99161 99499</a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Offices */}
        <section className="pb-32">
          <div className="container">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <AnimatedText as="h2" text="Our offices." className="font-display text-4xl font-bold tracking-tight md:text-5xl" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {OFFICES.map((o, i) => (
                <motion.div
                  key={o.city}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="surface tilt-card rounded-3xl p-6"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--green-1)/0.18)] text-green-1">
                    <MapPin size={20} />
                  </div>
                  <div className="font-display text-xl font-semibold">{o.city}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{o.line1}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;