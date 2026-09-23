import {GoogleAuth} from "google-auth-library";
import {type NextRequest, NextResponse} from "next/server";
import {timingSafeEqual} from "node:crypto";

export const GOOGLE_ACCOUNT_ID = "5661341766"
export const GOOGLE_SOURCE_ID = "10732540549"

export default function getAuth() {
    return new GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        },
        scopes: [
            "https://www.googleapis.com/auth/content",
        ],
    });
}

export async function authenticateSupabaseLink(request: NextRequest) {
    const trueKey = process.env.SUPABASE_TABLE_CHANGE_WEBHOOK_KEY
    const givenKey = request.headers.get("x-api-key")
    if (!givenKey || !trueKey) return new NextResponse(
        "Missing x-api-key from request header or app failed to find key to compare to.", {status: 403})

    if (!timingSafeEqual(Buffer.from(trueKey), Buffer.from(givenKey))) return new NextResponse(null, {status: 403})

    const gAuth = getAuth()
    const gClient = await gAuth.getClient();
    const {token: gToken} = await gClient.getAccessToken();

    return gToken ?? undefined;
}