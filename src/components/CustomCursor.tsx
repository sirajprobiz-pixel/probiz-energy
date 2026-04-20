import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 768px)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [data-cursor-hover]"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        style={{ translateX: sx, translateY: sy }}
        animate={{ scale: hover ? 0 : 1 }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-1.5 -mt-1.5 h-3 w-3 rounded-full bg-green-1 shadow-[0_0_18px_hsl(var(--green-1))]"
      />
      <motion.div
        style={{ translateX: sx, translateY: sy }}
        animate={{ scale: hover ? 1.8 : 1, opacity: hover ? 0.7 : 0.45 }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] -ml-5 -mt-5 h-10 w-10 rounded-full border-2 border-[hsl(var(--green-1)/0.7)] backdrop-blur-sm"
      />
    </>
  );
};
