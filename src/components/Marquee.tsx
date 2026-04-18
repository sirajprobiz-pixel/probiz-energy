const ITEMS = [
  "BTU METERING", "MULTI-METER", "BACnet", "REAL-TIME", "AUTOMATED BILLING",
  "ISO 50001", "BMS INTEGRATION", "ENERGY ANALYTICS", "SMART BUILDINGS", "IoT READY",
];

const COLORS = ["bg-brand-1", "bg-brand-2", "bg-brand-3", "bg-brand-4"];

export const Marquee = () => {
  return (
    <section className="relative overflow-hidden border-y border-border py-8">
      <div className="flex w-max marquee gap-16 whitespace-nowrap">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <div key={i} className="flex items-center gap-16">
            <span className="font-display text-2xl font-medium text-muted-foreground/70 md:text-3xl">{item}</span>
            <span className={`h-1.5 w-1.5 rounded-full ${COLORS[i % COLORS.length]}`} />
          </div>
        ))}
      </div>
    </section>
  );
};
