import { LoginButton } from "@/components/auth/login-button";
import { siteConfig } from "@/lib/constants";
import { isAuthConfigured } from "@/lib/env.server";

export default function LoginPage() {
  const configured = isAuthConfigured();

  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-6 py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-violet-500/15 blur-3xl" />
      </div>

      <div className="w-full max-w-sm space-y-8 text-center">
        <div className="space-y-2">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-violet-600 text-lg font-semibold text-white">
            GA
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign in to {siteConfig.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            Connect your GitHub account to analyze repositories and track engineering
            insights.
          </p>
        </div>

        {configured ? (
          <LoginButton />
        ) : (
          <div className="rounded-lg border border-dashed p-4 text-left text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Auth not configured</p>
            <p className="mt-1">
              Copy <code className="text-xs">.env.example</code> to{" "}
              <code className="text-xs">.env.local</code> and set your GitHub OAuth
              credentials.
            </p>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          By signing in, you agree to grant read access to your GitHub profile and
          repositories.
        </p>
      </div>
    </div>
  );
}
