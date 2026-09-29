"use client";

import {LIGHTS_CHANGE_VIDEO} from "@/lib";
import "./GlowGifSelector.css"

export default function GlowGifSelector() {
    return <div id={"shop-navigator"}>
        <div id={"glow-gif-selector"} className={"neon-border"}>
        <video
            id={"lights-change-video"}
            height={600}
            src={LIGHTS_CHANGE_VIDEO}
            autoPlay
            loop
            muted
        />

        <a id={"lights-change-ghost-container"} href={"/shop/GHOSTS"}>
            <video
                id={"lights-change-video-ghost"}
                height={600}
                src={LIGHTS_CHANGE_VIDEO}
                autoPlay
                loop
                muted
            />
        </a>

        <a id={"lights-change-cat-container"} href={"/shop/CATS"}>
            <video
                id={"lights-change-video-cat"}
                height={600}
                src={LIGHTS_CHANGE_VIDEO}
                autoPlay
                loop
                muted
            />
        </a>
        </div>
    </div>
}