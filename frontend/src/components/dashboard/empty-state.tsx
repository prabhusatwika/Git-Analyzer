
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#DCDDD0] bg-[#F8F7F1] px-5 py-10 text-center transition-colors duration-200",
        className,
      )}
    >
      <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#E8EADF]">
        <Icon className="size-6 text-[#52634D]" strokeWidth={1.7} />
      </div>

      <h3 className="text-sm font-semibold text-[#303A32]">
        {title}
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-[#777B72]">
        {description}
      </p>

      {action && (
        <div className="mt-5">
          {action}
        </div>
      )}
    </div>
  );
}
