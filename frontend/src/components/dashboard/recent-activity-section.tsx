
import { Activity } from "lucide-react";

import { EmptyState } from "@/components/dashboard/empty-state";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export function RecentActivitySection({
  activity,
}: RecentActivitySectionProps) {
  return (
    <Card className="overflow-hidden rounded-2xl border border-[#DEDCD1] bg-[#FFFEFA] shadow-sm">
      <CardHeader className="border-b border-[#EEECE3] px-5 py-5">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#E8E8DC]">
            <Activity className="size-[18px] text-[#52634D]" />
          </span>

          <div>
            <CardTitle className="text-base font-semibold text-[#303A32]">
              Recent activity
            </CardTitle>
            <p className="mt-0.5 text-xs text-[#85877D]">
              Latest repository updates
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5">
        {activity.length === 0 ? (
          <EmptyState
            icon={Activity}
            title="No activity yet"
            description={RECENT_ACTIVITY_EMPTY_MESSAGE}
          />
        ) : (
          <ul className="space-y-0">
            {activity.map((event, index) => (
              <li
                key={event.id}
                className="relative flex gap-3 pb-5 last:pb-0"
              >
                <div className="relative flex shrink-0 flex-col items-center">
                  <div className="z-10 flex size-9 items-center justify-center rounded-full border border-[#DDE4D6] bg-[#E8E8DC] text-sm font-semibold text-[#52634D]">
                    {ACTIVITY_LABELS[event.type].charAt(0)}
                  </div>

                  {index !== activity.length - 1 && (
                    <div className="absolute top-9 h-full w-px bg-[#E8E6DC]" />
                  )}
                </div>

                <div className="min-w-0 flex-1 space-y-1.5 pt-0.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-[#303A32]">
                      {event.title}
                    </p>

                    <span className="rounded-md bg-[#F0F0E8] px-2 py-0.5 text-[10px] font-medium text-[#68745F]">
                      {ACTIVITY_LABELS[event.type]}
                    </span>
                  </div>

                  <p className="text-xs leading-5 text-[#777B72]">
                    {event.description}
                  </p>

                  <p className="text-[11px] text-[#92958A]">
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
