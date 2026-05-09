import {
  ProductData,
  type ProductGroup,
  useCallRPC,
} from "lordis-react-components";
import { handleGetGroupedProductsResponse } from "../../shared/functions/supabaseRPC.ts";

export function useGetProducts(): (ProductGroup | ProductData)[] {
  const livemode = import.meta.env.VITE_ENVIRONMENT !== "DEVELOPMENT";
  const resp = useCallRPC("gm_get_grouped_products", { p_livemode: livemode });
  if (!resp.data) {
    return [];
  }
  return handleGetGroupedProductsResponse(resp.data);
}
