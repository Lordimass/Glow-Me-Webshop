import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "lordis-react-components/dist/index.css";
import "./common.scss";
import { initGA4 } from "./analytics/init.ts";

initGA4();

createRoot(document.getElementById("root")!).render(<App />);
