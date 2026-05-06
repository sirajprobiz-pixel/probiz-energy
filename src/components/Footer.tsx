import { Link } from "react-router-dom";
import { useRef, type MouseEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import logo from "@/assets/logo.png";

const COLS: Array<{ title: string; links: Array<{ label: string; to: string }> }> = [
  {
    title: "Products",
    links: [
      { label: "Our Products", to: "/products" },
      { label: "PROsmart Energy", to: "/" },
      { label: "Probiz Energy AI", to: "/" },
      { label: "Pricing", to: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Sustainability", to: "/sustainability" },
      { label: "Blog", to: "/blog" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

/* Animated mesh-gradient dots for the footer background — lightweight Spline replacement */
const FooterMesh = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {/* Animated gradient orbs */}
    <div className="footer-orb footer-orb-1" />
    <div className="footer-orb footer-orb-2" />
    <div className="footer-orb footer-orb-3" />
    {/* Subtle dot grid */}
    <div className="absolute inset-0 bg-dots opacity-30" />
    {/* Top fade so content is readable */}
    <div className="absolute inset-0 bg-gradient-to-b from-card/80 via-card/50 to-card/90" />
  </div>
);

export const Footer = () => {
  const tiltRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgBlobY = useTransform(scrollYProgress, [0, 1], [80, -60]);

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rx = (-y / rect.height) * 24;
    const ry = (x / rect.width) * 24;
    el.style.transform = `perspective(500px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
  };

  const handleLeave = () => {
    if (tiltRef.current) {
      tiltRef.current.style.transform = "perspective(500px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    }
  };

  return (
    <footer ref={sectionRef} className="relative overflow-hidden border-t border-border bg-card py-12 sm:py-16">
      {/* Animated mesh background — Spline replacement */}
      <motion.div style={{ y: bgBlobY }} className="pointer-events-none absolute inset-0 will-change-transform">
        <FooterMesh />
      </motion.div>

      <div className="container relative z-10">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[1.5fr_2fr]">
          <div>
            <Link
              to="/"
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
              className="group inline-flex items-center gap-2.5"
              style={{ perspective: "500px" }}
            >
              <div
                ref={tiltRef}
                className="relative h-10 w-10 transition-transform duration-200 ease-out will-change-transform sm:h-12 sm:w-12"
              >
                <img
                  src={logo}
                  alt="PROsmart Energy"
                  className="relative h-10 w-10 object-contain transition-transform duration-700 ease-out group-hover:rotate-[360deg] sm:h-12 sm:w-12"
                />
              </div>
              <span className="text-lg font-bold sm:text-xl" style={{ fontFamily: "'Quicksand', sans-serif", color: '#317ade' }}>Prosmart Energy</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground sm:mt-4">
              Effortless energy monitoring and automated tenant billing for the buildings of tomorrow.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:gap-8">
            {COLS.map((c) => (
              <div key={c.title}>
                <div className="font-display text-sm font-semibold">{c.title}</div>
                <ul className="mt-3 space-y-2 sm:mt-4">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="group inline-block text-sm text-muted-foreground transition-colors hover:text-green-1">
                        <span className="relative">
                          {l.label}
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-green-1 transition-all duration-300 group-hover:w-full" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:mt-12 sm:flex-row sm:items-center sm:gap-4 sm:pt-8">
          <div>© 2026 Probiz Automation — All Rights Reserved.</div>
          <div>Powered by Probiz Technologies</div>
        </div>
      </div>
    </footer>
  );
};
