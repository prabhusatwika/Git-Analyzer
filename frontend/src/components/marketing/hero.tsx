
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  GitPullRequest,
  GitCommitHorizontal,
  GitBranch,
  Activity,
  ShieldCheck,
} from "lucide-react";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F5F3EC]">

      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[#DDE5D2]/60 blur-[110px]" />
        <div className="absolute right-[-100px] top-48 h-[350px] w-[350px] rounded-full bg-[#E6E9D2]/50 blur-[100px]" />
        <div className="absolute bottom-0 left-[-100px] h-[300px] w-[300px] rounded-full bg-[#E7E3D8]/70 blur-[100px]" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-14 px-6 pb-24 pt-20 text-center sm:pt-28 lg:px-10">

        {/* Badge */}
        <Badge
          variant="outline"
          className="gap-2 rounded-full border-[#C9D2BD] bg-[#EDF0E5] px-4 py-2 text-xs font-medium tracking-wide text-[#52634D]"
        >
          <Sparkles className="size-3.5" />
          INTELLIGENCE FOR ENGINEERING TEAMS
        </Badge>

        {/* Main heading */}
        <div className="max-w-4xl space-y-7">

          <h1 className="text-5xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#303A32] text-balance sm:text-6xl lg:text-[76px]">
            Your code tells a story.
            <br />
            <span className="font-serif font-medium italic text-[#718566]">
              Understand every bit.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-8 text-[#777B72] sm:text-lg">
            {siteConfig.description}
          </p>
        </div>

        {/* CTA */}
        <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">

          <Button
            size="lg"
            className="h-12 gap-3 rounded-xl bg-[#52634D] px-7 text-sm font-semibold text-white shadow-lg shadow-[#52634D]/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#3F503B] hover:shadow-xl"
            render={<Link href="/login" />}
          >
            Explore Git-Analyzer
            <ArrowRight className="size-4" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="h-12 gap-2 rounded-xl border-[#D8D7CB] bg-[#FFFEFA]/80 px-7 text-sm font-medium text-[#52634D] transition-all hover:border-[#A3B18A] hover:bg-[#EDF0E5]"
            render={<Link href="#features" />}
          >
            Discover features
            <ArrowUpRight className="size-4" />
          </Button>

        </div>

        {/* Trust statement */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-[#85887D]">
          <span className="flex items-center gap-2">
            <ShieldCheck className="size-4 text-[#718566]" />
            Repository intelligence
          </span>
          <span className="hidden size-1 rounded-full bg-[#A3B18A] sm:block" />
          <span className="flex items-center gap-2">
            <Activity className="size-4 text-[#718566]" />
            Actionable insights
          </span>
          <span className="hidden size-1 rounded-full bg-[#A3B18A] sm:block" />
          <span className="flex items-center gap-2">
            <GitBranch className="size-4 text-[#718566]" />
            GitHub integration
          </span>
        </div>

        {/* Dashboard preview */}
        <div className="w-full max-w-5xl pt-4">

          <div className="overflow-hidden rounded-2xl border border-[#DADBD0] bg-[#FFFEFA] text-left shadow-[0_30px_90px_-35px_rgba(65,82,61,0.25)]">

            {/* Window bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E7E5DC] bg-[#F9F8F3] px-5 py-4 sm:px-7">

              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-[#D5A49B]" />
                  <span className="size-2.5 rounded-full bg-[#D7C58A]" />
                  <span className="size-2.5 rounded-full bg-[#A3B18A]" />
                </div>

                <span className="font-mono text-xs text-[#85887D]">
                  git-analyzer / overview
                </span>
              </div>

              <Badge
                variant="outline"
                className="border-[#D5DEC9] bg-[#EDF1E7] text-[10px] text-[#52634D]"
              >
                <span className="mr-1.5 size-1.5 rounded-full bg-[#718566]" />
                LIVE PREVIEW
              </Badge>
            </div>

            {/* Dashboard content */}
            <div className="space-y-6 p-5 sm:p-8">

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#999B90]">
                    Repository overview
                  </p>
                  <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#303A32]">
                    Engineering at a glance
                  </h2>
                </div>

                <span className="rounded-lg border border-[#E7E5DC] bg-[#F9F8F3] px-3 py-2 text-xs text-[#777B72]">
                  Sample dashboard
                </span>
              </div>

              {/* Metrics */}
              <div className="grid gap-4 sm:grid-cols-3">
                <DashboardStat
                  icon={GitCommitHorizontal}
                  label="Commits analyzed"
                  value="12,847"
                  trend="+18% this month"
                />

                <DashboardStat
                  icon={GitPullRequest}
                  label="PR risks flagged"
                  value="03"
                  trend="2 high · 1 medium"
                />

                <DashboardStat
                  icon={GitBranch}
                  label="Stale branches"
                  value="07"
                  trend="Action recommended"
                />
              </div>

              {/* Insight panel */}
              <div className="flex flex-col gap-4 rounded-xl border border-[#DCE3D1] bg-[#F0F2E8] p-5 sm:flex-row sm:items-center">

                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#DCE6CF] text-[#52634D]">
                  <Sparkles className="size-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#718566]">
                    AI-powered repository insight
                  </p>

                  <p className="text-sm leading-6 text-[#52634D]">
                    Auth module has 62% of recent churn. Consider reviewing
                    the service layer before your next release.
                  </p>
                </div>

                <span className="w-fit shrink-0 rounded-full bg-[#DDE7C8] px-3 py-1 text-[10px] font-semibold text-[#52634D]">
                  INSIGHT
                </span>

              </div>

            </div>
          </div>

          <p className="mt-5 text-center text-xs tracking-wide text-[#999B90]">
            A clearer view of your engineering workflow.
          </p>

        </div>
      </div>
    </section>
  );
}

function DashboardStat({
  icon: Icon,
  label,
  value,
  trend,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="group rounded-xl border border-[#E7E5DC] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#A3B18A] hover:shadow-lg hover:shadow-[#52634D]/5">

      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-[#85887D]">
          {label}
        </p>

        <span className="flex size-8 items-center justify-center rounded-lg bg-[#EDF0E5] text-[#718566]">
          <Icon className="size-4" />
        </span>
      </div>

      <p className="mt-4 text-3xl font-semibold tracking-tight text-[#303A32]">
        {value}
      </p>

      <p className="mt-2 text-xs font-medium text-[#718566]">
        {trend}
      </p>

    </div>
  );
}
