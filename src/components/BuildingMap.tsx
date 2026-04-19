import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  MapPin,
  Radio,
  RotateCcw,
  Search,
  Sparkles,
  Sun,
  Wifi,
} from "lucide-react";
import indiaMap from "@/assets/india-map-3d.png";
import { LiveKPIPanel } from "@/components/building-map/LiveKPIPanel";

type Building = { name: string; floors: number; devices: number };
type StateNode = { name: string; buildings: Building[]; x: number; y: number };

const STATES: StateNode[] = [
  { name: "Delhi", x: 49, y: 27, buildings: [{ name: "Cyber Hub Tower", floors: 12, devices: 184 }] },
  { name: "Haryana", x: 47, y: 30, buildings: [{ name: "Gurugram One", floors: 18, devices: 240 }] },
  { name: "Gujarat", x: 33, y: 42, buildings: [{ name: "Ahmedabad Plaza", floors: 10, devices: 142 }] },
  {
    name: "Maharashtra",
    x: 36,
    y: 55,
    buildings: [
      { name: "BKC Trade Centre", floors: 24, devices: 312 },
      { name: "Pune Tech Park", floors: 14, devices: 198 },
    ],
  },
  { name: "West Bengal", x: 70, y: 50, buildings: [{ name: "Salt Lake Tower", floors: 16, devices: 220 }] },
  {
    name: "Karnataka",
    x: 44,
    y: 75,
    buildings: [
      { name: "Whitefield Hub", floors: 20, devices: 286 },
      { name: "Electronic City 2", floors: 12, devices: 164 },
    ],
  },
  {
    name: "Tamil Nadu",
    x: 51,
    y: 80,
    buildings: [
      { name: "OMR Tech Tower", floors: 22, devices: 304 },
      { name: "Chennai Central", floors: 10, devices: 132 },
    ],
  },
];

const DEFAULT_STATE = "Maharashtra";
const DEFAULT_FLOOR = 5;

const getStateByName = (name: string) => STATES.find((state) => state.name === name) ?? STATES[0];
const clampFloor = (floor: number, totalFloors: number) => Math.min(Math.max(floor, 1), totalFloors);

export const BuildingMap = () => {
  const defaultBuilding = getStateByName(DEFAULT_STATE).buildings[0];
  const [openState, setOpenState] = useState<string | null>(DEFAULT_STATE);
  const [activeBuilding, setActiveBuilding] = useState<{ state: string; b: Building }>({
    state: DEFAULT_STATE,
    b: defaultBuilding,
  });
  const [activeFloor, setActiveFloor] = useState(clampFloor(DEFAULT_FLOOR, defaultBuilding.floors));

  const totalBuildings = STATES.reduce((sum, state) => sum + state.buildings.length, 0);
  const totalDevices = STATES.reduce((sum, state) => sum + state.buildings.reduce((count, building) => count + building.devices, 0), 0);

  const selectBuilding = (stateName: string, building: Building, preferredFloor = 1) => {
    setOpenState(stateName);
    setActiveBuilding({ state: stateName, b: building });
    setActiveFloor(clampFloor(preferredFloor, building.floors));
  };

  const selectState = (stateName: string) => {
    const state = getStateByName(stateName);
    const currentBuilding = activeBuilding.state === stateName
      ? state.buildings.find((building) => building.name === activeBuilding.b.name) ?? state.buildings[0]
      : state.buildings[0];

    setOpenState(stateName);
    setActiveBuilding({ state: stateName, b: currentBuilding });
    setActiveFloor((floor) => clampFloor(floor, currentBuilding.floors));
  };

  const toggleState = (stateName: string) => {
    if (openState === stateName) {
      setOpenState(null);
      return;
    }
    selectState(stateName);
  };

  const resetView = () => {
    selectBuilding(DEFAULT_STATE, getStateByName(DEFAULT_STATE).buildings[0], DEFAULT_FLOOR);
  };

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
            className="mt-5 text-base text-balance text-muted-foreground md:text-lg"
          >
            Navigate your portfolio at a glance. Drill down from country → state → property → floor — all powered by real-time telemetry.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2rem] surface"
        >
          <div className="grid xl:grid-cols-[minmax(0,1.12fr)_420px]">
            <div className="relative min-h-[680px] overflow-hidden bg-muted/40">
              <div className="absolute inset-0 bg-grid opacity-30" />

              <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-2">
                <StatChip icon={Building2} label="Properties" value={totalBuildings} />
                <StatChip icon={Wifi} label="Active" value={Math.floor(totalBuildings * 0.85)} />
                <StatChip icon={Radio} label="Devices" value={totalDevices.toLocaleString()} />
                <ToolBtn icon={Search} label="Search" />
                <ToolBtn icon={Sparkles} label="Smart view" />
                <ToolBtn icon={Sun} label="Day mode" />
              </div>

              <div className="absolute inset-x-6 top-24 bottom-24 flex items-center justify-center">
                <div className="relative aspect-[860/940] w-full max-w-[640px]">
                  <img
                    src={indiaMap}
                    alt="India 3D map of PROsmart properties"
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />

                  <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                    {STATES.map((state) => {
                      const isActive = activeBuilding.state === state.name;

                      return (
                        <g
                          key={state.name}
                          transform={`translate(${state.x}, ${state.y})`}
                          className="cursor-pointer"
                          onClick={() => selectState(state.name)}
                        >
                          {isActive && (
                            <circle r="3.4" className="fill-primary/30">
                              <animate attributeName="r" from="1.8" to="4.6" dur="1.6s" repeatCount="indefinite" />
                              <animate attributeName="opacity" from="0.7" to="0" dur="1.6s" repeatCount="indefinite" />
                            </circle>
                          )}
                          <circle
                            r={isActive ? 1.65 : 1.2}
                            className={isActive ? "fill-primary" : "fill-blue-1"}
                            style={{ stroke: "hsl(var(--background))" }}
                            strokeWidth="0.35"
                          />
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              <div className="absolute inset-x-4 bottom-4 z-20 flex items-center gap-2 rounded-full border border-border bg-card/90 px-4 py-2.5 backdrop-blur">
                <Sparkles size={14} className="text-blue-1" />
                <input
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                  placeholder={`Go to floor ${activeFloor} of ${activeBuilding.b.name}`}
                />
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
                  aria-label="Navigate"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <aside className="border-t border-border bg-card xl:border-l xl:border-t-0">
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-3 border-b border-border p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-blue-1">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="font-display text-base font-semibold text-foreground">Properties</div>
                    <div className="text-xs text-muted-foreground">{totalBuildings} buildings across India</div>
                  </div>
                </div>

                <div className="flex-1 space-y-4 overflow-hidden p-4">
                  <div className="rounded-[1.5rem] border border-border bg-muted/30 p-3">
                    <div className="mb-3 px-2 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">India</div>

                    <div className="max-h-[300px] space-y-1 overflow-y-auto pr-1">
                      {STATES.map((state) => {
                        const isOpen = openState === state.name;

                        return (
                          <div key={state.name} className="rounded-xl">
                            <button
                              onClick={() => toggleState(state.name)}
                              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors ${
                                activeBuilding.state === state.name ? "bg-primary/10" : "hover:bg-muted"
                              }`}
                            >
                              <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                                <ChevronRight size={14} className={`text-muted-foreground transition-transform ${isOpen ? "rotate-90" : ""}`} />
                                <Building2 size={14} className="text-blue-1" />
                                {state.name}
                              </span>
                              <span className="rounded-full bg-card px-2 py-0.5 text-xs text-muted-foreground">
                                {state.buildings.length}
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
                                    {state.buildings.map((building) => {
                                      const isSelected = activeBuilding.b.name === building.name;

                                      return (
                                        <button
                                          key={building.name}
                                          onClick={() => selectBuilding(state.name, building, 1)}
                                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                                            isSelected
                                              ? "bg-primary text-primary-foreground"
                                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                          }`}
                                        >
                                          <span className="truncate">{building.name}</span>
                                          <span className={`text-[11px] ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                                            {building.floors}F
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

                  <div className="rounded-[1.5rem] border border-border bg-muted/30 p-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div>
                        <div className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{activeBuilding.state}</div>
                        <div className="font-display text-xl font-semibold text-foreground">{activeBuilding.b.name}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Floor <span className="font-semibold text-blue-1">{activeFloor}</span> of {activeBuilding.b.floors}
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6">
                      {Array.from({ length: activeBuilding.b.floors }).map((_, index) => {
                        const floor = activeBuilding.b.floors - index;
                        const isSelected = floor === activeFloor;

                        return (
                          <motion.button
                            key={floor}
                            onClick={() => setActiveFloor(floor)}
                            whileHover={{ y: -2 }}
                            transition={{ type: "spring", stiffness: 380, damping: 24 }}
                            className={`relative h-11 rounded-xl border text-xs font-semibold transition-colors ${
                              isSelected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
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

const StatChip = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) => (
  <div className="flex items-center gap-2 rounded-xl border border-border bg-card/85 px-3 py-2 backdrop-blur">
    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-blue-1">
      <Icon size={14} />
    </div>
    <div className="leading-tight">
      <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold text-foreground">{value}</div>
    </div>
  </div>
);

const ToolBtn = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <button
    aria-label={label}
    className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card/85 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
  >
    <Icon size={16} />
  </button>
);
