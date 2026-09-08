import {stripe} from "@/lib/stripe/server.ts";
import {getProducts} from "@/lib/functions/supabaseRPC.ts";
import type {SupabaseClient} from "@supabase/supabase-js";
import {BasketProduct} from "@/lib";

/**
 * Get basket products associated with the order
 *
 * @param supabase SupabaseClient to use to fetch the products.
 * @param sessionId The ID of the checkout session from which to fetch line items.
 */
export async function getCheckoutSessionItems(supabase: SupabaseClient, sessionId: string) {
    const resp = await stripe.checkout.sessions.listLineItems(sessionId, {
        limit: 100,
    });
    const itemsWithProductIds = resp.data.map((item) => {
        if (!item.price) throw new Error("Line item is missing price!");
        return { ...item, productId: item.price.product as string }; // This is always a string in this context.
    });
    const products = await getProducts(
        supabase,
        itemsWithProductIds.map((p) => p.productId),
        false,
        process.env.NEXT_PUBLIC_ENVIRONMENT !== "DEVELOPMENT",
        undefined,
        undefined,
    );
    return resp.data.map((lineItem) => {
        const product = products.find((p) => p.sku === lineItem.price?.product);
        if (!product) throw new Error("Product not found");
        return new BasketProduct(product.sku, lineItem.quantity ?? 1, {
            ...product,
        });
    });
}