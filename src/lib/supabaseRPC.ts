import {
  type ProductGroup,
  useCallRPC,
  type UseRPCReturn,
} from "lordis-react-components";
import { handleGetGroupedProductsResponse } from "../../shared/functions/supabaseRPC.ts";

export function useGetGroupedProducts(
  ids?: string[],
  in_stock_only = false,
): UseRPCReturn<ProductGroup[]> {
  const livemode = import.meta.env.VITE_ENVIRONMENT !== "DEVELOPMENT";
  const resp = useCallRPC("gm_get_grouped_products", {
    ids,
    in_stock_only,
    p_livemode: livemode,
  });
  if (resp.data) {
    resp.data = handleGetGroupedProductsResponse(resp.data);
  }
  return resp;
}
