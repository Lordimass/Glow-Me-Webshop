"use client";

import {loadStripe, type Stripe} from "@stripe/stripe-js";

const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY;
if (!STRIPE_KEY) console.error("No NEXT_PUBLIC_STRIPE_KEY!");

export const stripePromise: Promise<Stripe | null> = STRIPE_KEY
    ? loadStripe(STRIPE_KEY, {
        betas: ["custom_checkout_server_updates_1"],
    })
    : new Promise(() => {});