import {ProductCollection, ProductData} from "@/lib";
import type {SupabaseClient} from "@supabase/supabase-js";
import type {IToast} from "@/lib/types/toasts.ts";
import {handleGetGroupedProductsResponse, handleGetProductsResponse} from "@/lib/functions/supabaseRPC.ts";
import {useCallRPC} from "@/lib/supabase/client.ts";

export function useGetProducts(
    supabase: SupabaseClient,
    ids?: string[],
    in_stock_only = false,
    livemode = true,
    tags?: string[],
    toast?: (toast: IToast | string) => void,
): ProductData[] {
    return handleGetProductsResponse(useCallRPC(
        supabase,
        "gm_get_products",
        {ids, in_stock_only, p_livemode: livemode, p_tags: tags},
        toast
    ).data);
}

export function useGetGroupedProducts(
    supabase: SupabaseClient,
    ids?: string[],
    in_stock_only = false,
    livemode = true,
    tags?: string[],
    toast?: (toast: IToast | string) => void,
): ProductCollection {
    return handleGetGroupedProductsResponse(useCallRPC(
        supabase,
        "gm_get_grouped_products",
        {ids, in_stock_only, p_livemode: livemode, p_tags: tags},
        toast
    ).data);
}