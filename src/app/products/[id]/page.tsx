import "./global.css";
import {notFound} from "next/navigation";
import {getGroupedProducts, getProducts} from "@/lib/functions/supabaseRPC.ts";
import {ProductCollection, ProductData, ProductGroup, SITE_NAME} from "@/lib";
import ProductPageComponent from "@/components/Product/ProductPageComponent/ProductPageComponent.tsx";
import {createClient} from "@/lib/supabase/server.ts";
import type {Metadata} from "next";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient()
  const productGroups: ProductCollection = await getGroupedProducts(
      supabase, [id], true, process.env.NODE_ENV === "production"
  )
  if (!productGroups || productGroups.length === 0) notFound();

  const group = productGroups[0];
  const product = group instanceof ProductGroup
      ? group?.products[0] ?? ProductData.NULL
      : group;

  return (
    <div>
        <ProductPageComponent
          p_product={product.serialise()}
          p_group={group.serialise()}
          clickableTags={true}
        />
    </div>
  );
}

export async function generateMetadata({params}: {params: Promise<{ id: string }>}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient()
  const products: ProductData[] = await getProducts(
      supabase, [id], true, process.env.NODE_ENV === "production"
  )
  const product = products[0] ?? ProductData.NULL;

  return {
    title: `${SITE_NAME} - ${product.name}`,
    description: product.metadata.description,
  }
}
