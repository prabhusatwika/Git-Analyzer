import { GitHubApiError } from "@/lib/github/types";

const GITHUB_API_BASE = "https://api.github.com";

interface GitHubRequestOptions {
  accessToken: string;
  path: string;
  searchParams?: Record<string, string | number | undefined>;
}

export async function githubFetch<T>({
  accessToken,
  path,
  searchParams,
}: GitHubRequestOptions): Promise<T> {
  const url = new URL(`${GITHUB_API_BASE}${path}`);

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    let message = `GitHub API error (${response.status})`;
    try {
      const body = (await response.json()) as { message?: string };
      if (body.message) message = body.message;
    } catch {
      // ignore parse errors
    }

    throw new GitHubApiError(message, response.status);
  }

  return response.json() as Promise<T>;
}

export function parseLinkHeader(linkHeader: string | null): {
  hasNext: boolean;
  hasPrev: boolean;
} {
  if (!linkHeader) return { hasNext: false, hasPrev: false };

  return {
    hasNext: linkHeader.includes('rel="next"'),
    hasPrev: linkHeader.includes('rel="prev"'),
  };
}
