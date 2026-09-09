"use client";

import {sendGAEvent} from "@next/third-parties/google";

/**
 * Update consent to agree to Google Analytics cookies.
 */
export function acceptCookies() {
    localStorage.setItem("consentModeAnswer", "accept");
    sendGAEvent("consent", "update", {
        analytics_storage: "granted",
        ad_user_data: "granted",
    });
}

/**
 * Update consent to deny use of Google Analytics cookies.
 */
export function declineCookies() {
    sendGAEvent("consent", "update", {
        analytics_storage: "denied",
        ad_user_data: "granted",
    });
}


/**
 * Get the Google Analytics client ID from the cookie.
 * @returns The GA client ID or null if not found.
 */
export function getGAClientId(): string | null {
    // Get the _ga cookie value.
    const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("_ga="));
    if (!cookie) return null;
    const value = cookie.split("=")[1];

    // Cookie looks like GA1.2.1234567890.987654321
    // The last two parts are the client ID
    // Decode and extract the client ID
    const parts = value.split(".");
    if (parts.length >= 4) {
        return `${parts[2]}.${parts[3]}`;
    }
    return null;
}

/**
 * Get the Google Analytics session ID.
 *
 * @param ga4MeasurementId The Google Analytics measurement ID with which to fetch the session ID in association to.
 * @returns The GA session ID or null if not found.
 */
export async function getGASessionId(
    ga4MeasurementId: string,
): Promise<string | null> {
    // Timeout if it doesn't resolve fast, like if anti-tracker software is blocking calls to GA
    const timeoutMs = 300;

    return new Promise((resolve, error) => {
        const timeout = window.setTimeout(() => {
            console.warn(
                "Gtag timed out, likely blocked by anti-tracker software. Fine. You win.",
            );
            resolve(null);
        }, timeoutMs);

        sendGAEvent("get", ga4MeasurementId, "session_id", (id: any) => {
            console.log(`Got ID: ${id}`);
            clearTimeout(timeout);
            resolve(id);
        });
    });
}
