"use client";

// NOTE: Stripe CLI will time out the key after 90 days, so if things aren't working in
// local development, try `stripe login`!

// Also need to enable forwarding webhooks for local dev, use the following:
// stripe listen --forward-to localhost:8888/api/createOrder --events checkout.session.completed
// This is done automatically by launch-dev-server.ps1

import "./global.css";
import {checkStock, createCheckoutSession, redirectIfEmptyBasket, updateShippingOptions,} from "./lib.ts";
import React, {useContext, useEffect, useState} from "react";
import {EmbeddedCheckout, EmbeddedCheckoutProvider,} from "@stripe/react-stripe-js";
import {ToastContext} from "@/lib/context/toasts.tsx";
import {LocaleContext} from "@/lib/context/locale.tsx";
import {RemoteSettingsContext} from "@/lib/context/remoteSettings.tsx";
import {createClient} from "@/lib/supabase/client.ts";
import {stripePromise} from "@/lib/stripe/client.ts";

export default function Page() {
  // If the user has nothing in their basket, they should not
  // be on this page and will be redirected home
  useEffect(redirectIfEmptyBasket, []);

  const supabase = createClient()

  useEffect(() => {
    /**
     * Checks whether all the items in the basket are still in stock
     * @returns true if stock is OK, false if it is not.
     */
    async function checkProductStock() {
      const discrepancies = await checkStock(supabase);

      // If there were no discrepancies
      if (discrepancies.length === 0) {
        if (!canCheckout) setCanCheckout(true);
        return true;
      }

      let err =
        "Too slow! Part of your order is now out of stock, head back to the home page to change your order, " +
        "then come back:\n";
      discrepancies.forEach((discrep) => {
        err += `We have ${discrep.stock} \"${discrep.name}\" left, you tried to order ${discrep.basketQuantity}`;
      });
      toast({ msg: err });
      if (canCheckout) setCanCheckout(false);
      return false;
    }
    checkProductStock().then();
  }, []);

  const { toast } = useContext(ToastContext);
  const { currency } = useContext(LocaleContext);
  const [canCheckout, setCanCheckout] = useState<boolean>(false);
  const siteSettings = useContext(RemoteSettingsContext);

  // TODO: useEffect(() => {
  //   trackBeginCheckoutWithBasket(currency);
  // }, []);

  return (
      // id="checkout-content"
      // noindex={true}
      // canonical="https://thisshopissogay.com/checkout"
      // title={SITE_NAME + " - Checkout"}
      // TODO: loadCondition={canCheckout && !siteSettings.kill_switch?.enabled}
      // loadingText="We're loading your basket..."

      canCheckout && !siteSettings.kill_switch?.enabled && currency && !!toast ? (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{
            fetchClientSecret: () => {return createCheckoutSession(currency)},
            onShippingDetailsChange: async (e) => {
              console.log("Checkout Session Data:", JSON.stringify(e));
              const resp = await updateShippingOptions(
                e.checkoutSessionId,
                e.shippingDetails,
              );
              if (resp.ok) {
                return { type: "accept" };
              } else {
                return {
                  type: "reject",
                  errorMessage:
                    (await resp.text()) ||
                    "Something went wrong, please contact us for help!",
                };
              }
            },
          }}
        >
          <EmbeddedCheckout className={"embedded-checkout"} />
        </EmbeddedCheckoutProvider>
      ) : null
  );
}
