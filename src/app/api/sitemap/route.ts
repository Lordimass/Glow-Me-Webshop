export type Route = {
    /** The path to the page, e.g. products/256 */
    path: string;
    /** Optional priority for the route in search results, default 0.5 */
    priority?: number; // optional, default 0.5
    /** Optional frequency of page update, defaults to "weekly" */
    changefreq?: string; // optional, default "weekly"
};

export const baseUrl = "https://glowshops.com";

/**
 * Sitemap generation for SEO, redirected to from /sitemap.xml.
 */
export async function GET() {
    const xml = `
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
      <loc>${baseUrl}/sitemapStatic.xml</loc>
    </sitemap>
    <sitemap>
      <loc>${baseUrl}/sitemapProducts.xml</loc>
    </sitemap>
  </sitemapindex>
  `;
    return new Response(xml, {
        status: 200,
        headers: {
            "Content-Type": "application/xml",
        },
    });
}