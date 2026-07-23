/**
 * Server-only environment variables for authentication.
 * Never import this module in client components.
 */

interface ServerEnv {
  AUTH_SECRET: string;
  AUTH_GITHUB_ID: string;
  AUTH_GITHUB_SECRET: string;
  AUTH_URL?: string;
}

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}. See frontend/.env.example for setup.`,
    );
  }
  return value;
}

let cachedEnv: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (cachedEnv) return cachedEnv;

  cachedEnv = {
    AUTH_SECRET: requireEnv("AUTH_SECRET"),
    AUTH_GITHUB_ID: requireEnv("AUTH_GITHUB_ID"),
    AUTH_GITHUB_SECRET: requireEnv("AUTH_GITHUB_SECRET"),
    AUTH_URL: process.env.AUTH_URL,
  };

  return cachedEnv;
}

/**
 * Lazily validates auth env vars — safe to call during build
 * when env vars may not yet be present.
 */
export function isAuthConfigured(): boolean {
  return Boolean(
    process.env.AUTH_SECRET &&
      process.env.AUTH_GITHUB_ID &&
      process.env.AUTH_GITHUB_SECRET,
  );
}
