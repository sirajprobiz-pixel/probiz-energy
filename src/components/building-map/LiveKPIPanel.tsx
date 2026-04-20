import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, AlertTriangle, Droplets, Flame, Gauge, Zap } from "lucide-react";

type LiveKPIPanelProps = {
  floor: number;
  buildingName: string;
  className?: string;
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

  const kpis = [
    { icon: Zap, label: "Energy (EB)", value: `${kwh} kWh`, sub: "live load", tone: "text-blue-1", pct: Math.min(100, (kwh / 700) * 100) },
    { icon: Activity, label: "Demand", value: `${kva} kVA`, sub: `PF ${pf.toFixed(2)}`, tone: "text-blue-1", pct: Math.min(100, (kva / 100) * 100) },
    { icon: Gauge, label: "HVAC", value: `${jitter(22, 1).toFixed(1)}°C`, sub: `${jitter(68, 4)}% RH`, tone: "text-blue-1", pct: jitter(68, 4) },
    { icon: Droplets, label: "Water", value: `${water} L/h`, sub: "domestic line", tone: "text-blue-1", pct: Math.min(100, (water / 200) * 100) },
    { icon: Flame, label: "Gas", value: `${gas} m³/h`, sub: "kitchen feed", tone: "text-blue-1", pct: Math.min(100, (gas / 60) * 100) },
    { icon: AlertTriangle, label: "Alerts", value: `${alerts}`, sub: "active now", tone: "text-foreground", pct: Math.min(100, alerts * 25) },
  ];

  return (
    <div className={`rounded-[1.5rem] border border-border bg-muted/30 p-5 ${className}`.trim()}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-1 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-1" />
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
            className="rounded-xl border border-border bg-card p-3"
          >
            <div className="mb-1.5 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <kpi.icon size={11} className={kpi.tone} />
              {kpi.label}
            </div>
            <motion.div
              key={kpi.value}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="font-display text-lg font-semibold text-foreground"
            >
              {kpi.value}
            </motion.div>
            <div className="mb-1.5 text-[10px] text-muted-foreground">{kpi.sub}</div>

            {/* Animated meter */}
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${kpi.pct}%` }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-blue-1"
              />
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
