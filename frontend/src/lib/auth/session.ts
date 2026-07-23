import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

import { auth } from "@/auth";
import type { AuthUser } from "@/auth/types";
import { AUTH_ROUTES } from "@/lib/auth/constants";
import { redirect } from "next/navigation";

/** Retrieve the current session from the server. Returns null if unauthenticated. */
export async function getCurrentSession() {
  return auth();
}

/** Retrieve the current authenticated user. Returns null if unauthenticated. */
export async function getCurrentUser(): Promise<AuthUser | null> {
  const session = await auth();
  if (!session?.user) return null;

  return {
    id: session.user.id,
    name: session.user.name ?? null,
    email: session.user.email ?? null,
    image: session.user.image ?? null,
    username: session.user.username,
  };
}

/**
 * Require authentication in a Server Component or Route Handler.
 * Redirects to /login if the user is not authenticated.
 */
export async function requireAuth(): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect(AUTH_ROUTES.login);
  }
  return user;
}

/**
 * Retrieve the GitHub access token from the encrypted JWT.
 * Only callable server-side — never expose to the client.
 */
export async function getGitHubAccessToken(): Promise<string | undefined> {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return undefined;

  const cookieStore = await cookies();
  const token = await getToken({
    req: {
      headers: {
        cookie: cookieStore.toString(),
      },
    },
    secret,
  });

  return token?.accessToken;
}

/** Check whether the current request has a valid session. */
export async function isAuthenticated(): Promise<boolean> {
  const session = await auth();
  return !!session?.user;
}
