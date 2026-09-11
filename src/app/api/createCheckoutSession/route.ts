import {NextRequest, NextResponse} from "next/server";
import {Basket, SHIPPING_COUNTRIES} from "@/lib";
import {stripe} from "@/lib/stripe/server.ts";

interface Body {
    stripe_line_items: Array<Object>; // TODO: What `Object` is this?
    basket: Basket;
    origin: string;
    gaClientID: string | null;
    gaSessionID: string | null;
    currency: string;
}

export async function POST(request: NextRequest) {
    const body: Body = (await request.json()) as Body;

    const session = await stripe.checkout.sessions.create({
        ui_mode: "embedded_page",
        line_items: body.stripe_line_items,
        mode: "payment",
        return_url: body.origin + "/thankyou?session_id={CHECKOUT_SESSION_ID}",
        metadata: {
            gaClientID: body.gaClientID,
            gaSessionID: body.gaSessionID,
        },
        permissions: {
            update_shipping_details: "server_only",
        },
        shipping_address_collection: {
            allowed_countries: SHIPPING_COUNTRIES as any[],
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: "Calculated at next step",
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: 0,
                        currency: "GBP",
                    },
                },
            },
        ],
        automatic_tax: { enabled: true },
    });
    console.log("Checkout session: ", session);

    return new NextResponse(JSON.stringify(session), {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    })
}