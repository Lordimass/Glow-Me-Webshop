import type {NextRequest} from "next/server";

export function POST(request: NextRequest) {
    const key = process.env.SUPABASE_TABLE_CHANGE_WEBHOOK_KEY

    // Have this receive a product data object rather than raw table rows, this needs to be done by supabase
    // Update on merchant centre
}