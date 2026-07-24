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

  const url = `${baseUrl}/api/v1${path}`;

  console.log("========== BACKEND REQUEST ==========");
  console.log("URL:", url);
  console.log("Method:", method);
  console.log("Headers:", headers);
  console.log("Body:", body);
  console.log("=====================================");

  let response: Response;

  try {
    response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch (err) {
    console.error("FETCH FAILED");
    console.error(err);
    throw err;
  }

  console.log("Status:", response.status);

  if (response.status === 204) {
    return undefined as T;
  }

  if (!response.ok) {
    let message = `Backend API error (${response.status})`;

    try {
      const errorBody = (await response.json()) as { detail?: string };

      console.error("Backend Error:", errorBody);

      if (errorBody.detail) {
        message = errorBody.detail;
      }
    } catch (e) {
      console.error("Failed to parse error body:", e);
    }

    throw new BackendApiError(message, response.status);
  }

  if (
    response.status === 204 ||
    response.headers.get("content-length") === "0"
  ) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}