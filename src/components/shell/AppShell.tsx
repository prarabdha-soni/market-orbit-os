import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  ArrowUpCircle,
  BarChart3,
  Bell,
  BookOpen,
  ChevronsUpDown,
  Home,
  LayoutGrid,
  Map,
  MessageSquare,
  Package,
  Rocket,
  Settings,
  Sparkles,
  Target,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActivityDrawer } from "@/components/shell/ActivityDrawer";
import { workspace } from "@/data/rocketloop";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/app", label: "Home", icon: Home, exact: true },
  { to: "/app/new-expansion", label: "New Expansion", icon: Rocket },
  { to: "/app/markets", label: "Markets", icon: Map },
  { to: "/app/opportunities", label: "Opportunities", icon: Target },
  { to: "/app/campaigns", label: "Campaigns", icon: MessageSquare },
  { to: "/app/orders", label: "Orders & Fulfillment", icon: Package },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/knowledge", label: "Knowledge Base", icon: BookOpen },
] as const;

const mobileNav = [
  { to: "/app", label: "Home", icon: Home, exact: true },
  { to: "/app/markets", label: "Markets", icon: Map },
  { to: "/app/opportunities", label: "Targets", icon: Target },
  { to: "/app/campaigns", label: "Outreach", icon: MessageSquare },
  { to: "/app/analytics", label: "Results", icon: BarChart3 },
] as const;

function SidebarBrand() {
  return (
    <Link to="/app" className="flex items-center gap-2.5 px-2 py-1">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary">
        <Rocket className="h-4 w-4 text-primary-foreground" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-nav-foreground">
          Rocket-Loop
        </span>
        <span className="block truncate text-[11px] text-nav-muted">AI Expansion Manager</span>
      </span>
    </Link>
  );
}

function SidebarContent() {
  return (
    <div className="flex h-full flex-col bg-nav">
      <div className="px-3 py-4">
        <SidebarBrand />
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: "exact" in item ? item.exact : false }}
            className="nav-item"
          >
            <item.icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{item.label}</span>
          </Link>
        ))}

        <div className="pt-3">
          <p className="px-2.5 pb-1 text-[10px] font-semibold tracking-[0.12em] text-nav-muted uppercase">
            Mission
          </p>
          <Link to="/app/plan" className="nav-item">
            <Sparkles className="h-4 w-4 shrink-0" />
            <span className="truncate">AI Expansion Plan</span>
          </Link>
          <Link to="/app/settings" className="nav-item">
            <Settings className="h-4 w-4 shrink-0" />
            <span className="truncate">Autonomy & Settings</span>
          </Link>
        </div>
      </nav>

      <div className="space-y-3 border-t border-nav-border p-3">
        <div className="rounded-lg border border-nav-border bg-[oklch(1_0_0/0.05)] p-3">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-nav-foreground">
            <ArrowUpCircle className="h-3.5 w-3.5" /> Upgrade
          </p>
          <p className="mt-1 text-[11px] leading-relaxed text-nav-muted">
            Scale your expansion to more states and channels.
          </p>
          <Link
            to="/app/settings"
            className="mt-2 inline-block text-[11px] font-medium text-primary-muted underline-offset-2 hover:underline"
          >
            Learn more
          </Link>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center gap-2.5 rounded-lg p-2 text-left transition-colors hover:bg-[oklch(1_0_0/0.06)]">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
              {workspace.user.initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-medium text-nav-foreground">
                {workspace.user.name}
              </span>
              <span className="block truncate text-[11px] text-nav-muted">
                {workspace.company}
              </span>
            </span>
            <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 text-nav-muted" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>{workspace.company}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/app/settings">Workspace settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/app/knowledge">Knowledge base</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/">Back to website</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

function TopBar({ onOpenActivity }: { onOpenActivity: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const current =
    navItems.find((i) => (i.to === "/app" ? pathname === "/app" : pathname.startsWith(i.to))) ??
    navItems[0];

  return (
    <header className="sticky top-0 z-30 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-surface/85 px-4 py-2.5 backdrop-blur-sm sm:px-6">
      <div className="flex min-w-0 items-center gap-2 text-sm">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-nav lg:hidden">
          <Rocket className="h-3.5 w-3.5 text-nav-foreground" />
        </span>
        <span className="truncate font-medium text-foreground">{current.label}</span>
        <span className="hidden text-muted-foreground sm:inline">/</span>
        <span className="hidden truncate text-muted-foreground sm:inline">
          Rajasthan Retail Expansion
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <span className="hidden items-center gap-1.5 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground md:inline-flex">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
          Data fresh · {workspace.dataAsOf}
        </span>
        <Button variant="ghost" size="sm" className="gap-1.5" onClick={onOpenActivity}>
          <Activity className="h-4 w-4" />
          <span className="hidden sm:inline">Activity</span>
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications" onClick={onOpenActivity}>
          <span className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-danger" />
          </span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger className="grid h-8 w-8 place-items-center rounded-full bg-nav text-[11px] font-semibold text-nav-foreground">
            {workspace.user.initials}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>{workspace.user.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/app/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/">Sign out of demo</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [activityOpen, setActivityOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] border-r border-nav-border lg:block">
        <SidebarContent />
      </aside>

      <div className="flex min-h-screen flex-col lg:pl-[248px]">
        <TopBar onOpenActivity={() => setActivityOpen(true)} />
        <main className="flex-1 px-4 pt-6 pb-24 sm:px-6 lg:pb-10">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-surface lg:hidden">
        {mobileNav.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: "exact" in item ? item.exact : false }}
            activeProps={{ className: "text-primary" }}
            inactiveProps={{ className: "text-muted-foreground" }}
            className="flex flex-col items-center gap-1 py-2 text-[10px] font-medium"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>

      <ActivityDrawer open={activityOpen} onOpenChange={setActivityOpen} />

      <Link
        to="/app/new-expansion"
        className="fixed right-4 bottom-20 z-40 grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-pop lg:hidden"
        aria-label="New expansion"
      >
        <LayoutGrid className="h-5 w-5" />
      </Link>
    </div>
  );
}
