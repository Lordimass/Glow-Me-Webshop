import "./global.css";
import {notFound} from "next/navigation";
import {getGroupedProducts} from "@/lib/functions/supabaseRPC.ts";
import {ProductData, ProductGroup} from "@/lib";
import ProductPageComponent from "@/components/Product/ProductPageComponent/ProductPageComponent.tsx";
import {createClient} from "@/lib/supabase/server.ts";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient()
  const productGroups: ProductGroup[] = await getGroupedProducts(supabase, [id])
  if (!productGroups || productGroups.length === 0) notFound();

  const group = productGroups[0];
  const product = group?.products[0] ?? ProductData.NULL;

  // TODO:
  // title={`${SITE_NAME} - ${product.name}`}
  // metaDescription={product.metadata.description}

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
