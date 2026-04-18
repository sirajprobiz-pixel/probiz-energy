import { useLenis } from "@/hooks/useLenis";
import { Loader } from "@/components/Loader";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CustomCursor } from "@/components/CustomCursor";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { DashboardShowcase } from "@/components/DashboardShowcase";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Marquee } from "@/components/Marquee";
import { TrustStrip } from "@/components/TrustStrip";
import { Platform } from "@/components/Platform";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { HorizontalShowcase } from "@/components/HorizontalShowcase";
import { Impact } from "@/components/Impact";
import { Stats } from "@/components/Stats";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useLenis();

  useEffect(() => {
    document.title = "PROsmart — Effortless Energy Monitoring & Automated Billing";
    const meta = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
      return m;
    })();
    meta.setAttribute("content", "PROsmart is the next-gen platform for energy monitoring, management and automated tenant billing for smart buildings.");
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Loader />
      <ScrollProgress />
      <CustomCursor />
      <Header />
      <ThemeToggle />
      <main>
        <Hero />
        <DashboardShowcase />
        <TrustStrip />
        <Platform />
        <HowItWorks />
        <Features />
        <HorizontalShowcase />
        <Impact />
        <Stats />
        <Marquee />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
