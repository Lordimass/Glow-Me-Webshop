import type { Context } from "@netlify/functions";
import { stripe } from "../lib/stripe.ts";
import Stripe from "stripe";
import handleCheckoutSessionCompleted from "../lib/stripeEndpoints/checkout.session.completed.ts";
// import { handleRefundCreated } from "../lib/stripeEndpoints/refund.created.ts";
import { NetworkError } from "lordis-react-components";

/**
 * Endpoint for Stripe webhooks. Authenticates requests and forwards the request
 * to the function it needs to be at
 */
export default async function handler(request: Request, _context: Context) {
  try {
    if (!stripe) {
      return new Response("Stripe object didn't initialise", { status: 500 });
    }

    // Extract signature and pick secret to authenticate with
    const endpointSecret = process.env.STRIPE_HOOK_SECRET;
    if (!endpointSecret)
      return new Response("No Stripe endpoint secret set", {
        status: 401,
      });
    const sig = request.headers.get("stripe-signature");
    if (!sig)
      return new Response("No `stripe-signature` header received", {
        status: 401,
      });

    // Extract body
    const bodyString = await request.text();
    const body: Stripe.Event = JSON.parse(bodyString);

    // Authenticate Request
    try {
      stripe.webhooks.constructEvent(bodyString, sig, endpointSecret);
    } catch (err) {
      console.error("Failed to verify webhook signature: ", err);
      return new Response("Failed to verify webhook signature", {
        status: 401,
      });
    }

    // Check event type and handle accordingly
    const type = body.type;
    console.log(`Received Stripe Webhook of type ${type}`);
    switch (type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(body);
        break;
      case "refund.created":
        // await handleRefundCreated(body);
        break;
      default:
        console.warn(`Event '${type}'did not map to a function`);
        break;
    }
    return new Response(undefined, { status: 200 });
  } catch (e) {
    if (e instanceof AggregateError) {
      console.error(e.message);
      if (e.errors.length > 0) {
        for (let error of e.errors) {
          console.error(error);
        }
      }
      e = e.errors[0];
    }
    if (e instanceof NetworkError) {
      return new Response(e.responseBody, { status: e.status });
    }
    throw e;
  }
}
