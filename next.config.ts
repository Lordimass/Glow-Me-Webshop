import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: "/sitemap.xml",
                destination: "/api/sitemap",
                permanent: true,
            },
            {
                source: "/sitemapStatic.xml",
                destination: "/api/sitemap/static",
                permanent: true,
            },
            {
                source: "/sitemapProducts.xml",
                destination: "/api/sitemap/products",
                permanent: true,
            },
            {
                source: "/CATS/",
                destination: "/shop/CATS",
                permanent: true,
            },
            {
                source: "/GHOSTS/",
                destination: "/shop/GHOSTS",
                permanent: true,
            }
        ]
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
