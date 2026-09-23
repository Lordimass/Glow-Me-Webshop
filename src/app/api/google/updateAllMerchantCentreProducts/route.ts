import {type NextRequest, NextResponse} from "next/server";
import {createClient} from "@/lib/supabase/server.ts";
import {getProducts} from "@/lib/functions/supabaseRPC.ts";
import {authenticateSupabaseLink, GOOGLE_ACCOUNT_ID, GOOGLE_SOURCE_ID} from "@/lib/server/google/auth.ts";
import {ProductData} from "@/lib";

export async function GET(request: NextRequest) {
    const gToken = await authenticateSupabaseLink(request)
    const supabase = await createClient()
    const prods = await getProducts(supabase)

    if (!(typeof gToken === "string")) return gToken;

    const errors = []

    // Get list of existing products and archive any that don't exist anymore
    let nextPageToken: string | null | undefined = null;
    while (nextPageToken !== undefined) {
        const resp = await fetchExistingProducts(gToken, nextPageToken);
        if (!resp.ok) return new NextResponse(JSON.stringify(await resp.text()), {status: 500});
        const body = await resp.json();
        nextPageToken = body.nextPageToken;
        for (let gProd of body.products) {
            let found = prods.some(supaProd => supaProd.sku.toString(10).startsWith(gProd.offerId));
            if (!found) {
                console.log(`Deleting product ${gProd.offerId}`)
                const resp = await deleteExistingProduct(gToken, gProd.name)
                if (!resp.ok) errors.push(await resp.text());
            }
        }
    }

    // Update and insert products
    for (let prod of prods) {
        const resp = await addProductToMerchantCentre(gToken, prod)
        if (!resp.ok) errors.push(await resp.text())
    }

    if (errors.length > 0) return new NextResponse(JSON.stringify(errors), {status: 500})
    else return new NextResponse(undefined, {status: 204})
}

async function deleteExistingProduct(gToken: string, name: string) {
    return await fetch(
        `https://merchantapi.googleapis.com/products/v1/${name.replace("/products/", "/productInputs/")}?dataSource=accounts/${GOOGLE_ACCOUNT_ID}/dataSources/${GOOGLE_SOURCE_ID}`,
        {
            method: 'DELETE',
            headers: {Authorization: `Bearer ${gToken}`}
        }
    )
}

async function fetchExistingProducts(gToken: string, pageToken: string | null | undefined) {
    return await fetch(
        `https://merchantapi.googleapis.com/products/v1/accounts/${GOOGLE_ACCOUNT_ID}/products`
            + (pageToken !== null && pageToken !== undefined ? `?pageToken=${pageToken}` : ""),
        {
            method: "GET",
            headers: {Authorization: `Bearer ${gToken}`}
        }
    )
}

async function addProductToMerchantCentre(gToken: string, prod: ProductData) {
    return await fetch(
        `https://merchantapi.googleapis.com/products/v1/accounts/${GOOGLE_ACCOUNT_ID}/productInputs:insert?dataSource=accounts/${GOOGLE_ACCOUNT_ID}/dataSources/${GOOGLE_SOURCE_ID}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${gToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "offerId": prod.sku,
                "contentLanguage": "en",
                "feedLabel": "GB",
                "productAttributes": {
                    "title": prod.name,
                    "description": prod.description,
                    "link": "https://thisshopissogay.com/glow/products/" + prod.sku,
                    "imageLink": prod.images[0]?.uri,
                    "additionalImageLinks": prod.images.length > 1 ? prod.images.slice(1).map(img => img.uri) : undefined,
                    "productTypes": undefined, // TODO: See docs on this https://developers.google.com/merchant/api/reference/rest/products_v1/ProductAttributes
                    "productWeight": prod.metadata.weight ?? undefined,
                    "availability": prod.stock >= 0 ? "IN_STOCK" : "OUT_OF_STOCK",
                    "itemGroupId": prod.groupName,
                    "itemGroupTitle": prod.groupName,
                    "price": {
                        "amountMicros": prod.price * (10 ** 6),
                        "currencyCode": "GBP"
                    },
                    "condition": "NEW",
                    // TODO: "gtins": ["9780007350896", "93433295494587"]
                }
            }),
        },
    );
}