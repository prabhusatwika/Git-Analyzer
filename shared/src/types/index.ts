/** Shared API response envelope used across frontend and backend contracts. */
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
}

/** Standard health check response shape. */
export interface HealthCheckResponse {
  status: "ok" | "degraded" | "down";
}

/** Application environment identifiers. */
export type Environment = "development" | "staging" | "production";
