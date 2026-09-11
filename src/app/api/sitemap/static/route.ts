// Static routes with optional priority and changefreq
import {baseUrl, type Route} from "@/app/api/sitemap/route.ts";

const staticRoutes: Route[] = [
    { path: "", priority: 1.0, changefreq: "weekly" },
    { path: "ghosts", priority: 0.8, changefreq: "weekly" },
    { path: "cats", priority: 0.8, changefreq: "weekly" },
    { path: "privacy", priority: 0.2, changefreq: "monthly" },
    { path: "returns", priority: 0.2, changefreq: "monthly" },
    { path: "refunds", priority: 0.2, changefreq: "monthly" },
    { path: "cancellations", priority: 0.2, changefreq: "monthly" },
    { path: "shipping", priority: 0.2, changefreq: "monthly" },
];

/**
 * Static pages to include in the sitemap, referenced by sitemap function.
 */
export async function GET() {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${staticRoutes
        .map(({ path, priority = 0.5, changefreq = "weekly" }) => {
            const url = `${baseUrl}/${path}`.replace(/\/+$/, "") + "/";
            return `  <url>
    <loc>${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
        })
        .join("\n")}
</urlset>`;

    return new Response(xml, {
        status: 200,
        headers: {
            "Content-Type": "application/xml",
        },
    });
}