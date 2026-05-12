import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import brandLogo from "@/assets/logo.png";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: "We collect information you provide directly to us — such as your name, email, company, and phone number when you book a demo, contact support, or subscribe to updates. We also collect device, browser and usage analytics through standard cookies.",
  },
  {
    title: "2. How We Use Your Information",
    body: "Your information is used to deliver the PROsmart platform, respond to inquiries, send product updates, improve our services, prevent fraud, and meet legal obligations. We never sell personal data.",
  },
  {
    title: "3. Data Storage & Security",
    body: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Production systems are hosted in ISO 27001 certified facilities. Access is role-based with audit logging.",
  },
  {
    title: "4. Cookies",
    body: "We use essential cookies for authentication and analytics cookies (with your consent) to understand usage patterns. You can manage your preferences via the cookie banner at any time.",
  },
  {
    title: "5. Your Rights",
    body: "You have the right to access, correct, export, or delete your personal data. Contact privacy@prosmart.energy to make a request — we respond within 30 days.",
  },
  {
    title: "6. Updates",
    body: "We may update this policy from time to time. Material changes will be communicated via email or an in-product notice. Continued use after the effective date constitutes acceptance.",
  },
];

const Privacy = () => {
  useLenis();
  useEffect(() => {
    document.title = "Privacy Policy — PROsmart";
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ThemeToggle />
      <Header />
      <main className="pt-32 pb-24 sm:pt-40">
        <section className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium"
          >
            <img src={brandLogo} alt="" className="h-4 w-4 object-contain" />
            <span className="text-muted-foreground">Privacy Policy</span>
          </motion.div>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Your data, handled with care.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Last updated: May 2026. This policy describes how Probiz Automation collects, uses and protects information when you use the PROsmart platform and related services.
          </p>
          <div className="mt-12 space-y-8">
            {SECTIONS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur sm:p-8"
              >
                <h2 className="font-display text-xl font-semibold sm:text-2xl">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{s.body}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-10 text-sm text-muted-foreground">
            Questions? Email <a href="mailto:privacy@prosmart.energy" className="text-primary underline">privacy@prosmart.energy</a>.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
