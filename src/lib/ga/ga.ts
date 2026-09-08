/**
 * Sends a GA4 event using the Google Analytics Measurement Protocol. This should generally only be used in environments
 * where methods relying on `window.gtag` (such as the standard functions provided in this library) do not work. The
 * motivating example of this is Netlify serverless functions, which of course do not have access to the client.
 *
 * @param ga4MeasurementProtocolSecret - The measurement protocol secret key to use when making this request.
 * @param ga4MeasurementId - The public Google Analytics property measurement ID.
 * @param payload - The event payload.
 * @param debug - Whether to enable debug mode. Enabling this prevents events from being ingested, meaning they won't
 * show up in DebugView and will always give an OK response, but will return logs for any issues with the actual
 * structure of the request.
 * @return A boolean value representing whether the request resulted in an OK response or not.
 */
export async function sendGA4Event(
  payload: any,
  debug = false,
): Promise<boolean> {
    const GA4_MEASUREMENT_PROTOCOL_SECRET = process.env.GA4_MEASUREMENT_PROTOCOL_SECRET;
    const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

    if (!GA4_MEASUREMENT_PROTOCOL_SECRET || !GA4_MEASUREMENT_ID) {
        throw new Error(
            "Missing required NEXT_PUBLIC_GA4_MEASUREMENT_ID or GA4_MEASUREMENT_PROTOCOL_SECRET",
        );
    }

  const response = await fetch(
    `https://region1.google-analytics.com/${debug ? "debug/" : ""}mp/collect?api_secret=${GA4_MEASUREMENT_PROTOCOL_SECRET}&measurement_id=${GA4_MEASUREMENT_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );
  if (!response.ok) {
    console.error("Failed to send GA4 event: ", response.statusText);
    return false;
  } else {
    console.log(
      "Successfully sent GA4 event",
      response.status,
      response.statusText,
    );
    if (debug) console.log("GA4 Debug Response:", await response.json());
    return true;
  }
}
