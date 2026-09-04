import type {NextConfig} from "next";
import path from "node:path";

const nextConfig: NextConfig = {
    // `lordis-react-components` is npm-linked from the sibling repository.
    // Tell Next/Turbopack to follow and compile the linked package instead of
    // treating it as an unresolved external module.
    transpilePackages: ["lordis-react-components"],
    // Turbopack must consider the linked package part of its project root on
    // Windows; otherwise it cannot follow the junction outside this repository.
    turbopack: {
        root: path.resolve(".."),
    },
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
