import "../common.css";
import "./envConfig.ts";

import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glow Me!",
  description:
    "We hand-craft glow in the dark models using resin and a variety of different glowing powders and colours. Each " +
    "has its own personality, imperfections, and love put into it by us.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
