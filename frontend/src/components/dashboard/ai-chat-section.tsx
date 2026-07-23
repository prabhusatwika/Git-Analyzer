import { Bot, Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { AI_CHAT_DISABLED_MESSAGE } from "@/lib/dashboard/constants";

interface AiChatSectionProps {
  enabled: boolean;
}

export function AiChatSection({ enabled }: AiChatSectionProps) {
  return (
    <Card id="ai-chat" className="border-border/60 scroll-mt-20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base font-semibold">AI Chat</CardTitle>
          {!enabled && (
            <Badge variant="secondary" className="gap-1">
              <Lock className="size-3" />
              Locked
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!enabled ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed bg-muted/30 px-6 py-10 text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-violet-500/10">
              <Bot className="size-6 text-violet-600 dark:text-violet-400" />
            </div>
            <p className="text-sm font-medium">AI Chat is not available yet</p>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              {AI_CHAT_DISABLED_MESSAGE}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
              Ask questions about commit history, pull request risk, or code ownership.
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Textarea
            placeholder={
              enabled
                ? "Ask about your repository..."
                : "Connect a repository to start chatting..."
            }
            disabled={!enabled}
            rows={3}
            className="resize-none"
          />
          <div className="flex justify-end">
            <Button type="button" disabled={!enabled}>
              Send message
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
