import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    username?: string;
    userId?: string;
  }
}

export interface AuthUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  username: string;
}
