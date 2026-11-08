import { FolderGit2 } from "lucide-react";

import { ConnectedRepoCard } from "@/components/dashboard/connected-repo-card";
import { ConnectRepoButton } from "@/components/dashboard/connect-repo-button";
import { EmptyState } from "@/components/dashboard/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RECENT_REPOS_EMPTY_MESSAGE } from "@/lib/dashboard/constants";
import type { ConnectedRepository } from "@/lib/dashboard/types";

import type { AuthUser } from "@/auth/types";

interface RecentReposSectionProps {
  user: AuthUser;
  connectedRepository: ConnectedRepository | null;
}

export function RecentReposSection({
  user,
  connectedRepository,
}: RecentReposSectionProps) {
  const hasConnected = connectedRepository !== null;

  return (
    <Card id="repositories" className="scroll-mt-20 border-border/60">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">Repository</CardTitle>
        <ConnectRepoButton
  user={user}
  hasConnectedRepository={hasConnected}
  size="sm"
  variant="outline"
/>
      </CardHeader>
      <CardContent>
        {connectedRepository ? (
          <ConnectedRepoCard repository={connectedRepository} />
        ) : (
          <EmptyState
            icon={FolderGit2}
            title="No repository connected"
            description={RECENT_REPOS_EMPTY_MESSAGE}
            action={
  <ConnectRepoButton
    user={user}
    hasConnectedRepository={false}
    variant="outline"
  />
}
          />
        )}
      </CardContent>
    </Card>
  );
}
