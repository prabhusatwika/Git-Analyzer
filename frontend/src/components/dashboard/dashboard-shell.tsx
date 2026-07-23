"use client";

import type { AuthUser } from "@/auth/types";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardTopNav } from "@/components/dashboard/dashboard-top-nav";

interface DashboardShellProps {
  user: AuthUser;
  children: React.ReactNode;
  title?: string;
  hasConnectedRepository?: boolean;
}

export function DashboardShell({
  user,
  children,
  title,
  hasConnectedRepository = false,
}: DashboardShellProps) {
  return (
    <div className="flex h-full min-h-screen">
      <DashboardSidebar
        user={user}
        hasConnectedRepository={hasConnectedRepository}
        className="hidden md:flex"
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopNav
          user={user}
          title={title}
          hasConnectedRepository={hasConnectedRepository}
        />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
