import { useEffect } from "react";
import { useLenis } from "@/hooks/useLenis";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Pricing } from "@/components/Pricing";

const PricingPage = () => {
  useLenis();
  useEffect(() => {
    document.title = "Pricing — PROsmart";
    const meta = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
      return m;
    })();
    meta.setAttribute("content", "PROsmart pricing in INR — Starter, Lite, Pro and Enterprise plans for energy monitoring & automated billing.");
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ScrollProgress />
      <Header />
      <main className="pt-24">
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage;
