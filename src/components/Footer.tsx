import { Link } from "react-router-dom";
import { useRef, type MouseEvent } from "react";
import logo from "@/assets/logo.png";

const COLS: Array<{ title: string; links: Array<{ label: string; to: string }> }> = [
  {
    title: "Products",
    links: [
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

export const Footer = () => {
  const tiltRef = useRef<HTMLDivElement>(null);

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
    <footer className="relative overflow-hidden border-t border-border bg-card py-16">
      {/* Light green glass accents */}
      <div className="pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-[hsl(var(--green-1)/0.35)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-[hsl(var(--green-2)/0.3)] blur-3xl" />

      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_2fr]">
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
                className="relative h-12 w-12 transition-transform duration-200 ease-out will-change-transform"
              >
                <img
                  src={logo}
                  alt="PROsmart Energy"
                  className="relative h-12 w-12 object-contain transition-transform duration-700 ease-out group-hover:rotate-[360deg]"
                />
              </div>
              <span className="font-display text-xl font-bold">PROsmart Energy</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Effortless energy monitoring and automated tenant billing for the buildings of tomorrow.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {COLS.map((c) => (
              <div key={c.title}>
                <div className="font-display text-sm font-semibold">{c.title}</div>
                <ul className="mt-4 space-y-2">
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
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <div>© 2026 Probiz Automation — All Rights Reserved.</div>
          <div>Powered by Probiz Technologies</div>
        </div>
      </div>
    </footer>
  );
};
