"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { AuthUser } from "@/auth/types";
import { UserNav } from "@/components/auth/user-nav";
import { DASHBOARD_NAV_ITEMS } from "@/lib/dashboard/constants";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  user: AuthUser;
  hasConnectedRepository?: boolean;
  onNavigate?: () => void;
  className?: string;
}

export function DashboardSidebar({
  user,
  hasConnectedRepository = false,
  onNavigate,
  className,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col border-r bg-sidebar text-sidebar-foreground",
        className,
      )}
    >
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold tracking-tight"
          onClick={onNavigate}
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-violet-600 text-sm text-white">
            GA
          </span>
          <span className="truncate">{siteConfig.name}</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {DASHBOARD_NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href.split("#")[0]);
          const isDisabled =
            item.disabled || (item.label === "AI Chat" && !hasConnectedRepository);

          const Icon = item.icon;

          if (isDisabled) {
            return (
              <span
                key={item.label}
                className="flex cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground opacity-60"
                title={
                  item.label === "AI Chat"
                    ? "Connect a repository to enable AI Chat"
                    : "Coming soon"
                }
              >
                <Icon className="size-4 shrink-0" />
                {item.label}
              </span>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive
                  ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                  : "text-muted-foreground",
              )}
            >
              <Icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-3">
        <UserNav user={user} />
      </div>
    </aside>
  );
}

export function DashboardSidebarNav({
  hasConnectedRepository,
  onNavigate,
}: {
  hasConnectedRepository?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {DASHBOARD_NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isDisabled =
          item.disabled || (item.label === "AI Chat" && !hasConnectedRepository);

        if (isDisabled) {
          return (
            <span
              key={item.label}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground opacity-60"
            >
              <Icon className="size-4" />
              {item.label}
            </span>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted",
              pathname === item.href ? "bg-muted font-medium" : "text-muted-foreground",
            )}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
