import { createClient } from "@supabase/supabase-js";

// Browser client. Used only for admin sign-in and to read the admin's own session.
// All data access goes through server functions, which verify the session.
export const supabase = createClient(
  import.meta.env["VITE_SUPABASE_URL"],
  import.meta.env["VITE_SUPABASE_ANON_KEY"],
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  },
);
