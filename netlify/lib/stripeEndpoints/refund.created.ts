import Stripe from "stripe";
import { getCheckoutSessionItems } from "../checkoutSessionUtils.ts";
import { stripe } from "../stripe.ts";
import { sendGA4Event } from "../ga.ts";
import { type BasketProduct, GAItem } from "lordis-react-components";

/**
 * Triggers a GA4 event for a refund.
 * @param event - The Stripe event object.
 */
export async function handleRefundCreated(event: Stripe.RefundCreatedEvent) {
  // Extract refund from event.
  const refund: Stripe.Refund = event.data.object;

  // Find the associated checkout session
  const checkoutSessionResponse = await stripe.checkout.sessions.list({
    payment_intent: (refund.payment_intent as string) ?? undefined,
    limit: 1,
  });
  const session: Stripe.Checkout.Session | undefined =
    checkoutSessionResponse.data[0];
  if (!session) {
    throw new Error("No checkout session found for refund: " + refund.id);
  }

  // Get the associated LineItems and Products compounded together.
  const lineItems: BasketProduct[] = await getCheckoutSessionItems(session.id);

  // Extract client ID and session ID
  const client_id = session.metadata?.gaClientID;
  const session_id = Number(session.metadata!.gaSessionID);

  const payload = {
    client_id: client_id,
    events: [
      {
        name: "refund",
        params: {
          debug_mode: process.env.VITE_ENVIRONMENT === "DEVELOPMENT",
          session_id: session_id,
          transaction_id: session.id,
          value:
            ((session.amount_total ?? 0) -
              (session.shipping_cost?.amount_total ?? 0)) /
            100,
          tax: (session.total_details?.amount_tax ?? 0) / 100,
          shipping: (session.total_details?.amount_shipping ?? 0) / 100,
          currency: refund.currency,
          items: lineItems.map((p) => new GAItem(p)),
        },
      },
    ],
  };
  console.log(
    `Triggering REFUND event for transaction with value ${payload.events[0].params.currency} ${payload.events[0].params.value}`,
  );
  await sendGA4Event(payload);
}
