
"use client";

import { ExternalLink, GitBranch } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ConnectedRepository } from "@/lib/dashboard/types";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Loader2, Unplug } from "lucide-react";
import { disconnectRepository } from "@/lib/api/chat";
import type { AuthUser } from "@/auth/types";
interface ConnectedRepoCardProps {
  repository: ConnectedRepository;
  user: AuthUser;
}

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

export function ConnectedRepoCard({ 
  repository ,
  user,
}: ConnectedRepoCardProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isDisconnecting, startDisconnectTransition] = useTransition();

  async function handleDisconnect() {
  startDisconnectTransition(async () => {
    setError(null);

    try {
      const result = await disconnectRepository(user);

      if (!result.success) {
        setError(result.message || "Failed to disconnect repository.");
        return;
      }

      router.refresh();
    } catch (error) {
      setError("Failed to disconnect repository.");
    }
  });
}

  return (
    <Card className="border-violet-500/20 bg-violet-500/5">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-base">
            <GitBranch className="size-4 text-violet-600 dark:text-violet-400" />
            Connected repository
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Analysis and AI chat are scoped to this repository.
          </p>
        </div>
        <Badge variant="secondary" className="shrink-0">
          Active
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="rounded-lg border bg-background p-4">
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={repository.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-sm font-semibold text-[#3F503B] transition-colors hover:text-[#718567] hover:underline"
            >
              {repository.fullName}
            </a>
            <ExternalLink className="size-3.5 text-muted-foreground" />
            <Badge variant={repository.isPrivate ? "secondary" : "outline"}>
              {repository.isPrivate ? "Private" : "Public"}
            </Badge>

            {repository.language && (
              <Badge variant="secondary" className="font-normal">
                {repository.language}
              </Badge>
            )}
          </div>

          {repository.description && (
            <p className="mt-2 text-sm text-muted-foreground">{repository.description}</p>
          )}

          <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
            <span>★ {repository.stars.toLocaleString()} stars</span>
            <span>⑂ {repository.forks.toLocaleString()} forks</span>
            <span>Branch: {repository.defaultBranch}</span>
            <span>Updated {formatRelativeTime(repository.updatedAt)}</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-2 text-destructive hover:text-destructive"
          disabled={isDisconnecting}
          onClick={handleDisconnect}
        >
          {isDisconnecting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Unplug className="size-4" />
          )}
          Disconnect repository
        </Button>
      </CardContent>
    </Card>
  );
}