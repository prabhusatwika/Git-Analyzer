import { ConnectRepoButton } from "@/components/dashboard/connect-repo-button";
import { AiChatSection } from "@/components/dashboard/ai-chat-section";
import { RecentActivitySection } from "@/components/dashboard/recent-activity-section";
import { RecentReposSection } from "@/components/dashboard/recent-repos-section";
import { RepoStatsCards } from "@/components/dashboard/repo-stats-cards";
import { UserProfileCard } from "@/components/dashboard/user-profile-card";
import { requireAuth } from "@/lib/auth/session";
import { getDashboardData } from "@/lib/dashboard/data";

export default async function DashboardPage() {
  const user = await requireAuth();
  const data = await getDashboardData();

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Welcome back, {user.name ?? user.username}
          </h2>

          <p className="text-sm text-muted-foreground">
            {data.hasConnectedRepository
              ? `Analyzing ${data.connectedRepository?.fullName}. Review stats and activity below.`
              : "Connect a GitHub repository to unlock analysis, statistics, and AI chat."}
          </p>
        </div>

        <ConnectRepoButton
          className="w-full sm:w-auto"
          user={user}
          hasConnectedRepository={data.hasConnectedRepository}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <RepoStatsCards
            stats={data.stats}
            hasConnectedRepository={data.hasConnectedRepository}
          />

          <RecentReposSection
            user={user}
            connectedRepository={data.connectedRepository}
          />

          <AiChatSection
            enabled={data.hasConnectedRepository}
            user={user}
            repositoryName={data.connectedRepository?.name ?? ""}
          />
        </div>

        <div className="space-y-6">
          <UserProfileCard user={user} />

          <RecentActivitySection
            activity={data.recentActivity}
          />
        </div>
      </div>
    </div>
  );
}