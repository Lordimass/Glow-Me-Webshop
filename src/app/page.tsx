import styles from "./page.module.css";
import {isProduction, PRIMARY_WEBP, ProductCollection, ProductData,} from "@/lib";
import {createClient} from "@/lib/supabase/server.ts";
import {getGroupedProducts} from "@/lib/functions/supabaseRPC.ts";
import Products from "@/components/Product/Products/Products.tsx";

const HOME_PAGE_SKUS = [
        "prod_VXGmian6JBWKov", // FU Glow Ghost
        "prod_VZZpkQ9ZS8cV5v", // Glow Ghost
        "prod_VZZY5bghGbt7dU", // Partner Glow Ghosts
        "prod_VOdK6lqYAf3iAH", // Glow Ghost Holding Cat
        "prod_VQVip1eow8fZAt", // Glow Cat
        "prod_VOKTaC3xy4WswD", // Cat Glow Ghost
        "prod_VOKYjPvJJxXgbl", // FU Ghost
        "prod_VOdGzB8fZVMRw3", // Ghost Holding Cat
        "prod_VZZV6oitiMGWoY", // Ghost
        "prod_VQViVPvtbL79k5", // Cat
    ]

export default async function Page() {
    const supabase = await createClient();
    const homePageProds = await getGroupedProducts(
        supabase,
        HOME_PAGE_SKUS,
        false,
        isProduction(),
        undefined,
        undefined
    )
    const fuGlowGhost = homePageProds.find(p => p.hasSku("prod_VXGmian6JBWKov")) || ProductData.NULL
    const glowGhost = homePageProds.find(p => p.hasSku("prod_VZZpkQ9ZS8cV5v")) || ProductData.NULL
    const partnerGlowGhosts = homePageProds.find(p => p.hasSku("prod_VZZY5bghGbt7dU")) || ProductData.NULL
    const glowGhostHoldingCat = homePageProds.find(p => p.hasSku("prod_VOdK6lqYAf3iAH")) || ProductData.NULL
    const glowCat = homePageProds.find(p => p.hasSku("prod_VQVip1eow8fZAt")) || ProductData.NULL
    const catGlowGhost = homePageProds.find(p => p.hasSku("prod_VOKTaC3xy4WswD")) || ProductData.NULL
    const fuGhost = homePageProds.find(p => p.hasSku("prod_VOKYjPvJJxXgbl")) || ProductData.NULL
    const ghostHoldingCat = homePageProds.find(p => p.hasSku("prod_VOdGzB8fZVMRw3")) || ProductData.NULL
    const ghost = homePageProds.find(p => p.hasSku("prod_VZZV6oitiMGWoY")) || ProductData.NULL
    const cat = homePageProds.find(p => p.hasSku("prod_VQViVPvtbL79k5")) || ProductData.NULL

    const glowGhosts = new ProductCollection(fuGlowGhost, glowGhost, partnerGlowGhosts, glowGhostHoldingCat)
    const glowCats = new ProductCollection(glowCat, catGlowGhost)
    const ghosts = new ProductCollection(fuGhost, ghostHoldingCat, ghost)
    const cats = new ProductCollection(cat)

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
                <hr/>
                <h1 className={"text-center"} style={{lineHeight: "35px"}}>GLOW<br/><span style={{fontSize: "35px"}}>In The Dark</span></h1>
                <hr/>
                <h2 className={"text-center"}>GHOSTS</h2>
                <Products prods={glowGhosts.serialise()} excludeHidden={false} allowComparisonSliderImage={false} hideText={true} forceVertical={true}/>
                <div className={styles.spacer}/>
                <h2 className={"text-center"}>CATS</h2>
                <Products prods={glowCats.serialise()} excludeHidden={false} hideText={true} forceVertical={true} />
                <div className={styles.spacer}/><div className={styles.spacer}/>
                <hr/>
                <h1 className={"text-center"} style={{lineHeight: "35px"}}>NON-GLOW<br/><span style={{fontSize: "35px"}}>Special Edition</span></h1>
                <hr/>
                <h2 className={"text-center"}>GHOSTS</h2>
                <Products prods={ghosts.serialise()} excludeHidden={false} hideText={true} forceVertical={true} />
                <div className={styles.spacer}/>
                <h2 className={"text-center"}>CATS</h2>
                <Products prods={cats.serialise()} excludeHidden={false} hideText={true} forceVertical={true} />
            </div>
        </>
    );
}
