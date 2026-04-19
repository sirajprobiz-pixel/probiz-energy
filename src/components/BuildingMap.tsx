import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Wifi, Radio, Search, Sparkles, Sun, ChevronRight, MapPin, RotateCcw, ArrowRight, Zap, Activity, AlertTriangle, Gauge, Droplets, Flame } from "lucide-react";
import indiaMap from "@/assets/india-map-3d.png";

type Building = { name: string; floors: number; devices: number };
type StateNode = { name: string; buildings: Building[]; x: number; y: number };

// Coordinates are % within the map SVG viewBox
const STATES: StateNode[] = [
  { name: "Delhi",       x: 49, y: 27, buildings: [{ name: "Cyber Hub Tower",    floors: 12, devices: 184 }] },
  { name: "Haryana",     x: 47, y: 30, buildings: [{ name: "Gurugram One",       floors: 18, devices: 240 }] },
  { name: "Gujarat",     x: 33, y: 42, buildings: [{ name: "Ahmedabad Plaza",    floors: 10, devices: 142 }] },
  { name: "Maharashtra", x: 36, y: 55, buildings: [
    { name: "BKC Trade Centre",  floors: 24, devices: 312 },
    { name: "Pune Tech Park",    floors: 14, devices: 198 },
  ]},
  { name: "West Bengal", x: 70, y: 50, buildings: [{ name: "Salt Lake Tower",    floors: 16, devices: 220 }] },
  { name: "Karnataka",   x: 44, y: 75, buildings: [
    { name: "Whitefield Hub",    floors: 20, devices: 286 },
    { name: "Electronic City 2", floors: 12, devices: 164 },
  ]},
  { name: "Tamil Nadu",  x: 51, y: 80, buildings: [
    { name: "OMR Tech Tower",    floors: 22, devices: 304 },
    { name: "Chennai Central",   floors: 10, devices: 132 },
  ]},
];

export const BuildingMap = () => {
  const [openState, setOpenState] = useState<string | null>("Maharashtra");
  const [activeBuilding, setActiveBuilding] = useState<{ state: string; b: Building } | null>({
    state: "Maharashtra",
    b: STATES.find((s) => s.name === "Maharashtra")!.buildings[0],
  });
  const [activeFloor, setActiveFloor] = useState(5);

  const totalBuildings = STATES.reduce((a, s) => a + s.buildings.length, 0);
  const totalDevices = STATES.reduce((a, s) => a + s.buildings.reduce((x, b) => x + b.devices, 0), 0);

  return (
    <section id="map" className="relative py-32">
      <div className="container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-1" />
            Interactive 3D Map
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl"
          >
            Every building, every floor — on one live map.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-base text-muted-foreground text-balance md:text-lg"
          >
            Navigate your portfolio at a glance. Drill down from country → state → property → floor — all powered by real-time telemetry.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl surface"
        >
          <div className="grid lg:grid-cols-[1fr_340px]">
            {/* MAP CANVAS */}
            <div className="relative min-h-[560px] bg-muted/40">
              {/* Top stat chips */}
              <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-2">
                <StatChip icon={Building2} label="Properties" value={totalBuildings} />
                <StatChip icon={Wifi} label="Active" value={Math.floor(totalBuildings * 0.85)} />
                <StatChip icon={Radio} label="Devices" value={totalDevices.toLocaleString()} />
                <ToolBtn icon={Search} />
                <ToolBtn icon={Sparkles} />
                <ToolBtn icon={Sun} />
              </div>

              {/* India 3D map background */}
              <div className="absolute inset-0">
                <img
                  src={indiaMap}
                  alt="India 3D map of PROsmart properties"
                  className="h-full w-full object-cover object-center opacity-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/20" />
              </div>

              {/* Pings */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
                {STATES.map((s) => {
                  const isActive = openState === s.name;
                  return (
                    <g
                      key={s.name}
                      transform={`translate(${s.x}, ${s.y})`}
                      className="cursor-pointer"
                      onClick={() => {
                        setOpenState(s.name);
                        setActiveBuilding({ state: s.name, b: s.buildings[0] });
                      }}
                    >
                      {isActive && (
                        <circle r="3.2" className="fill-primary/40">
                          <animate attributeName="r" from="1.5" to="4" dur="1.6s" repeatCount="indefinite" />
                          <animate attributeName="opacity" from="0.7" to="0" dur="1.6s" repeatCount="indefinite" />
                        </circle>
                      )}
                      <circle r={isActive ? 1.6 : 1.1} className={isActive ? "fill-primary" : "fill-blue-1"} stroke="white" strokeWidth="0.3" />
                    </g>
                  );
                })}
              </svg>


              {/* Bottom command bar */}
              <div className="absolute inset-x-4 bottom-4 z-20 flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2.5 backdrop-blur">
                <Sparkles size={14} className="text-blue-1" />
                <input
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  placeholder={activeBuilding ? `Go to ${activeFloor}th floor of ${activeBuilding.b.name}` : "Search properties, floors or devices…"}
                />
                <button
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground"
                  aria-label="Navigate"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* SIDEBAR */}
            <aside className="relative border-t border-border bg-card lg:border-l lg:border-t-0">
              <div className="flex items-center gap-3 border-b border-border p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-blue-1">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="font-display text-base font-semibold text-foreground">Properties</div>
                  <div className="text-xs text-muted-foreground">{totalBuildings} buildings</div>
                </div>
              </div>

              <div className="px-5 pt-4">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">India</div>
              </div>

              <div className="max-h-[420px] space-y-1 overflow-y-auto p-3">
                {STATES.map((s) => {
                  const open = openState === s.name;
                  return (
                    <div key={s.name} className="rounded-xl">
                      <button
                        onClick={() => setOpenState(open ? null : s.name)}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-muted"
                      >
                        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                          <ChevronRight size={14} className={`transition-transform ${open ? "rotate-90" : ""} text-muted-foreground`} />
                          <Building2 size={14} className="text-blue-1" />
                          {s.name}
                        </span>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {s.buildings.length}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden pl-7"
                          >
                            <div className="space-y-1 pb-2 pt-1">
                              {s.buildings.map((b) => {
                                const isActive = activeBuilding?.b.name === b.name;
                                return (
                                  <button
                                    key={b.name}
                                    onClick={() => {
                                      setActiveBuilding({ state: s.name, b });
                                      setActiveFloor(1);
                                    }}
                                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                                      isActive ? "bg-primary/10 text-blue-1" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }`}
                                  >
                                    <span className="truncate">{b.name}</span>
                                    <span className="text-[11px] text-muted-foreground">{b.floors}F</span>
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

              <div className="border-t border-border p-4">
                <button
                  onClick={() => {
                    setOpenState("Maharashtra");
                    setActiveBuilding({ state: "Maharashtra", b: STATES[3].buildings[0] });
                    setActiveFloor(5);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted/50 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <RotateCcw size={14} />
                  Reset View
                </button>
              </div>
            </aside>
          </div>

          {/* Floor visualizer + Live KPIs */}
          {activeBuilding && (
            <div className="grid border-t border-border lg:grid-cols-[1fr_360px]">
              <div className="p-6">
                <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{activeBuilding.state}</div>
                    <div className="font-display text-xl font-semibold text-foreground">{activeBuilding.b.name}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Floor <span className="font-semibold text-blue-1">{activeFloor}</span> of {activeBuilding.b.floors} • {activeBuilding.b.devices} devices
                  </div>
                </div>

                <div className="flex items-end justify-center gap-1.5">
                  {Array.from({ length: activeBuilding.b.floors }).map((_, i) => {
                    const floor = activeBuilding.b.floors - i;
                    const isActive = floor === activeFloor;
                    return (
                      <motion.button
                        key={floor}
                        onClick={() => setActiveFloor(floor)}
                        whileHover={{ y: -3 }}
                        transition={{ type: "spring", stiffness: 400, damping: 24 }}
                        className={`group relative h-10 w-9 rounded-md border text-[10px] font-semibold transition-colors ${
                          isActive
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-muted text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        }`}
                        aria-label={`Floor ${floor}`}
                      >
                        {floor}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <LiveKPIPanel floor={activeFloor} buildingName={activeBuilding.b.name} />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const StatChip = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) => (
  <div className="flex items-center gap-2 rounded-xl border border-border bg-card/80 px-3 py-2 backdrop-blur">
    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-blue-1">
      <Icon size={14} />
    </div>
    <div className="leading-tight">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold text-foreground">{value}</div>
    </div>
  </div>
);

const ToolBtn = ({ icon: Icon }: { icon: any }) => (
  <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card/80 text-muted-foreground backdrop-blur transition-colors hover:text-foreground">
    <Icon size={16} />
  </button>
);
