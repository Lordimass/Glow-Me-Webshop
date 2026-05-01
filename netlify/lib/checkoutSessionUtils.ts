/**
 * Get basket products associated with the order
 *
 * @param sessionId The ID of the checkout session from which to fetch line items.
 */
import { stripe } from "./stripe.ts";
import { getProducts } from "../../shared/functions/supabaseRPC.ts";
import { supabaseAnon } from "./getSupabaseClient.ts";
import { BasketProduct } from "lordis-react-components";

export async function getCheckoutSessionItems(sessionId: string) {
  const resp = await stripe.checkout.sessions.listLineItems(sessionId, {
    limit: 100,
  });
  const itemsWithProductIds = resp.data.map((item) => {
    if (!item.price) throw new Error("Line item is missing price!");
    return { ...item, productId: item.price.product as string }; // This is always a string in this context.
  });
  const products = await getProducts(
    itemsWithProductIds.map((p) => p.productId),
    false,
    undefined,
    supabaseAnon,
  );
  return resp.data.map((lineItem) => {
    const product = products.find((p) => p.sku === lineItem.price?.product);
    if (!product) throw new Error("Product not found");
    lineItem.quantity;
    return new BasketProduct(product.sku, lineItem.quantity ?? 1, {
      ...product,
    });
  });
}
