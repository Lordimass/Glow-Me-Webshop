import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "dist", // Changes the build output directory to `dist`
  images: {
    remotePatterns: [new URL("https://bvxxbkafrjoboauypopg.supabase.co/**")],
  },
  sassOptions: {
    silenceDeprecations: [
      "import",
      "legacy-js-api",
      "color-functions",
      "if-function",
      "global-builtin",
      "function-units",
    ],
  },
};

export default nextConfig;
