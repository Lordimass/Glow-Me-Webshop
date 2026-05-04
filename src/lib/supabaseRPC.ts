import { ProductData, useCallRPC } from "lordis-react-components";
import { handleGetProductsResponse } from "../../shared/functions/supabaseRPC.ts";

export function useGetProducts(): ProductData[] {
  const livemode = import.meta.env.VITE_ENVIRONMENT !== "DEVELOPMENT";
  const resp = useCallRPC("gm_get_products", { p_livemode: livemode });
  if (!resp.data) {
    return [];
  }
  return handleGetProductsResponse(resp.data);
}
