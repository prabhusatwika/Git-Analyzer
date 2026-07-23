import type { AuthUser } from "@/auth/types";
import { backendFetch } from "@/lib/api/client";
import type { ConnectRepositoryPayload, ConnectedRepositoryRecord } from "@/lib/api/types";

export async function getConnectedRepository(
  user: AuthUser,
): Promise<ConnectedRepositoryRecord | null> {
  const result = await backendFetch<ConnectedRepositoryRecord | null>({
    method: "GET",
    path: "/repositories/connected",
    user,
  });
  return result;
}

export async function connectRepository(
  user: AuthUser,
  payload: ConnectRepositoryPayload,
): Promise<ConnectedRepositoryRecord> {
  return backendFetch<ConnectedRepositoryRecord>({
    method: "POST",
    path: "/repositories/connect",
    user,
    body: payload,
  });
}

export async function disconnectRepository(user: AuthUser): Promise<void> {
  await backendFetch<void>({
    method: "DELETE",
    path: "/repositories/disconnect",
    user,
  });
}

/** Map backend record to dashboard ConnectedRepository shape. */
export function toDashboardRepository(record: ConnectedRepositoryRecord) {
  const [owner] = record.full_name.split("/");
  return {
    id: record.id,
    name: record.name,
    fullName: record.full_name,
    owner: owner ?? "",
    description: record.description,
    language: record.language,
    stars: record.stars,
    forks: record.forks,
    defaultBranch: record.default_branch,
    updatedAt: record.updated_at_github ?? record.connected_at,
    isPrivate: record.is_private,
    htmlUrl: record.html_url,
    connectedAt: record.connected_at,
  };
}

export type DashboardConnectedRepository = ReturnType<typeof toDashboardRepository>;
