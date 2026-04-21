import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Activity, AlertTriangle, Droplets, Flame, Gauge, Zap } from "lucide-react";

type LiveKPIPanelProps = {
  floor: number;
  buildingName: string;
  className?: string;
};

const AnimatedNumber = ({ value, decimals = 0 }: { value: number; decimals?: number }) => {
  const mv = useMotionValue(value);
  const rounded = useTransform(mv, (v) => v.toFixed(decimals));
  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.9, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [value, mv]);
  return <motion.span>{rounded}</motion.span>;
};

const FillRing = ({ pct, value, unit }: { pct: number; value: number; unit: string }) => {
  const r = 30;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <div className="relative h-[78px] w-[78px] shrink-0">
      <svg width="78" height="78" viewBox="0 0 78 78" className="-rotate-90">
        {/* Track */}
        <circle cx="39" cy="39" r={r} className="fill-none stroke-muted" strokeWidth="7" />
        {/* Soft glow fill behind */}
        <circle cx="39" cy="39" r={r - 4} className="fill-[hsl(var(--green-1)/0.08)]" />
        {/* Progress */}
        <motion.circle
          cx="39"
          cy="39"
          r={r}
          className="fill-none stroke-green-1"
          strokeWidth="7"
          strokeLinecap="round"
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * clamped) / 100 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ strokeDasharray: c, filter: "drop-shadow(0 0 6px hsl(var(--green-1)/0.55))" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="font-display text-[13px] font-semibold text-foreground">
          <AnimatedNumber value={value} decimals={value < 10 ? 1 : 0} />
        </span>
        <span className="mt-0.5 text-[8.5px] uppercase tracking-[0.14em] text-muted-foreground">
          {unit}
        </span>
      </div>
    </div>
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
    { icon: Zap,            label: "Energy (EB)", value: kwh,  unit: "kWh",  sub: "live load",     pct: Math.min(100, (kwh / 700) * 100) },
    { icon: Activity,       label: "Demand",      value: kva,  unit: "kVA",  sub: `PF ${pf.toFixed(2)}`, pct: Math.min(100, (kva / 100) * 100) },
    { icon: Gauge,          label: "HVAC",        value: hvac, unit: "°C",   sub: `${rh}% RH`,     pct: rh },
    { icon: Droplets,       label: "Water",       value: water, unit: "L/h", sub: "domestic line", pct: Math.min(100, (water / 200) * 100) },
    { icon: Flame,          label: "Gas",         value: gas,  unit: "m³/h", sub: "kitchen feed",  pct: Math.min(100, (gas / 60) * 100) },
    { icon: AlertTriangle,  label: "Alerts",      value: alerts, unit: "live", sub: "active now",  pct: Math.min(100, alerts * 25) },
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
            <div className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground">Live floor KPI's</div>
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
              <kpi.icon size={11} className="text-green-1" />
              <span className="truncate">{kpi.label}</span>
            </div>
            <div className="flex items-center gap-3">
              <FillRing pct={kpi.pct} value={kpi.value} unit={kpi.unit} />
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-medium text-foreground">{Math.round(kpi.pct)}% used</div>
                <div className="text-[10px] leading-tight text-muted-foreground">{kpi.sub}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
