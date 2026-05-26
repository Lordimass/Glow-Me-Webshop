/**
 * Dynamically generated sitemap of all currently active and in stock products.
 */

import { baseUrl } from "./sitemap.mts";
import { supabaseAnon } from "../lib/getSupabaseClient.ts";
import type { Context } from "@netlify/functions";
import { getProducts } from "../../shared/functions/supabaseRPC.ts";

export default async function handler(_request: Request, _context: Context) {
  const products = await getProducts(
    undefined,
    true,
    process.env.VITE_ENVIRONMENT == "DEVELOPMENT",
    undefined,
    undefined,
    supabaseAnon,
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
