"use client";

import {useContext} from "react";
import {ProductContext} from "@/components/Product/ProductPageComponent/lib.tsx";
import {Button, ButtonGroup} from "react-bootstrap";
import {createClient} from "@/lib/supabase/client.ts";
import {ToastContext} from "@/lib/context/toasts.tsx";
import {useGetGroupedProducts} from "@/lib/functions/supabaseRPCClient.ts";
import {ProductGroup} from "@/lib";

export default function ProductSizes() {
    const { product, setProduct, setGroup } = useContext(ProductContext);
    const {toast} = useContext(ToastContext);
    const sizes = product.metadata.sizes

    const supabase = createClient()!
    const sizedProducts = useGetGroupedProducts(
        supabase,
        sizes?.map(size => size.other_product_id),
        false,
        process.env.NODE_ENV === "production",
        undefined,
        toast
    )

    async function selectSize(id: string) {
        if (!sizedProducts) return;
        for (let sizedProductCollection of sizedProducts) {
            if (sizedProductCollection instanceof ProductGroup) {
                for (let groupProduct of sizedProductCollection.products) {
                    if (groupProduct.sku !== id) continue;
                    groupProduct.fillFromOther(product)
                    setProduct(groupProduct);
                    setGroup(sizedProductCollection)
                }
            } else {
                if (sizedProductCollection.sku !== id) continue;
                sizedProductCollection.fillFromOther(product)
                setProduct(product)
                setGroup(new ProductGroup([sizedProductCollection]))
            }
        }
    }

    if (!product || !sizes || sizes.length === 0) return null;
    return <ButtonGroup id={"product-sizes"}>{sizes.map((size, i) => {
        const selected = size.other_product_id === product.sku
        return <Button
            variant={selected ? "primary" : "outline-primary"}
            disabled={selected}
            onClick={() => selectSize(size.other_product_id)}
            key={i}
        >
            {size.name}
        </Button>
    })}
    </ButtonGroup>;
}