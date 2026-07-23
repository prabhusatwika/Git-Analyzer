/** Dashboard types for repository connection. */

export interface ConnectedRepository {
  id: string;
  name: string;
  fullName: string;
  owner: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  defaultBranch: string;
  updatedAt: string;
  isPrivate: boolean;
  htmlUrl: string;
  connectedAt?: string;
}

export interface RepositoryStats {
  commitsAnalyzed: number | null;
  pullRequests: number | null;
  activeBranches: number | null;
}

export interface ActivityEvent {
  id: string;
  type: "commit" | "pull_request" | "branch" | "analysis";
  title: string;
  description: string;
  repository: string;
  timestamp: string;
}

export interface DashboardData {
  connectedRepository: ConnectedRepository | null;
  stats: RepositoryStats;
  recentActivity: ActivityEvent[];
  hasConnectedRepository: boolean;
}

export const EMPTY_DASHBOARD_DATA: DashboardData = {
  connectedRepository: null,
  stats: {
    commitsAnalyzed: null,
    pullRequests: null,
    activeBranches: null,
  },
  recentActivity: [],
  hasConnectedRepository: false,
};

export function buildDashboardData(
  connectedRepository: ConnectedRepository | null,
): DashboardData {
  return {
    connectedRepository,
    stats: {
      commitsAnalyzed: null,
      pullRequests: null,
      activeBranches: null,
    },
    recentActivity: [],
    hasConnectedRepository: connectedRepository !== null,
  };
}
