import GitHub from "next-auth/providers/github";
import type { Provider } from "next-auth/providers";

export function getAuthProviders(): Provider[] {
  const clientId = process.env.AUTH_GITHUB_ID;
  const clientSecret = process.env.AUTH_GITHUB_SECRET;

  if (!clientId || !clientSecret) {
    return [];
  }

  return [
    GitHub({
      clientId,
      clientSecret,
      authorization: {
        params: {
          scope: "read:user user:email repo",
        },
      },
    }),
  ];
}
