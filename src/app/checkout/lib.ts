import type {StripeEmbeddedCheckoutShippingDetails} from "@stripe/stripe-js/dist/stripe-js/embedded-checkout";
import {Basket, type StockDiscrepency} from "@/lib";
import type {SupabaseClient} from "@supabase/supabase-js";
import type {Currency} from "dinero.js";
import {getGAClientId, getGASessionId} from "@/lib/ga/ga.ts";


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
export async function createCheckoutSession(currency: Currency): Promise<string> {
  // Construct parameters for request to createCheckoutSession
  const prices = fetchStripePrices();
  const basketString = localStorage.getItem("basket");
  const gaClientID = getGAClientId();
  const gaSessionID = await getGASessionId(process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID!);
  const response = await fetch("api/createCheckoutSession", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stripe_line_items: prices,
      basket: JSON.parse(basketString ? basketString : "{\"products\":[]}"),
      origin: window.location.origin,
      gaClientID,
      gaSessionID,
      // Stripe uses the location to determine currency automatically, so we pass the location instead of currency.
      currency,
    }),
  });
  if (response.ok) {
    const body = await response.json();
    return body.client_secret;
  } else {
    console.error("Something went wrong when fetching client secret ", await response.text());
    return ""
  }
}

export async function updateShippingOptions(
  checkoutID: string,
  shippingDetails: StripeEmbeddedCheckoutShippingDetails,
) {
  return await fetch(
    window.location.origin + "/api/getShippingOptions",
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
export async function checkStock(supabase: SupabaseClient) {
  const prods = Basket.getBasket().products;
  if (supabase == undefined) {
    throw new Error("LRC.supabase is undefined");
  }

  // Fetch up-to-date data from Supabase.
  const { data, error } = await supabase
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
