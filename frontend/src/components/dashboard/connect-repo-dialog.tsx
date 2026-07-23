"use client";

import { ChevronLeft, ChevronRight, Loader2, Search } from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";

import { RepoPickerList } from "@/components/dashboard/repo-picker-item";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import type { GitHubDisplayRepository } from "@/lib/github/repositories";
import { toConnectPayload } from "@/lib/github/repositories";
import {
  connectRepositoryAction,
  fetchGitHubRepositoriesAction,
} from "@/lib/repositories/actions";

interface ConnectRepoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnected?: () => void;
}

function toGitHubRepository(repo: GitHubDisplayRepository) {
  return {
    id: Number(repo.id),
    name: repo.name,
    full_name: repo.fullName,
    description: repo.description,
    language: repo.language,
    stargazers_count: repo.stars,
    forks_count: repo.forks,
    private: repo.isPrivate,
    default_branch: repo.defaultBranch,
    html_url: repo.htmlUrl,
    updated_at: repo.updatedAt,
    owner: { login: repo.owner },
  };
}

export function ConnectRepoDialog({ open, onOpenChange, onConnected }: ConnectRepoDialogProps) {
  const [repos, setRepos] = useState<GitHubDisplayRepository[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, startLoadTransition] = useTransition();
  const [isConnecting, startConnectTransition] = useTransition();

  const loadRepositories = useCallback((targetPage: number, query: string) => {
    startLoadTransition(async () => {
      setError(null);
      const result = await fetchGitHubRepositoriesAction({
        page: targetPage,
        search: query || undefined,
      });

      if (!result.success) {
        setError(result.error);
        setRepos([]);
        return;
      }

      setRepos(result.data.repositories);
      setPage(result.data.page);
      setHasNextPage(result.data.hasNextPage);
      setSelectedId(null);
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (open) {
      loadRepositories(1, debouncedSearch);
    } else {
      setSearch("");
      setDebouncedSearch("");
      setSelectedId(null);
      setError(null);
      setPage(1);
    }
  }, [open, debouncedSearch, loadRepositories]);

  function handleConnect() {
    const selected = repos.find((r) => r.id === selectedId);
    if (!selected) return;

    startConnectTransition(async () => {
      setError(null);
      const result = await connectRepositoryAction(toConnectPayload(toGitHubRepository(selected)));

      if (!result.success) {
        setError(result.error);
        return;
      }

      onOpenChange(false);
      onConnected?.();
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[85vh] max-w-2xl flex-col gap-0 overflow-hidden p-0">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle>Connect a repository</DialogTitle>
          <DialogDescription>
            Select exactly one GitHub repository to analyze. You can disconnect and switch
            later.
          </DialogDescription>
        </DialogHeader>

        <div className="border-b px-6 py-3">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search repositories by name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {error && (
            <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {isLoading ? (
            <RepoListSkeleton />
          ) : repos.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              {debouncedSearch
                ? `No repositories matching "${debouncedSearch}".`
                : "No repositories found on your GitHub account."}
            </div>
          ) : (
            <RepoPickerList repos={repos} selectedId={selectedId} onSelect={setSelectedId} />
          )}
        </div>

        <DialogFooter className="flex-row items-center justify-between border-t px-6 py-4 sm:justify-between">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={page <= 1 || isLoading}
              onClick={() => loadRepositories(page - 1, debouncedSearch)}
            >
              <ChevronLeft className="size-4" />
              Previous
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!hasNextPage || isLoading}
              onClick={() => loadRepositories(page + 1, debouncedSearch)}
            >
              Next
              <ChevronRight className="size-4" />
            </Button>
            <span className="text-xs text-muted-foreground">Page {page}</span>
          </div>

          <Button
            type="button"
            disabled={!selectedId || isConnecting || isLoading}
            onClick={handleConnect}
            className="gap-2"
          >
            {isConnecting && <Loader2 className="size-4 animate-spin" />}
            Connect selected
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function RepoListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex gap-3 rounded-lg border p-4">
          <Skeleton className="size-4 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}
