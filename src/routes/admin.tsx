import { createFileRoute, Link, Outlet, redirect, useNavigate, useRouterState } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { checkAdminAccess } from "@/lib/admin.functions";
import { supabase } from "@/lib/supabase/browser";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — NAS-PYW" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  // Client-side check for a smooth redirect only. Every data call is re-verified on the server.
  beforeLoad: async ({ location }) => {
    if (typeof window === "undefined") return;
    if (location.pathname.startsWith("/admin/login")) return;

    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      throw redirect({ to: "/admin/login" });
    }

    let isAdmin = true;
    try {
      await checkAdminAccess();
    } catch {
      isAdmin = false;
    }
    if (!isAdmin) {
      await supabase.auth.signOut();
      throw redirect({ to: "/admin/login" });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const isLoginPage = useRouterState({
    select: (state) => state.location.pathname.startsWith("/admin/login"),
  });

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  }

  return (
    <div className="min-h-screen bg-background">
      {!isLoginPage && (
        <header className="border-b border-border bg-card">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <Link to="/admin" className="font-display text-lg font-bold text-foreground">
              NAS-PYW Admin
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/" className="text-sm text-muted-foreground hover:text-brand">
                View site
              </Link>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                Sign out
              </Button>
            </div>
          </div>
        </header>
      )}
      <main className="mx-auto max-w-6xl px-5 py-8">
        <Outlet />
      </main>
    </div>
  );
}
