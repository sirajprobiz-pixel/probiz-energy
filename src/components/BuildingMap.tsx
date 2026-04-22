import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  Building2,
  ChevronRight,
  MapPin,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import building3D from "@/assets/building-3d.png";
import { LiveKPIPanel } from "@/components/building-map/LiveKPIPanel";

type Building = { name: string; floors: number; devices: number; location: string };
type StateNode = { name: string; buildings: Building[] };

const STATES: StateNode[] = [
  { name: "Delhi",       buildings: [{ name: "Cyber Hub Tower",    floors: 12, devices: 184, location: "DLF Cyber City, Gurugram" }] },
  { name: "Haryana",     buildings: [{ name: "Gurugram One",       floors: 18, devices: 240, location: "Sector 74, Gurugram" }] },
  { name: "Gujarat",     buildings: [{ name: "Ahmedabad Plaza",    floors: 10, devices: 142, location: "SG Highway, Ahmedabad" }] },
  { name: "Maharashtra", buildings: [
    { name: "BKC Trade Centre",  floors: 24, devices: 312, location: "Bandra Kurla Complex, Mumbai" },
    { name: "Pune Tech Park",    floors: 14, devices: 198, location: "Hinjewadi Phase 2, Pune" },
  ]},
  { name: "West Bengal", buildings: [{ name: "Salt Lake Tower",    floors: 16, devices: 220, location: "Sector V, Kolkata" }] },
  { name: "Karnataka",   buildings: [
    { name: "Brigade Triumph",   floors: 18, devices: 286, location: "Hebbal, Bengaluru · Mixed Use" },
    { name: "Electronic City 2", floors: 12, devices: 164, location: "Phase 2, Bengaluru" },
  ]},
  { name: "Tamil Nadu",  buildings: [
    { name: "OMR Tech Tower",    floors: 22, devices: 304, location: "OMR, Chennai" },
    { name: "Chennai Central",   floors: 10, devices: 132, location: "Anna Salai, Chennai" },
  ]},
];

const DEFAULT_STATE = "Karnataka";

const getStateByName = (name: string) => STATES.find((s) => s.name === name) ?? STATES[0];

export const BuildingMap = () => {
  const defaultBuilding = getStateByName(DEFAULT_STATE).buildings[0];
  const [openState, setOpenState] = useState<string | null>(DEFAULT_STATE);
  const [activeBuilding, setActiveBuilding] = useState<{ state: string; b: Building }>({
    state: DEFAULT_STATE,
    b: defaultBuilding,
  });

  const totalBuildings = STATES.reduce((a, s) => a + s.buildings.length, 0);

  // Parallax for 3D building
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const buildingY = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const buildingScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1.15]);
  const buildingRotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);

  const selectBuilding = (stateName: string, b: Building) => {
    setOpenState(stateName);
    setActiveBuilding({ state: stateName, b });
  };

  const toggleState = (name: string) => {
    if (openState === name) { setOpenState(null); return; }
    setOpenState(name);
  };

  const resetView = () => selectBuilding(DEFAULT_STATE, getStateByName(DEFAULT_STATE).buildings[0]);

  return (
    <section id="map" ref={sectionRef} className="relative py-24 md:py-32">
      <div className="container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-1" />
            Interactive 3D Building View
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl pb-2"
          >
            Step inside every building, floor by floor.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-base text-balance text-muted-foreground md:text-lg"
          >
            Explore live energy, HVAC, water and gas telemetry — across your entire portfolio with our interactive 3D building model.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2rem] surface"
        >
          <div className="grid xl:grid-cols-[minmax(0,1.15fr)_440px]">
            {/* 3D BUILDING — Clean image with parallax */}
            <div className="relative min-h-[680px] overflow-hidden bg-[hsl(var(--blue-5))]">
              <div className="absolute inset-0 bg-grid opacity-25" />

              {/* Top chips */}
              <div className="absolute left-4 top-4 z-20 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 rounded-xl border border-border bg-card/85 px-3 py-2 backdrop-blur">
                  <Building2 size={14} className="text-blue-1" />
                  <span className="text-sm font-semibold text-foreground">{activeBuilding.b.name}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-border bg-card/85 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-1 animate-pulse" />
                  Live monitoring
                </div>
              </div>

              {/* 3D Spline building with parallax */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  style={{ y: buildingY, scale: buildingScale, rotateZ: buildingRotate }}
                  className="relative h-full w-full will-change-transform"
                >
                  <Suspense fallback={<div className="h-full w-full animate-pulse bg-muted/20" />}>
                    <Spline scene="https://prod.spline.design/Cwu93o0jAcr1n2YZ/scene.splinecode" />
                  </Suspense>
                </motion.div>
              </div>

              {/* Bottom info card */}
              <div className="absolute inset-x-4 bottom-4 z-20 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card/90 px-4 py-3 backdrop-blur">
                <div className="flex items-center gap-2 text-sm">
                  <Sparkles size={14} className="text-blue-1" />
                  <span className="text-muted-foreground">Select a building to explore · Interactive 3D model</span>
                </div>
                <div className="text-sm font-semibold text-foreground">
                  <span className="text-blue-1">{activeBuilding.b.floors}</span> floors · {activeBuilding.b.devices} devices
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <aside className="border-t border-border bg-card xl:border-l xl:border-t-0">
              <div className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-3 border-b border-border p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-blue-1">
                      <Building2 size={18} />
                    </div>
                    <div>
                      <div className="font-display text-lg font-semibold text-foreground">{activeBuilding.b.name}</div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin size={11} />
                        {activeBuilding.b.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-blue-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-1 animate-pulse" />
                    Live
                  </div>
                </div>

                {/* Building meta */}
                <div className="grid grid-cols-3 gap-2 border-b border-border p-4">
                  <MetaCell label="Devices" value={activeBuilding.b.devices} />
                  <MetaCell label="Floors" value={activeBuilding.b.floors} />
                  <MetaCell label="State" value={activeBuilding.state} highlight />
                </div>

                {/* Properties tree */}
                <div className="flex-1 space-y-4 overflow-hidden p-4">
                  <div className="rounded-2xl border border-border bg-muted/30 p-3">
                    <div className="mb-2 flex items-center justify-between px-2">
                      <div className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">Portfolio · India</div>
                      <span className="text-[10px] text-muted-foreground">{totalBuildings} buildings</span>
                    </div>

                    <div className="max-h-[260px] space-y-1 overflow-y-auto pr-1">
                      {STATES.map((s) => {
                        const isOpen = openState === s.name;
                        return (
                          <div key={s.name} className="rounded-xl">
                            <button
                              onClick={() => toggleState(s.name)}
                              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors ${
                                activeBuilding.state === s.name ? "bg-primary/10" : "hover:bg-muted"
                              }`}
                            >
                              <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                                <ChevronRight size={14} className={`text-muted-foreground transition-transform ${isOpen ? "rotate-90" : ""}`} />
                                <Building2 size={14} className="text-blue-1" />
                                {s.name}
                              </span>
                              <span className="rounded-full bg-card px-2 py-0.5 text-xs text-muted-foreground">
                                {s.buildings.length}
                              </span>
                            </button>

                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="overflow-hidden pl-7"
                                >
                                  <div className="space-y-1 pb-2 pt-1">
                                    {s.buildings.map((b) => {
                                      const isSelected = activeBuilding.b.name === b.name;
                                      return (
                                        <button
                                          key={b.name}
                                          onClick={() => selectBuilding(s.name, b)}
                                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                                            isSelected
                                              ? "bg-primary text-primary-foreground"
                                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                          }`}
                                        >
                                          <span className="truncate">{b.name}</span>
                                          <span className={`text-[11px] ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                                            {b.floors}F
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <LiveKPIPanel floor={1} buildingName={activeBuilding.b.name} />
                </div>

                <div className="border-t border-border p-4">
                  <button
                    onClick={resetView}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted/50 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <RotateCcw size={14} />
                    Reset View
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const MetaCell = ({ label, value, highlight = false }: { label: string; value: string | number; highlight?: boolean }) => (
  <div className="rounded-xl border border-border bg-muted/40 p-3 text-center">
    <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
    <div className={`font-display text-base font-semibold ${highlight ? "text-blue-1" : "text-foreground"}`}>{value}</div>
  </div>
);
