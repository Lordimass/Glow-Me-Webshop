import {
  Basket,
  getGAClientId,
  getGASessionId,
  LRC,
} from "lordis-react-components";
import { getCurrency } from "locale-currency";
import type { StripeEmbeddedCheckoutShippingDetails } from "@stripe/stripe-js/dist/stripe-js/embedded-checkout";
import type { StockDiscrepency } from "../../../shared/types/types.ts";
import { loadStripe, type Stripe } from "@stripe/stripe-js";

const STRIPE_KEY = import.meta.env.VITE_STRIPE_KEY;
if (!STRIPE_KEY) {
  console.error("No VITE_STRIPE_KEY!");
}
export const stripePromise: Promise<Stripe | null> = STRIPE_KEY
  ? loadStripe(STRIPE_KEY, {
      betas: ["custom_checkout_server_updates_1"],
    })
  : new Promise(() => {});

export function redirectIfEmptyBasket() {
  const basketString: string | null = localStorage.getItem("basket");
  if (
    !basketString ||
    basketString == '{"basket":[]}' ||
    basketString == "{}"
  ) {
    window.location.href = "/";
  }
}

/**
 * Creates a Stripe Checkout Session.
 * @return The client secret for the created checkout session.
 */
export async function createCheckoutSession(): Promise<string> {
  // Get the user's location from the query string since we can't access Context here.
  const urlParams = new URLSearchParams(window.location.search);
  const locale = urlParams.get("locale") || LRC.defaultLocale;
  /** 3-Character ISO Currency Code to use for the prices */
  const currency: string = getCurrency(locale) || LRC.defaultCurrency;

  // Construct parameters for request to createCheckoutSession
  const prices = fetchStripePrices();
  const basketString = localStorage.getItem("basket");
  const gaClientID = getGAClientId();
  const gaSessionID = await getGASessionId(
    import.meta.env.VITE_GA4_MEASUREMENT_ID,
  );
  console.log("Test");
  const response = await fetch(".netlify/functions/createCheckoutSession", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stripe_line_items: prices,
      basket: JSON.parse(basketString ? basketString : "{basket:[]}"),
      origin: window.location.origin,
      gaClientID,
      gaSessionID,
      // Stripe uses the location to determine currency automatically, so we pass the location instead of currency.
      currency,
    }),
  });
  const body = await response.json();
  return body.client_secret;
}

export async function updateShippingOptions(
  checkoutID: string,
  shippingDetails: StripeEmbeddedCheckoutShippingDetails,
) {
  return await fetch(
    window.location.origin + "/.netlify/functions/getShippingOptions",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checkoutID, shipping_details: shippingDetails }),
    },
  );
}

export function fetchStripePrices(): { price: string; quantity: number }[] {
  return Basket.getBasket().products.map((p) => {
    return { price: p.metadata.priceId, quantity: p.basketQuantity };
  });
}

/**
 * Find discrepencies between the basket quantities and fresh stock numbers from the database.
 */
export async function checkStock() {
  const prods = Basket.getBasket().products;
  if (LRC.supabase == undefined) {
    throw new Error("LRC.supabase is undefined");
  }

  // Fetch up-to-date data from Supabase.
  const { data, error } = await LRC.supabase
    .schema("glow_me")
    .from("products")
    .select("id, stock")
    .in(
      "id",
      prods.map((prod) => prod.sku),
    );
  if (error) {
    throw error;
  } else if (!data) {
    throw Error("No data returned when checking product stock");
  } else if (data.length != prods.length) {
    throw Error(
      "Unable to find some products on the database when checking product stock",
    );
  }

  // Find discrepencies
  const discrepencies: StockDiscrepency[] = [];
  data.forEach((supaProd) => {
    // Find matching productInBasket.
    // Using `foreach` instead of `filter` here since there should only be one match.
    prods.forEach((prod) => {
      if (prod.sku != supaProd.id) return;

      // Calculate stock diff, if there is some, report it
      const diff = prod.basketQuantity - supaProd.stock;
      if (diff > 0) {
        discrepencies.push({
          sku: prod.sku,
          stock: supaProd.stock,
          basketQuantity: prod.basketQuantity,
          name: prod.name,
        });
      }
    });
  });
  return discrepencies;
}
