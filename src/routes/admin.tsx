import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { LayoutDashboard, LogOut, PanelLeftClose, PanelLeftOpen, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { checkAdminAccess } from "@/lib/admin.functions";
import { supabase } from "@/lib/supabase/browser";
import { cn } from "@/lib/utils";

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
  const isLoginPage = useRouterState({
    select: (state) => state.location.pathname.startsWith("/admin/login"),
  });

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-background">
        <Outlet />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AdminShell />
    </SidebarProvider>
  );
}

function AdminShell() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { state, toggleSidebar } = useSidebar();

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  }

  const navItems = [
    {
      to: "/admin" as const,
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
  ];

  return (
    <div className="flex min-h-svh w-full bg-muted/30">
      <Sidebar collapsible="icon" className="border-r border-sidebar-border/60">
        <SidebarHeader className="border-b border-sidebar-border/60 px-3 py-4">
          <Link to="/admin" className="flex items-center gap-3 overflow-hidden px-1">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm shadow-emerald-500/20">
              <Users className="h-4 w-4" />
            </div>
            <div className="min-w-0 transition-opacity group-data-[collapsible=icon]:opacity-0">
              <p className="truncate font-display text-sm font-bold tracking-tight text-sidebar-foreground">
                NAS-PYW
              </p>
              <p className="truncate text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/60">
                Admin Console
              </p>
            </div>
          </Link>
        </SidebarHeader>
        <SidebarContent className="px-2 py-3">
          <SidebarGroup>
            <SidebarGroupLabel>Overview</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.active}
                      tooltip={item.label}
                      className={cn(
                        "rounded-lg transition-all duration-200",
                        item.active &&
                          "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm",
                      )}
                    >
                      <Link to={item.to}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t border-sidebar-border/60 p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={state === "expanded" ? "Collapse sidebar" : "Expand sidebar"}
                onClick={toggleSidebar}
                className="rounded-lg text-sidebar-foreground/80"
              >
                {state === "expanded" ? (
                  <PanelLeftClose className="h-4 w-4" />
                ) : (
                  <PanelLeftOpen className="h-4 w-4" />
                )}
                <span>{state === "expanded" ? "Collapse" : "Expand"}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip="View site"
                className="rounded-lg text-sidebar-foreground/80"
              >
                <Link to="/">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>View site</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Sign out"
                onClick={handleSignOut}
                className="rounded-lg text-sidebar-foreground/80 hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset className="bg-transparent">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border/60 bg-background/70 px-4 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sm:px-6">
          <SidebarTrigger className="-ml-1 h-8 w-8 rounded-lg" />
          <div className="h-4 w-px bg-border/70" aria-hidden="true" />
          <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
            <p className="truncate text-sm font-medium text-muted-foreground">
              Registration Management
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="hidden rounded-full border-border/70 bg-background/60 px-4 text-xs font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:inline-flex"
            >
              <LogOut className="mr-1.5 h-3.5 w-3.5" />
              Sign out
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </div>
  );
}
