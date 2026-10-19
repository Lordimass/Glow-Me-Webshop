import styles from "./page.module.css";
import {getGroupedProducts} from "../lib/functions/supabaseRPC.ts";
import {PRIMARY_WEBP, ProductCollection,} from "@/lib";
import {createClient} from "../lib/supabase/server.ts";
import Products from "@/components/Product/Products/Products.tsx";
import GlowGifSelector from "@/components/GlowGifSelector/GlowGifSelector.tsx";

export default async function Page() {
    const groups = await getGroupedProducts(
        await createClient(),
        undefined,
        true,
        process.env.NODE_ENV === "production",
    );

    return (
        <>
            <div className={styles.homeTitleContainer}>
                <div className={"layer3"}>
                    <img
                        src={PRIMARY_WEBP}
                        alt={
                            'A logo which reads "Glow Me". It has gold sparkles, a ghost, a black cat, and a pumpkin nearby.'
                        }
                        fetchPriority={"high"}
                    />
                </div>
            </div>
            <div className={"content"}>

                <Products prods={groups ? JSON.stringify(groups) : new ProductCollection()} pageSize={20}>
                    <GlowGifSelector/>
                </Products>

            </div>
        </>
    );
}
