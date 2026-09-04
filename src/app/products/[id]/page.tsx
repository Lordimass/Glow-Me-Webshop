"use client";

import {
  ProductData,
  ProductGroup,
  ProductPageComponent,
} from "lordis-react-components";
import Page from "../../../components/Page/Page.tsx";
import { SITE_NAME } from "../../../lib/consts";
import "./global.css";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { getGroupedProducts } from "../../../lib/functions/supabaseRPC.ts";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [group, setGroup] = useState<ProductGroup>();
  const product = group?.products[0] ?? ProductData.NULL;

  // Fetch the product for this page.
  useEffect(() => {
    async function get() {
      const { id } = await params;
      const productGroups: ProductGroup[] = await getGroupedProducts([id]);
      if (!productGroups || productGroups.length === 0) notFound();
    }
    get().then();
  }, []);

  return (
    <div data-bs-theme={"light"}>
      <Page
        title={`${SITE_NAME} - ${product.name}`}
        metaDescription={product.metadata.description}
      >
        <ProductPageComponent
          p_product={product}
          group={group}
          clickableTags={true}
        />
      </Page>
    </div>
  );
}
