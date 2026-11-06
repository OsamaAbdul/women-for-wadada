import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

import { supabase } from "@/lib/supabase/browser";
import { getServiceClient } from "@/lib/supabase/server";

// Every admin server function runs this. Admin status is decided on the server:
//   1. The bearer token must be a valid Supabase session (verified by Supabase Auth).
//   2. That user's id must exist in public.admin_users (checked with the service role).
// Nothing in the JWT, user_metadata, or request body is trusted for the role.
export const adminAuthMiddleware = createMiddleware({ type: "function" })
  .client(async ({ next }) => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return next({
      headers: token ? { authorization: `Bearer ${token}` } : {},
    });
  })
  .server(async ({ next }) => {
    const header = getRequestHeader("authorization") ?? "";
    const token = header.startsWith("Bearer ") ? header.slice("Bearer ".length).trim() : "";
    if (!token) {
      throw new Error("Not authorized");
    }

    const db = getServiceClient();

    const { data: userData, error: userError } = await db.auth.getUser(token);
    if (userError || !userData.user) {
      throw new Error("Not authorized");
    }

    const { data: adminRow, error: adminError } = await db
      .from("admin_users")
      .select("user_id")
      .eq("user_id", userData.user.id)
      .maybeSingle();
    if (adminError || !adminRow) {
      throw new Error("Not authorized");
    }

    return next({ context: { adminUserId: userData.user.id } });
  });
