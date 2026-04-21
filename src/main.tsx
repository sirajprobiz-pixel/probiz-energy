import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Default to dark theme on first load (user can toggle to light)
const stored = localStorage.getItem("prosmart-theme");
if (!stored || stored === "dark") {
  document.documentElement.classList.add("dark");
}

createRoot(document.getElementById("root")!).render(<App />);
