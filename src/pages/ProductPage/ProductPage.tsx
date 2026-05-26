import { useGetGroupedProducts } from "../../lib/supabaseRPC.ts";
import { ProductData, ProductPageComponent } from "lordis-react-components";
import Page from "../../components/Page/Page.tsx";
import { SITE_NAME } from "../../lib/consts.ts";
import Page404 from "../Page404/Page404.tsx";
import "./ProductPage.scss";

export default function ProductPage() {
  // Fetch the product for this page.
  const path = window.location.pathname.split("/");
  const sku = path[path.length - 1];
  const resp = useGetGroupedProducts([sku]);
  let product = ProductData.NULL;
  let group = undefined;
  if (!resp.loading) {
    if (resp.error || !resp.data || resp.data?.length == 0) {
      return <Page404 />;
    }
    group = resp.data[0];
    product = group.products[0];
  }

  return (
    <div data-bs-theme={"light"}>
      <Page
        title={`${SITE_NAME} - ${product.name}`}
        metaDescription={product.metadata.description}
      >
        <ProductPageComponent p_product={product} group={group} />
      </Page>
    </div>
  );
}
