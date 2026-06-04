import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getGroupedProducts } from "../../../shared/functions/supabaseRPC.ts";
import {
  GoHome,
  LocaleContext,
  LRC,
  type ProductGroup,
  Products,
  ToastContext,
  trackViewItemListAutoConvert,
} from "lordis-react-components";
import Page from "../../components/Page/Page.tsx";
import "./TagPage.scss";

export default function TagPage() {
  const { toast } = useContext(ToastContext);
  const { currency } = useContext(LocaleContext);
  const [groups, setGroups] = useState<ProductGroup[]>([]);
  const [tag, setTag] = useState<string>("");
  const location = useLocation();
  const livemode = import.meta.env.VITE_ENVIRONMENT !== "DEVELOPMENT";

  useEffect(() => {
    const path = location.pathname.split("/");
    const tag = path[path.length - 1];
    setTag(tag);
    getGroupedProducts(
      undefined,
      true,
      livemode,
      [tag],
      toast,
      LRC.supabase,
    ).then((groupedProducts) => setGroups(groupedProducts));
  }, [location]);

  useEffect(() => {
    if (groups == null || groups.length === 0) return;
    const representatives = groups.map((group) => group.products[0]);
    trackViewItemListAutoConvert(
      currency,
      representatives,
      tag + "-items",
      `Items tagged "${tag}"`,
    );
  }, [groups]);

  return (
    <Page
      title={`Glow Me! - ${tag}`}
      metaDescription={`All products with tag: ${tag}`}
      noindex={groups != null && groups.length == 0}
    >
      <GoHome />
      <h1 id={"tag-info"}>
        Viewing all products with tag{" "}
        <span style={{ fontFamily: "monospace" }}>"{tag}"</span>
      </h1>
      {groups ? <Products prods={groups} pageSize={20} /> : null}
    </Page>
  );
}
