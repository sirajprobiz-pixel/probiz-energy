import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import brandLogo from "@/assets/logo.png";

const SECTIONS = [
  { title: "1. Acceptance of Terms", body: "By accessing or using Probiz Energy, you agree to be bound by these Terms. If you do not agree, you may not use the platform." },
  { title: "2. Service Description", body: "Probiz Energy is a SaaS platform for energy monitoring, automated tenant billing, and building intelligence operated by Probiz Automation." },
  { title: "3. Accounts & Access", body: "You are responsible for maintaining the confidentiality of your credentials. Notify us immediately of any unauthorized access. We may suspend accounts that violate these terms." },
  { title: "4. Subscription & Billing", body: "Plans are billed monthly or annually in INR or local currency. Fees are non-refundable except as required by law. We may revise pricing with 30 days' notice." },
  { title: "5. Acceptable Use", body: "You agree not to reverse engineer, resell, or interfere with the service. You must comply with all applicable laws when using Probiz Energy." },
  { title: "6. Intellectual Property", body: "All software, branding and content is owned by Probiz Automation. You retain ownership of data you upload; you grant us a license to host and process it to deliver the service." },
  { title: "7. Service Availability", body: "We target 99.9% uptime but do not guarantee uninterrupted service. Scheduled maintenance is announced in advance whenever possible." },
  { title: "8. Limitation of Liability", body: "To the maximum extent permitted by law, Probiz Automation is not liable for indirect, incidental or consequential damages. Total liability is limited to fees paid in the prior 12 months." },
  { title: "9. Termination", body: "Either party may terminate the agreement on 30 days' notice. We may suspend the service immediately for material breach. Data export is available for 30 days after termination." },
  { title: "10. Governing Law", body: "These Terms are governed by the laws of India. Any dispute will be resolved in the courts of Chennai, Tamil Nadu." },
];

const Terms = () => {
  useLenis();
  useEffect(() => {
    document.title = "Terms & Conditions — Probiz Energy";
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
            <span className="text-muted-foreground">Terms & Conditions</span>
          </motion.div>
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            The fine print, kept simple.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Last updated: May 2026. These Terms govern your use of the Probiz Energy platform and services provided by Probiz Automation.
          </p>
          <div className="mt-12 space-y-6">
            {SECTIONS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.03 }}
                className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur sm:p-8"
              >
                <h2 className="font-display text-xl font-semibold sm:text-2xl">{s.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{s.body}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-10 text-sm text-muted-foreground">
            Questions? Email <a href="mailto:legal@probiz.energy" className="text-primary underline">legal@probiz.energy</a>.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
