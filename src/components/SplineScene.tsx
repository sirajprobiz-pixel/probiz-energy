import { Suspense, lazy } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scrollProgress?: MotionValue<number>;
  className?: string;
}

/**
 * Scroll-reactive 3D Spline scene used as an immersive backdrop.
 * Lazy-loaded to keep first paint fast; gracefully hidden when prefers-reduced-motion.
 */
export const SplineScene = ({ scrollProgress, className = "" }: SplineSceneProps) => {
  const reduce = useReducedMotion();
  // Fallback own scroll if no progress passed
  const { scrollYProgress } = useScroll();
  const progress = scrollProgress ?? scrollYProgress;

  const opacity = useTransform(progress, [0, 0.4, 0.85], [0.9, 0.55, 0]);
  const scale = useTransform(progress, [0, 1], [1, reduce ? 1 : 1.15]);
  const y = useTransform(progress, [0, 1], [0, reduce ? 0 : -120]);
  const rotate = useTransform(progress, [0, 1], [0, reduce ? 0 : 8]);

  return (
    <motion.div
      style={{ opacity, scale, y, rotate }}
      className={`pointer-events-none absolute inset-0 will-change-transform ${className}`}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <div className="h-full w-full">
          <Spline scene="https://prod.spline.design/AXvr1oq2gSQajVvm/scene.splinecode" />
        </div>
      </Suspense>
    </motion.div>
  );
};
