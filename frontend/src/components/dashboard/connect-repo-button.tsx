"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ConnectRepoDialog } from "@/components/dashboard/connect-repo-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ConnectRepoButtonProps {
  className?: string;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline";
  disabled?: boolean;
  disabledReason?: string;
}

export function ConnectRepoButton({
  className,
  size = "default",
  variant = "default",
  disabled = false,
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
        disabled={disabled}
        title={disabled ? disabledReason : undefined}
        onClick={() => setOpen(true)}
      >
        <Plus className="size-4" />
        Connect Repository
      </Button>

      {!disabled && (
        <ConnectRepoDialog
          open={open}
          onOpenChange={setOpen}
          onConnected={() => router.refresh()}
        />
      )}
    </>
  );
}
