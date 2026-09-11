import type {Metadata} from "next";
import {SITE_NAME} from "@/lib";
import type {ReactNode} from "react";

export const metadata: Metadata = {
    title: SITE_NAME + " - Checkout",
    robots: {index: false}
};

export default function Layout({ children }: { children: ReactNode }) {
    return children;
}
