
import { ConnectRepoButton } from "@/components/dashboard/connect-repo-button";
import { AiChatSection } from "@/components/dashboard/ai-chat-section";
import { RecentActivitySection } from "@/components/dashboard/recent-activity-section";
import { RecentReposSection } from "@/components/dashboard/recent-repos-section";
import { RepoStatsCards } from "@/components/dashboard/repo-stats-cards";
import { UserProfileCard } from "@/components/dashboard/user-profile-card";
import { getDashboardData } from "@/lib/dashboard/data";
import { requireAuth } from "@/lib/auth/session";

export default async function DashboardPage() {
  const user = await requireAuth();
  const data = await getDashboardData();

  return (
    <main className="min-h-full bg-[#F4F2E9]">
      <div className="mx-auto max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">
        {/* Welcome section */}
        <section
          id="overview"
          className="scroll-mt-24 flex flex-col gap-5 rounded-2xl border border-[#DEDCD1] bg-[#FFFEFA] p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#78866D]">
              Your workspace
            </p>

            <h2 className="text-2xl font-semibold tracking-tight text-[#303A32] sm:text-3xl">
              Welcome back, {user.name ?? user.username}
            </h2>

            <p className="max-w-2xl text-sm leading-6 text-[#777B72]">
              {data.hasConnectedRepository
                ? `Analyzing ${data.connectedRepository?.fullName}. Review your repository insights and activity below.`
                : "Connect a GitHub repository to unlock code analysis, repository statistics, and AI-powered chat."}
            </p>
          </div>

          <ConnectRepoButton
            className="w-full shrink-0 sm:w-auto"
            disabled={data.hasConnectedRepository}
          />
        </section>

        {/* Dashboard content */}
        <div className="grid gap-6 xl:grid-cols-3">
          <div className="min-w-0 space-y-6 xl:col-span-2">
            <div id="repositories" className="scroll-mt-24">
              <RepoStatsCards
                stats={data.stats}
                hasConnectedRepository={data.hasConnectedRepository}
              />

              <div className="mt-6">
                <RecentReposSection
                  connectedRepository={data.connectedRepository}
                />
              </div>
            </div>

            <div id="ai-chat" className="scroll-mt-24">
              <AiChatSection enabled={data.hasConnectedRepository} />
            </div>
          </div>

          <div className="min-w-0 space-y-6">
            <UserProfileCard user={user} />

            <RecentActivitySection activity={data.recentActivity} />
          </div>
        </div>
      </div>
    </main>
  );
}
