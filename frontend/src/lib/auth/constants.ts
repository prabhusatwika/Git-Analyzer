export const AUTH_ROUTES = {
  login: "/login",
  dashboard: "/dashboard",
  api: "/api/auth",
} as const;

export const PUBLIC_ROUTES = ["/", "/login"] as const;

export const PROTECTED_ROUTE_PREFIX = AUTH_ROUTES.dashboard;
