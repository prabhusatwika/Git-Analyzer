/** GitHub REST API response shapes used by repository services. */

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  private: boolean;
  default_branch: string;
  html_url: string;
  updated_at: string;
  owner: {
    login: string;
  };
}

export interface GitHubRepositoriesResponse {
  repositories: GitHubRepository[];
  page: number;
  perPage: number;
  hasNextPage: boolean;
  totalCount?: number;
}

export interface FetchRepositoriesParams {
  page?: number;
  perPage?: number;
  search?: string;
  username: string;
}

export class GitHubApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string,
  ) {
    super(message);
    this.name = "GitHubApiError";
  }
}
