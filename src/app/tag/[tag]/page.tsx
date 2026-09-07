import {getGroupedProducts} from "@/lib/functions/supabaseRPC.ts";
import "./global.css";
import GoHome from "@/components/GoHome/GoHome.tsx";
import Products from "@/components/Product/Products/Products.tsx";
import {createClient} from "@/lib/supabase/server.ts";

export default async function Page({ params }: { params: Promise<{ tag: string }> }) {
  const livemode = import.meta.env.NEXT_PUBLIC_ENVIRONMENT !== "DEVELOPMENT";
  const {tag} = await params
  const supabase = await createClient()
  const groups = await getGroupedProducts(supabase, undefined, true, livemode, [tag])

  // useEffect(() => {
  //   if (groups == null || groups.length === 0) return;
  //   const representatives = groups.map((group) => group.products[0]);
  //   // TODO: trackViewItemListAutoConvert(
  //   //   currency,
  //   //   representatives,
  //   //   tag + "-items",
  //   //   `Items tagged "${tag}"`,
  //   // );
  // }, [groups]);

  // TODO: title={`Glow Me! - ${tag}`}
  // metaDescription={`All products with tag: ${tag}`}
  // noindex={groups != null && groups.length == 0}

  return (<>
      <GoHome />
      <h1 id={"tag-info"}>
        Viewing all products with tag{" "}
        <span style={{ fontFamily: "monospace" }}>"{tag}"</span>
      </h1>
      {groups ? <Products prods={groups.serialise()} pageSize={20} /> : null}
  </>);
}
