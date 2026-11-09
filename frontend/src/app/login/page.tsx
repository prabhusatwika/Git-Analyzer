
import { LoginButton } from "@/components/auth/login-button";
import { siteConfig } from "@/lib/constants";
import { isAuthConfigured } from "@/lib/env.server";
import { GitBranch, ShieldCheck, Sparkles } from "lucide-react";

export default function LoginPage() {
  const configured = isAuthConfigured();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F4F2E9] px-6 py-16">

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[550px] w-[750px] -translate-x-1/2 rounded-full bg-[#A3B18A]/20 blur-[110px]" />
        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-[#D8DCCB]/40 blur-[100px]" />
      </div>

      {/* Login content */}
      <div className="relative w-full max-w-md">

        <div className="rounded-3xl border border-[#DEDCD1] bg-[#FFFEFA]/90 p-8 shadow-xl shadow-[#52634D]/5 backdrop-blur-xl sm:p-10">

          {/* Brand */}
          <div className="mb-9 flex flex-col items-center gap-4">

            <div className="flex size-14 items-center justify-center rounded-2xl bg-[#52634D] text-xl font-semibold tracking-tight text-white shadow-lg shadow-[#52634D]/20">
              GA
            </div>

            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-[#303A32]">
                Welcome to {siteConfig.name}
              </h1>

              <p className="text-sm leading-6 text-[#777B72]">
                Your repository insights, all in one place.
                Connect GitHub to understand your engineering activity.
              </p>
            </div>

          </div>

          {/* Small feature highlights */}
          <div className="mb-8 grid grid-cols-2 gap-3">

            <div className="flex items-center gap-2 rounded-xl border border-[#E5E5D9] bg-[#F4F2E9]/70 p-3">
              <GitBranch className="size-4 shrink-0 text-[#52634D]" />
              <span className="text-xs font-medium text-[#596451]">
                Repository insights
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-[#E5E5D9] bg-[#F4F2E9]/70 p-3">
              <Sparkles className="size-4 shrink-0 text-[#52634D]" />
              <span className="text-xs font-medium text-[#596451]">
                AI-powered analysis
              </span>
            </div>

          </div>

          {/* Authentication */}
          {configured ? (
            <LoginButton />
          ) : (
            <div className="rounded-xl border border-dashed border-[#C8CDBD] bg-[#F4F2E9] p-5 text-left text-sm">

              <p className="font-semibold text-[#303A32]">
                Authentication not configured
              </p>

              <p className="mt-2 leading-6 text-[#777B72]">
                Copy <code className="rounded bg-[#E8E9DF] px-1 py-0.5 text-xs">.env.example</code> to{" "}
                <code className="rounded bg-[#E8E9DF] px-1 py-0.5 text-xs">.env.local</code>{" "}
                and configure your GitHub OAuth credentials.
              </p>

            </div>
          )}

          {/* Security note */}
          <div className="mt-8 flex items-start justify-center gap-2 border-t border-[#E5E5D9] pt-6">

            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#718267]" />

            <p className="max-w-xs text-center text-xs leading-5 text-[#85887D]">
              Secure GitHub authentication. By signing in, you agree to grant
              access to your GitHub profile and repositories.
            </p>

          </div>

        </div>

        <p className="mt-6 text-center text-xs tracking-wide text-[#92958A]">
          BUILT FOR TEAMS WHO CARE ABOUT CODE QUALITY
        </p>

      </div>
    </main>
  );
}
