import { FolderGit2 } from "lucide-react";

import { ConnectedRepoCard } from "@/components/dashboard/connected-repo-card";
import { ConnectRepoButton } from "@/components/dashboard/connect-repo-button";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RECENT_REPOS_EMPTY_MESSAGE } from "@/lib/dashboard/constants";
import type { ConnectedRepository } from "@/lib/dashboard/types";

interface RecentReposSectionProps {
  connectedRepository: ConnectedRepository | null;
}

export function RecentReposSection({
  connectedRepository,
}: RecentReposSectionProps) {
  return (
    <Card className="scroll-mt-20 overflow-hidden rounded-2xl border border-[#DEDCD1] bg-[#FFFEFA] shadow-sm">
      <CardHeader className="border-b border-[#EEECE3] px-6 py-5">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#E8EADF]">
            <FolderGit2 className="size-[18px] text-[#52634D]" />
          </span>

          <div>
            <CardTitle className="text-base font-semibold text-[#303A32]">
              Repository
            </CardTitle>
            <p className="mt-0.5 text-xs text-[#85877D]">
              Your connected GitHub repository
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 sm:p-6">
        {connectedRepository ? (
          <ConnectedRepoCard repository={connectedRepository} />
        ) : (
          <EmptyState
            icon={FolderGit2}
            title="No repository connected"
            description={RECENT_REPOS_EMPTY_MESSAGE}
            action={<ConnectRepoButton variant="outline" />}
          />
        )}
      </CardContent>
    </Card>
  );
}