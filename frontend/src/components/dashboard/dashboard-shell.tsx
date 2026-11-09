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
    <div className="flex min-h-screen bg-[#F4F2E9]">
      <DashboardSidebar
        user={user}
        hasConnectedRepository={hasConnectedRepository}
        className="hidden shrink-0 md:flex"
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopNav
          user={user}
          title={title}
          hasConnectedRepository={hasConnectedRepository}
        />

        <div className="min-w-0 flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}