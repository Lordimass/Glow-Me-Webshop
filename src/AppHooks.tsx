import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  LRC,
  LRCRemoteSettingsContext,
  ToastContext,
  trackPageView,
} from "lordis-react-components";

export function usePageViewTracking() {
  const location = useLocation();
  useEffect(() => {
    trackPageView(document.title, document.location.href);
    console.log(
      `Tracked page view for ${document.title} - ${location.pathname}`,
    );
  }, [location]);
}

export type SiteSettings = {
  kill_switch?: { enabled: boolean; message: string };
  session_notif?: {
    enabled: boolean;
    message: string;
    startTime: string;
    endTime: string;
    duration: number;
  };
  [key: string]: any;
};

/**
 * Fetches the Site Settings from the Supabase site_settings table.
 * Also updates whether the Kill Switch should be enabled, and
 * sends any configured session notifications.
 * @returns The Site Settings
 */
export function useSiteSettings() {
  const { toast } = useContext(ToastContext);
  const {} = useContext(LRCRemoteSettingsContext);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({});
  useEffect(() => {
    async function fetch() {
      // Use a locally defined variable to allow for immediate manipulation. If we used the siteSettings in state
      // it would still be `{}` until the next render loop.
      const resp = await LRC.supabase
        ?.schema("glow_me")
        .from("site_settings")
        .select("*");
      if (!resp || resp.error) {
        throw resp
          ? resp.error
          : new Error("Site settings fetch returned " + resp);
      }
      const data: {
        id: string;
        display_name: string;
        value: string;
      }[] = resp.data;
      // Settings are not returned as an object, but as an array of table rows. Convert it to an object.
      const siteSettings: SiteSettings = {};
      data.forEach((setting) => {
        siteSettings[setting.id] = setting.value;
      });
      setSiteSettings(siteSettings);

      // Enable kill switch and toast user if not already notified this session
      const killSwitchNotified = sessionStorage.getItem("killSwitchNotified");
      if (siteSettings.kill_switch?.enabled && !killSwitchNotified) {
        sessionStorage.setItem("killSwitchNotified", "true");
        console.log("== KILL SWITCH ENABLED ==");
        toast({ msg: siteSettings.kill_switch.message, variant: "danger" });
      }

      // Show current session notification if not already shown this session
      const sessionNotifNotified = sessionStorage.getItem(
        "sessionNotifNotified",
      );
      const sessionNotif = siteSettings.session_notif;
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
    fetch().then();
  }, []);

  return siteSettings;
}
