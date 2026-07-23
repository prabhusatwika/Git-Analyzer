import type { Account, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

/**
 * Persist the GitHub OAuth tokens in the encrypted JWT cookie.
 * The access token is never forwarded to the client session object.
 */
export async function jwtCallback({
  token,
  account,
  profile,
  user,
}: {
  token: JWT;
  account?: Account | null;
  profile?: Record<string, unknown>;
  user?: User;
}): Promise<JWT> {
  if (account) {
    token.accessToken = account.access_token;
    token.refreshToken = account.refresh_token;
    token.expiresAt = account.expires_at;
    token.userId = user?.id;
  }

  if (profile?.login) {
    token.username = profile.login as string;
  }

  return token;
}

/**
 * Shape the client-visible session. Excludes the GitHub access token.
 */
export async function sessionCallback({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}): Promise<Session> {
  if (session.user) {
    session.user.id = (token.userId ?? token.sub ?? "") as string;
    session.user.username = (token.username ?? session.user.name ?? "") as string;
  }

  return session;
}
