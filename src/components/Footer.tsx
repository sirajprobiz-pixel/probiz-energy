import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const COLS = [
  { title: "Products", links: ["PROsmart Energy", "Probiz Energy AI"] },
  { title: "Company",  links: ["About", "Sustainability", "Blogs", "Contact"] },
];

export const Footer = () => (
  <footer className="relative overflow-hidden border-t border-border bg-card py-16">
    {/* Light green glass accents */}
    <div className="pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-[hsl(var(--green-1)/0.35)] blur-3xl" />
    <div className="pointer-events-none absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-[hsl(var(--green-2)/0.3)] blur-3xl" />

    <div className="container relative">
      <div className="grid gap-12 lg:grid-cols-[1.5fr_2fr]">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <div className="relative h-9 w-9">
              <div className="absolute inset-0 rounded-lg bg-[hsl(var(--green-1)/0.5)] blur-md" />
              <div className="relative flex h-full w-full items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Zap size={18} strokeWidth={2.5} />
              </div>
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
                  <li key={l}>
                    <a href="#" className="group inline-block text-sm text-muted-foreground transition-colors hover:text-green-1">
                      <span className="relative">
                        {l}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-green-1 transition-all duration-300 group-hover:w-full" />
                      </span>
                    </a>
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
