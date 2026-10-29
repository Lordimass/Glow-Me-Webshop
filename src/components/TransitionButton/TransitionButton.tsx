"use client";

import "./TransitionButton.css"
import {useEffect, useRef} from "react";

export default function TransitionButton
({
    videoSrc,
    href,
    playbackRate = 1,
    respectReducedMotion = true,
    square = false,
}:{
    videoSrc: string,
    href?: string,
    playbackRate?: number,
    respectReducedMotion?: boolean
    square?: boolean
}){
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (!videoRef.current) return;
        const mediaQueryList = window.matchMedia("(prefers-reduced-motion: reduce)");
        videoRef.current.playbackRate = mediaQueryList.matches && respectReducedMotion
            ? 0
            : playbackRate;
    }, []);

    return <a href={href} className={"lightsChangeVideoLink neon-border" + (square ? " square" : "")}>
        <video
            className={"lightsChangeVideo"}
            src={videoSrc}
            autoPlay loop muted
            ref={videoRef}
        />
    </a>
}

