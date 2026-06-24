import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const NAV = [
  { label: "Platform", href: "/#platform" },
  { label: "About", href: "/about" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Blog", href: "https://blogsbyprobiz.vercel.app/prosmart-energy/blogs" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}
    >
      <div className="container">
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            scrolled ? "glass-strong" : "bg-transparent"
          }`}
        >
          <Link to="/" className="group flex items-center gap-2.5">
            <div className="relative h-10 w-10">
              <img
                src={logo}
                alt="PROsmart Energy"
                width={40}
                height={40}
                className="relative h-10 w-10 object-contain transition-transform duration-700 ease-out group-hover:rotate-[360deg] group-hover:scale-110"
              />
            </div>
            <span className="text-lg font-bold tracking-tight" style={{ fontFamily: "'Quicksand', sans-serif", color: '#317ade' }}>Prosmart Energy</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => {
              const isExternal = item.href.startsWith("http");
              const isRoute = !isExternal && item.href.startsWith("/") && !item.href.startsWith("/#");
              const cls = "group relative rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground";
              const inner = (
                <>
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute inset-0 scale-90 rounded-full bg-brand-5 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                </>
              );
              return isRoute ? (
                <Link key={item.href} to={item.href} className={cls}>{inner}</Link>
              ) : (
                <a key={item.href} href={item.href} className={cls} {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inner}</a>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Link
              to="/book-demo"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)]"
            >
              <span className="relative z-10">Book a Demo</span>
              <span className="relative z-10 transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>

          <button onClick={() => setOpen(!open)} className="rounded-lg p-2 md:hidden" aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 rounded-2xl glass-strong p-4 md:hidden"
          >
            {NAV.map((item) => {
              const isExternal = item.href.startsWith("http");
              const isRoute = !isExternal && item.href.startsWith("/") && !item.href.startsWith("/#");
              const cls = "block rounded-lg px-4 py-3 text-sm text-muted-foreground hover:bg-brand-5 hover:text-foreground";
              return isRoute ? (
                <Link key={item.href} to={item.href} onClick={() => setOpen(false)} className={cls}>{item.label}</Link>
              ) : (
                <a key={item.href} href={item.href} onClick={() => setOpen(false)} className={cls} {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{item.label}</a>
              );
            })}
            <Link
              to="/book-demo"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-full bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground"
            >
              Book a Demo
            </Link>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};
