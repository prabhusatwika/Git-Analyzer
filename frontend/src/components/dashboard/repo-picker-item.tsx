import type { GitHubDisplayRepository } from "@/lib/github/repositories";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

interface RepoPickerItemProps {
  repo: GitHubDisplayRepository;
  selected: boolean;
}

export function RepoPickerItem({ repo, selected }: RepoPickerItemProps) {
  const updatedLabel = formatRelativeTime(repo.updatedAt);

  return (
    <label
      htmlFor={`repo-${repo.id}`}
      className={cn(
        "flex cursor-pointer gap-3 rounded-lg border p-4 transition-colors hover:bg-muted/50",
        selected && "border-violet-500 bg-violet-500/5 ring-1 ring-violet-500/20",
      )}
    >
      <RadioGroupItem value={repo.id} id={`repo-${repo.id}`} />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-medium">{repo.fullName}</span>
          <Badge variant={repo.isPrivate ? "secondary" : "outline"}>
            {repo.isPrivate ? "Private" : "Public"}
          </Badge>
          {repo.language && (
            <Badge variant="secondary" className="font-normal">
              {repo.language}
            </Badge>
          )}
        </div>
        {repo.description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">{repo.description}</p>
        )}
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span>★ {repo.stars.toLocaleString()}</span>
          <span>⑂ {repo.forks.toLocaleString()}</span>
          <span>Updated {updatedLabel}</span>
        </div>
      </div>
    </label>
  );
}

export function RepoPickerList({
  repos,
  selectedId,
  onSelect,
}: {
  repos: GitHubDisplayRepository[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <RadioGroup value={selectedId ?? undefined} onValueChange={onSelect} className="gap-3">
      {repos.map((repo) => (
        <RepoPickerItem key={repo.id} repo={repo} selected={selectedId === repo.id} />
      ))}
    </RadioGroup>
  );
}
