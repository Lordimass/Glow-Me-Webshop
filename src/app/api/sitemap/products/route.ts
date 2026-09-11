import {getProducts} from "@/lib/functions/supabaseRPC.ts";
import {createClient} from "@/lib/supabase/server.ts";
import {baseUrl} from "@/app/api/sitemap/route.ts";

export async function GET() {
    const supabase = await createClient()
    const products = await getProducts(
        supabase,
        undefined,
        true,
        process.env.NEXT_PUBLIC_ENVIRONMENT !== "DEVELOPMENT",
        undefined,
        undefined,
    );

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
        ${products
        .map((prod) => {
            const d = new Date(prod.metadata.stripe_updated);
            const lastmod =
                prod.metadata.stripe_updated && d
                    ? `<lastmod>${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}</lastmod>`
                    : "";
            return `
            <url>
                <loc>${baseUrl}/products/${prod.sku}</loc>
                ${lastmod}    
            <changefreq>daily</changefreq>
                <priority>${prod.metadata.seo_priority ?? 0.5}</priority>
            </url>
        `;
        })
        .join("")}
    </urlset>
    `;

    return new Response(xml, {
        status: 200,
        headers: {
            "Content-Type": "application/xml",
        },
    });
}