import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "lordis-react-components/dist/index.css";
import "./common.scss";
import { initGA4 } from "lordis-react-components";

initGA4(
  import.meta.env.VITE_GA4_MEASUREMENT_ID,
  import.meta.env.VITE_ENVIRONMENT === "DEVELOPMENT",
);

createRoot(document.getElementById("root")!).render(<App />);
