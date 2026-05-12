import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Globe, Wifi, Zap, ShoppingCart, BarChart3, Shield, Sun, Battery, Leaf, Route, Gift, Users, Store } from "lucide-react";
import { useLenis } from "@/hooks/useLenis";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollProgress } from "@/components/ScrollProgress";
import { AnimatedText } from "@/components/AnimatedText";
import brandLogo from "@/assets/logo.png";
import { CTA } from "@/components/CTA";
import productConnectImg from "@/assets/product-connect.png";
import productEnergyImg from "@/assets/product-energy.png";
import productRetailImg from "@/assets/product-retail.png";

const PRODUCTS = [
  {
    name: "Probiz Connect",
    tagline: "AI-powered eB2B cloud platform for sales & distribution.",
    description:
      "Probiz Connect is a software-as-a-service (SaaS) solution designed for consumer goods brands of various sizes — micro, small, and medium — to digitise, automate, optimise, and efficiently manage the expansion of their B2B sales operations involving retailers, distributors, and sales teams. It empowers field sales and distribution teams with technology to boost revenue and foster lasting relationships.",
    features: [
      { icon: ShoppingCart, label: "Sales Connect", detail: "Real-time order processing, inventory tracking, performance analytics and incentive management" },
      { icon: Users, label: "Dealer Connect", detail: "Streamline orders, tracking and communication for dealer & distributor networks" },
      { icon: Gift, label: "Reward Schemes", detail: "Points-based rewards or instant cash incentives for customisable partner engagement" },
      { icon: Route, label: "Route Optimisation", detail: "Intelligent route planning for field sales teams to maximise coverage" },
    ],
    image: productConnectImg,
    url: "https://probizconnect.io",
    color: "hsl(var(--green-1))",
    gradient: "from-[hsl(var(--green-1)/0.2)] to-transparent",
  },
  {
    name: "Probiz Energy",
    tagline: "Sustainable renewable solar — save energy up to 40%.",
    description:
      "Probiz Energy delivers sustainable renewable solar and wind energy solutions for a cleaner future. With a focus on accessible, affordable, and reliable clean energy, we offer premium solar panel systems designed for maximum efficiency and minimal footprint. Trusted by 100+ homeowners in South India with 5+ years of excellence, and partnered with Brigade Group, Puravankara, BMRCL, Divyasree, and Infiniti.",
    features: [
      { icon: Sun, label: "Solar installation", detail: "Premium solar panel systems designed for maximum efficiency and minimal footprint" },
      { icon: Battery, label: "Energy storage", detail: "Advanced battery solutions to store surplus energy for round-the-clock power" },
      { icon: Leaf, label: "Green energy plans", detail: "Comprehensive plans to help businesses and homeowners achieve net-zero carbon" },
      { icon: Shield, label: "Industry warranty", detail: "Industry-leading coverage to protect your energy investment long-term" },
    ],
    image: productEnergyImg,
    url: "https://probizenergy.com",
    color: "hsl(160, 80%, 45%)",
    gradient: "from-[hsl(160,80%,45%,0.2)] to-transparent",
  },
  {
    name: "Probiz Retail",
    tagline: "Smart solutions for retail success.",
    description:
      "Probiz Retail delivers smart solutions for modern retail success. From intelligent point-of-sale systems and real-time inventory management to AI-powered theft prevention and sales analytics, Probiz Retail gives store managers and franchise owners the tools to boost revenue, cut losses, and run smarter operations at scale — all from a single, unified platform.",
    features: [
      { icon: Store, label: "Smart POS", detail: "Fast checkout with barcode scanning and seamless payment integrations" },
      { icon: BarChart3, label: "Sales analytics", detail: "Revenue forecasting, margin analysis, and real-time trend reports" },
      { icon: Globe, label: "Inventory management", detail: "Real-time stock levels, auto-reorder alerts, and SKU tracking" },
      { icon: Wifi, label: "AI theft prevention", detail: "CCTV-powered behaviour analytics and intelligent shrinkage alerts" },
    ],
    image: productRetailImg,
    url: "https://probizretail.com",
    color: "hsl(140, 70%, 42%)",
    gradient: "from-[hsl(140,70%,42%,0.2)] to-transparent",
  },
];

const Products = () => {
  useLenis();

  useEffect(() => {
    document.title = "Our Products — Probiz Automation";
    const meta = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
      return m;
    })();
    meta.setAttribute("content", "Explore the Probiz product suite — Probiz Connect, Probiz Energy and Probiz Retail. IoT, energy intelligence and retail automation solutions.");
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <ScrollProgress />
      <Header />
      <ThemeToggle />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-40 pb-24">
          <div className="pointer-events-none absolute -top-32 left-[8%] h-80 w-80 rounded-full bg-[hsl(var(--green-1)/0.4)] blur-3xl" />
          <div className="pointer-events-none absolute top-20 right-[8%] h-96 w-96 rounded-full bg-[hsl(var(--green-2)/0.35)] blur-3xl" />
          <div className="absolute inset-0 bg-grid" />

          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium"
            >
              <img src={brandLogo} alt="" className="h-4 w-4 object-contain" />
              <span className="text-muted-foreground">Our Product Suite</span>
            </motion.div>

            <AnimatedText as="h1" text="Our Products" className="font-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl" />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 max-w-2xl text-lg text-muted-foreground"
            >
              Probiz offers a unified ecosystem of powerful platforms, providing modern enterprises with essential tools for IoT connectivity, energy intelligence, eB2B and retail automation.
            </motion.p>
          </div>
        </section>

        {/* Products */}
        {PRODUCTS.map((product, idx) => (
          <section key={product.name} className="relative py-20 md:py-28">
            {/* Background glow */}
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${product.gradient}`} />

            <div className="container relative">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`grid items-center gap-10 lg:gap-16 ${idx % 2 === 1 ? "lg:grid-cols-[1fr_1.6fr]" : "lg:grid-cols-[1fr_1.6fr]"}`}
              >
                {/* Text side */}
                <div className={idx % 2 === 1 ? "order-2 lg:order-1" : ""}>
                  <div
                    className="mb-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em]"
                    style={{ backgroundColor: `${product.color}20`, color: product.color }}
                  >
                    {product.name}
                  </div>

                  <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">
                    {product.tagline}
                  </h2>

                  <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {product.features.map((f, fi) => (
                      <motion.div
                        key={f.label}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: fi * 0.08 }}
                        className="surface rounded-2xl p-4"
                      >
                        <div
                          className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl"
                          style={{ backgroundColor: `${product.color}20`, color: product.color }}
                        >
                          <f.icon size={18} />
                        </div>
                        <div className="text-sm font-semibold">{f.label}</div>
                        <div className="mt-0.5 text-xs text-muted-foreground">{f.detail}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)] hover:translate-y-[-2px]"
                  >
                    Visit {product.name} <ArrowUpRight size={16} />
                  </a>
                </div>

                {/* Image side */}
                <motion.div
                  className={`${idx % 2 === 1 ? "order-1 lg:order-2" : ""}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                >
                  <div className="relative overflow-hidden rounded-3xl border border-border shadow-2xl">
                    <div
                      className="pointer-events-none absolute inset-0 rounded-3xl"
                      style={{ boxShadow: `inset 0 0 80px 20px ${product.color}15` }}
                    />
                    <img
                      src={product.image}
                      alt={`${product.name} dashboard`}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Divider between products */}
            {idx < PRODUCTS.length - 1 && (
              <div className="container mt-20 md:mt-28">
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
              </div>
            )}
          </section>
        ))}

        {/* Ecosystem banner */}
        <section className="py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="surface relative overflow-hidden rounded-[2rem] p-10 md:p-14 text-center"
            >
              <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[hsl(var(--green-1)/0.3)] blur-3xl" />
              <div className="relative">
                <AnimatedText as="h2" text="One ecosystem, infinite possibilities." className="font-display text-3xl font-bold tracking-tight md:text-5xl" />
                <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
                  All three products operate under the Probiz Automation umbrella. Digitise your B2B sales with Probiz Connect, power your buildings with renewable solar via Probiz Energy, and transform your retail operations with Probiz Retail.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  {PRODUCTS.map((p) => (
                    <a
                      key={p.name}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-all hover:border-green-1 hover:shadow-lg"
                    >
                      <span style={{ color: p.color }}>●</span>
                      {p.name}
                      <ArrowUpRight size={14} className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <CTA />
      </main>

      <Footer />
    </div>
  );
};

export default Products;
