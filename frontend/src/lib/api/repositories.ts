import type { AuthUser } from "@/auth/types";
import { backendFetch } from "@/lib/api/client";
import type { ConnectRepositoryPayload } from "@/lib/api/types";

export interface AnalyzeRepositoryResponse {
  repository: {
    github_id: number;
    name: string;
    full_name: string;
    owner: string;
    description: string | null;
    language: string | null;
    stars: number;
    forks: number;
    open_issues: number;
    default_branch: string;
    visibility: string;
    clone_url: string;
    html_url: string;
  };
  local_path: string;
}

export async function connectRepository(
  user: AuthUser,
  payload: ConnectRepositoryPayload,
): Promise<AnalyzeRepositoryResponse> {
  return backendFetch<AnalyzeRepositoryResponse>({
    method: "POST",
    path: "/repositories/public",
    user,
    body: payload,
  });
}