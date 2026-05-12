import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Native scroll performs better across all devices than JS-driven smooth
    // scroll. We keep this hook so existing pages can call it without changes,
    // but it is now a no-op. Smoothness is provided by CSS `scroll-behavior`.
    return;
  }, []);

  return lenisRef;
};
