"use server";

import { signIn, signOut } from "@/auth";
import { AUTH_ROUTES } from "@/lib/auth/constants";

/** Initiate GitHub OAuth sign-in and redirect to the dashboard on success. */
export async function signInWithGitHub() {
  await signIn("github", { redirectTo: AUTH_ROUTES.dashboard });
}

/** Sign the user out and redirect to the landing page. */
export async function signOutUser() {
  await signOut({ redirectTo: "/" });
}
