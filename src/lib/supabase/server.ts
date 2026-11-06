import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Server-only. The service role key bypasses RLS, so it must only be used
// inside server function handlers, never imported by a browser component.
let serviceClient: SupabaseClient | undefined;

export function getServiceClient(): SupabaseClient {
  if (!serviceClient) {
    const url = process.env["VITE_SUPABASE_URL"];
    const key = process.env["SUPABASE_SERVICE_ROLE_KEY"];
    if (!url || !key) {
      throw new Error("Supabase is not configured on the server");
    }
    serviceClient = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return serviceClient;
}

export const REGISTRATION_BUCKET = "registration-files";
