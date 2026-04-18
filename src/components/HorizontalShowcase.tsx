import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import meter from "@/assets/meter.jpg";
import smartBuilding from "@/assets/smart-building.jpg";
import heroDashboard from "@/assets/hero-dashboard.jpg";

const PANELS = [
  { img: heroDashboard,  color: "bg-brand-1 text-white",  title: "Real-time dashboards", body: "Live consumption, demand and load curves at a glance." },
  { img: meter,          color: "bg-brand-2 text-white",  title: "Smart metering",       body: "BTU, electricity, gas and water — all in one stream." },
  { img: smartBuilding,  color: "bg-brand-3 text-blue-1", title: "Connected buildings",  body: "BACnet & BMS integration for centralised control." },
  { img: heroDashboard,  color: "bg-brand-4 text-blue-1", title: "Automated billing",    body: "Error-free invoices generated for every tenant, every cycle." },
];

export const HorizontalShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section id="dashboard" ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-brand-5">
        <div className="container absolute top-24 z-10">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-1" />
            Dashboard Experience
          </div>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-tight md:text-5xl">
            See every kilowatt. <span className="text-blue-1">In motion.</span>
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-8 pl-[8vw] pt-32 will-change-transform">
          {PANELS.map((p, i) => (
            <div
              key={i}
              className="relative h-[60vh] w-[80vw] shrink-0 overflow-hidden rounded-3xl bg-white p-2 shadow-xl ring-1 ring-border md:w-[55vw]"
            >
              <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full rounded-2xl object-cover" />
              <div className={`absolute inset-x-2 bottom-2 rounded-2xl ${p.color} p-8`}>
                <div className="font-mono text-xs opacity-80">0{i + 1} / 0{PANELS.length}</div>
                <h3 className="mt-2 font-display text-3xl font-bold">{p.title}</h3>
                <p className="mt-2 max-w-md opacity-90">{p.body}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
