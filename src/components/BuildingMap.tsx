import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  ChevronRight,
  MapPin,
  Maximize2,
  Palette,
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
const DEFAULT_FLOOR = 15;

const getStateByName = (name: string) => STATES.find((s) => s.name === name) ?? STATES[0];
const clampFloor = (f: number, max: number) => Math.min(Math.max(f, 1), max);

export const BuildingMap = () => {
  const defaultBuilding = getStateByName(DEFAULT_STATE).buildings[0];
  const [openState, setOpenState] = useState<string | null>(DEFAULT_STATE);
  const [activeBuilding, setActiveBuilding] = useState<{ state: string; b: Building }>({
    state: DEFAULT_STATE,
    b: defaultBuilding,
  });
  const [activeFloor, setActiveFloor] = useState(clampFloor(DEFAULT_FLOOR, defaultBuilding.floors));

  const totalBuildings = STATES.reduce((a, s) => a + s.buildings.length, 0);

  const selectBuilding = (stateName: string, b: Building, floor = 1) => {
    setOpenState(stateName);
    setActiveBuilding({ state: stateName, b });
    setActiveFloor(clampFloor(floor, b.floors));
  };

  const toggleState = (name: string) => {
    if (openState === name) { setOpenState(null); return; }
    setOpenState(name);
  };

  const resetView = () => selectBuilding(DEFAULT_STATE, getStateByName(DEFAULT_STATE).buildings[0], DEFAULT_FLOOR);

  return (
    <section id="map" className="relative py-24 md:py-32">
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
            className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl"
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
            Click a floor on the 3D model to inspect live energy, HVAC, water and gas telemetry — across your entire portfolio.
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
            {/* 3D BUILDING CANVAS */}
            <div className="relative min-h-[680px] overflow-hidden bg-[hsl(var(--blue-5))]">
              <div className="absolute inset-0 bg-grid opacity-25" />

              {/* Top chips */}
              <div className="absolute left-4 top-4 z-20 flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 rounded-xl border border-border bg-card/85 px-3 py-2 backdrop-blur">
                  <Building2 size={14} className="text-blue-1" />
                  <span className="text-sm font-semibold text-foreground">Nordic</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-border bg-card/85 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-1" />
                  Hover floors to inspect
                </div>
              </div>

              {/* Top-right tools */}
              <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
                <button aria-label="Theme" className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card/85 text-muted-foreground backdrop-blur transition-colors hover:text-foreground">
                  <Palette size={16} />
                </button>
                <button aria-label="Fullscreen" className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card/85 text-muted-foreground backdrop-blur transition-colors hover:text-foreground">
                  <Maximize2 size={16} />
                </button>
              </div>

              {/* Building image */}
              <div className="absolute inset-x-6 top-20 bottom-24 flex items-center justify-center">
                <motion.img
                  key={activeBuilding.b.name}
                  src={building3D}
                  alt={`${activeBuilding.b.name} 3D model`}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-auto max-w-full object-contain drop-shadow-[0_30px_60px_hsl(var(--primary)/0.25)]"
                  loading="lazy"
                />

                {/* Floor selector overlay (left) */}
                <div className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2">
                  <div className="pointer-events-auto flex max-h-[420px] flex-col gap-1 overflow-y-auto rounded-2xl border border-border bg-card/85 p-2 backdrop-blur">
                    {Array.from({ length: activeBuilding.b.floors }).map((_, i) => {
                      const floor = activeBuilding.b.floors - i;
                      const isActive = floor === activeFloor;
                      return (
                        <button
                          key={floor}
                          onClick={() => setActiveFloor(floor)}
                          className={`min-w-[44px] rounded-md px-2 py-1 text-[11px] font-semibold transition-colors ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                          aria-label={`Floor ${floor}`}
                        >
                          F{floor}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom info card */}
              <div className="absolute inset-x-4 bottom-4 z-20 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card/90 px-4 py-3 backdrop-blur">
                <div className="flex items-center gap-2 text-sm">
                  <Sparkles size={14} className="text-blue-1" />
                  <span className="text-muted-foreground">Click a floor to inspect · Scroll to zoom</span>
                </div>
                <div className="text-sm font-semibold text-foreground">
                  Floor <span className="text-blue-1">{activeFloor}</span> selected · {Math.max(2, Math.floor(activeBuilding.b.devices / activeBuilding.b.floors))} devices
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
                  <MetaCell label="Viewing" value={`F${activeFloor}`} highlight />
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
                                          onClick={() => selectBuilding(s.name, b, 1)}
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

                  <LiveKPIPanel floor={activeFloor} buildingName={activeBuilding.b.name} />
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
