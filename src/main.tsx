// src/main.tsx
import {createRoot} from "react-dom/client";
import {App} from "./app";
import React from "react";

const rootEl = document.getElementById("root");

if (rootEl) {
    const root = createRoot(rootEl);
    root.render(<App />);
} else {
    console.error("Couldn't find root element!");
}