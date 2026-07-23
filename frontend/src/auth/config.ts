import type { NextAuthConfig } from "next-auth";

import { jwtCallback, sessionCallback } from "@/auth/callbacks";
import { getAuthProviders } from "@/auth/providers";
import { AUTH_ROUTES } from "@/lib/auth/constants";

export const authConfig: NextAuthConfig = {
  providers: getAuthProviders(),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: AUTH_ROUTES.login,
  },
  callbacks: {
    jwt: jwtCallback,
    session: sessionCallback,
    authorized: ({ auth, request }) => {
      const { pathname } = request.nextUrl;
      const isAuthenticated = !!auth?.user;
      const isProtectedRoute = pathname.startsWith(AUTH_ROUTES.dashboard);
      const isLoginRoute = pathname === AUTH_ROUTES.login;

      if (isProtectedRoute && !isAuthenticated) {
        return false;
      }

      if (isLoginRoute && isAuthenticated) {
        return Response.redirect(new URL(AUTH_ROUTES.dashboard, request.nextUrl));
      }

      return true;
    },
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
};
