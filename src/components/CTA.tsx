import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

export const CTA = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgBlobY = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const contentY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);

  return (
    <section id="contact" ref={ref} className="relative py-32 overflow-hidden">
      <div className="container">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative overflow-hidden rounded-[2rem] surface p-12 text-foreground md:p-20 will-change-transform"
        >
          {/* Parallax glow blobs */}
          <motion.div style={{ y: bgBlobY }} className="pointer-events-none absolute inset-0 will-change-transform">
            <div className="absolute -top-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[hsl(var(--green-1)/0.4)] blur-3xl" />
            <div className="absolute right-[-100px] bottom-[-100px] h-[400px] w-[400px] rounded-full bg-[hsl(var(--green-2)/0.35)] blur-3xl" />
            <div className="absolute left-[-80px] top-1/3 h-[300px] w-[300px] rounded-full bg-brand-1/25 blur-3xl" />
          </motion.div>

          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-1 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-1" />
              </span>
              Get connected today
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 30, letterSpacing: "0.05em" }}
              whileInView={{ opacity: 1, y: 0, letterSpacing: "-0.02em" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl font-bold leading-[1.02] md:text-7xl lg:text-8xl"
            >
              Ready to power up your <span className="text-green-1">smart building?</span>
            </motion.h2>
            <p className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground md:text-xl">
              See PROsmart Energy in action with a personalised demo tailored to your portfolio.
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
};
