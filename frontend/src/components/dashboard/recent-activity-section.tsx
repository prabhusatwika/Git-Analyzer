import { Activity } from "lucide-react";

import { EmptyState } from "@/components/dashboard/empty-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RECENT_ACTIVITY_EMPTY_MESSAGE } from "@/lib/dashboard/constants";
import type { ActivityEvent } from "@/lib/dashboard/types";

interface RecentActivitySectionProps {
  activity: ActivityEvent[];
}

const ACTIVITY_LABELS: Record<ActivityEvent["type"], string> = {
  commit: "Commit",
  pull_request: "Pull Request",
  branch: "Branch",
  analysis: "Analysis",
};

export function RecentActivitySection({ activity }: RecentActivitySectionProps) {
  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Recent activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activity.length === 0 ? (
          <EmptyState
            icon={Activity}
            title="No activity yet"
            description={RECENT_ACTIVITY_EMPTY_MESSAGE}
          />
        ) : (
          <ul className="space-y-4">
            {activity.map((event) => (
              <li
                key={event.id}
                className="flex gap-4 border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {ACTIVITY_LABELS[event.type].charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{event.title}</p>
                  <p className="text-xs text-muted-foreground">{event.description}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {event.repository} · {event.timestamp}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
