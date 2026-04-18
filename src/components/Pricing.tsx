import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";

const TIERS = [
  {
    name: "Starter",
    price: "₹999",
    tag: "For small properties",
    color: "bg-brand-4",
    text: "text-blue-1",
    cta: "Start free trial",
    highlight: false,
  },
  {
    name: "Lite",
    price: "₹2,499",
    tag: "For growing buildings",
    color: "bg-brand-3",
    text: "text-blue-1",
    cta: "Get Lite",
    highlight: false,
  },
  {
    name: "Pro",
    price: "₹6,999",
    tag: "For mid-market portfolios",
    color: "bg-brand-1",
    text: "text-white",
    cta: "Get Pro",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    tag: "For large enterprises",
    color: "bg-brand-2",
    text: "text-white",
    cta: "Talk to sales",
    highlight: false,
  },
];

const ROWS: { label: string; values: (boolean | string)[] }[] = [
  { label: "Real-time monitoring",         values: [true, true, true, true] },
  { label: "Automated tenant billing",     values: [true, true, true, true] },
  { label: "BTU meter integration",        values: [false, true, true, true] },
  { label: "Multi-meter integration",      values: [false, true, true, true] },
  { label: "BACnet / BMS support",         values: [false, false, true, true] },
  { label: "AI-driven analytics",          values: [false, false, true, true] },
  { label: "ISO 50001 reporting",          values: [false, false, true, true] },
  { label: "Dedicated account manager",    values: [false, false, false, true] },
  { label: "Buildings included",           values: ["1", "5", "25", "Unlimited"] },
  { label: "Support",                      values: ["Email", "Email + Chat", "24/7 Priority", "24/7 Dedicated"] },
];

const Cell = ({ v, accent }: { v: boolean | string; accent: string }) => {
  if (typeof v === "boolean") {
    return v ? (
      <Check className={`mx-auto h-5 w-5 ${accent}`} />
    ) : (
      <X className="mx-auto h-5 w-5 text-muted-foreground/40" />
    );
  }
  return <span className="text-sm font-medium">{v}</span>;
};

export const Pricing = () => {
  return (
    <section id="pricing" className="relative py-32">
      <div className="container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-1" />
            Pricing
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
            Simple plans, <span className="text-blue-1">powerful results.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground text-balance">
            Transparent monthly pricing in INR. Scale from a single building to nationwide portfolios.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`relative overflow-hidden rounded-3xl p-8 ring-1 ring-border tilt-card ${
                t.highlight ? `${t.color} ${t.text}` : "surface"
              }`}
            >
              {t.highlight && (
                <div className="absolute right-4 top-4 rounded-full bg-background px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-1">
                  Most Popular
                </div>
              )}
              <div className={`text-sm font-medium ${t.highlight ? "opacity-90" : "text-muted-foreground"}`}>{t.name}</div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold">{t.price}</span>
                {t.price !== "Custom" && <span className={`text-sm ${t.highlight ? "opacity-80" : "text-muted-foreground"}`}>/mo</span>}
              </div>
              <p className={`mt-2 text-sm ${t.highlight ? "opacity-90" : "text-muted-foreground"}`}>{t.tag}</p>

              <Link
                to="/book-demo"
                className={`mt-8 block w-full rounded-full px-5 py-3 text-center text-sm font-medium transition ${
                  t.highlight
                    ? "bg-background text-blue-1 hover:opacity-90"
                    : `${t.color} ${t.text} hover:opacity-90`
                }`}
              >
                {t.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mt-16 overflow-hidden rounded-3xl surface"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-6 py-5 text-sm font-medium text-muted-foreground">Compare features</th>
                  {TIERS.map((t) => (
                    <th key={t.name} className="px-6 py-5 text-center">
                      <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${t.color} ${t.text}`}>
                        {t.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, idx) => (
                  <tr key={row.label} className={idx % 2 === 0 ? "" : "bg-muted/30"}>
                    <td className="px-6 py-4 text-sm font-medium">{row.label}</td>
                    {row.values.map((v, i) => (
                      <td key={i} className="px-6 py-4 text-center">
                        <Cell v={v} accent={["text-blue-2", "text-blue-2", "text-blue-1", "text-blue-1"][i]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
