import { type ProductGroup, ToastContext } from "lordis-react-components";
import { getGroupedProducts } from "../../shared/functions/supabaseRPC.ts";
import { useContext, useEffect, useState } from "react";

export function useGetGroupedProducts(
  ids?: string[],
  in_stock_only = false,
): ProductGroup[] {
  const livemode = import.meta.env.VITE_ENVIRONMENT !== "DEVELOPMENT";
  const { toast } = useContext(ToastContext);
  const [groups, setGroups] = useState<ProductGroup[]>([]);
  useEffect(() => {
    async function fetch() {
      setGroups(await getGroupedProducts(ids, in_stock_only, livemode, toast));
    }
    fetch().then();
  }, []);

  return groups;
}
