"use client";

import {useContext, useEffect} from "react";
import {ToastContext} from "@/lib/context/toasts.tsx";
import {acceptCookies, declineCookies} from "@/lib/ga/ga.ts";
import {BsCookie} from "react-icons/bs";
import {sendGAEvent} from "@next/third-parties/google";
import type {IToastContext} from "@/lib/types/toasts.ts";

export function UseGA4Consent() {
    const { toast, closeToast } = useContext(ToastContext);

    // Initialise gtag function
    useEffect(() => {
        if (!localStorage.getItem("consentModeAnswer")) {
            useGetGA4Consent(toast, closeToast)
            return;
        }

        // Consent for cookie collection
        const consent =
            localStorage.getItem("consentModeAnswer") === "accept"
                ? "granted"
                : "denied";

        // Consent Mode V2 defaults (deny until user chooses)
        sendGAEvent("consent", "update", {
            // deny optional cookies for now.
            ad_storage: consent,
            analytics_storage: consent,
            ad_user_data: consent,
            ad_personalization: consent,
            // allow essential cookies.
            functionality_storage: "granted",
            security_storage: "granted",
        });
    }, [])

    return null
}

/**
 * Displays a toast requesting consent to use the `ga_` cookie. If this is not displayed and accepted, cookies are
 * declined by default.
 */
export function useGetGA4Consent(toast: IToastContext["toast"], closeToast: IToastContext["closeToast"]) {

    const key = "ConsentModeToast";
    console.log("Getting consent")
    if (localStorage.getItem("consentModeAnswer") == "accept") {
        acceptCookies();
        return;
    }
    toast({
        title: (
            <>
                <BsCookie /> Cookies?
                </>
        ),
        msg: (
            <>
                <p>Is it ok for us to collect basic site analytics using a cookie?</p>
            <div style={{ display: "flex", gap: "3px" }}>
    <button
        className={"btn btn-success"}
    onClick={() => {
        acceptCookies();
        closeToast("ConsentModeToast");
    }}
>
    Accept
    </button>

    <button
    className={"btn btn-outline-danger"}
    onClick={() => {
        declineCookies();
        closeToast("ConsentModeToast");
    }}
>
    Decline
    </button>
    </div>
    </>
),
    duration: null,
        key,
});

}