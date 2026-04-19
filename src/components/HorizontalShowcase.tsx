import meter from "@/assets/meter.jpg";
import smartBuilding from "@/assets/smart-building.jpg";
import heroDashboard from "@/assets/hero-dashboard.jpg";
import { AnimatedText } from "./AnimatedText";

const PANELS = [
  { img: heroDashboard,  color: "bg-brand-1 text-white",  title: "Real-time dashboards", body: "Live consumption, demand and load curves at a glance." },
  { img: meter,          color: "bg-brand-2 text-white",  title: "Smart metering",       body: "BTU, electricity, gas and water — all in one stream." },
  { img: smartBuilding,  color: "bg-brand-3 text-blue-1", title: "Connected buildings",  body: "BACnet & BMS integration for centralised control." },
  { img: heroDashboard,  color: "bg-brand-4 text-blue-1", title: "Automated billing",    body: "Error-free invoices generated for every tenant, every cycle." },
];

export const HorizontalShowcase = () => {
  return (
    <section id="showcase" className="relative py-24 bg-card/40">
      <div className="container mb-12">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-1" />
          Dashboard Experience
        </div>
        <AnimatedText
          as="h2"
          className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl"
          text="See every kilowatt. In motion."
        />
      </div>

      <div className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto px-[5vw] pb-10 scrollbar-hide md:gap-8 md:px-[5vw] lg:px-[10vw]">
        {PANELS.map((p, i) => (
          <div
            key={i}
            className="relative h-[55vh] min-h-[400px] w-[85vw] shrink-0 snap-center overflow-hidden rounded-3xl surface p-2 shadow-xl md:w-[60vw] lg:w-[45vw]"
          >
            <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full rounded-2xl object-cover" />
            <div className={`absolute inset-x-2 bottom-2 rounded-2xl ${p.color} p-6 md:p-8 backdrop-blur-md`}>
              <div className="font-mono text-xs opacity-80 mb-2 tracking-wider">0{i + 1} / 0{PANELS.length}</div>
              <h3 className="font-display text-2xl font-bold md:text-3xl">{p.title}</h3>
              <p className="mt-2 max-w-md text-sm opacity-90 md:text-base text-balance">{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
