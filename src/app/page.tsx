import styles from "./page.module.css";
import {getGroupedProducts} from "../lib/functions/supabaseRPC.ts";
import {
    CAT_WEBP,
    GHOST_FACTORY_1,
    GHOST_FACTORY_2,
    GHOST_FACTORY_3,
    GHOST_WEBP,
    LIGHTS_CHANGE_VIDEO,
    PRIMARY_WEBP,
} from "@/lib";
import {Button} from "react-bootstrap";
import {createClient} from "../lib/supabase/server.ts";
import Products from "@/components/Product/Products/Products.tsx";

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

                <div className={styles.textBlock + " neon-border"}>
                    <h1>Welcome!</h1>
                    <p>
                        We hand-craft glow in the dark models using resin and a variety of
                        different glowing powders and colours. Each has its own personality,
                        imperfections, and love put into it by us.
                    </p>
                    <p>🧡💛🧡💛🧡💛🧡💛🧡💛</p>
                    <p>
                        This website is a showcase of our models, as well as a place to buy
                        them! We have two shops in York, England called GHOSTS and CATS
                        (you'll never guess what they sell) where you can go to see our full
                        selection of Glows, or find out more about each shop and see the full
                        selection from each on their pages below:
                    </p>
                </div>

                <div id={styles.shopNavigator}>
                    <Button
                        className={styles.btn + " ratio-1x1 neon-border"}
                        id={styles.ghostsNavigator}
                        href={"/shop/GHOSTS"}
                    >
                        <img
                            className={styles.shopNavigatorImg}
                            src={GHOST_WEBP}
                            alt="A vector graphic of a smiling ghost with a gold outline and glow"
                        />
                        <h1 className={styles.shopNavigatorHeader}>Ghosts</h1>
                    </Button>
                    <video
                        id={styles.lightsChangeVideo}
                        className={"neon-border"}
                        src={LIGHTS_CHANGE_VIDEO}
                        autoPlay
                        loop
                        muted
                    />
                    <Button
                        id={styles.catsNavigator}
                        className={styles.btn + " ratio-1x1 neon-border"}
                        href={"/shop/CATS"}
                    >
                        <img
                            className={styles.shopNavigatorImg}
                            src={CAT_WEBP}
                            alt="A vector graphic of a happy black cat with a gold glow"
                        />
                        <h1 className={styles.shopNavigatorHeader}>Cats</h1>
                    </Button>
                </div>

                {groups ? <Products prods={JSON.stringify(groups)} pageSize={20} /> : null}

                <div className={styles.ghostFactoryShowcase}>
                    <div className={styles.showcaseItem + " neon-border"}>
                        <img
                            src={GHOST_FACTORY_1}
                            alt={
                                "An angled photo of a bunch of colourful silicone moulds filled with uncured resin."
                            }
                            fetchPriority={"high"}
                        />
                    </div>
                    <div className={styles.showcaseItem + " neon-border"}>
                        <img
                            src={GHOST_FACTORY_2}
                            alt={
                                "An angled photo of lots of translucent swirled peach-white paired resin ghosts. The paired ghosts are holding a red heart between them."
                            }
                        />
                    </div>
                    <div className={styles.showcaseItem + " neon-border"}>
                        <img
                            src={GHOST_FACTORY_3}
                            alt={
                                "A photo focused on a colourful resin cat with black eyes. Embossed text at its base reads 'YORK'. The model is part of a lineup of lots of others in a line behind and to either side of it."
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
