import type { AuthUser } from "@/auth/types";
import { BackendApiError } from "@/lib/api/types";

function getBackendConfig() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
  const apiSecret = process.env.BACKEND_API_SECRET ?? "";
  return { baseUrl, apiSecret };
}

interface BackendRequestOptions {
  method: "GET" | "POST" | "DELETE";
  path: string;
  user: AuthUser;
  body?: unknown;
}

export async function backendFetch<T>({
  method,
  path,
  user,
  body,
}: BackendRequestOptions): Promise<T> {
  const { baseUrl, apiSecret } = getBackendConfig();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-GitHub-User-Id": user.id,
    "X-GitHub-Username": user.username,
  };

  if (user.email) {
    headers["X-GitHub-Email"] = user.email;
  }

  if (apiSecret) {
    headers.Authorization = `Bearer ${apiSecret}`;
  }

  const response = await fetch(`${baseUrl}/api/v1${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  if (response.status === 204) {
    return undefined as T;
  }

  if (!response.ok) {
    let message = `Backend API error (${response.status})`;
    try {
      const errorBody = (await response.json()) as { detail?: string };
      if (errorBody.detail) message = errorBody.detail;
    } catch {
      // ignore
    }
    throw new BackendApiError(message, response.status);
  }

  if (response.status === 204 || response.headers.get("content-length") === "0") {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
