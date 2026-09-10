import {getGroupedProducts} from "@/lib/functions/supabaseRPC.ts";
import "./global.css";
import GoHome from "@/components/GoHome/GoHome.tsx";
import Products from "@/components/Product/Products/Products.tsx";
import {createClient} from "@/lib/supabase/server.ts";
import Client from "@/app/tag/[tag]/client.tsx";
import type {Metadata} from "next";
import {SITE_NAME} from "@/lib";

export default async function Page({params}: { params: Promise<{ tag: string }> }) {
    const livemode = process.env.NEXT_PUBLIC_ENVIRONMENT !== "DEVELOPMENT";
    const {tag} = await params
    const supabase = await createClient()
    const groups = await getGroupedProducts(supabase, undefined, true, livemode, [tag])

    return (<>
        <GoHome/>
        <Client tag={tag} serialisedGroups={groups.serialise()}/>
        <h1 id={"tag-info"}>
            Viewing all products with tag{" "}
            <span style={{fontFamily: "monospace"}}>"{tag}"</span>
        </h1>
        {
            groups ? <Products prods={groups.serialise()} pageSize={20}/> : null
        }
    </>);
}

export async function generateMetadata({params}: {params: Promise<{ tag: string }>}): Promise<Metadata> {
    const {tag} = await params
    return {
        title: SITE_NAME + " - " + tag,
        description: "All products with tag: " + tag
    }
}