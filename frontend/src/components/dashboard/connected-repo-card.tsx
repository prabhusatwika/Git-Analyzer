
"use client";

import { ExternalLink, GitBranch, Loader2, Unplug } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ConnectedRepository } from "@/lib/dashboard/types";
import { disconnectRepositoryAction } from "@/lib/repositories/actions";

interface ConnectedRepoCardProps {
  repository: ConnectedRepository;
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

export function ConnectedRepoCard({ repository }: ConnectedRepoCardProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isDisconnecting, startDisconnectTransition] = useTransition();

  function handleDisconnect() {
    startDisconnectTransition(async () => {
      setError(null);
      const result = await disconnectRepositoryAction();

      if (!result.success) {
        setError(result.error);
        return;
      }

      router.refresh();
    });
  }

  return (
    <Card className="overflow-hidden rounded-2xl border border-[#DEDCD1] bg-[#FFFEFA] shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-4">
        <div className="min-w-0 space-y-2">
          <div className="flex items-center gap-2">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#E8E8DC]">
              <GitBranch className="size-[18px] text-[#52634D]" />
            </span>

            <CardTitle className="text-base font-semibold text-[#303A32]">
              Connected repository
            </CardTitle>
          </div>

          <p className="text-sm leading-5 text-[#85877D]">
            Analysis and AI chat are scoped to this repository.
          </p>
        </div>

        <Badge className="shrink-0 border border-[#C9D7C1] bg-[#E5EDDF] text-[#52634D] hover:bg-[#E5EDDF]">
          <span className="mr-1.5 size-1.5 rounded-full bg-[#66845B]" />
          Active
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <div className="rounded-xl border border-[#E8E6DC] bg-[#F9F8F2] p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={repository.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-sm font-semibold text-[#3F503B] transition-colors hover:text-[#718567] hover:underline"
            >
              {repository.fullName}
            </a>

            <ExternalLink className="size-3.5 shrink-0 text-[#85877D]" />

            <Badge
              variant="outline"
              className="border-[#DEDCD1] bg-[#FFFEFA] text-[#777B72]"
            >
              {repository.isPrivate ? "Private" : "Public"}
            </Badge>

            {repository.language && (
              <Badge className="border-0 bg-[#E8EADF] font-normal text-[#52634D] hover:bg-[#E8EADF]">
                {repository.language}
              </Badge>
            )}
          </div>

          {repository.description && (
            <p className="mt-3 text-sm leading-6 text-[#777B72]">
              {repository.description}
            </p>
          )}

          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-[#E8E6DC] pt-4 sm:grid-cols-4">
            <div className="min-w-0">
              <p className="text-xs text-[#92958A]">Stars</p>
              <p className="mt-1 text-sm font-semibold text-[#303A32]">
                ★ {repository.stars.toLocaleString()}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-xs text-[#92958A]">Forks</p>
              <p className="mt-1 text-sm font-semibold text-[#303A32]">
                {repository.forks.toLocaleString()}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-xs text-[#92958A]">Default branch</p>
              <p className="mt-1 truncate text-sm font-semibold text-[#303A32]">
                {repository.defaultBranch}
              </p>
            </div>

            <div className="min-w-0">
              <p className="text-xs text-[#92958A]">Last updated</p>
              <p className="mt-1 text-sm font-semibold text-[#303A32]">
                {formatRelativeTime(repository.updatedAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2 border-[#DEDCD1] bg-[#FFFEFA] text-[#777B72] hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            disabled={isDisconnecting}
            onClick={handleDisconnect}
          >
            {isDisconnecting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Unplug className="size-4" />
            )}
            {isDisconnecting ? "Disconnecting..." : "Disconnect repository"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
