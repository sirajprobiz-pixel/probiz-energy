import { useEffect } from "react";

// Theme is locked to dark site-wide. This stub keeps every page import working
// without rendering the floating sun/moon button. Re-enable later if needed.
export const ThemeToggle = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
  return null;
};
