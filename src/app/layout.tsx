import 'bootstrap/dist/css/bootstrap.css';
import "./global.css";
import "./envConfig.ts";

import type {ReactNode} from "react";
import type {Metadata} from "next";
import Header from "../components/Header/Header.tsx";
import Footer from "../components/Footer/Footer.tsx";
import LocaleContextProvider from "../lib/context/locale.tsx";
import RemoteSettingsContextProvider from "../lib/context/remoteSettings.tsx";
import ToastWrapper from "@/components/ToastWrapper/ToastWrapper.tsx";
import {GoogleAnalytics} from "@next/third-parties/google";
import {UseGA4Consent} from "@/lib/ga/client.tsx";
import {SITE_NAME} from "@/lib";

export const metadata: Metadata = {
    title: SITE_NAME,
    description:
        "We hand-craft glow in the dark models using resin and a variety of different glowing powders and colours. Each " +
        "has its own personality, imperfections, and love put into it by us.",
    authors: [
        {name: "Lordimass", url: "https://lordimass.net"},
        {name: "Sam Knight", url: "https://lordimass.net"}
    ],
    creator: "Lordimass"
};

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="en" data-bs-theme="light">
        <body>
        <div id="root">
            <LocaleContextProvider>
                <RemoteSettingsContextProvider>
                    <ToastWrapper>
                        <LayoutContextInternal>
                            <UseGA4Consent/>
                            <GoogleAnalytics
                                gaId={process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID!}
                                debugMode={process.env.NODE_ENV !== "production"}
                            />
                            {children}
                        </LayoutContextInternal>
                    </ToastWrapper>
                </RemoteSettingsContextProvider>
            </LocaleContextProvider>
        </div>
        </body>
        </html>
    );
}

function LayoutContextInternal({children}: { children: ReactNode }) {
    return (<>
            <Header/>
            <main>{children}</main>
            <Footer/>
        </>
    )
}
