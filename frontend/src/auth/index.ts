import NextAuth from "next-auth";

import { authConfig } from "@/auth/config";
import "@/auth/types";

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
