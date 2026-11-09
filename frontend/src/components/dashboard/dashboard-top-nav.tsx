
"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

import type { AuthUser } from "@/auth/types";
import { UserNav } from "@/components/auth/user-nav";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/constants";
import { ConnectRepoButton } from "@/components/dashboard/connect-repo-button";

interface DashboardTopNavProps {
  user: AuthUser;
  title?: string;
  hasConnectedRepository?: boolean;
}

export function DashboardTopNav({
  user,
  title = "Overview",
  hasConnectedRepository = false,
}: DashboardTopNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-[76px] shrink-0 items-center justify-between gap-4 border-b border-[#DEDCD1] bg-[#F4F2E9]/95 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="border-[#DEDCD1] bg-[#FFFEFA] text-[#52634D] hover:bg-[#E8E8DC] hover:text-[#303A32] md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="size-4" />
          </Button>

          <div className="space-y-0.5">
            <h1 className="text-lg font-semibold tracking-tight text-[#303A32]">
              {title}
            </h1>
            <p className="hidden text-xs text-[#85877D] sm:block">
              {siteConfig.tagline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ConnectRepoButton
  user={user}
  hasConnectedRepository={hasConnectedRepository}
  size="sm"
  className="hidden sm:inline-flex"
/>
          <div className="md:hidden">
            <UserNav user={user} />
          </div>
        </div>
      </header>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="w-64 border-[#DEDCD1] bg-[#F4F2E9] p-0"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>

          <DashboardSidebar
            user={user}
            hasConnectedRepository={hasConnectedRepository}
            onNavigate={() => setMobileOpen(false)}
            className="border-0"
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
