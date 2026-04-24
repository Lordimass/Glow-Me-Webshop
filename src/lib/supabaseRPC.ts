import {
  type MinimalProductImage,
  ProductData,
  useCallRPC,
} from "lordis-react-components";
import { SUPABASE_STORAGE } from "../assets/assets.ts";

export function useGetProducts(): ProductData[] {
  const resp = useCallRPC("gm_get_products");
  if (!resp.data) {
    return [];
  }
  return resp.data.map((p: any) => {
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
