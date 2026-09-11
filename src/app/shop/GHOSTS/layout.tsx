import type {Metadata} from "next";
import type {ReactNode} from "react";
import {props} from "@/app/shop/GHOSTS/page.tsx";

export const metadata: Metadata = {
    title: props[0].shopName,
    description: props[0].metaDescription
};

export default function Layout({ children }: { children: ReactNode }) {
    return children;
}
