import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import meter from "@/assets/meter.jpg";
import smartBuilding from "@/assets/connectedbuild.webp";
import heroDashboard from "@/assets/dashboard-live.png";
import dashboardBilling from "@/assets/dashboard-billing-full.png";
import { AnimatedText } from "./AnimatedText";

const PANELS = [
  { img: heroDashboard,  color: "bg-brand-1 text-white",  title: "Real-time dashboards", body: "Live consumption, demand and load curves at a glance." },
  { img: meter,          color: "bg-brand-2 text-white",  title: "Smart metering",       body: "BTU, electricity, gas and water — all in one stream." },
  { img: smartBuilding,  color: "bg-brand-3 text-black", title: "Connected buildings",  body: "BACnet & BMS integration for centralised control." },
  { img: dashboardBilling,  color: "bg-brand-4 text-black", title: "Automated billing",    body: "Error-free invoices generated for every tenant, every cycle." },
];

export const HorizontalShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const headingY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.3, 1, 1, 0.3]);
  const bgBlobY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section id="showcase" ref={ref} className="relative py-24 bg-card/40 overflow-hidden">
      {/* Parallax background orbs */}
      <motion.div style={{ y: bgBlobY }} className="pointer-events-none absolute inset-0 will-change-transform">
        <div className="absolute -top-20 right-[15%] h-72 w-72 rounded-full bg-[hsl(var(--green-1)/0.15)] blur-3xl" />
        <div className="absolute bottom-10 left-[10%] h-64 w-64 rounded-full bg-brand-1/10 blur-3xl" />
      </motion.div>

      <motion.div
        style={{ y: headingY, opacity: headingOpacity }}
        className="container mb-12 will-change-transform"
      >
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-1" />
          Dashboard Experience
        </div>
        <AnimatedText
          as="h2"
          className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl"
          text="See every kilowatt. In motion."
        />
      </motion.div>

      <div className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto px-[5vw] pb-10 scrollbar-hide md:gap-8 md:px-[5vw] lg:px-[10vw]">
        {PANELS.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[55vh] min-h-[400px] w-[85vw] shrink-0 snap-center overflow-hidden rounded-3xl surface p-2 shadow-xl md:w-[60vw] lg:w-[45vw]"
          >
            <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full rounded-2xl object-cover" />
            <div className={`absolute inset-x-2 bottom-2 rounded-2xl ${p.color} p-6 md:p-8 backdrop-blur-md`}>
              <div className="font-mono text-xs opacity-80 mb-2 tracking-wider">0{i + 1} / 0{PANELS.length}</div>
              <h3 className="font-display text-2xl font-bold md:text-3xl">{p.title}</h3>
              <p className="mt-2 max-w-md text-sm opacity-90 md:text-base text-balance">{p.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
