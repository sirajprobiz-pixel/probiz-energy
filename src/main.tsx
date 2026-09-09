import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Lock the site to dark theme — the design is built for it
document.documentElement.classList.add("dark");
localStorage.setItem("probiz-energy-theme", "dark");

createRoot(document.getElementById("root")!).render(<App />);
