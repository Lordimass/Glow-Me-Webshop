import {
  callRPC,
  type IToast,
  LRC,
  type MinimalProductImage,
  ProductData,
  ProductGroup,
} from "lordis-react-components";
import { SUPABASE_STORAGE } from "../assets.ts";

export async function getProducts(
  ids?: string[],
  in_stock_only = false,
  livemode = true,
  toast?: (toast: IToast | string) => void,
  supabase = LRC.supabase,
): Promise<ProductData[]> {
  const products: any[] = await callRPC(
    "gm_get_products",
    { ids, in_stock_only, p_livemode: livemode },
    toast,
    supabase,
  );

  return handleGetProductsResponse(products);
}

export async function getGroupedProducts(
  ids?: string[],
  in_stock_only = false,
  livemode = true,
  toast?: (toast: IToast | string) => void,
  supabase = LRC.supabase,
): Promise<ProductGroup[]> {
  const groups: any[][] = await callRPC(
    "gm_get_grouped_products",
    { ids, in_stock_only, p_livemode: livemode },
    toast,
    supabase,
  );
  console.log("Groups:", groups);

  return handleGetGroupedProductsResponse(groups);
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
      groupName: p.group_name,
    };

    delete opts.metadata;

    return new ProductData(p.id, opts);
  }) satisfies ProductData[];
}

export function handleGetGroupedProductsResponse(
  respData: any[][],
): ProductGroup[] {
  return respData.map((g) => new ProductGroup(handleGetProductsResponse(g)));
}
