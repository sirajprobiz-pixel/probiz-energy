import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const CTA = () => (
  <section id="contact" className="relative py-32">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[2rem] surface p-12 text-foreground md:p-20"
      >
        <div className="absolute -top-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-brand-1/30 blur-3xl" />
        <div className="absolute right-[-100px] bottom-[-100px] h-[400px] w-[400px] rounded-full bg-brand-3/25 blur-3xl" />

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Get connected today
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
            Ready to power up your <span className="text-blue-2">smart building?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            See PROsmart in action with a personalised demo tailored to your portfolio.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/book-demo"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-medium text-primary-foreground transition-all hover:shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.7)]"
            >
              Book a Demo
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              to="/pricing"
              className="rounded-full glass px-8 py-4 font-medium text-foreground transition-all hover:bg-white/10"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
