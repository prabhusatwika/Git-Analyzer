
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

function useCurrentHash() {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);

    updateHash();

    window.addEventListener("hashchange", updateHash);
    window.addEventListener("popstate", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
      window.removeEventListener("popstate", updateHash);
    };
  }, []);

  return hash;
}

function isNavItemActive(
  href: string,
  pathname: string,
  hash: string,
) {
  const [path, section] = href.split("#");

  if (pathname !== path) {
    return false;
  }

  if (section) {
    return hash === `#${section}`;
  }

  return !hash;
}

export function DashboardSidebar({
  user,
  hasConnectedRepository = false,
  onNavigate,
  className,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const hash = useCurrentHash();

  return (
    <aside
      className={cn(
        "flex h-full w-64 shrink-0 flex-col border-r border-[#DEDCD1] bg-[#F4F2E9] text-[#303A32]",
        className,
      )}
    >
      <div className="flex h-20 items-center border-b border-[#DEDCD1] px-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-3"
          onClick={onNavigate}
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#52634D] text-sm font-bold tracking-tight text-white shadow-sm">
            GA
          </span>
          <span className="truncate text-base font-semibold tracking-tight text-[#303A32]">
            {siteConfig.name}
          </span>
        </Link>
      </div>

      <div className="px-5 pb-2 pt-8">
        <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#92958A]">
          Workspace
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-2">
        {DASHBOARD_NAV_ITEMS.map((item) => {
          const isActive = isNavItemActive(item.href, pathname, hash);

          const isDisabled =
            item.disabled ||
            (item.label === "AI Chat" && !hasConnectedRepository);

          const Icon = item.icon;

          if (isDisabled) {
            return (
              <span
                key={item.label}
                className="flex cursor-not-allowed items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#A5A69C] opacity-70"
                title={
                  item.label === "AI Chat"
                    ? "Connect a repository to enable AI Chat"
                    : "Coming soon"
                }
              >
                <Icon className="size-[18px] shrink-0" />
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
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-all duration-200",
                isActive
                  ? "bg-[#52634D] font-medium text-white shadow-sm"
                  : "text-[#777B72] hover:bg-[#E8E8DC] hover:text-[#303A32]",
              )}
            >
              <Icon className="size-[18px] shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[#DEDCD1] p-4">
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
  const hash = useCurrentHash();

  return (
    <nav className="space-y-1">
      {DASHBOARD_NAV_ITEMS.map((item) => {
        const Icon = item.icon;

        const isDisabled =
          item.disabled ||
          (item.label === "AI Chat" && !hasConnectedRepository);

        const isActive = isNavItemActive(item.href, pathname, hash);

        if (isDisabled) {
          return (
            <span
              key={item.label}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#A5A69C] opacity-70"
            >
              <Icon className="size-[18px]" />
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
              "flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors",
              isActive
                ? "bg-[#52634D] font-medium text-white"
                : "text-[#777B72] hover:bg-[#E8E8DC] hover:text-[#303A32]",
            )}
          >
            <Icon className="size-[18px]" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
