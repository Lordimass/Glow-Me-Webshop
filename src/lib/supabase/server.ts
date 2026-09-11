"use server";

import {createServerClient} from "@supabase/ssr";
import {cookies} from "next/headers";
import {createClient as createSupabaseClient, SupabaseClient, type User} from "@supabase/supabase-js";
import type {IToast} from "@/lib/types/toasts.ts";

export async function createClient() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_DATABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    }
                    catch {
                        // If it's running in a Server Component, just ignore
                    }
                },
            },
        }
    );
}

export async function createServiceRoleClient() {
    return createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_DATABASE_URL!,
        process.env.SUPABASE_SECRET_KEY!,
        {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false,
            },
        }
    );
}

export async function getUser(supabase: SupabaseClient) {
    const {data: {user}, error: getUserError} = await supabase.auth.getUser();
    if (getUserError && getUserError.name === "AuthSessionMissingError") return null;
    else if (getUserError) throw getUserError;
    return user;
}

export interface Profile {
    id: string;
    name?: string;
    role: string;
}
export async function getUserProfile(supabase: SupabaseClient): Promise<Profile | null> {
    const user: User | null = await getUser(supabase);
    if (!user) return null;
    const {data, error} = await supabase.from("profiles")
        .select("*")
        .eq("id", user.id)
    ;
    if (error) throw error;
    return data.length > 0 ? data[0] : null;
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
}

export async function getMfaUser(supabase: SupabaseClient) {
    const {data: {session}, error: getSessionError} = await supabase.auth.getSession();
    if (getSessionError || !session) return null;

    const {data: assurance, error: assuranceError} = await supabase.auth.mfa
        .getAuthenticatorAssuranceLevel(session.access_token);
    if (assuranceError || assurance.currentLevel !== "aal2") return null;

    return getUser(supabase);
}

/**
 * @param supabase The Supabase client to call the function with.
 * Safe call of {@link SupabaseClient.rpc} with the option to notify users when something goes wrong. It's recommended
 * that you wrap this function with other functions for each Postgres function you want to call, e.g. a `getProducts`
 * function which wraps `callRPC("get_products", {})`, and returns [`ProductData[]`]{@link ProductData} for type safety.
 * @param functionName The name of the Postgres function to call.
 * @param params Any parameters for the function.
 * @param toast A method with which to notify the user if something goes wrong.
 */
export async function callRPC(
    supabase: SupabaseClient,
    functionName: string,
    params?: { [key: string]: any },
    toast?: (toast: IToast | string) => void,
): Promise<any> {
    // Check that the client exists
    if (!supabase) {
        console.error("`supabase` was not defined.");
        if (toast) {
            toast(
                `An error occurred while calling the "${functionName}" function because the Supabase client was not defined"`,
            );
        }
        return undefined;
    }

    // Call the function and handle any errors
    const { data, error } = await supabase.rpc(functionName, params);
    if (error) {
        console.error(`Error calling RPC function "${functionName}":`, error);
        if (toast)
            toast(
                `An error occurred while calling the "${functionName}" function. Please try again later.`,
            );
        return Promise.reject(error);
    } else {
        return data;
    }
}