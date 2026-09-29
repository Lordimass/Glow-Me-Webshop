"use client";

import {LIGHTS_CHANGE_VIDEO} from "@/lib";
import "./GlowGifSelector.css"
import {useEffect, useState} from "react";

const MIN_WIDTH = 800;
function getHeight(matches: boolean) {return matches ? 500 : 200}

export default function GlowGifSelector() {
    const [height, setHeight] = useState(getHeight(true));

    useEffect(() => {
        const mql = window.matchMedia(`(min-width: ${MIN_WIDTH}px)`);
        setHeight(getHeight(window.matchMedia(`(min-width: ${MIN_WIDTH}px)`).matches))
        const handler = (e: any) => setHeight(getHeight(e.matches));

        mql.addEventListener('change', handler);

        return () => {
            mql.removeEventListener('change', handler);
        };
    }, []);
    
    return <div id={"shop-navigator"}>
        <div id={"glow-gif-selector"} className={"neon-border"}>
        <video
            className={"lights-change-video"}
            id={"lights-change-video"}
            height={height}
            src={LIGHTS_CHANGE_VIDEO}
            autoPlay
            loop
            muted
        />

        <a id={"lights-change-ghost-container"} href={"/shop/GHOSTS"}>
            <video
                className={"lights-change-video"}
                id={"lights-change-video-ghost"}
                height={height}
                src={LIGHTS_CHANGE_VIDEO}
                autoPlay
                loop
                muted
            />
        </a>

        <a id={"lights-change-cat-container"} href={"/shop/CATS"}>
            <video
                className={"lights-change-video"}
                id={"lights-change-video-cat"}
                height={height}
                src={LIGHTS_CHANGE_VIDEO}
                autoPlay
                loop
                muted
            />
        </a>
        </div>
    </div>
}