import type { LucideIcon } from "lucide-react";
import {
  GitBranch,
  GitCommitHorizontal,
  GitPullRequest,
  LayoutDashboard,
  MessageSquareText,
  Settings,
} from "lucide-react";

export interface DashboardNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
}

export const DASHBOARD_NAV_ITEMS: DashboardNavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Repositories", href: "/dashboard#repositories", icon: GitBranch },
  {
  label: "AI Chat",
  href: "/dashboard/ai-chat",
  icon: MessageSquareText,
},
  { label: "Settings", href: "/dashboard#settings", icon: Settings, disabled: true },
];

export interface StatDefinition {
  id: string;
  label: string;
  icon: LucideIcon;
  emptyValue: string;
  emptyHint: string;
}

export const REPO_STAT_DEFINITIONS: StatDefinition[] = [
  {
    id: "commits",
    label: "Commits analyzed",
    icon: GitCommitHorizontal,
    emptyValue: "—",
    emptyHint: "Connect a repository to begin",
  },
  {
    id: "pull-requests",
    label: "Pull requests",
    icon: GitPullRequest,
    emptyValue: "—",
    emptyHint: "Connect a repository to begin",
  },
  {
    id: "branches",
    label: "Active branches",
    icon: GitBranch,
    emptyValue: "—",
    emptyHint: "Connect a repository to begin",
  },
];

export const AI_CHAT_DISABLED_MESSAGE =
  "Connect a GitHub repository to unlock AI-powered analysis and chat.";

export const RECENT_ACTIVITY_EMPTY_MESSAGE =
  "Commit events, pull request updates, and branch changes will appear here once a repository is connected.";

export const RECENT_REPOS_EMPTY_MESSAGE =
  "No repositories connected yet. Link a GitHub repo to start analyzing commit history and pull requests.";
