import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    turbopack: {
        resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json', '.md'],
        rules: {
            "*.md": {
                loaders: ["raw-loader"],
                as: "*.js"
            }
        }
    },
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
    images: {
        remotePatterns: [new URL("https://bvxxbkafrjoboauypopg.supabase.co/**")],
    }
};

export default nextConfig;
