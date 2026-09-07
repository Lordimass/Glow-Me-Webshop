"use client";

import {useContext, useEffect} from "react";
import {ToastContext} from "@/lib/context/toasts.tsx";
import {RemoteSettingsContext} from "@/lib/context/remoteSettings.tsx";
import type {RemoteSettings} from "@/lib/types/remoteSettings.ts";
import type {IToastContext} from "@/lib/types/toasts.ts";

/**
 * Helper component to allow triggering {@link maybeShowSessionToasts} from the server.
 */
export function UseMaybeShowSessionToasts() {
    const {toast} = useContext(ToastContext);
    const remoteSettings = useContext(RemoteSettingsContext);

    useEffect(
        () => {maybeShowSessionToasts(toast, remoteSettings);},
        // Checking for change in length here so that useEffect condition doesn't change length (Since React warns against that)
        [remoteSettings, toast.length]);
    return null;
}

/**
 * If not already shown, and if applicable, show current session toasts to the user.
 * Requires {@link ToastContext} & {@link RemoteSettingsContext}
 */
function maybeShowSessionToasts(toast: IToastContext["toast"], remoteSettings: RemoteSettings) {
    // Enable kill switch and toast user if not already notified this session
    const killSwitchNotified = sessionStorage.getItem("killSwitchNotified");
    if (remoteSettings.kill_switch?.enabled && !killSwitchNotified) {
        sessionStorage.setItem("killSwitchNotified", "true");
        console.log("== KILL SWITCH ENABLED ==");
        toast({ msg: remoteSettings.kill_switch.message, variant: "danger" });
    }

    // Show current session notification if not already shown this session
    const sessionNotifNotified = sessionStorage.getItem("sessionNotifNotified");
    const sessionNotif = remoteSettings.session_notif;
    const now = new Date();
    if (
        !sessionNotifNotified &&
        sessionNotif &&
        +new Date(sessionNotif.endTime) > +now && // Coerce dates to numbers
        +new Date(sessionNotif.startTime) < +now
    ) {
        sessionStorage.setItem("sessionNotifNotified", "true");
        toast({
            msg: sessionNotif.message,
            duration: sessionNotif.duration ?? undefined,
            variant: "warning",
        });
    }
}