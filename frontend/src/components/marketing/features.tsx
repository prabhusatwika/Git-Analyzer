
import {
  GitBranch,
  GitCommitHorizontal,
  GitPullRequest,
  MessageSquareText,
  Rocket,
  Users,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { features } from "@/lib/constants";

const iconMap: Record<string, LucideIcon> = {
  GitCommitHorizontal,
  GitPullRequest,
  Users,
  GitBranch,
  Rocket,
  MessageSquareText,
};

export function Features() {
  return (
    <section
      id="features"
      className="border-t border-[#E4E1D7] bg-[#EFEEE6] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-7xl space-y-16 px-6 lg:px-10">

        <SectionHeading
          badge="WHAT YOU GET"
          title="Everything happening in your repository. Finally, in focus."
          description="Understand commit patterns, spot pull request risks and discover how your team works — all from one intelligent workspace."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] ?? GitBranch;

            return (
              <Card
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-[#DEDCD1] bg-[#FFFEFA] shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-[#A3B18A] hover:shadow-xl hover:shadow-[#52634D]/5"
              >
                <CardHeader className="p-7 pb-3">

                  <div className="flex items-start justify-between">

                    <div className="flex size-12 items-center justify-center rounded-xl border border-[#DDE4D4] bg-[#EDF0E5] text-[#52634D] transition-all duration-300 group-hover:bg-[#52634D] group-hover:text-white">
                      <Icon className="size-5" />
                    </div>

                    <span className="font-mono text-xs text-[#B0B0A3]">
                      0{index + 1}
                    </span>

                  </div>

                  <CardTitle className="pt-5 text-lg font-semibold tracking-tight text-[#303A32]">
                    {feature.title}
                  </CardTitle>

                </CardHeader>

                <CardContent className="flex items-end justify-between gap-3 px-7 pb-7">

                  <p className="text-sm leading-7 text-[#777B72]">
                    {feature.description}
                  </p>

                  <ArrowUpRight className="mb-1 size-4 shrink-0 text-[#A3B18A] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#52634D]" />

                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-medium text-[#85887D]">
          <span className="size-2 rounded-full bg-[#A3B18A]" />
          Built for clearer engineering decisions
        </div>

      </div>
    </section>
  );
}
