import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { NetworkError } from "lordis-react-components";
import { configDotenv } from "dotenv";

const dotenvConfigOutput = configDotenv({ path: ".env.secret" });
const SUPABASE_SERVICE_ROLE_KEY =
  dotenvConfigOutput.parsed?.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAnon = await getSupabaseClient();
export const supabaseService = await getSupabaseClient(undefined, true);

/**
 * Initialises a Supabase Client object.
 * @param authHeader The JWT token for the request, not required, will not be used if serviceRole = true
 * @param serviceRole
 * @returns
 */
export default async function getSupabaseClient(
  authHeader?: string,
  serviceRole?: boolean,
): Promise<SupabaseClient> {
  // Grab URL and Key from Netlify Env Variables.
  const supabaseUrl = process.env.SUPABASE_DATABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  const supabaseServiceKey = SUPABASE_SERVICE_ROLE_KEY;
  if (
    !supabaseUrl ||
    (!supabaseKey && !serviceRole) ||
    (!supabaseServiceKey && serviceRole)
  ) {
    throw new NetworkError("Supabase credentials not set", 403);
  }

  let supabase: SupabaseClient | undefined;

  if (serviceRole) {
    supabase = createClient(supabaseUrl, supabaseServiceKey!);
  } else if (authHeader) {
    supabase = createClient(supabaseUrl, supabaseKey!, {
      global: { headers: { Authorization: authHeader } },
    });
  } else {
    supabase = createClient(supabaseUrl, supabaseKey!);
  }

  return supabase;
}

/**
 * Verifies a Supabase user's JWT (access token) and returns the user permissions.
 * Throws an error if the token is invalid or missing.
 */
export async function getSupabaseUserPermissions(
  request: Request,
): Promise<string[]> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader) throw new Error("Missing Authorization header");

  const token = authHeader.split(" ")[1];
  if (!token) throw { message: "Missing access token", status: 401 };

  const { data, error } = await supabaseService.auth.getUser(token);
  if (error || !data.user)
    throw { message: "Invalid or expired token", status: 403 };

  return data.user.app_metadata.permissions;
}
