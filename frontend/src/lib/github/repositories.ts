import { githubFetch, parseLinkHeader } from "@/lib/github/client";
import type {
  FetchRepositoriesParams,
  GitHubRepositoriesResponse,
  GitHubRepository,
} from "@/lib/github/types";

const DEFAULT_PER_PAGE = 10;

interface GitHubSearchResponse {
  total_count: number;
  items: GitHubRepository[];
}

/**
 * Fetch repositories for the authenticated user.
 * Uses GitHub Search API when a query is provided, otherwise lists /user/repos.
 */
export async function fetchUserRepositories(
  accessToken: string,
  params: FetchRepositoriesParams,
): Promise<GitHubRepositoriesResponse> {
  const page = params.page ?? 1;
  const perPage = params.perPage ?? DEFAULT_PER_PAGE;
  const search = params.search?.trim();

  if (search) {
    return searchUserRepositories(accessToken, {
      username: params.username,
      search,
      page,
      perPage,
    });
  }

  const url = new URL("https://api.github.com/user/repos");
  url.searchParams.set("sort", "updated");
  url.searchParams.set("direction", "desc");
  url.searchParams.set("per_page", String(perPage));
  url.searchParams.set("page", String(page));

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(
      (body as { message?: string }).message ?? `GitHub API error (${response.status})`,
    );
  }

  const repositories = (await response.json()) as GitHubRepository[];
  const { hasNext } = parseLinkHeader(response.headers.get("Link"));

  return {
    repositories,
    page,
    perPage,
    hasNextPage: hasNext,
  };
}

async function searchUserRepositories(
  accessToken: string,
  params: { username: string; search: string; page: number; perPage: number },
): Promise<GitHubRepositoriesResponse> {
  const query = `user:${params.username} ${params.search} in:name,description`;

  const data = await githubFetch<GitHubSearchResponse>({
    accessToken,
    path: "/search/repositories",
    searchParams: {
      q: query,
      sort: "updated",
      order: "desc",
      per_page: params.perPage,
      page: params.page,
    },
  });

  const totalPages = Math.ceil(data.total_count / params.perPage);

  return {
    repositories: data.items,
    page: params.page,
    perPage: params.perPage,
    hasNextPage: params.page < totalPages,
    totalCount: data.total_count,
  };
}

/** Map a GitHub API repository to the payload expected by our backend. */
export function toConnectPayload(repo: GitHubRepository) {
  return {
    github_repo_id: repo.id,
    name: repo.name,
    full_name: repo.full_name,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    is_private: repo.private,
    default_branch: repo.default_branch,
    html_url: repo.html_url,
    updated_at_github: repo.updated_at,
  };
}

/** Map a GitHub repository to dashboard display shape. */
export function toDisplayRepository(repo: GitHubRepository) {
  return {
    id: String(repo.id),
    name: repo.name,
    fullName: repo.full_name,
    owner: repo.owner.login,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    isPrivate: repo.private,
    defaultBranch: repo.default_branch,
    htmlUrl: repo.html_url,
    updatedAt: repo.updated_at,
  };
}

export type GitHubDisplayRepository = ReturnType<typeof toDisplayRepository>;
