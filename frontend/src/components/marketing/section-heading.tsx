import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  badge,
  title,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-2xl space-y-4",
        align === "center" && "text-center",
        className,
      )}
    >
      {badge && (
        <p className="text-sm font-medium tracking-wide text-violet-600 uppercase dark:text-violet-400">
          {badge}
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-muted-foreground text-pretty">{description}</p>
      )}
    </div>
  );
}
