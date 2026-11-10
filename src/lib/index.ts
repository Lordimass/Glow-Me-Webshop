/*
    NOTE: Index files only export files which are safe for both client and server to import. If a file is unsafe for
    server import, it must be imported by its full path for safety.
*/


export * from "./types";
export * from "./consts";

export * from "./routing.ts"
export * from "./assets.ts";
export * from "./currencySymbols.ts"
export * from "./formatting.ts"
export * from "./price.ts"

export function isProduction() {
    return true; // Override dev environment to show production products as needed.
    // return process.env.NODE_ENV === "production";
}

export function isVideo(src?: string) {
    if (!src) return false;
    return src.endsWith(".webm")
        || src.endsWith(".mov")
        || src.endsWith(".mp4");
}