"use server";

import { revalidatePath } from "next/cache";

import { getGitHubAccessToken, requireAuth } from "@/lib/auth/session";
import {
  connectRepository
} from "@/lib/api/repositories";
import type { ConnectRepositoryPayload } from "@/lib/api/types";
import {
  fetchUserRepositories,
  toDisplayRepository,
} from "@/lib/github/repositories";
import { GitHubApiError } from "@/lib/github/types";
import { BackendApiError } from "@/lib/api/types";

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };


export async function fetchGitHubRepositoriesAction(params: {
  page?: number;
  search?: string;
}): Promise<
  ActionResult<{
    repositories: ReturnType<typeof toDisplayRepository>[];
    page: number;
    hasNextPage: boolean;
    totalCount?: number;
  }>
> {
  try {
    const user = await requireAuth();
    const accessToken = await getGitHubAccessToken();

    if (!accessToken) {
      return {
        success: false,
        error: "GitHub access token not found. Please sign out and sign in again.",
      };
    }

    const result = await fetchUserRepositories(accessToken, {
      page: params.page ?? 1,
      perPage: 10,
      search: params.search,
      username: user.username,
    });

    return {
      success: true,
      data: {
        repositories: result.repositories.map(toDisplayRepository),
        page: result.page,
        hasNextPage: result.hasNextPage,
        totalCount: result.totalCount,
      },
    };
  } catch (error) {
    if (error instanceof GitHubApiError) {
      if (error.statusCode === 401) {
        return {
          success: false,
          error: "GitHub token expired. Please sign out and sign in again.",
        };
      }
      if (error.statusCode === 403) {
        return {
          success: false,
          error: "GitHub API rate limit exceeded. Please try again later.",
        };
      }
      return { success: false, error: error.message };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch repositories.",
    };
  }
}

export async function connectRepositoryAction(
  payload: ConnectRepositoryPayload,
): Promise<ActionResult<Awaited<ReturnType<typeof connectRepository>>>> {
  try {
    const user = await requireAuth();

    const result = await connectRepository(user, payload);

    revalidatePath("/dashboard");

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    if (error instanceof BackendApiError) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to analyze repository.",
    };
  }
}




