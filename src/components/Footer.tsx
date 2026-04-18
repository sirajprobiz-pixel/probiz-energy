import { Link } from "react-router-dom";

const COLS = [
  { title: "Products",  links: ["PROsmart", "Probiz Energy AI"] },
  { title: "Solutions", links: ["Building Automation", "Energy Management", "IoT & AI Analytics", "GRMS & Lighting Control"] },
  { title: "Company",   links: ["About", "Sustainability", "Blogs", "Contact"] },
];

export const Footer = () => (
  <footer className="relative border-t border-border bg-card py-16">
    <div className="container">
      <div className="grid gap-12 lg:grid-cols-[1.5fr_2fr]">
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <div className="relative h-9 w-9">
              <div className="absolute inset-0 rounded-lg bg-brand-1 opacity-30 blur-md" />
              <div className="relative flex h-full w-full items-center justify-center rounded-lg bg-primary font-display text-base font-bold text-primary-foreground">P</div>
            </div>
            <span className="font-display text-xl font-bold">PROsmart</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Effortless energy monitoring and automated tenant billing for the buildings of tomorrow.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {COLS.map((c) => (
            <div key={c.title}>
              <div className="font-display text-sm font-semibold">{c.title}</div>
              <ul className="mt-4 space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="group inline-block text-sm text-muted-foreground transition-colors hover:text-blue-1">
                      <span className="relative">
                        {l}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-brand-1 transition-all duration-300 group-hover:w-full" />
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
