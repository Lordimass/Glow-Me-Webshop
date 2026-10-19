"use server";

import "./global.css";
import Products from "../../components/Product/Products/Products.tsx";
import GoHome from "../../components/GoHome/GoHome.tsx";
import {getGroupedProducts} from "@/lib/functions/supabaseRPC.ts";
import {createClient} from "@/lib/supabase/server.ts";

interface ShopShowcaseProps {
  /** The name of the shop */
  shopName: string;
  /** Possible tags for products to display on this page */
  tags?: string[];
  metaDescription?: string;
}

export default async function ShopShowcase(props: ShopShowcaseProps) {
  const groups = await getGroupedProducts(
      await createClient(),
      undefined,
      undefined,
      process.env.NODE_ENV === "production",
      props.tags
  );

  return (
    <div
      id={`shop-showcase`}
    >
      <GoHome />
      <h1 className={"shop-title"}>
        <hr />{props.shopName}<hr />
      </h1>
      {groups ? <Products prods={JSON.stringify(groups)} /> : null}
    </div>
  );
}
