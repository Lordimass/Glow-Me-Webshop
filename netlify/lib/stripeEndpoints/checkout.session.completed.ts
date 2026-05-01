import Stripe from "stripe";
import { supabaseService } from "../getSupabaseClient.ts";
import { BasketProduct, GAItem } from "lordis-react-components";
import { getCheckoutSessionItems } from "../checkoutSessionUtils.ts";
import { sendGA4Event } from "../ga.ts";

export default async function handleCheckoutSessionCompleted(
  event: Stripe.CheckoutSessionCompletedEvent,
) {
  const lineItems: BasketProduct[] = await getCheckoutSessionItems(
    event.data.object.id,
  );

  // await triggerGA4PurchaseEvent(event.data.object, lineItems);

  // Perform actions only in Production
  if (process.env.VITE_ENVIRONMENT == "PRODUCTION") {
    await updateStock(lineItems);
    await createRMOrder(event.data.object, lineItems);
  }

  console.log("ORDER PLACED");
}

async function updateStock(products: BasketProduct[]) {
  for (const p of products) {
    const { error } = await supabaseService
      .from("products")
      .update({ stock: Math.max(p.stock - p.basketQuantity, 0) })
      .eq("id", p.sku);
    if (error) {
      console.error(error);
    }
  }
}

/**
 * Creates an order on the Royal Mail Click & Drop API:
 * https://business.parcel.royalmail.com/
 * @param session The checkout session associated with the order.
 * @param prods The products with ordered quantities associated with the order.
 */
async function createRMOrder(
  session: Stripe.Checkout.Session,
  prods: BasketProduct[],
) {
  const royalMailKey = process.env.ROYAL_MAIL_KEY;
  if (!royalMailKey) throw new Error("No Royal Mail API Key Found");

  // Create RM Order
  let subtotal = 0;
  let orderWeight = 0;
  prods.forEach((p) => {
    subtotal += p.price;
    orderWeight += (p.weight as number) ?? 0;
  });
  const orderReference = session.id.slice(0, 40); // API max order ref length is 40
  const packageFormat = calculatePackageFormat(prods, orderWeight);
  const response = await fetch(
    "https://api.parcel.royalmail.com/api/v1/orders",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${royalMailKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          // There will only ever be one order submitted at a time through this.
          {
            // https://api.parcel.royalmail.com/#tag/Orders/operation/CreateOrdersAsync
            orderReference: orderReference,
            recipient: {
              address: {
                fullName: session.customer_details?.name,
                addressLine1: session.customer_details?.address?.line1,
                addressLine2: session.customer_details?.address?.line2,
                city: session.customer_details?.address?.city,
                postcode: session.customer_details?.address?.postal_code,
                countryCode: session.customer_details?.address?.country,
              },
              emailAddress: session.customer_details?.email,
              phoneNumber: session.customer_details?.phone,
            },
            packages: [
              {
                weightInGrams: orderWeight,
                packageFormatIdentifier: packageFormat,
                contents: prods.map((prod) => {
                  return {
                    name: prod.name,
                    SKU: prod.sku,
                    quantity: prod.quantity,
                    unitValue: prod.price / (prod.basketQuantity * 1.2), // Excluding tax for customs
                    unitWeightInGrams: prod.weight ?? 0, // Weight is nullable in database
                    customsDescription: prod.customs_description,
                    originCountryCode: prod.origin_country_code,
                    customsDeclarationCategory: "saleOfGoods",
                  };
                }),
              },
            ],
            orderDate: new Date().toISOString(),
            subtotal: subtotal,
            shippingCostCharged: session.shipping_cost?.amount_total,
            total: session.amount_total,
            orderTax: session.total_details?.amount_tax,
          },
        ],
      }),
    },
  );

  const respBody = JSON.parse(await new Response(response.body).text());
  if (respBody.errorsCount > 0) {
    throw new Error(respBody.failedOrders[0].errors);
  }
}

/**
 * Calculates what type of parcel to use, currently only small or medium
 * since these are seemingly the only options on RM Click & Drop.
 * @param prods The products in the order
 * @param weight The total weight of the order
 * @returns Either "mediumParcel" or "smallParcel"
 */
function calculatePackageFormat(prods: BasketProduct[], weight: number) {
  if (weight > 2000) {
    return "mediumParcel";
  }

  for (let i = 0; i < prods.length; i++) {
    // Check for overrides
    const item = prods[i];
    if (item.package_type_override == "mediumParcel") {
      return "mediumParcel";
    }
  }
  return "smallParcel";
}

/**
 * Triggers a GA4 purchase event for the completed checkout
 * @param session The checkout session associated with the order.
 * @param prods The products with ordered quantities associated with the order.
 */
async function triggerGA4PurchaseEvent(
  session: Stripe.Checkout.Session,
  prods: BasketProduct[],
) {
  // Extract client ID and session ID, use null if no client ID provided
  const client_id =
    session.metadata?.gaClientID === "" || !session.metadata?.gaClientID
      ? "dummyID"
      : session.metadata?.gaClientID;
  const session_id = Number(session.metadata!.gaSessionID);

  // Compile payload for GA4.
  const payload = {
    client_id,
    events: [
      {
        name: "purchase",
        params: {
          debug_mode: process.env.VITE_ENVIRONMENT === "DEVELOPMENT",
          session_id,
          transaction_id: session.id, // Stripe Checkout Session ID is the ID of an order/transaction.
          shipping: (session.total_details?.amount_shipping ?? 0) / 100,
          tax: (session.total_details?.amount_tax ?? 0) / 100,
          value:
            ((session.amount_total ?? 0) -
              (session.shipping_cost?.amount_total ?? 0)) /
            100,
          currency: session.currency,
          items: prods.map((p) => new GAItem(p)), // Map to GA4 item format
        },
      },
    ],
  };
  console.log(
    `Triggering PURCHASE event for transaction with value ${payload.events[0].params.currency}${payload.events[0].params.value}`,
  );
  if (!(await sendGA4Event(payload))) {
    throw new Error("Failed to trigger GA4 Purchase Event");
  }
}
