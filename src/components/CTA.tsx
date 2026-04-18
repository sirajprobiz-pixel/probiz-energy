import { motion } from "framer-motion";

export const CTA = () => (
  <section id="contact" className="relative py-32">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[2rem] glass-strong p-12 md:p-20"
      >
        <div className="absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-radial blur-3xl" />
        <div className="absolute inset-0 bg-grid opacity-50" />

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-cyan" />
            </span>
            Get connected today
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
            Ready to power up your <span className="gradient-text">smart building?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            See PROsmart in action with a personalised demo tailored to your portfolio.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://probizautomation.com/book-a-demo"
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-primary px-8 py-4 font-medium text-primary-foreground transition-all hover:shadow-[0_0_60px_hsl(var(--primary)/0.7)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Book a Demo</span>
              <span className="relative transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="https://probizautomation.com/contact-us"
              target="_blank"
              rel="noreferrer"
              className="rounded-full glass px-8 py-4 font-medium transition-all hover:bg-white/10"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);
