import { requireAuth } from "@/lib/auth/session";
import { backendFetch } from "@/lib/api/client";
import {
  buildDashboardData,
  type ConnectedRepository,
} from "@/lib/dashboard/types";

interface CurrentRepositoryResponse {
  github_id: number;
  name: string;
  full_name: string;
  owner: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  default_branch: string;
  visibility: string;
  html_url: string;
}

export async function getDashboardData() {
  const user = await requireAuth();

  try {
    const repo = await backendFetch<CurrentRepositoryResponse>({
      method: "GET",
      path: "/repositories/current",
      user,
    });

    if (!repo) {
      return buildDashboardData(null);
    }

    const connectedRepository: ConnectedRepository = {
      id: String(repo.github_id),
      name: repo.name,
      fullName: repo.full_name,
      owner: repo.owner,
      description: repo.description,
      language: repo.language,
      stars: repo.stars,
      forks: repo.forks,
      defaultBranch: repo.default_branch,
      updatedAt: "",
      isPrivate: repo.visibility === "private",
      htmlUrl: repo.html_url,
      connectedAt: new Date().toISOString(),
    };

    return buildDashboardData(connectedRepository);
  } catch (error) {
    console.error("Failed to load current repository:", error);
    return buildDashboardData(null);
  }
}