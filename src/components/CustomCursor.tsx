import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import cursorHand from "@/assets/cursor-hand.png";

export const CustomCursor = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 45, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 45, mass: 0.4 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(max-width: 768px)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);

    // Hide native cursor while custom cursor is active
    document.documentElement.style.cursor = "none";
    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-custom-cursor", "true");
    styleEl.textContent = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(styleEl);

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
      document.documentElement.style.cursor = "";
      styleEl.remove();
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.img
      src={cursorHand}
      alt=""
      aria-hidden="true"
      draggable={false}
      style={{ translateX: sx, translateY: sy }}
      animate={{ scale: hover ? 1.15 : 1, rotate: hover ? -8 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-8 w-8 select-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
    />
  );
};
