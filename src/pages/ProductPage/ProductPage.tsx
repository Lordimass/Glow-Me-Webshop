import { useGetGroupedProducts } from "../../lib/supabaseRPC.ts";
import {
  ProductData,
  ProductPageComponent,
} from "../../../../Lordis-React-Components";
import "./ProductPage.scss";
import type { ProductGroup } from "lordis-react-components";
import Page from "../../components/Page/Page.tsx";
import { SITE_NAME } from "../../lib/consts.ts";

export default function ProductPage() {
  // Fetch the product for this page.
  const path = window.location.pathname.split("/");
  const sku = path[path.length - 1];
  const group: ProductGroup | undefined = useGetGroupedProducts([sku])[0];
  const product = group?.products[0] ?? ProductData.NULL;

  return (
    <Page title={`${SITE_NAME} - ${product.name}`}>
      <ProductPageComponent p_product={product} group={group} />
    </Page>
  );
}
