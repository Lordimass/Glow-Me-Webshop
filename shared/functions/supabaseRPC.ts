import type { SupabaseClient } from "@supabase/supabase-js";
import type { MinimalProductImage } from "lordis-react-components";
import { callRPC, LRC, ProductData } from "lordis-react-components";
import { SUPABASE_STORAGE } from "../assets.ts";

export async function getProducts(
  ids?: string[],
  in_stock_only = false,
  notify?: (msg: string) => void,
  // @ts-ignore TODO: This is not being picked up as the right type and I have no idea why but it needs to be fixed
  supabase?: SupabaseClient = LRC.supabase,
): Promise<ProductData[]> {
  const products: any[] = await callRPC(
    "gm_get_products",
    { ids, in_stock_only },
    notify,
    // @ts-ignore
    supabase,
  );

  return handleGetProductsResponse(products);
}

export function handleGetProductsResponse(respData: any[]): ProductData[] {
  return respData.map((p: any) => {
    let images: MinimalProductImage[] = p.images.map((img: any) => {
      let uri = `${SUPABASE_STORAGE}/${img.bucket_id}`;
      img.path_tokens.forEach((token: string) => (uri += "/" + token));
      return {
        display_order: img.display_order,
        alt: img.user_metadata?.alt,
        uri,
      };
    });
    if (!images || images.length == 0) {
      images = p.stripe_images.map((uri: string) => {
        return { uri };
      });
    }
    const opts = {
      ...p,
      ...p.metadata,
      images,
      price: (p.price.unit_amount ?? 0) / 100,
      priceId: p.price.id,
    };

    delete opts.metadata;

    return new ProductData(p.id, opts);
  }) satisfies ProductData[];
}
