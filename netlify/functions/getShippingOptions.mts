import type { Context } from "@netlify/functions";
import { stripe } from "../lib/stripe.ts";
import { EU, SHIPPING_COUNTRIES, UK } from "../../shared/consts/shipping.ts";
import type { ShippingOptionGroups } from "../../shared/types/shipping.ts";
import Stripe from "stripe";
import type { StripeAddressElementChangeEvent } from "@stripe/stripe-js";

interface Body {
  checkoutID: string;
  shipping_details: StripeAddressElementChangeEvent["value"];
}

const rateNames: ShippingOptionGroups = JSON.parse(
  process.env.VITE_SHIPPING_RATES ?? "{}",
) as ShippingOptionGroups;

/**
 * Returns a list of shipping options that are available based on the
 * location of the customer.
 * @see Body
 */
export default async function handler(request: Request, _context: Context) {
  try {
    // Validate request
    const contentType = request.headers.get("Content-Type");
    if (contentType !== "application/json") {
      console.error(
        `'Content-Type' of request was not 'application/json', instead, it was: ${contentType}`,
      );
      return new Response("'Content-Type' must be 'application/json'", {
        status: 400,
      });
    } else if (!request.body) {
      console.error("Request did not have a body");
      return new Response("No body supplied", { status: 400 });
    }
    const body = (await request.json()) as Body;

    const country = body.shipping_details.address.country;
    if (!SHIPPING_COUNTRIES.includes(country)) {
      console.log("Cannot ship to " + country);
      return new Response("Sorry! We can't ship to this location...", {
        status: 400,
      });
    }

    if (await handleShipToSelf(body)) {
      return new Response(JSON.stringify(["shr_1TSZ2SC1fpGB30NPV21ktaKg"]));
    }

    let applicableRateNames = rateNames.world;
    if (UK.includes(country)) applicableRateNames = rateNames.uk;
    else if (EU.includes(country)) applicableRateNames = rateNames.eu;

    // Fetch list of active shipping rates
    const rates = await stripe.shippingRates.list({ active: true });
    // Find rates with descriptions in the applicable array
    console.log(rates.data.map((r) => r.display_name));
    const applicableRates = rates.data
      .filter((r) => applicableRateNames.includes(r.display_name || ""))
      .slice(0, 5); // Max 5 rates

    const applicableRateIds = applicableRates.map((rate) => rate.id);
    console.log(
      "Updating available shipping options with the following rate names/ids",
    );
    const applicableOptions = applicableRates.map((rate) => {
      return { shipping_rate: rate.id };
    });
    await stripe.checkout.sessions.update(body.checkoutID, {
      collected_information: { shipping_details: body.shipping_details as any },
      shipping_options: applicableOptions as Stripe.Emptyable<any[]>,
    });
    return new Response(JSON.stringify(applicableRateIds));
  } catch (e) {
    console.error(e);
    return new Response(undefined, { status: 500 });
  }
}

/**
 * Handle the case where the address entered is our own address, in which case, make the shipping free. If this is used
 * by a customer they will never receive their package because we won't have their address, so it cannot be exploited
 * to dodge the shipping fee.
 */
async function handleShipToSelf(body: Body): Promise<boolean> {
  const address = body.shipping_details.address;
  if (
    !(
      address.line1 == "16 Parliament Street" &&
      address.city == "York" &&
      address.postal_code == "YO1 8SG"
    )
  ) {
    return false;
  }
  await stripe.checkout.sessions.update(body.checkoutID, {
    collected_information: { shipping_details: body.shipping_details as any },
    shipping_options: [
      { shipping_rate: "shr_1TSZ2SC1fpGB30NPV21ktaKg" },
    ] as Stripe.Emptyable<any[]>,
  });
  return true;
}
