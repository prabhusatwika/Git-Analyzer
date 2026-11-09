
import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
  className?: string;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "rounded-2xl border border-[#DEDCD1] bg-[#FFFEFA] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-[#777B72]">
          {label}
        </CardTitle>

        <span className="flex size-9 items-center justify-center rounded-xl bg-[#E8EADF]">
          <Icon className="size-[18px] text-[#52634D]" />
        </span>
      </CardHeader>

      <CardContent>
        <p className="text-3xl font-semibold tracking-tight text-[#303A32] tabular-nums">
          {value}
        </p>

        {hint && (
          <p className="mt-2 text-xs leading-5 text-[#85877D]">
            {hint}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
