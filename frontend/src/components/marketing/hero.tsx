import { ArrowRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[520px] w-[800px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute top-32 right-0 h-[300px] w-[400px] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,var(--background)_80%)]" />
      </div>

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 px-6 py-24 text-center sm:py-32">
        <Badge variant="secondary" className="gap-1.5 px-3 py-1">
          <Sparkles className="size-3" />
          AI-Powered Git Intelligence
        </Badge>

        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Turn git history into{" "}
            <span className="bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-cyan-400">
              engineering clarity
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty sm:text-xl">
            {siteConfig.description}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button size="lg" className="gap-2 px-6">
            Start 
            <ArrowRight className="size-4" />
          </Button>
          
        </div>

        <div className="w-full max-w-4xl">
          <div className="overflow-hidden rounded-xl border bg-card/50 shadow-2xl shadow-violet-500/10 ring-1 ring-foreground/10 backdrop-blur">
            <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
              <span className="size-3 rounded-full bg-red-400" />
              <span className="size-3 rounded-full bg-yellow-400" />
              <span className="size-3 rounded-full bg-green-400" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">
                git-analyzer dashboard
              </span>
            </div>
            <div className="grid gap-4 p-6 sm:grid-cols-3">
              <DashboardStat label="Commits analyzed" value="12,847" trend="+18% this month" />
              <DashboardStat label="PR risk flagged" value="3" trend="2 high, 1 medium" />
              <DashboardStat label="Stale branches" value="7" trend="Action recommended" />
            </div>
            <div className="border-t bg-muted/30 px-6 py-4">
              <p className="font-mono text-xs text-muted-foreground">
                <span className="text-violet-600 dark:text-violet-400">AI Insight:</span>{" "}
                Auth module has 62% of recent churn — consider splitting the service layer
                before the next release.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardStat({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="rounded-lg border bg-background/80 p-4 text-left">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-xs text-violet-600 dark:text-violet-400">{trend}</p>
    </div>
  );
}
