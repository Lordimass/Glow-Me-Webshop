import { ProductData, useCallRPC } from "lordis-react-components";
import { SUPABASE_STORAGE } from "../assets/assets.ts";

export function useGetProducts(): ProductData[] {
  const resp = useCallRPC("gm_get_products");
  if (!resp.data) {
    return [];
  }
  return resp.data.map(
    (p: any) =>
      new ProductData(p.id, {
        ...p,
        images: p.images.map((img: any) => {
          let uri = `${SUPABASE_STORAGE}/${img.bucket_id}`;
          img.path_tokens.forEach((token: string) => (uri += "/" + token));
          console.log(uri);
          return {
            display_order: img.display_order,
            alt: img.user_metadata?.alt,
            uri,
          };
        }),
        price: p.price.unit_amount / 100,
      }),
  ) satisfies ProductData[];
}
