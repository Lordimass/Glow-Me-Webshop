import styles from "./page.module.css";
import {PRIMARY_WEBP, SUPABASE_STORAGE,} from "@/lib";
import TransitionButton from "@/components/TransitionButton/TransitionButton.tsx";

export default async function Page() {
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
                <div id={styles.transitionButtons}>
                    <TransitionButton
                        videoSrc={SUPABASE_STORAGE + "/glow_me_product_images/transitions/cat-blue-square.webm"}
                        href={"/products/prod_VQVip1eow8fZAt"}
                        square={true}
                    />
                    <TransitionButton
                        videoSrc={SUPABASE_STORAGE + "/glow_me_product_images/transitions/fu-ghost-blue-square.webm"}
                        href={"/products/prod_VXGmian6JBWKov"}
                        square={true}
                    />
                    <TransitionButton
                        videoSrc={SUPABASE_STORAGE + "/glow_me_product_images/transitions/cat-ghost-blue.webm"}
                        href={"/products/prod_VOKTaC3xy4WswD"}
                        square={true}
                    />
                    <TransitionButton
                        videoSrc={SUPABASE_STORAGE + "/glow_me_product_images/transitions/ghost-holding-cat-blue-square.webm"}
                        href={"/products/prod_VOdK6lqYAf3iAH"}
                        square={true}
                    />
                </div>
                <br/>
                <div id={styles.transitionButtons}>
                    <TransitionButton
                        videoSrc={SUPABASE_STORAGE + "/glow_me_product_images/cat/cat-11.webp"}
                        href={"/products/prod_VQViVPvtbL79k5"}
                        square={true}
                        isVideo={false}
                    />
                    <TransitionButton
                        videoSrc={SUPABASE_STORAGE + "/glow_me_product_images/fu-ghost/fu-ghost-6.webp"}
                        href={"/products/prod_VOKYjPvJJxXgbl"}
                        square={true}
                        isVideo={false}
                    />
                    <TransitionButton
                        videoSrc={SUPABASE_STORAGE + "/glow_me_product_images/ghost-holding-cat/ghost-holding-cat-6.webp"}
                        href={"/products/prod_VOdGzB8fZVMRw3"}
                        square={true}
                        isVideo={false}
                    />

                </div>
            </div>
        </>
    );
}
