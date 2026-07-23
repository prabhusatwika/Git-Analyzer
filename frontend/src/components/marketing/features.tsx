import {
  GitBranch,
  GitCommitHorizontal,
  GitPullRequest,
  MessageSquareText,
  Rocket,
  Users,
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
    <section id="features" className="border-t bg-muted/30 py-24">
      <div className="mx-auto max-w-6xl space-y-16 px-6">
        <SectionHeading
          badge="Features"
          title="Everything you need to understand your repository"
          description="From commit patterns to PR risk, Git-Analyzer gives your team a complete picture of how code actually moves."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <Card
                key={feature.title}
                className="border-border/60 bg-background/80 transition-shadow hover:shadow-lg hover:shadow-violet-500/5"
              >
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
