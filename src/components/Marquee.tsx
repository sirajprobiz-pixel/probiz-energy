const ITEMS = [
  "BTU METERING",
  "MULTI-METER",
  "BACnet",
  "REAL-TIME",
  "AUTOMATED BILLING",
  "ISO 50001",
  "BMS INTEGRATION",
  "ENERGY ANALYTICS",
  "SMART BUILDINGS",
  "IoT READY",
];

export const Marquee = () => {
  return (
    <section className="relative overflow-hidden border-y border-white/5 py-8">
      <div className="flex w-max marquee gap-16 whitespace-nowrap">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <div key={i} className="flex items-center gap-16">
            <span className="font-display text-2xl font-medium text-muted-foreground/60 md:text-3xl">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-primary" />
          </div>
        ))}
      </div>
    </section>
  );
};
