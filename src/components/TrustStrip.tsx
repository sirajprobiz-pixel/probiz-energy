import { motion } from "framer-motion";

const LOGOS = [
  "PRESTIGE", "DLF", "BRIGADE", "GODREJ", "OBEROI", "SOBHA", "LODHA", "EMBASSY",
];

export const TrustStrip = () => {
  return (
    <section className="relative border-y border-border py-16">
      <div className="container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground"
        >
          Trusted by forward-thinking developers & enterprises
        </motion.p>
        <div className="grid grid-cols-2 items-center gap-x-10 gap-y-8 sm:grid-cols-4 lg:grid-cols-8">
          {LOGOS.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="text-center font-display text-base font-semibold tracking-wider text-muted-foreground/70 transition-colors hover:text-foreground"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
