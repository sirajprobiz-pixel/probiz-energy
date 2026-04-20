import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, AlertTriangle, Droplets, Flame, Gauge, Zap } from "lucide-react";

type LiveKPIPanelProps = {
  floor: number;
  buildingName: string;
  className?: string;
};

const Ring = ({ pct }: { pct: number }) => {
  const r = 28;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" className="-rotate-90">
      <circle cx="36" cy="36" r={r} className="fill-none stroke-muted" strokeWidth="6" />
      <motion.circle
        cx="36"
        cy="36"
        r={r}
        className="fill-none stroke-blue-1"
        strokeWidth="6"
        strokeLinecap="round"
        initial={{ strokeDasharray: c, strokeDashoffset: c }}
        animate={{ strokeDashoffset: c - (c * clamped) / 100 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
};

export const LiveKPIPanel = ({ floor, buildingName, className = "" }: LiveKPIPanelProps) => {
  const seed = floor + buildingName.length;
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((value) => value + 1), 1800);
    return () => window.clearInterval(id);
  }, []);

  const jitter = (base: number, range: number) =>
    Math.round((base + Math.sin(tick * 0.7 + seed) * range) * 10) / 10;

  const kwh = jitter(420 + seed * 7, 18);
  const kva = jitter(58 + seed * 0.4, 3);
  const pf = jitter(0.94, 0.03);
  const water = jitter(120 + seed * 2, 6);
  const gas = jitter(34 + seed, 2);
  const alerts = (seed % 3) + 1;
  const hvac = jitter(22, 1);
  const rh = jitter(68, 4);

  const kpis = [
    { icon: Zap, label: "Energy (EB)", value: `${kwh}`, unit: "kWh", sub: "live load", pct: Math.min(100, (kwh / 700) * 100) },
    { icon: Activity, label: "Demand", value: `${kva}`, unit: "kVA", sub: `PF ${pf.toFixed(2)}`, pct: Math.min(100, (kva / 100) * 100) },
    { icon: Gauge, label: "HVAC", value: `${hvac.toFixed(1)}°`, unit: "C", sub: `${rh}% RH`, pct: rh },
    { icon: Droplets, label: "Water", value: `${water}`, unit: "L/h", sub: "domestic line", pct: Math.min(100, (water / 200) * 100) },
    { icon: Flame, label: "Gas", value: `${gas}`, unit: "m³/h", sub: "kitchen feed", pct: Math.min(100, (gas / 60) * 100) },
    { icon: AlertTriangle, label: "Alerts", value: `${alerts}`, unit: "live", sub: "active now", pct: Math.min(100, alerts * 25) },
  ];

  return (
    <div className={`rounded-[1.5rem] border border-border bg-muted/30 p-5 ${className}`.trim()}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-1 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-1" />
          </span>
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">Live floor KPIs</div>
            <div className="text-sm text-foreground">{buildingName} · Floor {floor}</div>
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {kpis.map((kpi) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border bg-card p-3"
          >
            <div className="mb-2 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <kpi.icon size={11} className="text-blue-1" />
              {kpi.label}
            </div>
            <div className="flex items-center gap-3">
              <div className="relative h-[72px] w-[72px] shrink-0">
                <Ring pct={kpi.pct} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    key={kpi.value}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="font-display text-sm font-semibold text-foreground"
                  >
                    {kpi.value}
                  </motion.span>
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-medium text-foreground">{kpi.unit}</div>
                <div className="text-[10px] text-muted-foreground">{kpi.sub}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
