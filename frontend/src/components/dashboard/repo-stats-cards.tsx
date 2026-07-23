import { REPO_STAT_DEFINITIONS } from "@/lib/dashboard/constants";
import type { RepositoryStats } from "@/lib/dashboard/types";
import { StatCard } from "@/components/dashboard/stat-card";

interface RepoStatsCardsProps {
  stats: RepositoryStats;
  hasConnectedRepository: boolean;
}

function formatStatValue(value: number | null, emptyValue: string): string {
  if (value === null) return emptyValue;
  return value.toLocaleString();
}

export function RepoStatsCards({ stats, hasConnectedRepository }: RepoStatsCardsProps) {
  const statValues: Record<string, number | null> = {
    commits: stats.commitsAnalyzed,
    "pull-requests": stats.pullRequests,
    branches: stats.activeBranches,
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {REPO_STAT_DEFINITIONS.map((def) => (
        <StatCard
          key={def.id}
          icon={def.icon}
          label={def.label}
          value={formatStatValue(statValues[def.id], def.emptyValue)}
          hint={hasConnectedRepository ? undefined : def.emptyHint}
        />
      ))}
    </div>
  );
}
