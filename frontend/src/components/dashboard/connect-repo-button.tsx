"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ConnectRepoDialog } from "@/components/dashboard/connect-repo-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AuthUser } from "@/auth/types";
import { disconnectRepository } from "@/lib/api/chat";

interface ConnectRepoButtonProps {
  user: AuthUser;
  hasConnectedRepository: boolean;

  className?: string;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline";
  disabledReason?: string;
}

export function ConnectRepoButton({
  user,
  hasConnectedRepository,
  className,
  size = "default",
  variant = "default",
  disabledReason = "Disconnect the current repository before connecting a new one.",
}: ConnectRepoButtonProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Button
  type="button"
  size={size}
  variant={variant}
  className={cn("gap-2", className)}
  title={
    hasConnectedRepository
      ? "Change the currently connected repository."
      : undefined
  }
  onClick={async () => {
  if (!hasConnectedRepository) {
    setOpen(true);
    return;
  }

  const confirmed = window.confirm(
    "Changing the repository will remove the current repository, its embeddings, and its local clone. Continue?"
  );

  if (!confirmed) {
    return;
  }

  try {
    await disconnectRepository(user);
    router.refresh();
    setOpen(true);
  } catch (error) {
    alert("Failed to disconnect the current repository.");
  }
}}
>
  <Plus className="size-4" />
  {hasConnectedRepository
    ? "Change Repository"
    : "Connect Repository"}
</Button>

      <ConnectRepoDialog
  open={open}
  onOpenChange={setOpen}
  onConnected={() => router.refresh()}
/>
    </>
  );
}
