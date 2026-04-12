import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "lordis-react-components/dist/index.css";
import "./common.scss";
import { initGA4, LRC } from "lordis-react-components";
import { SupabaseClient } from "@supabase/supabase-js";

initGA4(
  import.meta.env.VITE_GA4_MEASUREMENT_ID,
  import.meta.env.VITE_ENVIRONMENT === "DEVELOPMENT",
);

LRC.supabase = new SupabaseClient(
  import.meta.env.VITE_SUPABASE_DATABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

createRoot(document.getElementById("root")!).render(<App />);
