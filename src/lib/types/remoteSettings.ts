import {createClient} from "../supabase/client.ts";

export type RemoteSettings = {
    kill_switch?: { enabled: boolean; message: string };
    session_notif?: SessionNotif;
    [key: string]: any;
};

export interface SessionNotif {
    enabled: boolean;
    message: string;
    startTime: string;
    endTime: string;
    duration: number;
}

// TODO: Send configured session notifications (and kill switch notif) since this doesn't do it anymore

/**
 * Fetches the Remote Settings from the Supabase site_settings table.
 *
 * Must be called from the client!
 *
 * @returns The Remote Settings
 */
export async function determineRemoteSettings() {
    let remoteSettings: RemoteSettings;
    const supabase = createClient()

    // Use a locally defined variable to allow for immediate manipulation. If we used the remoteSettings in state
    // it would still be `{}` until the next render loop.
    const resp = await supabase
        .schema("glow_me")
        .from("site_settings")
        .select("*");
    if (!resp || resp.error) {
        throw resp ? resp.error : new Error("Site settings fetch returned " + resp);
    }
    const data: {
        id: string;
        display_name: string;
        value: string;
    }[] = resp.data;
    // Settings are not returned as an object, but as an array of table rows. Convert it to an object.
    remoteSettings = {};
    data.forEach((setting) => {
        remoteSettings[setting.id] = setting.value;
    });

    // // Enable kill switch and toast user if not already notified this session
    // const killSwitchNotified = sessionStorage.getItem("killSwitchNotified");
    // if (remoteSettings.kill_switch?.enabled && !killSwitchNotified) {
    //     sessionStorage.setItem("killSwitchNotified", "true");
    //     console.log("== KILL SWITCH ENABLED ==");
    //     toast({ msg: remoteSettings.kill_switch.message, variant: "danger" });
    // }

    // Show current session notification if not already shown this session
    // const sessionNotifNotified = sessionStorage.getItem("sessionNotifNotified");
    // const sessionNotif = remoteSettings.session_notif;
    // const now = new Date();
    // if (
    //     !sessionNotifNotified &&
    //     sessionNotif &&
    //     +new Date(sessionNotif.endTime) > +now && // Coerce dates to numbers
    //     +new Date(sessionNotif.startTime) < +now
    // ) {
    //     sessionStorage.setItem("sessionNotifNotified", "true");
    //     toast({
    //         msg: sessionNotif.message,
    //         duration: sessionNotif.duration ?? undefined,
    //         variant: "warning",
    //     });
    // }
    return remoteSettings;
}