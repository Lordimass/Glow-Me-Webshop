"use client";

import { useContext, useEffect, useState } from "react";
import { getGroupedProducts } from "../../../lib/functions/supabaseRPC.ts";
import {
  GoHome,
  LocaleContext,
  LRC,
  type ProductGroup,
  Products,
  ToastContext,
  trackViewItemListAutoConvert,
} from "lordis-react-components";
import PageComp from "../../../components/Page/Page.tsx";
import "./global.css";

export default function Page({ params }: { params: Promise<{ tag: string }> }) {
  const [tag, setTag] = useState<string>();
  const { toast } = useContext(ToastContext);
  const { currency } = useContext(LocaleContext);
  const [groups, setGroups] = useState<ProductGroup[]>([]);
  const livemode = import.meta.env.NEXT_PUBLIC_ENVIRONMENT !== "DEVELOPMENT";

  useEffect(() => {
    async function get() {
      const { tag: newTag } = await params;
      setTag(newTag);
      getGroupedProducts(
        undefined,
        true,
        livemode,
        [newTag],
        toast,
        LRC.supabase,
      ).then((groupedProducts) => setGroups(groupedProducts));
    }
    get().then();
  }, [params]);

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
    <PageComp
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
    </PageComp>
  );
}
